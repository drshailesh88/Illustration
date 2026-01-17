/**
 * Hooks Module
 * Re-exports all custom hooks
 */

export {
  useKeyboardShortcuts,
  getShortcutDisplayString,
} from './useKeyboardShortcuts';
export type {
  ShortcutConfig,
  UseKeyboardShortcutsOptions,
} from './useKeyboardShortcuts';

export { useDiagramGenerator } from './useDiagramGenerator';
export type {
  GenerationState,
  HistoryEntry,
  UseDiagramGeneratorOptions,
  UseDiagramGeneratorReturn,
} from './useDiagramGenerator';
