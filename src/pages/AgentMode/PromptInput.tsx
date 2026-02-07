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

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CloseSmallIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export interface ImageAttachment {
  base64: string;
  mimeType: string;
  name: string;
  previewUrl: string;
}

interface PromptInputProps {
  onSend: (prompt: string, image?: ImageAttachment) => void;
  onStop?: () => void;
  /** Whether the user is refining an existing diagram */
  isRefining?: boolean;
  /** Callback to start a new diagram (clears conversation) */
  onNewDiagram?: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSend, onStop, isRefining, onNewDiagram }) => {
  const [value, setValue] = useState('');
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    if ((trimmedValue || attachedImage) && !isLoading) {
      onSend(trimmedValue || 'Analyze this sketch and generate a clean diagram', attachedImage ?? undefined);
      setValue('');
      setAttachedImage(null);
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

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Extract base64 from data URL
      const base64 = dataUrl.split(',')[1];
      setAttachedImage({
        base64,
        mimeType: file.type,
        name: file.name,
        previewUrl: dataUrl,
      });
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleRemoveImage = useCallback(() => {
    setAttachedImage(null);
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const canSend = (value.trim().length > 0 || !!attachedImage) && !isLoading;

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
      {/* Image preview */}
      {attachedImage && (
        <div style={styles.imagePreview}>
          <img src={attachedImage.previewUrl} alt="Attached sketch" style={styles.previewImg} />
          <div style={styles.previewInfo}>
            <span style={styles.previewName}>{attachedImage.name}</span>
            <button onClick={handleRemoveImage} style={styles.removeBtn} title="Remove image">
              <span style={{ width: '14px', height: '14px', display: 'inline-flex' }}><CloseSmallIcon /></span>
            </button>
          </div>
        </div>
      )}
      <div style={styles.wrapper}>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        {/* Upload button */}
        <button
          onClick={handleUploadClick}
          style={{
            ...styles.button,
            ...styles.uploadButton,
            ...(isLoading ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
          }}
          disabled={isLoading}
          title="Upload sketch or photo"
        >
          <UploadIcon />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={attachedImage
            ? "Describe what to generate from this image (optional)..."
            : isRefining
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
  uploadButton: {
    background: 'var(--bg-tertiary)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border-color)',
  },
  imagePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-sm)',
    padding: '8px',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
  },
  previewImg: {
    width: '48px',
    height: '48px',
    objectFit: 'cover' as const,
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
  },
  previewInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  previewName: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-secondary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    flexShrink: 0,
  },
};

export default PromptInput;
