/**
 * RightPanel Component
 * Tabbed panel with Layers, Properties, and Icons tabs
 *
 * @module pages/EditorMode/RightPanel
 */

import React, { useState, useCallback, useEffect } from 'react';
import { loadSVGFromString, util, FabricObject } from 'fabric';
import { LayersPanel } from '../../components/LayersPanel';
import PropertiesPanel from '../../components/PropertiesPanel';
import IconPicker from '../../components/IconPicker';
import type { UnifiedIconResult } from '../../lib/icons';
import { StylePanel, defaultHandDrawnSettings, type HandDrawnSettings } from '../../components/StylePanel';
import { useEditorStore } from '../../store/editorStore';
import { useToast } from '../../components/Toast/useToast';
import { createSimpleIconSvg } from '../../lib/icons';

// ============================================================================
// Types
// ============================================================================

type TabId = 'layers' | 'properties' | 'icons' | 'style' | 'templates' | 'history' | 'align';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

export interface RightPanelProps {
  handDrawnSettings?: HandDrawnSettings;
  onHandDrawnSettingsChange?: (settings: HandDrawnSettings) => void;
  onApplyHandDrawnToSelection?: () => Promise<void>;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    width: 'var(--sidebar-width, 280px)',
    backgroundColor: 'var(--bg-secondary)',
    borderLeft: '1px solid var(--border-primary)',
    overflow: 'hidden',
  },
  tabBar: {
    display: 'flex',
    alignItems: 'center',
    height: 'var(--panel-header-height, 32px)',
    borderBottom: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0 4px',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    height: '100%',
    padding: '0 12px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '11px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    borderBottom: '2px solid transparent',
    marginBottom: '-1px',
  },
  tabActive: {
    color: 'var(--text-primary)',
    borderBottomColor: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-secondary)',
  },
  tabHover: {
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-hover)',
  },
  tabIcon: {
    width: '14px',
    height: '14px',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    overflow: 'auto',
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
    width: '48px',
    height: '48px',
    marginBottom: '16px',
    opacity: 0.4,
  },
  emptyText: {
    fontSize: '12px',
    lineHeight: 1.5,
  },
};

// ============================================================================
// Icons
// ============================================================================

const LayersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const PropertiesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const StyleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17c3.333-3.333 6.667-5 10-5 2 0 4 .5 6 1.5" />
    <path d="M3 12c3.333-2 6.667-2.5 10-1.5 2 .6 4 1.8 6 3.5" />
    <path d="M3 7c3.333-1 6.667-1 10 0 2 .6 4 1.8 6 3.5" />
  </svg>
);

const TemplatesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AlignIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ============================================================================
// Tabs Configuration
// ============================================================================

const tabs: Tab[] = [
  { id: 'layers', label: 'Layers', icon: <LayersIcon /> },
  { id: 'properties', label: 'Properties', icon: <PropertiesIcon /> },
  { id: 'icons', label: 'Icons', icon: <IconsIcon /> },
  { id: 'templates', label: 'Templates', icon: <TemplatesIcon /> },
  { id: 'align', label: 'Align', icon: <AlignIcon /> },
  { id: 'history', label: 'History', icon: <HistoryIcon /> },
  { id: 'style', label: 'Style', icon: <StyleIcon /> },
];

