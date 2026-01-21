/**
 * PropertiesPanel Component
 * React functional component for editing selected object properties
 *
 * @module components/PropertiesPanel
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useEditorStore } from '../store/editorStore';
import type { FabricObject } from 'fabric';

// ============================================================================
// Types
// ============================================================================

interface ObjectProperties {
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  // Text properties
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  textAlign?: string;
  text?: string;
  // Image properties
  clipPath?: string;
  cropX?: number;
  cropY?: number;
  // Path properties
  strokeCap?: string;
  strokeJoin?: string;
  strokeDashArray?: number[];
  // Group properties
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

// ============================================================================
// Constants
// ============================================================================

const FONT_FAMILIES = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
];

const FONT_WEIGHTS = [
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
];

// ============================================================================
// Icons
// ============================================================================

const TransformIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const AppearanceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
  </svg>
);

const TextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const PathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16c2 0 4-4 6-4s4 4 6 4 4-4 4-4" />
    <path d="M4 12c2 0 4-4 6-4s4 4 6 4 4-4 4-4" />
  </svg>
);

const GroupIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{
      transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform 150ms ease',
    }}
  >
    <path d="M3 4.5L6 7.5L9 4.5" />
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
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderBottom: '1px solid var(--border-primary)',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
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
    margin: 0,
  },
  emptyHint: {
    fontSize: '11px',
    marginTop: '8px',
    color: 'var(--text-muted)',
  },
  section: {
    borderBottom: '1px solid var(--border-primary)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'var(--bg-tertiary)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 150ms ease',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    flex: 1,
  },
  sectionContent: {
    padding: '12px',
  },
  row: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '10px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    width: '100%',
    padding: '6px 8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    fontSize: '11px',
    outline: 'none',
  },
  unit: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    paddingRight: '8px',
  },
  colorInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  colorSwatch: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '1px solid var(--border-primary)',
    cursor: 'pointer',
  },
  colorHex: {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  select: {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '11px',
    outline: 'none',
    cursor: 'pointer',
  },
  slider: {
    width: '100%',
    height: '4px',
    appearance: 'none',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
  },
};

// ============================================================================
// Section Component
// ============================================================================

interface SectionProps {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function SectionComponent({ section, isOpen, onToggle, children }: SectionProps): JSX.Element {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader} onClick={onToggle}>
        <ChevronIcon isOpen={isOpen} />
        {section.icon}
        <span style={styles.sectionTitle}>{section.title}</span>
      </div>
      {isOpen && <div style={styles.sectionContent}>{children}</div>}
    </div>
  );
}

// ============================================================================
// PropertiesPanel Component
// ============================================================================

export function PropertiesPanel(): JSX.Element {
  const canvas = useEditorStore((state) => state.canvas);
  const [properties, setProperties] = useState<ObjectProperties | null>(null);
  const [objectType, setObjectType] = useState<string>('');
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['transform', 'appearance'])
  );

  const sections: Section[] = useMemo(
    () => [
      { id: 'transform', title: 'Transform', icon: <TransformIcon /> },
      { id: 'appearance', title: 'Appearance', icon: <AppearanceIcon /> },
      ...(objectType === 'image'
        ? [{ id: 'image', title: 'Image', icon: <ImageIcon /> }]
        : []),
      ...(objectType === 'path' || objectType === 'line' || objectType === 'polyline'
        ? [{ id: 'path', title: 'Path', icon: <PathIcon /> }]
        : []),
      ...(objectType === 'group'
        ? [{ id: 'group', title: 'Group', icon: <GroupIcon /> }]
        : []),
      ...(objectType === 'i-text' || objectType === 'textbox' || objectType === 'text'
        ? [{ id: 'text', title: 'Text', icon: <TextIcon /> }]
        : []),
    ],
    [objectType]
  );

  // Sync with selected object
  const syncProperties = useCallback(() => {
    if (!canvas) {
      setProperties(null);
      setObjectType('');
      return;
    }

    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      setProperties(null);
      setObjectType('');
      return;
    }

    const obj = activeObject as FabricObject & {
      fontFamily?: string;
      fontSize?: number;
      fontWeight?: string | number;
      textAlign?: string;
      text?: string;
      clipPath?: any;
      cropX?: number;
      cropY?: number;
      strokeCap?: string;
      strokeJoin?: string;
      strokeDashArray?: number[];
    };

    setObjectType(obj.type || '');
    setProperties({
      left: Math.round(obj.left || 0),
      top: Math.round(obj.top || 0),
      width: Math.round((obj.width || 0) * (obj.scaleX || 1)),
      height: Math.round((obj.height || 0) * (obj.scaleY || 1)),
      scaleX: obj.scaleX || 1,
      scaleY: obj.scaleY || 1,
      angle: Math.round(obj.angle || 0),
      fill: (obj.fill as string) || '#000000',
      stroke: (obj.stroke as string) || '#000000',
      strokeWidth: obj.strokeWidth || 1,
      opacity: obj.opacity ?? 1,
      fontFamily: obj.fontFamily,
      fontSize: obj.fontSize,
      fontWeight: obj.fontWeight,
      textAlign: obj.textAlign,
      text: obj.text,
      clipPath: obj.clipPath ? 'custom' : undefined,
      cropX: obj.cropX || 0,
      cropY: obj.cropY || 0,
      strokeCap: obj.strokeCap || 'butt',
      strokeJoin: obj.strokeJoin || 'miter',
      strokeDashArray: obj.strokeDashArray || [],
    });
  }, [canvas]);

  // Listen for selection changes
  useEffect(() => {
    if (!canvas) return;

    syncProperties();

    const events = ['selection:created', 'selection:updated', 'selection:cleared', 'object:modified'];
    events.forEach((event) => {
      canvas.on(event, syncProperties);
    });

    return () => {
      events.forEach((event) => {
        canvas.off(event, syncProperties);
      });
    };
  }, [canvas, syncProperties]);

  // Update object property
  const updateProperty = useCallback(
    (property: keyof ObjectProperties, value: number | string | number[]) => {
      if (!canvas) return;
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;

      // Handle special cases for width/height that need to affect scale
      if (property === 'width') {
        const originalWidth = activeObject.width || 1;
        activeObject.set('scaleX', (value as number) / originalWidth);
      } else if (property === 'height') {
        const originalHeight = activeObject.height || 1;
        activeObject.set('scaleY', (value as number) / originalHeight);
      } else {
        activeObject.set(property, value);
      }

      activeObject.setCoords();
      canvas.renderAll();
      syncProperties();
    },
    [canvas, syncProperties]
  );

  // Toggle section
  const toggleSection = useCallback((sectionId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  // Render empty state
  if (!properties) {
    return (
      <div style={styles.panel}>
        <div style={styles.header}>
          <h3 style={styles.title}>Properties</h3>
        </div>
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <p style={styles.emptyText}>No object selected</p>
          <span style={styles.emptyHint}>Select an object to edit its properties</span>
        </div>
      </div>
    );
  }

  const isTextObject = objectType === 'i-text' || objectType === 'textbox' || objectType === 'text';

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          Properties <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({objectType})</span>
        </h3>
      </div>

      <div style={styles.content}>
        {/* Transform Section */}
        <SectionComponent
          section={sections.find((s) => s.id === 'transform')!}
          isOpen={openSections.has('transform')}
          onToggle={() => toggleSection('transform')}
        >
          {/* Position */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>X</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.left}
                  onChange={(e) => updateProperty('left', parseFloat(e.target.value) || 0)}
                />
                <span style={styles.unit}>px</span>
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Y</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.top}
                  onChange={(e) => updateProperty('top', parseFloat(e.target.value) || 0)}
                />
                <span style={styles.unit}>px</span>
              </div>
            </div>
          </div>

          {/* Size */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>W</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.width}
                  min={1}
                  onChange={(e) => updateProperty('width', parseFloat(e.target.value) || 1)}
                />
                <span style={styles.unit}>px</span>
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>H</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.height}
                  min={1}
                  onChange={(e) => updateProperty('height', parseFloat(e.target.value) || 1)}
                />
                <span style={styles.unit}>px</span>
              </div>
            </div>
          </div>

          {/* Rotation */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Rotation</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.angle}
                  onChange={(e) => updateProperty('angle', parseFloat(e.target.value) || 0)}
                />
                <span style={styles.unit}>deg</span>
              </div>
            </div>
          </div>
        </SectionComponent>

        {/* Appearance Section */}
        <SectionComponent
          section={sections.find((s) => s.id === 'appearance')!}
          isOpen={openSections.has('appearance')}
          onToggle={() => toggleSection('appearance')}
        >
          {/* Fill Color */}
          <div style={{ marginBottom: '12px' }}>
            <label style={styles.label}>Fill</label>
            <div style={{ ...styles.colorInput, marginTop: '4px' }}>
              <input
                type="color"
                style={{
                  ...styles.colorSwatch,
                  padding: 0,
                  border: 'none',
                }}
                value={properties.fill || '#000000'}
                onChange={(e) => updateProperty('fill', e.target.value)}
              />
              <input
                type="text"
                style={styles.colorHex}
                value={properties.fill || '#000000'}
                onChange={(e) => updateProperty('fill', e.target.value)}
              />
            </div>
          </div>

          {/* Stroke Color */}
          <div style={{ marginBottom: '12px' }}>
            <label style={styles.label}>Stroke</label>
            <div style={{ ...styles.colorInput, marginTop: '4px' }}>
              <input
                type="color"
                style={{
                  ...styles.colorSwatch,
                  padding: 0,
                  border: 'none',
                }}
                value={properties.stroke || '#000000'}
                onChange={(e) => updateProperty('stroke', e.target.value)}
              />
              <input
                type="text"
                style={styles.colorHex}
                value={properties.stroke || '#000000'}
                onChange={(e) => updateProperty('stroke', e.target.value)}
              />
            </div>
          </div>

          {/* Stroke Width */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Stroke Width</label>
              <div style={styles.inputGroup}>
                <input
                  type="number"
                  style={styles.input}
                  value={properties.strokeWidth}
                  min={0}
                  onChange={(e) => updateProperty('strokeWidth', parseFloat(e.target.value) || 0)}
                />
                <span style={styles.unit}>px</span>
              </div>
            </div>
          </div>

          {/* Opacity */}
          <div style={styles.field}>
            <label style={styles.label}>Opacity ({Math.round(properties.opacity * 100)}%)</label>
            <input
              type="range"
              style={styles.slider}
              min={0}
              max={1}
              step={0.01}
              value={properties.opacity}
              onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))}
            />
          </div>
        </SectionComponent>

        {/* Text Section (only for text objects) */}
        {isTextObject && (
          <SectionComponent
            section={{ id: 'text', title: 'Text', icon: <TextIcon /> }}
            isOpen={openSections.has('text')}
            onToggle={() => toggleSection('text')}
          >
            {/* Font Family */}
            <div style={styles.field}>
              <label style={styles.label}>Font Family</label>
              <select
                style={styles.select}
                value={properties.fontFamily || 'Arial'}
                onChange={(e) => updateProperty('fontFamily' as keyof ObjectProperties, e.target.value)}
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div style={{ ...styles.row, marginTop: '8px' }}>
              <div style={styles.field}>
                <label style={styles.label}>Size</label>
                <div style={styles.inputGroup}>
                  <input
                    type="number"
                    style={styles.input}
                    value={properties.fontSize || 16}
                    min={1}
                    onChange={(e) =>
                      updateProperty('fontSize' as keyof ObjectProperties, parseFloat(e.target.value) || 16)
                    }
                  />
                  <span style={styles.unit}>px</span>
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Weight</label>
                <select
                  style={styles.select}
                  value={String(properties.fontWeight || '400')}
                  onChange={(e) => updateProperty('fontWeight' as keyof ObjectProperties, e.target.value)}
                >
                  {FONT_WEIGHTS.map((weight) => (
                    <option key={weight.value} value={weight.value}>
                      {weight.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </SectionComponent>
        )}

        {/* Image Section (only for image objects) */}
        {objectType === 'image' && (
          <SectionComponent
            section={{ id: 'image', title: 'Image', icon: <ImageIcon /> }}
            isOpen={openSections.has('image')}
            onToggle={() => toggleSection('image')}
          >
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Crop X</label>
                <div style={styles.inputGroup}>
                  <input
                    type="number"
                    style={styles.input}
                    value={properties.cropX || 0}
                    min="0"
                    max="100"
                    onChange={(e) => updateProperty('cropX' as keyof ObjectProperties, parseFloat(e.target.value) || 0)}
                  />
                  <span style={styles.unit}>%</span>
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Crop Y</label>
                <div style={styles.inputGroup}>
                  <input
                    type="number"
                    style={styles.input}
                    value={properties.cropY || 0}
                    min="0"
                    max="100"
                    onChange={(e) => updateProperty('cropY' as keyof ObjectProperties, parseFloat(e.target.value) || 0)}
                  />
                  <span style={styles.unit}>%</span>
                </div>
              </div>
            </div>
          </SectionComponent>
        )}

        {/* Path Section (only for path objects) */}
        {(objectType === 'path' || objectType === 'line' || objectType === 'polyline') && (
          <SectionComponent
            section={{ id: 'path', title: 'Path', icon: <PathIcon /> }}
            isOpen={openSections.has('path')}
            onToggle={() => toggleSection('path')}
          >
            <div style={styles.field}>
              <label style={styles.label}>Stroke Cap</label>
              <select
                style={styles.select}
                value={properties.strokeCap || 'butt'}
                onChange={(e) => updateProperty('strokeCap' as keyof ObjectProperties, e.target.value)}
              >
                <option value="butt">Butt</option>
                <option value="round">Round</option>
                <option value="square">Square</option>
              </select>
            </div>

            <div style={{ ...styles.field, marginTop: '8px' }}>
              <label style={styles.label}>Stroke Join</label>
              <select
                style={styles.select}
                value={properties.strokeJoin || 'miter'}
                onChange={(e) => updateProperty('strokeJoin' as keyof ObjectProperties, e.target.value)}
              >
                <option value="miter">Miter</option>
                <option value="round">Round</option>
                <option value="bevel">Bevel</option>
              </select>
            </div>

            <div style={{ ...styles.field, marginTop: '8px' }}>
              <label style={styles.label}>Dash Pattern</label>
              <input
                type="text"
                style={styles.input}
                value={properties.strokeDashArray?.join(', ') || ''}
                onChange={(e) => {
                  const dashArray = e.target.value
                    .split(',')
                    .map((v) => parseFloat(v.trim()) || 0)
                    .filter((v) => !isNaN(v));
                  updateProperty('strokeDashArray' as keyof ObjectProperties, dashArray);
                }}
                placeholder="e.g., 5, 5"
              />
            </div>
          </SectionComponent>
        )}

        {/* Group Section (only for group objects) */}
        {objectType === 'group' && (
          <SectionComponent
            section={{ id: 'group', title: 'Group', icon: <GroupIcon /> }}
            isOpen={openSections.has('group')}
            onToggle={() => toggleSection('group')}
          >
            <div style={{ padding: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
              Group contains {canvas?.getActiveObjects()?.[0]?._objects?.length || 0} objects.
              <br />
              Select individual objects to edit their properties.
            </div>
          </SectionComponent>
        )}
      </div>
    </div>
  );
}

export default PropertiesPanel;
