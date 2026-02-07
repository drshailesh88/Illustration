/**
 * CustomUploads Component
 *
 * Displays user-uploaded custom images/icons with upload button.
 * Integrates with Convex file storage for persistence.
 */

import React, { useState, useRef, useCallback } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const ACCEPTED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

export interface CustomAsset {
  _id: string;
  name: string;
  mimeType: string;
  url: string | null;
}

interface CustomUploadsProps {
  onSelectAsset: (asset: CustomAsset) => void;
  onDragStartAsset?: (asset: CustomAsset) => void;
}

export function CustomUploads(props: CustomUploadsProps) {
  if (IS_TEST_MODE) {
    return <CustomUploadsTestMode {...props} />;
  }
  return <CustomUploadsProduction {...props} />;
}

function CustomUploadsTestMode({ }: CustomUploadsProps) {
  return (
    <div style={styles.container}>
      <div style={styles.empty}>
        Custom uploads not available in test mode.
      </div>
    </div>
  );
}

function CustomUploadsProduction({ onSelectAsset, onDragStartAsset }: CustomUploadsProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const assets = useQuery(api.customAssets.listAssets) ?? [];
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const saveAsset = useMutation(api.customAssets.saveAsset);
  const deleteAsset = useMutation(api.customAssets.deleteAsset);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    e.target.value = '';

    // Validate type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Use SVG, PNG, or JPG.');
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large (max 5MB).');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Upload the file
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const { storageId } = await result.json();

      // Save metadata
      await saveAsset({
        storageId,
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        mimeType: file.type,
        fileSize: file.size,
      });
    } catch (err: any) {
      setError(err?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }, [generateUploadUrl, saveAsset]);

  const handleDelete = useCallback(async (assetId: string) => {
    try {
      await deleteAsset({ assetId: assetId as any });
    } catch (err) {
      console.error('Failed to delete asset:', err);
    }
  }, [deleteAsset]);

  const handleDragStart = useCallback((e: React.DragEvent, asset: CustomAsset) => {
    e.dataTransfer.setData('text/plain', asset.url || '');
    e.dataTransfer.setData('application/x-finnish-asset', JSON.stringify(asset));
    onDragStartAsset?.(asset);
  }, [onDragStartAsset]);

  return (
    <div style={styles.container}>
      {/* Upload Button */}
      <button
        onClick={handleUploadClick}
        disabled={uploading}
        style={styles.uploadButton}
      >
        {uploading ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        )}
        <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".svg,.png,.jpg,.jpeg"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* Error */}
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {/* Help text */}
      <div style={styles.helpText}>
        SVG, PNG, or JPG (max 5MB). Drag to canvas or click to insert.
      </div>

      {/* Asset Grid */}
      {assets.length === 0 ? (
        <div style={styles.empty}>
          No custom images yet. Upload your own icons or images above.
        </div>
      ) : (
        <div style={styles.grid}>
          {assets.map((asset: any) => (
            <div
              key={asset._id}
              style={styles.card}
              draggable
              onDragStart={(e: React.DragEvent) => handleDragStart(e, asset)}
              onClick={() => onSelectAsset(asset)}
              title={asset.name}
            >
              {asset.url ? (
                <img
                  src={asset.url}
                  alt={asset.name}
                  style={styles.thumbnail}
                  loading="lazy"
                />
              ) : (
                <div style={styles.placeholder}>?</div>
              )}
              <span style={styles.cardName}>{asset.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(asset._id as any);
                }}
                style={styles.deleteBtn}
                title="Delete"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: '2px dashed var(--border-primary)',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'all 150ms ease',
  },
  error: {
    padding: '6px 10px',
    borderRadius: '6px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--accent-error, #ef4444)',
    fontSize: '12px',
  },
  helpText: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textAlign: 'center' as const,
  },
  empty: {
    textAlign: 'center' as const,
    color: 'var(--text-muted)',
    fontSize: '12px',
    padding: '24px 12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  card: {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '48px',
    height: '48px',
    objectFit: 'contain' as const,
    borderRadius: '4px',
  },
  placeholder: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '4px',
    color: 'var(--text-muted)',
    fontSize: '16px',
  },
  cardName: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
    width: '100%',
    textAlign: 'center' as const,
  },
  deleteBtn: {
    position: 'absolute' as const,
    top: '2px',
    right: '2px',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    color: '#ffffff',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 150ms ease',
    padding: 0,
  },
};
