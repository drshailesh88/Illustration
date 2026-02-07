/**
 * AgentMode Component
 *
 * Main Agent Mode layout with:
 * - Left sidebar with template gallery
 * - Center chat area with messages
 * - Right preview pane showing generated diagram
 * - Bottom prompt input bar
 *
 * Uses Zustand stores for state management
 * Responsive layout
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useAgentStore } from '../../store/useAgentStore';
import { TemplateGallery } from './TemplateGallery';
import { ChatHistory } from './ChatHistory';
import { PromptInput, type ImageAttachment } from './PromptInput';
import { DiagramPreview } from './DiagramPreview';
import { useDiagramGenerator } from '../../hooks/useDiagramGenerator';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { detectPII } from '../../lib/piiDetector';

interface AgentModeProps {
  onSendToEditor?: (svg: string) => void;
}

export const AgentMode: React.FC<AgentModeProps> = ({ onSendToEditor }) => {
  const isMobile = useIsMobile();
  const { isOnline } = useOnlineStatus();
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const [piiWarning, setPiiWarning] = useState<{ prompt: string; issues: string[] } | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const {
    generate,
    refine,
    state: generatorState,
    suggestions,
    clearConversation,
    reset: resetGenerator,
  } = useDiagramGenerator();

  // Whether we're in refinement mode (a diagram already exists)
  const isRefinementMode = !!generatorState.svg;

  const {
    addMessage,
    setLoading,
    currentDiagram,
    messages,
    clearMessages,
  } = useAgentStore();

  // Check API key availability on mount
  useEffect(() => {
    const hasAnthropicKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY || !!import.meta.env.VITE_CLAUDE_API_KEY;
    const hasOpenAIKey = !!import.meta.env.VITE_OPENAI_API_KEY;
    if (!hasAnthropicKey && !hasOpenAIKey) {
      addMessage({
        role: 'assistant',
        content: 'AI generation requires an API key. Configure VITE_ANTHROPIC_API_KEY in your environment to enable diagram generation. Template-based diagrams (PRISMA, CONSORT, forest plot) work without an API key.',
      });
    }
  // Run once on mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Internal generation logic (called after PII check passes)
  const executeGeneration = useCallback(async (prompt: string, imageAttachment?: ImageAttachment) => {
    // Capture refinement state before the call
    const wasRefining = !!generatorState.svg;
    const hasImage = !!imageAttachment;

    // Add user message (include image indicator)
    addMessage({
      role: 'user',
      content: hasImage ? `[Uploaded: ${imageAttachment.name}] ${prompt}` : prompt,
    });

    // Set loading state
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      // Branch: refine, vision-based, or standard generation
      let result;
      if (wasRefining && !hasImage) {
        result = await refine(prompt);
      } else {
        result = await generate(prompt, {
          preferredBackend: 'mermaid',
          imageData: imageAttachment?.base64,
          imageMimeType: imageAttachment?.mimeType,
        });
      }

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (result?.svg) {
        addMessage({
          role: 'assistant',
          content: hasImage
            ? 'I\'ve analyzed your image and generated a clean diagram. You can refine it further or send it to the Editor.'
            : wasRefining
              ? 'I\'ve updated the diagram based on your feedback. You can continue refining or send it to the Editor.'
              : 'I\'ve generated a diagram based on your request. You can refine it further or send it to the Editor.',
          diagram: result.svg
        });
        return;
      }

      // No SVG returned - show user-friendly error with suggestions
      addMessage({
        role: 'assistant',
        content: wasRefining
          ? 'I wasn\'t able to apply that change. Try rephrasing your request, or start a new diagram.'
          : 'I wasn\'t able to generate a diagram from that prompt. Here are some suggestions:\n\n' +
            '- Try rephrasing your request with more specific details\n' +
            '- Use a template type like "PRISMA", "CONSORT", or "forest plot"\n' +
            '- Example: "Create a PRISMA flow diagram with 500 records identified, 120 duplicates, 380 screened, 200 excluded, 130 included"',
        isError: true
      });
    } catch (error) {
      if ((error as Error).message !== 'Generation cancelled') {
        addMessage({
          role: 'assistant',
          content: 'Something went wrong while generating your diagram. Please try again with a different prompt, or use a template-based diagram like PRISMA or CONSORT which work without an AI connection.',
          isError: true
        });
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [addMessage, setLoading, generate, refine, generatorState.svg]);

  // Handle sending a prompt (with PII detection and offline check)
  const handleSendPrompt = useCallback(async (prompt: string, imageAttachment?: ImageAttachment) => {
    // Block generation when offline — AI requires connectivity
    if (!isOnline) {
      addMessage({ role: 'user', content: prompt || '(offline)' });
      addMessage({
        role: 'assistant',
        content: 'You\'re currently offline. AI diagram generation requires an internet connection.\n\n' +
          'You can still use the **Editor Mode** to work on existing diagrams — your changes will be saved locally and synced when you reconnect.',
        isError: true,
      });
      return;
    }

    // If no image and prompt is too short, reject
    if (!imageAttachment && (!prompt.trim() || prompt.trim().length < 5)) {
      addMessage({
        role: 'user',
        content: prompt || '(empty)'
      });
      addMessage({
        role: 'assistant',
        content: 'Please describe the scientific diagram you\'d like to create. For example: "Create a PRISMA flow diagram with 500 records identified" or "Draw a signaling pathway for JAK-STAT".',
      });
      return;
    }

    // PII detection check (only on text, not images)
    if (prompt.trim().length > 0) {
      const piiMatches = detectPII(prompt);
      if (piiMatches.length > 0) {
        setPiiWarning({
          prompt,
          issues: piiMatches.map((m) => m.description),
        });
        return; // Wait for user decision
      }
    }

    await executeGeneration(prompt, imageAttachment);
  }, [addMessage, executeGeneration, isOnline]);

  // Handle PII warning: proceed anyway
  const handlePiiProceed = useCallback(() => {
    if (piiWarning) {
      const prompt = piiWarning.prompt;
      setPiiWarning(null);
      executeGeneration(prompt);
    }
  }, [piiWarning, executeGeneration]);

  // Handle PII warning: go back to edit
  const handlePiiEdit = useCallback(() => {
    setPiiWarning(null);
  }, []);

  // Handle stop generation
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Handle template selection
  const handleSelectTemplate = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  // Handle send to editor
  const handleSendToEditor = useCallback((svg: string) => {
    if (onSendToEditor) {
      onSendToEditor(svg);
    }
  }, [onSendToEditor]);

  // Handle regenerate
  const handleRegenerate = useCallback((messageId: string) => {
    const msgIndex = messages.findIndex((m) => m.id === messageId);
    if (msgIndex > 0) {
      const userMessage = messages[msgIndex - 1];
      if (userMessage.role === 'user') {
        handleSendPrompt(userMessage.content);
      }
    }
  }, [messages, handleSendPrompt]);

  // Handle prompt suggestion from welcome screen or AI suggestions
  const handlePromptSuggestion = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  // Handle starting a new diagram (clear conversation and reset)
  const handleNewDiagram = useCallback(() => {
    clearConversation();
    resetGenerator();
    clearMessages();
  }, [clearConversation, resetGenerator, clearMessages]);

  return (
    <div style={styles.container}>
      {/* Left Sidebar: Template Gallery (hidden on mobile) */}
      {!isMobile && <TemplateGallery onSelectTemplate={handleSelectTemplate} />}

      {/* Main Chat Area */}
      <main style={styles.main}>
        <div style={{
          ...styles.chatContainer,
          ...(isMobile ? { padding: '12px', maxWidth: '100%' } : {}),
        }}>
          <ChatHistory
            onSendToEditor={handleSendToEditor}
            onRegenerate={handleRegenerate}
            onPromptSuggestion={handlePromptSuggestion}
            suggestions={suggestions}
            onSuggestionClick={handlePromptSuggestion}
            isRefining={generatorState.isRefining}
          />
          <PromptInput
            onSend={handleSendPrompt}
            onStop={handleStop}
            isRefining={isRefinementMode}
            onNewDiagram={handleNewDiagram}
          />
        </div>
      </main>

      {/* Right Preview Pane (hidden on mobile) */}
      {!isMobile && showPreviewPane && currentDiagram && (
        <aside style={styles.previewPane}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>Preview</h3>
            <button
              onClick={() => setShowPreviewPane(false)}
              style={styles.closeBtn}
              title="Close preview"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div style={styles.previewContent}>
            <DiagramPreview svg={currentDiagram} />
          </div>
        </aside>
      )}

      {/* PII Warning Dialog */}
      {piiWarning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary, #252526)',
            borderRadius: '12px', padding: '28px', maxWidth: '480px',
            width: '90%', border: '1px solid var(--color-warning-border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', color: 'var(--color-warning)' }}>&#9888;</span>
              <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '18px', fontWeight: 600 }}>
                Potential Patient Data Detected
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
              Your prompt may contain patient-identifiable information:
            </p>
            <ul style={{ color: 'var(--color-warning)', fontSize: '13px', marginBottom: '20px', paddingLeft: '20px' }}>
              {piiWarning.issues.map((issue, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{issue}</li>
              ))}
            </ul>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
              Please remove personal details before generating. FINNISH does not store prompts, but patient data should never be shared with AI services.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={handlePiiProceed}
                style={{
                  padding: '8px 16px', fontSize: '14px', border: '1px solid var(--border-primary)',
                  borderRadius: '6px', backgroundColor: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                }}
              >
                Proceed Anyway
              </button>
              <button
                onClick={handlePiiEdit}
                style={{
                  padding: '8px 16px', fontSize: '14px', border: 'none',
                  borderRadius: '6px', backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff', cursor: 'pointer', fontWeight: 500,
                }}
              >
                Edit Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    background: 'var(--bg-primary)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-primary)',
    overflow: 'hidden'
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
    padding: 'var(--spacing-lg)',
    overflow: 'hidden'
  },
  previewPane: {
    width: '350px',
    background: 'var(--bg-secondary)',
    borderLeft: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    borderBottom: '1px solid var(--border-color)'
  },
  previewTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    margin: 0
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all var(--transition-fast)'
  },
  previewContent: {
    flex: 1,
    padding: 'var(--spacing-md)',
    overflow: 'auto'
  }
};

export default AgentMode;
