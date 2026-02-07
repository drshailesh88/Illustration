/**
 * PromptInput Component
 *
 * Multi-line textarea for entering prompts with:
 * - Auto-expanding textarea
 * - Send button (Enter to send, Shift+Enter for newline)
 * - Loading state during generation
 * - Stop button to cancel generation
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAgentStore } from '../../store/useAgentStore';

// Icons
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22 11 13 2 9l20-7z" />
  </svg>
);

const StopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const NewDiagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

interface PromptInputProps {
  onSend: (prompt: string) => void;
  onStop?: () => void;
  /** Whether the user is refining an existing diagram */
  isRefining?: boolean;
  /** Callback to start a new diagram (clears conversation) */
  onNewDiagram?: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, onStop, isRefining, onNewDiagram }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = useAgentStore((state) => state.isLoading);

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && !isLoading) {
      onSend(trimmedValue);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleStop = () => {
    if (onStop) {
      onStop();
    }
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div style={styles.container}>
      {isRefining && onNewDiagram && (
        <div style={styles.refiningBar}>
          <span style={styles.refiningLabel}>Refining diagram</span>
          <button
            onClick={onNewDiagram}
            style={styles.newDiagramBtn}
            title="Start a new diagram"
          >
            <span style={{ width: '14px', height: '14px', display: 'inline-flex' }}><NewDiagramIcon /></span>
            New Diagram
          </button>
        </div>
      )}
      <div style={styles.wrapper}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isRefining
            ? "Describe changes to your diagram..."
            : "Describe the diagram you want to create..."
          }
          style={styles.textarea}
          disabled={isLoading}
          rows={1}
        />
        {isLoading ? (
          <button
            onClick={handleStop}
            style={{ ...styles.button, ...styles.stopButton }}
            title="Stop generation"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!canSend}
            style={{
              ...styles.button,
              ...(canSend ? styles.buttonEnabled : styles.buttonDisabled)
            }}
            title="Send message (Enter)"
          >
            <SendIcon />
          </button>
        )}
      </div>
      <div style={styles.hint}>
        Press <kbd style={styles.kbd}>Enter</kbd> to send,{' '}
        <kbd style={styles.kbd}>Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 'var(--spacing-md)',
    background: 'var(--bg-secondary)',
    borderRadius: '12px',
    marginTop: 'auto'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 'var(--spacing-sm)'
  },
  textarea: {
    flex: 1,
    minHeight: '44px',
    maxHeight: '200px',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-md)',
    resize: 'none',
    outline: 'none',
    lineHeight: 1.5,
    transition: 'border-color var(--transition-fast)'
  },
  button: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)',
    flexShrink: 0
  },
  buttonEnabled: {
    background: 'var(--accent-primary)',
    color: 'white'
  },
  buttonDisabled: {
    background: 'var(--bg-hover)',
    color: 'var(--text-muted)',
    cursor: 'not-allowed'
  },
  stopButton: {
    background: 'var(--accent-danger)',
    color: 'white'
  },
  hint: {
    marginTop: 'var(--spacing-xs)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-muted)',
    textAlign: 'center'
  },
  kbd: {
    padding: '2px 6px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px'
  },
  refiningBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-sm)',
    padding: '6px 12px',
    background: 'rgba(59, 130, 246, 0.08)',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  refiningLabel: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--accent-primary)',
    fontWeight: 500,
  },
  newDiagramBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 500,
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
};

export default PromptInput;
