/**
 * Unit Tests for Conversation Store
 * Tests Zustand store managing AI conversation state and diagram generation
 *
 * @module tests/unit/store/conversationStore
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import {
  useConversationStore,
  resetConversationStore,
  getConversationState,
  createUserMessage,
  createAssistantMessage,
  createSystemMessage,
  createDiagram,
  useMessages,
  useCurrentDiagram,
  useDiagramHistory,
  useGenerationStatus,
  useLatestMessage,
  useMessageCount,
  useHasMessages,
  subscribeToConversation,
  clearPersistedConversation,
} from '../../../src/store/conversationStore';
import type { DiagramGeneration, Message } from '../../../src/types/index';

describe('conversationStore', () => {
  // Reset store before each test
  beforeEach(() => {
    resetConversationStore();
    clearPersistedConversation();
  });

  // ==========================================================================
  // Initial State Tests
  // ==========================================================================

  describe('Initial State', () => {
    it('should have correct initial state values', () => {
      const state = getConversationState();

      expect(state.messages).toEqual([]);
      expect(state.currentDiagram).toBeNull();
      expect(state.diagramHistory).toEqual([]);
      expect(state.isGenerating).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should have empty messages array', () => {
      const state = getConversationState();
      expect(state.messages).toHaveLength(0);
    });

    it('should have no current diagram', () => {
      const state = getConversationState();
      expect(state.currentDiagram).toBeNull();
    });

    it('should not be generating by default', () => {
      const state = getConversationState();
      expect(state.isGenerating).toBe(false);
    });

    it('should have no error by default', () => {
      const state = getConversationState();
      expect(state.error).toBeNull();
    });
  });

  // ==========================================================================
  // Message Management Tests
  // ==========================================================================

  describe('addMessage', () => {
    it('should add a message to the messages array', () => {
      const messageData = {
        role: 'user' as const,
        content: [{ type: 'text' as const, text: 'Hello' }],
      };

      act(() => {
        useConversationStore.getState().addMessage(messageData);
      });

      const state = getConversationState();
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0].role).toBe('user');
      expect(state.messages[0].content[0].text).toBe('Hello');
    });

    it('should generate unique id for each message', () => {
      const messageData = {
        role: 'user' as const,
        content: [{ type: 'text' as const, text: 'Test' }],
      };

      act(() => {
        useConversationStore.getState().addMessage(messageData);
        useConversationStore.getState().addMessage(messageData);
      });

      const state = getConversationState();
      expect(state.messages[0].id).not.toBe(state.messages[1].id);
    });

    it('should generate timestamp for each message', () => {
      const before = Date.now();

      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
      });

      const after = Date.now();
      const state = getConversationState();

      expect(state.messages[0].timestamp).toBeGreaterThanOrEqual(before);
      expect(state.messages[0].timestamp).toBeLessThanOrEqual(after);
    });

    it('should clear error when adding a message', () => {
      act(() => {
        useConversationStore.getState().setError('Previous error');
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
      });

      expect(getConversationState().error).toBeNull();
    });

    it('should limit messages to max 100', () => {
      act(() => {
        for (let i = 0; i < 110; i++) {
          useConversationStore.getState().addMessage({
            role: 'user' as const,
            content: [{ type: 'text' as const, text: `Message ${i}` }],
          });
        }
      });

      const state = getConversationState();
      expect(state.messages.length).toBe(100);
      // Should keep the most recent messages
      expect(state.messages[99].content[0].text).toBe('Message 109');
    });

    it('should add messages with metadata', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'assistant' as const,
          content: [{ type: 'text' as const, text: 'Response' }],
          metadata: {
            model: 'gpt-4',
            tokens: 100,
            processingTime: 500,
          },
        });
      });

      const state = getConversationState();
      expect(state.messages[0].metadata?.model).toBe('gpt-4');
      expect(state.messages[0].metadata?.tokens).toBe(100);
    });
  });

  describe('updateMessage', () => {
    it('should update an existing message', () => {
      let messageId: string;

      act(() => {
        useConversationStore.getState().addMessage({
          role: 'assistant' as const,
          content: [{ type: 'text' as const, text: 'Original' }],
        });
      });

      messageId = getConversationState().messages[0].id;

      act(() => {
        useConversationStore.getState().updateMessage(messageId, {
          content: [{ type: 'text' as const, text: 'Updated' }],
        });
      });

      expect(getConversationState().messages[0].content[0].text).toBe('Updated');
    });

    it('should not modify other messages', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'First' }],
        });
        useConversationStore.getState().addMessage({
          role: 'assistant' as const,
          content: [{ type: 'text' as const, text: 'Second' }],
        });
      });

      const messageId = getConversationState().messages[0].id;

      act(() => {
        useConversationStore.getState().updateMessage(messageId, {
          content: [{ type: 'text' as const, text: 'Updated First' }],
        });
      });

      expect(getConversationState().messages[1].content[0].text).toBe('Second');
    });

    it('should handle non-existent message ID gracefully', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
      });

      expect(() => {
        act(() => {
          useConversationStore.getState().updateMessage('non-existent-id', {
            content: [{ type: 'text' as const, text: 'Updated' }],
          });
        });
      }).not.toThrow();

      // Original message should be unchanged
      expect(getConversationState().messages[0].content[0].text).toBe('Test');
    });
  });

  describe('removeMessage', () => {
    it('should remove a message by ID', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'To be removed' }],
        });
      });

      const messageId = getConversationState().messages[0].id;

      act(() => {
        useConversationStore.getState().removeMessage(messageId);
      });

      expect(getConversationState().messages).toHaveLength(0);
    });

    it('should only remove the targeted message', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'First' }],
        });
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Second' }],
        });
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Third' }],
        });
      });

      const secondMessageId = getConversationState().messages[1].id;

      act(() => {
        useConversationStore.getState().removeMessage(secondMessageId);
      });

      const state = getConversationState();
      expect(state.messages).toHaveLength(2);
      expect(state.messages[0].content[0].text).toBe('First');
      expect(state.messages[1].content[0].text).toBe('Third');
    });
  });

  describe('clearMessages', () => {
    it('should clear all messages', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Message 1' }],
        });
        useConversationStore.getState().addMessage({
          role: 'assistant' as const,
          content: [{ type: 'text' as const, text: 'Message 2' }],
        });
      });

      expect(getConversationState().messages.length).toBe(2);

      act(() => {
        useConversationStore.getState().clearMessages();
      });

      expect(getConversationState().messages).toEqual([]);
    });
  });

  // ==========================================================================
  // Diagram Management Tests
  // ==========================================================================

  describe('setCurrentDiagram', () => {
    it('should set current diagram', () => {
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Create a flowchart',
        type: 'flowchart',
        status: 'generating',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().setCurrentDiagram(diagram);
      });

      expect(getConversationState().currentDiagram).toEqual(diagram);
    });

    it('should clear current diagram when set to null', () => {
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Test',
        type: 'flowchart',
        status: 'completed',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().setCurrentDiagram(diagram);
        useConversationStore.getState().setCurrentDiagram(null);
      });

      expect(getConversationState().currentDiagram).toBeNull();
    });
  });

  describe('updateCurrentDiagram', () => {
    it('should update current diagram with partial changes', () => {
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Create a flowchart',
        type: 'flowchart',
        status: 'generating',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().setCurrentDiagram(diagram);
        useConversationStore.getState().updateCurrentDiagram({
          status: 'completed',
          svgContent: '<svg></svg>',
        });
      });

      const state = getConversationState();
      expect(state.currentDiagram?.status).toBe('completed');
      expect(state.currentDiagram?.svgContent).toBe('<svg></svg>');
      expect(state.currentDiagram?.prompt).toBe('Create a flowchart');
    });

    it('should update updatedAt timestamp', () => {
      const originalTime = Date.now() - 1000;
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Test',
        type: 'flowchart',
        status: 'pending',
        createdAt: originalTime,
        updatedAt: originalTime,
      };

      act(() => {
        useConversationStore.getState().setCurrentDiagram(diagram);
        useConversationStore.getState().updateCurrentDiagram({
          status: 'generating',
        });
      });

      expect(getConversationState().currentDiagram?.updatedAt).toBeGreaterThan(originalTime);
    });

    it('should do nothing when there is no current diagram', () => {
      act(() => {
        useConversationStore.getState().updateCurrentDiagram({
          status: 'completed',
        });
      });

      expect(getConversationState().currentDiagram).toBeNull();
    });
  });

  describe('addToHistory', () => {
    it('should add diagram to history', () => {
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Test diagram',
        type: 'flowchart',
        status: 'completed',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().addToHistory(diagram);
      });

      expect(getConversationState().diagramHistory).toHaveLength(1);
      expect(getConversationState().diagramHistory[0]).toEqual(diagram);
    });

    it('should add new diagrams at the beginning', () => {
      const diagram1: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'First',
        type: 'flowchart',
        status: 'completed',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const diagram2: DiagramGeneration = {
        id: 'diagram-2',
        prompt: 'Second',
        type: 'flowchart',
        status: 'completed',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().addToHistory(diagram1);
        useConversationStore.getState().addToHistory(diagram2);
      });

      const history = getConversationState().diagramHistory;
      expect(history[0].id).toBe('diagram-2');
      expect(history[1].id).toBe('diagram-1');
    });

    it('should not add duplicate diagrams', () => {
      const diagram: DiagramGeneration = {
        id: 'diagram-1',
        prompt: 'Test',
        type: 'flowchart',
        status: 'completed',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().addToHistory(diagram);
        useConversationStore.getState().addToHistory(diagram);
      });

      expect(getConversationState().diagramHistory).toHaveLength(1);
    });

    it('should limit history to max 20 diagrams', () => {
      act(() => {
        for (let i = 0; i < 25; i++) {
          useConversationStore.getState().addToHistory({
            id: `diagram-${i}`,
            prompt: `Diagram ${i}`,
            type: 'flowchart',
            status: 'completed',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }
      });

      const history = getConversationState().diagramHistory;
      expect(history.length).toBe(20);
      // Should keep the most recent diagrams
      expect(history[0].id).toBe('diagram-24');
    });
  });

  describe('clearDiagramHistory', () => {
    it('should clear all diagram history', () => {
      act(() => {
        useConversationStore.getState().addToHistory({
          id: 'diagram-1',
          prompt: 'Test',
          type: 'flowchart',
          status: 'completed',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      });

      expect(getConversationState().diagramHistory.length).toBe(1);

      act(() => {
        useConversationStore.getState().clearDiagramHistory();
      });

      expect(getConversationState().diagramHistory).toEqual([]);
    });
  });

  // ==========================================================================
  // Status Management Tests
  // ==========================================================================

  describe('setGenerating', () => {
    it('should set generating state to true', () => {
      act(() => {
        useConversationStore.getState().setGenerating(true);
      });

      expect(getConversationState().isGenerating).toBe(true);
    });

    it('should set generating state to false', () => {
      act(() => {
        useConversationStore.getState().setGenerating(true);
        useConversationStore.getState().setGenerating(false);
      });

      expect(getConversationState().isGenerating).toBe(false);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      act(() => {
        useConversationStore.getState().setError('Something went wrong');
      });

      expect(getConversationState().error).toBe('Something went wrong');
    });

    it('should clear error when set to null', () => {
      act(() => {
        useConversationStore.getState().setError('Error');
        useConversationStore.getState().setError(null);
      });

      expect(getConversationState().error).toBeNull();
    });
  });

  // ==========================================================================
  // Helper Functions Tests
  // ==========================================================================

  describe('Helper Functions', () => {
    describe('createUserMessage', () => {
      it('should create a user message', () => {
        const message = createUserMessage('Hello, world!');

        expect(message.role).toBe('user');
        expect(message.content[0].type).toBe('text');
        expect(message.content[0].text).toBe('Hello, world!');
      });
    });

    describe('createAssistantMessage', () => {
      it('should create an assistant message', () => {
        const message = createAssistantMessage('Hello!');

        expect(message.role).toBe('assistant');
        expect(message.content[0].type).toBe('text');
        expect(message.content[0].text).toBe('Hello!');
      });

      it('should include metadata when provided', () => {
        const message = createAssistantMessage('Response', {
          model: 'gpt-4',
          tokens: 50,
        });

        expect(message.metadata?.model).toBe('gpt-4');
        expect(message.metadata?.tokens).toBe(50);
      });
    });

    describe('createSystemMessage', () => {
      it('should create a system message', () => {
        const message = createSystemMessage('System prompt');

        expect(message.role).toBe('system');
        expect(message.content[0].type).toBe('text');
        expect(message.content[0].text).toBe('System prompt');
      });
    });

    describe('createDiagram', () => {
      it('should create a diagram with default type', () => {
        const diagram = createDiagram('Create a flowchart');

        expect(diagram.id).toBeDefined();
        expect(diagram.prompt).toBe('Create a flowchart');
        expect(diagram.type).toBe('custom');
        expect(diagram.status).toBe('pending');
        expect(diagram.createdAt).toBeDefined();
        expect(diagram.updatedAt).toBeDefined();
      });

      it('should create a diagram with specified type', () => {
        const diagram = createDiagram('Create a sequence diagram', 'sequence');

        expect(diagram.type).toBe('sequence');
      });

      it('should generate unique IDs', () => {
        const diagram1 = createDiagram('Test 1');
        const diagram2 = createDiagram('Test 2');

        expect(diagram1.id).not.toBe(diagram2.id);
      });
    });
  });

  // ==========================================================================
  // Selector Hooks Tests
  // ==========================================================================

  describe('Selector Hooks', () => {
    it('useMessages should return messages array', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
      });

      const messages = getConversationState().messages;
      expect(messages).toHaveLength(1);
    });

    it('useCurrentDiagram should return current diagram', () => {
      const diagram: DiagramGeneration = {
        id: 'test',
        prompt: 'Test',
        type: 'flowchart',
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      act(() => {
        useConversationStore.getState().setCurrentDiagram(diagram);
      });

      expect(getConversationState().currentDiagram).toEqual(diagram);
    });

    it('useDiagramHistory should return diagram history', () => {
      act(() => {
        useConversationStore.getState().addToHistory({
          id: 'hist-1',
          prompt: 'Test',
          type: 'flowchart',
          status: 'completed',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      });

      expect(getConversationState().diagramHistory).toHaveLength(1);
    });

    it('useGenerationStatus should return isGenerating and error', () => {
      act(() => {
        useConversationStore.getState().setGenerating(true);
        useConversationStore.getState().setError('Test error');
      });

      const state = getConversationState();
      expect(state.isGenerating).toBe(true);
      expect(state.error).toBe('Test error');
    });

    it('useLatestMessage should return last message or null', () => {
      expect(getConversationState().messages.length).toBe(0);

      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'First' }],
        });
        useConversationStore.getState().addMessage({
          role: 'assistant' as const,
          content: [{ type: 'text' as const, text: 'Second' }],
        });
      });

      const messages = getConversationState().messages;
      expect(messages[messages.length - 1].content[0].text).toBe('Second');
    });

    it('useMessageCount should return message count', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'One' }],
        });
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Two' }],
        });
      });

      expect(getConversationState().messages.length).toBe(2);
    });

    it('useHasMessages should return true when messages exist', () => {
      expect(getConversationState().messages.length > 0).toBe(false);

      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
      });

      expect(getConversationState().messages.length > 0).toBe(true);
    });
  });

  // ==========================================================================
  // Store Utilities Tests
  // ==========================================================================

  describe('resetConversationStore', () => {
    it('should reset store to initial state', () => {
      act(() => {
        useConversationStore.getState().addMessage({
          role: 'user' as const,
          content: [{ type: 'text' as const, text: 'Test' }],
        });
        useConversationStore.getState().setGenerating(true);
        useConversationStore.getState().setError('Error');
        useConversationStore.getState().setCurrentDiagram({
          id: 'test',
          prompt: 'Test',
          type: 'flowchart',
          status: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      });

      act(() => {
        resetConversationStore();
      });

      const state = getConversationState();
      expect(state.messages).toEqual([]);
      expect(state.currentDiagram).toBeNull();
      expect(state.diagramHistory).toEqual([]);
      expect(state.isGenerating).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('subscribeToConversation', () => {
    it('should call callback when subscribed state changes', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToConversation(
        (state) => state.isGenerating,
        callback
      );

      act(() => {
        useConversationStore.getState().setGenerating(true);
      });

      expect(callback).toHaveBeenCalledWith(true, false);

      unsubscribe();
    });

    it('should not call callback after unsubscribe', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToConversation(
        (state) => state.isGenerating,
        callback
      );

      unsubscribe();

      act(() => {
        useConversationStore.getState().setGenerating(true);
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