// ============================================================================
// Tab Button Component
// ============================================================================

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ tab, isActive, onClick }: TabButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.tab,
        ...(isActive ? styles.tabActive : {}),
        ...(!isActive && isHovered ? styles.tabHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${tab.id}`}
      id={`tab-${tab.id}`}
    >
      <span style={styles.tabIcon}>{tab.icon}</span>
      <span>{tab.label}</span>
    </button>
  );
}

// ============================================================================
// Align Panel Component
// ============================================================================

interface AlignPanelProps {
  canvas: any;
  hasSelection: boolean;
}

const AlignPanel: React.FC<AlignPanelProps> = ({ canvas, hasSelection }) => {
  const handleAlign = useCallback((alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!canvas || !hasSelection) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 2) return;

    const group = canvas.getActiveObject();
    if (!group) return;

    activeObjects.forEach((obj: any) => {
      if (alignment === 'left') obj.set('left', group.left);
      else if (alignment === 'center') obj.set('left', group.left + group.width / 2 - obj.width * obj.scaleX / 2);
      else if (alignment === 'right') obj.set('left', group.left + group.width - obj.width * obj.scaleX);
      else if (alignment === 'top') obj.set('top', group.top);
      else if (alignment === 'middle') obj.set('top', group.top + group.height / 2 - obj.height * obj.scaleY / 2);
      else if (alignment === 'bottom') obj.set('top', group.top + group.height - obj.height * obj.scaleY);

      obj.setCoords();
    });

    canvas.renderAll();
  }, [canvas, hasSelection]);

  const alignButtons = [
    { label: 'Align Left', action: 'left' as const, icon: '⬅️' },
    { label: 'Align Center', action: 'center' as const, icon: '↔️' },
    { label: 'Align Right', action: 'right' as const, icon: '➡️' },
    { label: 'Align Top', action: 'top' as const, icon: '⬆️' },
    { label: 'Align Middle', action: 'middle' as const, icon: '↕️' },
    { label: 'Align Bottom', action: 'bottom' as const, icon: '⬇️' },
  ];

  if (!hasSelection) {
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '32px' }}>
          Select 2 or more objects to align
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Horizontal Alignment
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {alignButtons.slice(0, 3).map((btn) => (
            <button
              key={btn.action}
              onClick={() => handleAlign(btn.action)}
              style={{
                padding: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
              title={btn.label}
            >
              <span>{btn.icon}</span>
              <span>{btn.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Vertical Alignment
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {alignButtons.slice(3).map((btn) => (
            <button
              key={btn.action}
              onClick={() => handleAlign(btn.action)}
              style={{
                padding: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
              title={btn.label}
            >
              <span>{btn.icon}</span>
              <span>{btn.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// RightPanel Component
// ============================================================================

export function RightPanel({
  handDrawnSettings: externalSettings,
  onHandDrawnSettingsChange: externalOnChange,
  onApplyHandDrawnToSelection,
}: RightPanelProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabId>('layers');
  const toast = useToast();
  // Use external settings if provided, otherwise use local state
  const [localSettings, setLocalSettings] = useState<HandDrawnSettings>(defaultHandDrawnSettings);
  const handDrawnSettings = externalSettings ?? localSettings;
  const setHandDrawnSettings = externalOnChange ?? setLocalSettings;

  // Drag and drop state
  const [draggedIcon, setDraggedIcon] = useState<UnifiedIconResult | null>(null);

  // Get selection state from store
  const selectedObjects = useEditorStore((state) => state.selectedObjects);
  const canvas = useEditorStore((state) => state.canvas);
  const hasSelection = selectedObjects.length > 0;

  // Handle applying hand-drawn style to selection
  const handleApplyToSelection = useCallback(async () => {
    if (!canvas || !hasSelection) return;

    // Use the provided applyHandDrawnToSelection function from useIllustratorTools
    if (onApplyHandDrawnToSelection) {
      await onApplyHandDrawnToSelection();
    } else {
      console.warn('applyHandDrawnToSelection not provided to RightPanel');
    }
  }, [canvas, hasSelection, onApplyHandDrawnToSelection]);

  // Handle icon selection from IconPicker - adds icon SVG to canvas
  const handleIconSelect = useCallback(async (icon: UnifiedIconResult, svgContent: string, dropPosition?: { x: number; y: number }) => {
    if (!canvas || !svgContent) {
      console.warn('Cannot add icon: canvas not ready or no SVG content');
      toast.warning('Cannot add icon: canvas not ready');
      return;
    }

    try {
      // Parse and add SVG to canvas using Fabric.js
      const { objects, options } = await loadSVGFromString(svgContent);
      const filteredObjects = objects.filter((obj): obj is FabricObject => obj !== null);

      if (filteredObjects.length === 0) {
        console.warn('No valid objects found in SVG');
        toast.warning('No valid objects found in SVG');
        return;
      }

      // Group all SVG elements together
      const group = util.groupSVGElements(filteredObjects, options);

      // Scale icon to reasonable size (64px default)
      const targetSize = 64;
      const currentWidth = group.width || 1;
      const currentHeight = group.height || 1;
      const scale = targetSize / Math.max(currentWidth, currentHeight);
      group.scale(scale);

      // Position at drop location or center of canvas
      const canvasWidth = canvas.width || 800;
      const canvasHeight = canvas.height || 600;
      const position = dropPosition || {
        x: (canvasWidth - targetSize) / 2,
        y: (canvasHeight - targetSize) / 2,
      };
      group.set({
        left: position.x,
        top: position.y,
        // Add metadata for identification
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: icon.name,
      });

      // Add to canvas and select it
      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.renderAll();

      console.log(`Added icon "${icon.name}" to canvas`);
      toast.success(`Added "${icon.name}" to canvas`);
    } catch (error) {
      console.error('Failed to add icon to canvas:', error);
      toast.error('Failed to add icon to canvas');
    }
  }, [canvas, toast]);

  // Helper to extract SVG content
  const extractSvgContent = useCallback(async (icon: UnifiedIconResult): Promise<string> => {
    if (icon.library === 'simple' && icon.slug) {
      return createSimpleIconSvg(icon.slug, 64, 'currentColor') || '';
    }

    if (icon.component) {
      const ReactDOMServer = await import('react-dom/server');
      const React = await import('react');
      const element = React.createElement(icon.component, { size: 64 });
      return ReactDOMServer.renderToStaticMarkup(element);
    }

    return '';
  }, []);

  // Handle drag start
  const handleIconDragStart = useCallback(async (icon: UnifiedIconResult) => {
    const svgContent = await extractSvgContent(icon);
    if (svgContent) {
      setDraggedIcon({ ...icon, svgContent } as any);
    }
  }, [extractSvgContent]);

  // Handle drag over (allow drop)
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Handle drop on canvas
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();

    if (!draggedIcon || !canvas) return;

    // Get drop position relative to canvas
    const canvasElement = canvas.getElement();
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get SVG content
    const svgContent = (draggedIcon as any).svgContent;
    handleIconSelect(draggedIcon, svgContent, { x, y });

    setDraggedIcon(null);
  }, [draggedIcon, canvas, handleIconSelect]);

  // Setup drop handlers on canvas wrapper
  useEffect(() => {
    if (!canvas) return;

    const canvasElement = canvas.getElement();
    if (!canvasElement) return;

    const canvasContainer = canvasElement.parentElement;
    if (!canvasContainer) return;

    canvasContainer.addEventListener('dragover', handleDragOver as any);
    canvasContainer.addEventListener('drop', handleDrop as any);

    return () => {
      canvasContainer.removeEventListener('dragover', handleDragOver as any);
      canvasContainer.removeEventListener('drop', handleDrop as any);
    };
  }, [canvas, handleDragOver, handleDrop]);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'layers':
        return <LayersPanel />;
      case 'properties':
        return <PropertiesPanel />;
      case 'icons':
        return <IconPicker onSelectIcon={handleIconSelect} onDragStart={handleIconDragStart} />;
      case 'templates':
        return (
          <div style={{ padding: '16px' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '32px' }}>
              Template gallery coming soon.
            </div>
          </div>
        );
      case 'align':
        return <AlignPanel canvas={canvas} hasSelection={hasSelection} />;
      case 'history':
        return (
          <div style={{ padding: '16px' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '32px' }}>
              History panel coming soon.
            </div>
          </div>
        );
      case 'style':
        return (
          <div style={{ padding: '16px' }}>
            <StylePanel
              settings={handDrawnSettings}
              onSettingsChange={setHandDrawnSettings}
              onApplyToSelection={handleApplyToSelection}
              hasSelection={hasSelection}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside style={styles.panel}>
      {/* Tab Bar */}
      <div style={styles.tabBar} role="tablist" aria-label="Panel tabs">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={styles.content}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </aside>
  );
}

export default RightPanel;
