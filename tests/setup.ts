/**
 * Vitest Test Setup for FINNISH
 * Configures global test utilities, mocks browser APIs, and sets up testing environment
 *
 * @module tests/setup
 */

import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';

// ============================================================================
// Mock Fabric.js Canvas
// ============================================================================

/**
 * Mock Fabric.js Canvas for testing
 * Provides a realistic mock of the Canvas API used throughout FINNISH
 */
export const createMockFabricCanvas = () => ({
  // Canvas dimensions
  width: 800,
  height: 600,
  getWidth: vi.fn(() => 800),
  getHeight: vi.fn(() => 600),
  setWidth: vi.fn(),
  setHeight: vi.fn(),

  // Objects management
  _objects: [] as unknown[],
  getObjects: vi.fn(function (this: { _objects: unknown[] }) {
    return this._objects;
  }),
  add: vi.fn(function (this: { _objects: unknown[] }, ...objects: unknown[]) {
    this._objects.push(...objects);
    return this;
  }),
  remove: vi.fn(function (this: { _objects: unknown[] }, ...objects: unknown[]) {
    objects.forEach((obj) => {
      const index = this._objects.indexOf(obj);
      if (index > -1) {
        this._objects.splice(index, 1);
      }
    });
    return this;
  }),
  clear: vi.fn(function (this: { _objects: unknown[] }) {
    this._objects = [];
    return this;
  }),

  // Selection
  getActiveObject: vi.fn(() => null),
  getActiveObjects: vi.fn(() => []),
  setActiveObject: vi.fn(),
  discardActiveObject: vi.fn(),

  // Viewport
  viewportTransform: [1, 0, 0, 1, 0, 0],
  getZoom: vi.fn(() => 1),
  setZoom: vi.fn(),
  setViewportTransform: vi.fn(),
  zoomToPoint: vi.fn(),

  // Rendering
  renderAll: vi.fn(),
  requestRenderAll: vi.fn(),

  // Background
  backgroundColor: '#ffffff',
  setBackgroundColor: vi.fn(),

  // Export methods
  toJSON: vi.fn(() => ({
    version: '6.0.0',
    objects: [],
    background: '#ffffff',
  })),
  toSVG: vi.fn((options?: { viewBox?: object }) => {
    const viewBox = options?.viewBox
      ? `viewBox="0 0 800 600"`
      : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox} width="800" height="600"><rect fill="#ffffff" width="800" height="600"/></svg>`;
  }),
  toDataURL: vi.fn((options?: { format?: string; quality?: number; multiplier?: number }) => {
    const format = options?.format || 'png';
    return `data:image/${format};base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;
  }),

  // Load methods
  loadFromJSON: vi.fn((json: unknown, callback?: () => void) => {
    if (callback) callback();
    return Promise.resolve();
  }),

  // Event handling
  on: vi.fn(),
  off: vi.fn(),
  fire: vi.fn(),

  // Disposal
  dispose: vi.fn(),
});

// Global mock factory
vi.stubGlobal('createMockFabricCanvas', createMockFabricCanvas);

// Mock fabric module
vi.mock('fabric', () => ({
  Canvas: vi.fn().mockImplementation(() => createMockFabricCanvas()),
  FabricObject: vi.fn(),
  Rect: vi.fn().mockImplementation(() => ({
    type: 'rect',
    id: 'rect-1',
    toJSON: vi.fn(() => ({ type: 'rect', id: 'rect-1' })),
  })),
  Circle: vi.fn().mockImplementation(() => ({
    type: 'circle',
    id: 'circle-1',
    toJSON: vi.fn(() => ({ type: 'circle', id: 'circle-1' })),
  })),
  Group: vi.fn().mockImplementation((objects: unknown[]) => ({
    type: 'group',
    id: 'group-1',
    getObjects: vi.fn(() => objects || []),
    destroy: vi.fn(),
    toJSON: vi.fn(() => ({ type: 'group', id: 'group-1' })),
  })),
  util: {
    enlivenObjects: vi.fn((objects: unknown[], callback: (objs: unknown[]) => void) => {
      callback(objects);
    }),
  },
}));

// ============================================================================
// Mock Browser APIs
// ============================================================================

/**
 * Mock Clipboard API
 */
