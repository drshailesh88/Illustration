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
import { PromptInput } from './PromptInput';
import { DiagramPreview } from './DiagramPreview';
import { useDiagramGenerator } from '../../hooks/useDiagramGenerator';

interface AgentModeProps {
  onSendToEditor?: (svg: string) => void;
}

export const AgentMode: React.FC<AgentModeProps> = ({ onSendToEditor }) => {
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { generate } = useDiagramGenerator();

  const {
    addMessage,
    setLoading,
    currentDiagram,
    messages
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

  // Handle sending a prompt
  const handleSendPrompt = useCallback(async (prompt: string) => {
    // Validate prompt - reject empty or too-short prompts
    if (!prompt.trim() || prompt.trim().length < 5) {
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

    // Add user message
    addMessage({
      role: 'user',
      content: prompt
    });

    // Set loading state
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const result = await generate(prompt, { preferredBackend: 'mermaid' });

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Generation cancelled');
      }

      if (result?.svg) {
        addMessage({
          role: 'assistant',
          content: 'I\'ve generated a diagram based on your request. You can customize it further in the Editor mode.',
          diagram: result.svg
        });
        return;
      }

      // No SVG returned - show user-friendly error with suggestions
      addMessage({
        role: 'assistant',
        content: 'I wasn\'t able to generate a diagram from that prompt. Here are some suggestions:\n\n' +
          '- Try rephrasing your request with more specific details\n' +
          '- Use a template type like "PRISMA", "CONSORT", or "forest plot"\n' +
          '- Example: "Create a PRISMA flow diagram with 500 records identified, 120 duplicates, 380 screened, 200 excluded, 130 included"',
        isError: true
      });
    } catch (error) {
      if ((error as Error).message !== 'Generation cancelled') {
        // User-friendly error message - no raw error strings or stack traces
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
  }, [addMessage, setLoading, generate]);

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

  // Handle prompt suggestion from welcome screen
  const handlePromptSuggestion = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  return (
    <div style={styles.container}>
      {/* Left Sidebar: Template Gallery */}
      <TemplateGallery onSelectTemplate={handleSelectTemplate} />

      {/* Main Chat Area */}
      <main style={styles.main}>
        <div style={styles.chatContainer}>
          <ChatHistory
            onSendToEditor={handleSendToEditor}
            onRegenerate={handleRegenerate}
            onPromptSuggestion={handlePromptSuggestion}
          />
          <PromptInput onSend={handleSendPrompt} onStop={handleStop} />
        </div>
      </main>

      {/* Right Preview Pane (optional) */}
      {showPreviewPane && currentDiagram && (
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
    width: '24px',
    height: '24px',
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

// Add responsive styles
const responsiveStyles = document.createElement('style');
responsiveStyles.textContent = `
  @media (max-width: 1200px) {
    .agent-preview-pane {
      width: 300px;
    }
  }
  @media (max-width: 992px) {
    .agent-sidebar {
      display: none;
    }
    .agent-preview-pane {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .agent-chat-container {
      padding: var(--spacing-md);
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(responsiveStyles);
}

export default AgentMode;
