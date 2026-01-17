/**
 * EditorMode Component
 * Full editor layout with all editing tools and panels
 *
 * Layout:
 * - MenuBar at top
 * - Toolbar on left (vertical)
 * - Canvas in center
 * - Right panel with tabs (Layers, Properties, Icons)
 * - StatusBar at bottom
 *
 * @module pages/EditorMode/EditorMode
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditorStore } from '../../store/editorStore';
import { useToast } from '../../components/Toast';
import { Canvas, CanvasProvider, CanvasRef } from '../../components/Canvas';
import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { RightPanel } from './RightPanel';
import { StatusBar } from './StatusBar';

// ============================================================================
// Types
// ============================================================================

interface MouseCoords {
  x: number;
  y: number;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-primary)',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  canvasArea: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-tertiary)',
    overflow: 'hidden',
    position: 'relative',
  },
  canvasWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    overflow: 'auto',
  },
  canvasShadow: {
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    zIndex: 100,
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '3px solid var(--border-primary)',
    borderTopColor: 'var(--accent-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// ============================================================================
// EditorMode Component
// ============================================================================

export function EditorMode(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const canvasRef = useRef<CanvasRef>(null);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Store state
  const isLoading = useEditorStore((state) => state.isLoading);
  const setLoading = useEditorStore((state) => state.setLoading);
  const setCanvas = useEditorStore((state) => state.setCanvas);

  // ========================================================================
  // Load Diagram by ID
  // ========================================================================

  useEffect(() => {
    if (id) {
      loadDiagram(id);
    }
  }, [id]);

  const loadDiagram = useCallback(async (diagramId: string) => {
    setLoading(true);

    try {
      // Try to load from localStorage
      const stored = localStorage.getItem(`finnish-diagram-${diagramId}`);

      if (stored) {
        const diagramData = JSON.parse(stored);

        if (canvasRef.current) {
          await canvasRef.current.loadFromJSON(diagramData.canvas);
          showToast({
            type: 'success',
            message: `Loaded diagram: ${diagramData.name || diagramId}`,
          });
        }
      } else {
        showToast({
          type: 'warning',
          message: `Diagram "${diagramId}" not found`,
        });
        // Redirect to editor without ID
        navigate('/editor', { replace: true });
      }
    } catch (error) {
      console.error('Failed to load diagram:', error);
      showToast({
        type: 'error',
        message: 'Failed to load diagram',
      });
    } finally {
      setLoading(false);
    }
  }, [navigate, setLoading, showToast]);

  // ========================================================================
  // Canvas Resize Handler
  // ========================================================================

  useEffect(() => {
    const updateCanvasSize = () => {
      const toolbar = document.querySelector('[role="toolbar"]');
      const rightPanel = document.querySelector('aside:last-of-type');

      const toolbarWidth = toolbar?.clientWidth || 48;
      const rightPanelWidth = rightPanel?.clientWidth || 280;
      const menuBarHeight = 40;
      const statusBarHeight = 24;

      const availableWidth = window.innerWidth - toolbarWidth - rightPanelWidth - 48; // padding
      const availableHeight = window.innerHeight - menuBarHeight - statusBarHeight - 48; // padding

      // Set canvas to a reasonable default size
      const newWidth = Math.max(600, Math.min(1200, availableWidth));
      const newHeight = Math.max(400, Math.min(900, availableHeight));

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  const handleCanvasReady = useCallback((canvas: any) => {
    setCanvas(canvas);

    // Show welcome toast only for new documents
    if (!id) {
      showToast({
        type: 'info',
        message: 'Editor ready. Start creating!',
        duration: 3000,
      });
    }
  }, [id, setCanvas, showToast]);

  const handleMouseMove = useCallback((coords: { x: number; y: number }) => {
    setMouseCoords(coords);
  }, []);

  const handleSelectionChange = useCallback((objects: any[]) => {
    const objectIds = objects.map((obj) => obj.id || `obj-${Math.random().toString(36).substr(2, 9)}`);
    useEditorStore.getState().selectObjects(objectIds);
  }, []);

  const handleObjectModified = useCallback((object: any) => {
    // Object was modified, history is automatically updated in Canvas component
  }, []);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <CanvasProvider>
      <div style={styles.container}>
        {/* Top Menu Bar */}
        <MenuBar />

        {/* Main Content Area */}
        <div style={styles.main}>
          {/* Left Toolbar */}
          <Toolbar />

          {/* Center Canvas Area */}
          <div style={styles.canvasArea}>
            {isLoading && (
              <div style={styles.loadingOverlay}>
                <div style={styles.loadingSpinner} />
              </div>
            )}

            <div style={styles.canvasWrapper}>
              <div style={styles.canvasShadow}>
                <Canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  backgroundColor="#ffffff"
                  onReady={handleCanvasReady}
                  onMouseMove={handleMouseMove}
                  onSelectionChange={handleSelectionChange}
                  onObjectModified={handleObjectModified}
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <RightPanel />
        </div>

        {/* Bottom Status Bar */}
        <StatusBar mouseCoords={mouseCoords} />
      </div>
    </CanvasProvider>
  );
}

export default EditorMode;
