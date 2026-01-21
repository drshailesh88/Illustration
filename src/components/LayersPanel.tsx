/**
 * LayersPanel Component
 * React functional component for managing canvas layers
 *
 * @module components/LayersPanel
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import type { FabricObject } from 'fabric';

// ============================================================================
// Types
// ============================================================================

interface LayerItemData {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  object: FabricObject;
}

// ============================================================================
// Icons
// ============================================================================

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const DuplicateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const MoveUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const MoveDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--bg-secondary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderBottom: '1px solid var(--border-primary)',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
  },
  layerCount: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '4px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '32px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '32px',
    height: '32px',
    marginBottom: '12px',
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '11px',
    lineHeight: 1.5,
  },
  layerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    marginBottom: '2px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: '1px solid transparent',
  },
  layerItemSelected: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
  },
  layerItemHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  layerThumbnail: {
    width: '24px',
    height: '24px',
    borderRadius: '3px',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  layerInfo: {
    flex: 1,
    minWidth: 0,
  },
  layerName: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  layerType: {
    fontSize: '10px',
    color: 'var(--text-muted)',
  },
  layerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  actionBtnActive: {
    color: 'var(--accent-primary)',
  },
  actionBtnDisabled: {
    opacity: 0.4,
    color: 'var(--text-muted)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px',
    borderTop: '1px solid var(--border-primary)',
  },
  toolbarBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    padding: 0,
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
};

// ============================================================================
// LayerItem Component
// ============================================================================

interface LayerItemProps {
  layer: LayerItemData;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisibility: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function LayerItemComponent({
  layer,
  isSelected,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete: _onDelete,
  onDuplicate: _onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: LayerItemProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.layerItem,
        ...(isSelected ? styles.layerItemSelected : {}),
        ...(!isSelected && isHovered ? styles.layerItemHover : {}),
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div style={styles.layerThumbnail}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          {layer.type.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Layer Info */}
      <div style={styles.layerInfo}>
        <div style={styles.layerName}>{layer.name}</div>
        <div style={styles.layerType}>{layer.type}</div>
      </div>

      {/* Action Buttons */}
      <div style={styles.layerActions}>
        <button
          style={{
            ...styles.actionBtn,
            ...(layer.visible ? {} : styles.actionBtnDisabled),
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          title={layer.visible ? 'Hide' : 'Show'}
        >
          {layer.visible ? <EyeIcon /> : <EyeOffIcon />}
        </button>

        <button
          style={{
            ...styles.actionBtn,
            ...(layer.locked ? styles.actionBtnActive : {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          title={layer.locked ? 'Unlock' : 'Lock'}
        >
          {layer.locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        {isHovered && (
          <>
            <button
              style={{
                ...styles.actionBtn,
                ...(isFirst ? styles.actionBtnDisabled : {}),
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isFirst) onMoveUp();
              }}
              title="Move Up"
              disabled={isFirst}
            >
              <MoveUpIcon />
            </button>
            <button
              style={{
                ...styles.actionBtn,
                ...(isLast ? styles.actionBtnDisabled : {}),
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLast) onMoveDown();
              }}
              title="Move Down"
              disabled={isLast}
            >
              <MoveDownIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// LayersPanel Component
// ============================================================================

export function LayersPanel(): JSX.Element {
  const canvas = useEditorStore((state) => state.canvas);
  // const _selectedObjects = useEditorStore((state) => state.selectedObjects);
  const [layers, setLayers] = useState<LayerItemData[]>([]);
  // const [_hoveredLayer, _setHoveredLayer] = useState<string | null>(null);

  // Sync layers with canvas objects
  const syncLayers = useCallback(() => {
    if (!canvas) {
      setLayers([]);
      return;
    }

    const objects = canvas.getObjects().filter((obj: FabricObject) => {
      const objAny = obj as FabricObject & { isGrid?: boolean; excludeFromLayerPanel?: boolean };
      return !objAny.isGrid && !objAny.excludeFromLayerPanel;
    });
    const layerData: LayerItemData[] = objects.map((obj: FabricObject, index: number) => {
      const objAny = obj as FabricObject & { id?: string; name?: string };
      return {
        id: objAny.id || `layer-${index}`,
        name: objAny.name || `${obj.type || 'Object'} ${index + 1}`,
        type: obj.type || 'object',
        visible: obj.visible !== false,
        locked: obj.lockMovementX === true && obj.lockMovementY === true,
        object: obj,
      };
    });

    // Reverse to show top layer first
    setLayers(layerData.reverse());
  }, [canvas]);

  // Listen for canvas changes
  useEffect(() => {
    if (!canvas) return;

    syncLayers();

    const events = [
      'object:added',
      'object:removed',
      'object:modified',
      'selection:created',
      'selection:updated',
      'selection:cleared',
    ];

    events.forEach((event) => {
      canvas.on(event, syncLayers);
    });

    return () => {
      events.forEach((event) => {
        canvas.off(event, syncLayers);
      });
    };
  }, [canvas, syncLayers]);

  // Handle layer selection
  const handleSelectLayer = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      canvas.setActiveObject(layer.object);
      canvas.renderAll();
    },
    [canvas]
  );

  // Toggle visibility
  const handleToggleVisibility = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      layer.object.set('visible', !layer.object.visible);
      canvas.renderAll();
      syncLayers();
    },
    [canvas, syncLayers]
  );

  // Toggle lock
  const handleToggleLock = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      const isLocked = layer.object.lockMovementX && layer.object.lockMovementY;
      layer.object.set({
        lockMovementX: !isLocked,
        lockMovementY: !isLocked,
        lockRotation: !isLocked,
        lockScalingX: !isLocked,
        lockScalingY: !isLocked,
        selectable: isLocked,
        evented: isLocked,
      });
      canvas.renderAll();
      syncLayers();
    },
    [canvas, syncLayers]
  );

  // Delete layer
  const handleDeleteLayer = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      canvas.remove(layer.object);
      canvas.renderAll();
    },
    [canvas]
  );

  // Duplicate layer
  const handleDuplicateLayer = useCallback(
    async (layer: LayerItemData) => {
      if (!canvas) return;
      const cloned = await layer.object.clone();
      cloned.set({
        left: (layer.object.left || 0) + 10,
        top: (layer.object.top || 0) + 10,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    },
    [canvas]
  );

  // Move layer up (visually up = higher z-index)
  const handleMoveUp = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      canvas.bringObjectForward(layer.object);
      canvas.renderAll();
      syncLayers();
    },
    [canvas, syncLayers]
  );

  // Move layer down (visually down = lower z-index)
  const handleMoveDown = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return;
      canvas.sendObjectBackwards(layer.object);
      canvas.renderAll();
      syncLayers();
    },
    [canvas, syncLayers]
  );

  // Check if layer is selected
  const isLayerSelected = useCallback(
    (layer: LayerItemData) => {
      if (!canvas) return false;
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return false;
      return activeObject === layer.object;
    },
    [canvas]
  );

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Layers</h3>
        <span style={styles.layerCount}>{layers.length} objects</span>
      </div>

      {/* Layer List */}
      <div style={styles.list}>
        {layers.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <p style={styles.emptyText}>
              No objects on canvas.
              <br />
              Add shapes, text, or icons to see them here.
            </p>
          </div>
        ) : (
          layers.map((layer, index) => (
            <LayerItemComponent
              key={layer.id}
              layer={layer}
              isSelected={isLayerSelected(layer)}
              onSelect={() => handleSelectLayer(layer)}
              onToggleVisibility={() => handleToggleVisibility(layer)}
              onToggleLock={() => handleToggleLock(layer)}
              onDelete={() => handleDeleteLayer(layer)}
              onDuplicate={() => handleDuplicateLayer(layer)}
              onMoveUp={() => handleMoveUp(layer)}
              onMoveDown={() => handleMoveDown(layer)}
              isFirst={index === 0}
              isLast={index === layers.length - 1}
            />
          ))
        )}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <button
          style={{
            ...styles.toolbarBtn,
            ...(layers.length === 0 || !canvas?.getActiveObject()
              ? { opacity: 0.5, cursor: 'not-allowed' }
              : {}),
          }}
          onClick={() => {
            const activeLayer = layers.find((l) => isLayerSelected(l));
            if (activeLayer) handleDuplicateLayer(activeLayer);
          }}
          title="Duplicate selected"
          disabled={layers.length === 0 || !canvas?.getActiveObject()}
        >
          <DuplicateIcon />
        </button>
        <button
          style={{
            ...styles.toolbarBtn,
            ...(layers.length === 0 || !canvas?.getActiveObject()
              ? { opacity: 0.5, cursor: 'not-allowed' }
              : {}),
          }}
          onClick={() => {
            const activeLayer = layers.find((l) => isLayerSelected(l));
            if (activeLayer) handleDeleteLayer(activeLayer);
          }}
          title="Delete selected"
          disabled={layers.length === 0 || !canvas?.getActiveObject()}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

export default LayersPanel;
