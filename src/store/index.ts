/**
 * FINNISH Store Module
 * Re-exports all Zustand stores for centralized state management
 *
 * @module store
 */

// Import functions that will be used locally in utility functions
import {
  resetEditorStore as _resetEditorStore,
  getEditorState as _getEditorState,
} from './editorStore.js';

import {
  resetConversationStore as _resetConversationStore,
  getConversationState as _getConversationState,
} from './conversationStore.js';

import {
  resetExportStore as _resetExportStore,
  getExportState as _getExportState,
} from './exportStore.js';

// ============================================================================
// Store Exports
// ============================================================================

// Editor Store - Canvas, tools, viewport, selection, grid, history
export {
  useEditorStore,
  useCanvas,
  useActiveTool,
  useViewport,
  useSelection,
  useGridState,
  useHistoryState,
  resetEditorStore,
  getEditorState,
  subscribeToEditor,
} from './editorStore.js';

// Conversation Store - Messages, diagrams, AI generation
export {
  useConversationStore,
  useMessages,
  useCurrentDiagram,
  useDiagramHistory,
  useGenerationStatus,
  useLatestMessage,
  useMessageCount,
  useHasMessages,
  createUserMessage,
  createAssistantMessage,
  createSystemMessage,
  createDiagram,
  resetConversationStore,
  getConversationState,
  subscribeToConversation,
  clearPersistedConversation,
} from './conversationStore.js';

// Export Store - Format, quality, DPI, progress
export {
  useExportStore,
  useExportSettings,
  useExportProgress,
  useExportError,
  useSupportsQuality,
  useSupportsDPI,
  getFormatConfig,
  getDPIOptions,
  getStageDescription,
  resetExportStore,
  getExportState,
  subscribeToExport,
  generateExportFilename,
} from './exportStore.js';

// ============================================================================
// Type Re-exports
// ============================================================================

export type {
  // Tool types
  ToolCategory,
  ToolMetadata,

  // Canvas & Editor types
  CanvasObject,
  PanPosition,
  ViewportState,
  HistoryState,
  GridConfig,
  SelectionState,

  // Layer types
  Layer,
  BlendMode,

  // Message types
  MessageRole,
  MessageContentType,
  MessageContent,
  Message,

  // Diagram types
  DiagramStatus,
  DiagramType,
  DiagramGeneration,
  ConversationSession,

  // Export types
  ExportFormat,
  ExportDPI,
  ExportQuality,
  ExportProgress,
  ExportStage,
  ExportConfig,
  ExportResult,

  // Store types
  EditorState,
  EditorActions,
  EditorStore,
  ConversationState,
  ConversationActions,
  ConversationStore,
  ExportState,
  ExportActions,
  ExportStore,

  // Utility types
  DeepPartial,
  StoreAction,
  StoreSubscriber,
} from '../types/index.js';

// Re-export ToolType enum value for use in components
export { ToolType } from '../types/index.js';
export type { ToolType as ToolTypeEnum } from '../types/index.js';

// ============================================================================
// Store Reset Utility
// ============================================================================

/**
 * Reset all stores to their initial state
 * Useful for testing or complete app reset
 */
export const resetAllStores = (): void => {
  _resetEditorStore();
  _resetConversationStore();
  _resetExportStore();
};

/**
 * Get combined state from all stores (for debugging)
 */
export const getAllStoreState = () => ({
  editor: _getEditorState(),
  conversation: _getConversationState(),
  export: _getExportState(),
});