const mockClipboard = {
  writeText: vi.fn(() => Promise.resolve()),
  readText: vi.fn(() => Promise.resolve('')),
  write: vi.fn(() => Promise.resolve()),
  read: vi.fn(() => Promise.resolve([])),
};

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
  configurable: true,
});

/**
 * Mock URL API for blob URLs
 */
const mockURL = {
  createObjectURL: vi.fn((blob: Blob) => `blob:mock-url-${Date.now()}`),
  revokeObjectURL: vi.fn(),
};

vi.stubGlobal('URL', {
  ...URL,
  ...mockURL,
});

/**
 * Mock Download functionality
 */
export const mockDownload = vi.fn();

// Mock anchor element for downloads
const originalCreateElement = document.createElement.bind(document);
vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
  if (tagName === 'a') {
    const anchor = originalCreateElement('a') as HTMLAnchorElement & { click: ReturnType<typeof vi.fn> };
    anchor.click = vi.fn(() => {
      mockDownload({
        href: anchor.href,
        download: anchor.download,
      });
    });
    return anchor;
  }
  return originalCreateElement(tagName);
});

/**
 * Mock Blob and File
 */
if (typeof Blob === 'undefined') {
  vi.stubGlobal('Blob', class MockBlob {
    content: BlobPart[];
    options: BlobPropertyBag;
    size: number;
    type: string;

    constructor(content: BlobPart[], options: BlobPropertyBag = {}) {
      this.content = content;
      this.options = options;
      this.size = content.reduce((acc, part) => {
        if (typeof part === 'string') return acc + part.length;
        if (part instanceof ArrayBuffer) return acc + part.byteLength;
        return acc;
      }, 0);
      this.type = options.type || '';
    }

    text() {
      return Promise.resolve(this.content.join(''));
    }

    arrayBuffer() {
      return Promise.resolve(new ArrayBuffer(this.size));
    }
  });
}

/**
 * Mock atob/btoa for base64 encoding
 */
if (typeof btoa === 'undefined') {
  vi.stubGlobal('btoa', (str: string) => Buffer.from(str, 'binary').toString('base64'));
}

if (typeof atob === 'undefined') {
  vi.stubGlobal('atob', (str: string) => Buffer.from(str, 'base64').toString('binary'));
}

/**
 * Mock localStorage
 */
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

/**
 * Mock ResizeObserver
 */
vi.stubGlobal('ResizeObserver', class MockResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
});

/**
 * Mock IntersectionObserver
 */
vi.stubGlobal('IntersectionObserver', class MockIntersectionObserver {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [0];
  takeRecords = vi.fn(() => []);
});

/**
 * Mock matchMedia
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock requestAnimationFrame
 */
vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(Date.now()), 16);
});

vi.stubGlobal('cancelAnimationFrame', (id: number) => {
  clearTimeout(id);
});

// ============================================================================
// Global Test Utilities
// ============================================================================

/**
 * Create a mock message for conversation tests
 */
export const createMockMessage = (overrides = {}) => ({
  id: `msg-${Date.now()}`,
  role: 'user' as const,
  content: [{ type: 'text' as const, text: 'Test message' }],
  timestamp: Date.now(),
  ...overrides,
});

/**
 * Create a mock diagram for conversation tests
 */
export const createMockDiagram = (overrides = {}) => ({
  id: `diagram-${Date.now()}`,
  prompt: 'Create a test diagram',
  type: 'flowchart' as const,
  status: 'completed' as const,
  svgContent: '<svg></svg>',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides,
});

/**
 * Wait for async state updates
 */
export const waitForStateUpdate = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Flush all timers and promises
 */
export const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

// ============================================================================
// Test Lifecycle Hooks
// ============================================================================

beforeAll(() => {
  // Suppress console errors during tests unless explicitly testing error handling
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();

  // Clear localStorage
  localStorageMock.clear();
});

afterAll(() => {
  // Restore console
  vi.restoreAllMocks();
});

// ============================================================================
// Type Declarations for Global Utilities
// ============================================================================

declare global {
  function createMockFabricCanvas(): ReturnType<typeof createMockFabricCanvas>;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    interface Assertion {
      toBeInTheDocument(): void;
      toHaveTextContent(text: string): void;
    }
  }
}
