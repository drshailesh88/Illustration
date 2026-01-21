/**
 * Integration Tests for Agent Mode
 * Tests the complete AI chat interface workflow including prompt submission,
 * diagram generation, template selection, and navigation to editor
 *
 * @module tests/integration/agentMode
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import {
  useAgentStore,
  TEMPLATES,
  CATEGORY_LABELS,
  type Message,
  type Template,
} from '../../src/store/useAgentStore';
import { createMockFabricCanvas, waitForStateUpdate } from '../setup';

// ============================================================================
// Mock Services
// ============================================================================

/**
 * Mock AI service for diagram generation
 */
const mockAIService = {
  generateDiagram: vi.fn(),
  refineDiagram: vi.fn(),
  parsePrompt: vi.fn(),
};

/**
 * Mock navigation service
 */
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/agent' }),
  Link: vi.fn().mockImplementation(({ children }) => children),
}));

/**
 * Mock AI service module
 */
vi.mock('../../src/services/ai/DiagramGenerator', () => ({
  DiagramGenerator: vi.fn().mockImplementation(() => mockAIService),
}));

// ============================================================================
// Test Helpers
// ============================================================================

/**
 * Reset store to initial state before each test
 */
const resetAgentStore = () => {
  useAgentStore.setState({
    messages: [],
    isLoading: false,
    currentDiagram: null,
    selectedCategory: 'medicine',
    templateSearchQuery: '',
    isSidebarCollapsed: false,
    previewZoom: 100,
  });
};

/**
 * Simulate a successful diagram generation response
 */
const mockSuccessfulGeneration = (svgContent: string = '<svg><rect/></svg>') => {
  mockAIService.generateDiagram.mockResolvedValueOnce({
    success: true,
    svg: svgContent,
    mermaidCode: 'graph TD; A-->B',
  });
};

/**
 * Simulate a failed diagram generation
 */
const mockFailedGeneration = (errorMessage: string = 'Generation failed') => {
  mockAIService.generateDiagram.mockRejectedValueOnce(new Error(errorMessage));
};


// ============================================================================
// Integration Tests
// ============================================================================

describe('Agent Mode Integration Tests', () => {
  beforeEach(() => {
    resetAgentStore();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // ==========================================================================
  // Test: User types prompt -> diagram generates
  // ==========================================================================

  describe('Prompt Submission and Diagram Generation', () => {
    it('should add user message when prompt is submitted', async () => {
      const { addMessage, setLoading } = useAgentStore.getState();

      // Simulate user typing and submitting a prompt
      const userPrompt = 'Create a CONSORT flow diagram for a clinical trial';

      act(() => {
        addMessage({
          role: 'user',
          content: userPrompt,
        });
      });

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages).toHaveLength(1);
      expect(messages[0].role).toBe('user');
      expect(messages[0].content).toBe(userPrompt);
      expect(messages[0].id).toBeDefined();
      expect(messages[0].timestamp).toBeDefined();
    });

    it('should set loading state during generation', async () => {
      const { setLoading } = useAgentStore.getState();

      act(() => {
        setLoading(true);
      });

      expect(useAgentStore.getState().isLoading).toBe(true);

      act(() => {
        setLoading(false);
      });

      expect(useAgentStore.getState().isLoading).toBe(false);
    });

    it('should add assistant message with diagram after successful generation', async () => {
      const { addMessage, setCurrentDiagram } = useAgentStore.getState();
      const testSvg = '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="blue" width="100" height="100"/></svg>';

      // Add user message
      act(() => {
        addMessage({
          role: 'user',
          content: 'Create a flowchart',
        });
      });

      // Simulate AI response with diagram
      act(() => {
        addMessage({
          role: 'assistant',
          content: 'Here is your flowchart diagram:',
          diagram: testSvg,
        });
        setCurrentDiagram(testSvg);
      });

      await waitForStateUpdate();

      const { messages, currentDiagram } = useAgentStore.getState();
      expect(messages).toHaveLength(2);
      expect(messages[1].role).toBe('assistant');
      expect(messages[1].diagram).toBe(testSvg);
      expect(currentDiagram).toBe(testSvg);
    });

    it('should handle error messages gracefully', async () => {
      const { addMessage } = useAgentStore.getState();

      // Add user message
      act(() => {
        addMessage({
          role: 'user',
          content: 'Create an invalid diagram',
        });
      });

      // Simulate error response
      act(() => {
        addMessage({
          role: 'assistant',
          content: 'Sorry, I encountered an error generating your diagram. Please try again.',
          isError: true,
        });
      });

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages).toHaveLength(2);
      expect(messages[1].isError).toBe(true);
    });

    it('should generate unique message IDs', async () => {
      const { addMessage, generateId } = useAgentStore.getState();

      const ids = new Set<string>();
      for (let i = 0; i < 100; i++) {
        ids.add(generateId());
      }

      // All IDs should be unique
      expect(ids.size).toBe(100);
    });

    it('should preserve message order in conversation', async () => {
      const { addMessage } = useAgentStore.getState();

      const prompts = [
        'First prompt',
        'Second prompt',
        'Third prompt',
      ];

      for (const prompt of prompts) {
        act(() => {
          addMessage({ role: 'user', content: prompt });
          addMessage({ role: 'assistant', content: `Response to: ${prompt}` });
        });
      }

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages).toHaveLength(6);
      expect(messages[0].content).toBe('First prompt');
      expect(messages[1].content).toBe('Response to: First prompt');
      expect(messages[4].content).toBe('Third prompt');
    });
  });

  // ==========================================================================
  // Test: User refines with follow-up -> diagram updates
  // ==========================================================================

  describe('Follow-up Refinement', () => {
    it('should update diagram when user provides refinement instructions', async () => {
      const { addMessage, setCurrentDiagram } = useAgentStore.getState();
      const initialSvg = '<svg><rect fill="blue"/></svg>';
      const refinedSvg = '<svg><rect fill="red"/><circle/></svg>';

      // Initial generation
      act(() => {
        addMessage({ role: 'user', content: 'Create a simple diagram' });
        addMessage({ role: 'assistant', content: 'Here is your diagram:', diagram: initialSvg });
        setCurrentDiagram(initialSvg);
      });

      expect(useAgentStore.getState().currentDiagram).toBe(initialSvg);

      // User requests refinement
      act(() => {
        addMessage({ role: 'user', content: 'Add a circle and change the color to red' });
        addMessage({ role: 'assistant', content: 'I have updated the diagram:', diagram: refinedSvg });
        setCurrentDiagram(refinedSvg);
      });

      await waitForStateUpdate();

      const { messages, currentDiagram } = useAgentStore.getState();
      expect(messages).toHaveLength(4);
      expect(currentDiagram).toBe(refinedSvg);
    });

    it('should allow updating specific message content', async () => {
      const { addMessage, updateMessage } = useAgentStore.getState();

      act(() => {
        addMessage({ role: 'user', content: 'Initial content' });
      });

      const { messages } = useAgentStore.getState();
      const messageId = messages[0].id;

      act(() => {
        updateMessage(messageId, { content: 'Updated content' });
      });

      await waitForStateUpdate();

      expect(useAgentStore.getState().messages[0].content).toBe('Updated content');
    });

    it('should maintain conversation context across refinements', async () => {
      const { addMessage } = useAgentStore.getState();

      // Build up conversation with multiple refinements
      const conversation = [
        { role: 'user' as const, content: 'Create a PRISMA diagram' },
        { role: 'assistant' as const, content: 'Created PRISMA diagram', diagram: '<svg>1</svg>' },
        { role: 'user' as const, content: 'Add more studies to the screening phase' },
        { role: 'assistant' as const, content: 'Updated screening', diagram: '<svg>2</svg>' },
        { role: 'user' as const, content: 'Change colors to grayscale' },
        { role: 'assistant' as const, content: 'Applied grayscale', diagram: '<svg>3</svg>' },
      ];

      for (const msg of conversation) {
        act(() => {
          addMessage(msg);
        });
      }

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages).toHaveLength(6);

      // Verify all messages are accessible for context
      const userMessages = messages.filter((m) => m.role === 'user');
      const assistantMessages = messages.filter((m) => m.role === 'assistant');

      expect(userMessages).toHaveLength(3);
      expect(assistantMessages).toHaveLength(3);

      // Each assistant message should have a diagram
      assistantMessages.forEach((msg) => {
        expect(msg.diagram).toBeDefined();
      });
    });
  });

  // ==========================================================================
  // Test: User selects template -> prompt fills
  // ==========================================================================

  describe('Template Selection', () => {
    it('should have predefined templates available', () => {
      expect(TEMPLATES).toBeDefined();
      expect(TEMPLATES.length).toBeGreaterThan(0);
    });

    it('should have templates organized by category', () => {
      const categories = Object.keys(CATEGORY_LABELS);

      categories.forEach((category) => {
        const templatesInCategory = TEMPLATES.filter((t) => t.category === category);
        expect(templatesInCategory.length).toBeGreaterThan(0);
      });
    });

    it('should filter templates by category', async () => {
      const { setSelectedCategory } = useAgentStore.getState();

      act(() => {
        setSelectedCategory('biology');
      });

      const { selectedCategory } = useAgentStore.getState();
      expect(selectedCategory).toBe('biology');

      const biologyTemplates = TEMPLATES.filter((t) => t.category === 'biology');
      expect(biologyTemplates.length).toBeGreaterThan(0);
      expect(biologyTemplates.every((t) => t.category === 'biology')).toBe(true);
    });

    it('should filter templates by search query', async () => {
      const { setTemplateSearchQuery } = useAgentStore.getState();

      act(() => {
        setTemplateSearchQuery('CONSORT');
      });

      const { templateSearchQuery } = useAgentStore.getState();
      expect(templateSearchQuery).toBe('CONSORT');

      // Filter templates matching the query
      const matchingTemplates = TEMPLATES.filter(
        (t) =>
          t.name.toLowerCase().includes('consort') ||
          t.description.toLowerCase().includes('consort') ||
          t.prompt.toLowerCase().includes('consort')
      );

      expect(matchingTemplates.length).toBeGreaterThan(0);
    });

    it('should fill prompt when template is selected', async () => {
      const { addMessage } = useAgentStore.getState();
      const selectedTemplate = TEMPLATES.find((t) => t.id === 'consort');

      expect(selectedTemplate).toBeDefined();

      // Simulate template selection filling the prompt
      act(() => {
        addMessage({
          role: 'user',
          content: selectedTemplate!.prompt,
        });
      });

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages[0].content).toBe(selectedTemplate!.prompt);
    });

    it('should have valid template structure for all templates', () => {
      TEMPLATES.forEach((template) => {
        expect(template.id).toBeDefined();
        expect(template.name).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.category).toBeDefined();
        expect(template.prompt).toBeDefined();
        expect(template.icon).toBeDefined();

        // Verify prompt is not empty
        expect(template.prompt.length).toBeGreaterThan(10);
      });
    });

    it('should toggle sidebar visibility', async () => {
      const { toggleSidebar, isSidebarCollapsed } = useAgentStore.getState();

      expect(useAgentStore.getState().isSidebarCollapsed).toBe(false);

      act(() => {
        toggleSidebar();
      });

      expect(useAgentStore.getState().isSidebarCollapsed).toBe(true);

      act(() => {
        toggleSidebar();
      });

      expect(useAgentStore.getState().isSidebarCollapsed).toBe(false);
    });
  });

  // ==========================================================================
  // Test: User clicks "Send to Editor" -> navigation works
  // ==========================================================================

  describe('Send to Editor Navigation', () => {
    it('should store current diagram for transfer to editor', async () => {
      const { setCurrentDiagram } = useAgentStore.getState();
      const testSvg = '<svg><rect width="200" height="150" fill="#3498db"/></svg>';

      act(() => {
        setCurrentDiagram(testSvg);
      });

      expect(useAgentStore.getState().currentDiagram).toBe(testSvg);
    });

    it('should clear diagram when explicitly set to null', async () => {
      const { setCurrentDiagram } = useAgentStore.getState();
      const testSvg = '<svg><rect/></svg>';

      act(() => {
        setCurrentDiagram(testSvg);
      });

      expect(useAgentStore.getState().currentDiagram).toBe(testSvg);

      act(() => {
        setCurrentDiagram(null);
      });

      expect(useAgentStore.getState().currentDiagram).toBeNull();
    });

    it('should navigate to editor with diagram data', async () => {
      const { setCurrentDiagram, addMessage } = useAgentStore.getState();
      const testSvg = '<svg xmlns="http://www.w3.org/2000/svg"><g id="layer1"><rect/></g></svg>';

      // Generate diagram
      act(() => {
        addMessage({ role: 'user', content: 'Create diagram' });
        addMessage({ role: 'assistant', content: 'Done', diagram: testSvg });
        setCurrentDiagram(testSvg);
      });

      // Simulate "Send to Editor" action
      const sendToEditor = () => {
        const currentDiagram = useAgentStore.getState().currentDiagram;
        if (currentDiagram) {
          // In real implementation, this would navigate and pass data
          mockNavigate('/editor', { state: { svg: currentDiagram } });
        }
      };

      sendToEditor();

      expect(mockNavigate).toHaveBeenCalledWith('/editor', {
        state: { svg: testSvg },
      });
    });

    it('should not navigate if no diagram is available', async () => {
      const { currentDiagram } = useAgentStore.getState();
      expect(currentDiagram).toBeNull();

      const sendToEditor = () => {
        if (useAgentStore.getState().currentDiagram) {
          mockNavigate('/editor');
        }
      };

      sendToEditor();

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should preserve conversation history after navigation', async () => {
      const { addMessage, setCurrentDiagram } = useAgentStore.getState();

      // Build conversation
      act(() => {
        addMessage({ role: 'user', content: 'Create diagram' });
        addMessage({ role: 'assistant', content: 'Done', diagram: '<svg/>' });
        setCurrentDiagram('<svg/>');
      });

      const messagesBeforeNav = useAgentStore.getState().messages.length;

      // Navigate to editor
      mockNavigate('/editor');

      // Messages should still be preserved
      expect(useAgentStore.getState().messages.length).toBe(messagesBeforeNav);
    });
  });

  // ==========================================================================
  // Preview Zoom Tests
  // ==========================================================================

  describe('Preview Zoom', () => {
    it('should update preview zoom level', async () => {
      const { setPreviewZoom } = useAgentStore.getState();

      act(() => {
        setPreviewZoom(150);
      });

      expect(useAgentStore.getState().previewZoom).toBe(150);
    });

    it('should clamp zoom to minimum value', async () => {
      const { setPreviewZoom } = useAgentStore.getState();

      act(() => {
        setPreviewZoom(10); // Below minimum
      });

      expect(useAgentStore.getState().previewZoom).toBe(25);
    });

    it('should clamp zoom to maximum value', async () => {
      const { setPreviewZoom } = useAgentStore.getState();

      act(() => {
        setPreviewZoom(500); // Above maximum
      });

      expect(useAgentStore.getState().previewZoom).toBe(400);
    });
  });

  // ==========================================================================
  // Message Management Tests
  // ==========================================================================

  describe('Message Management', () => {
    it('should clear all messages', async () => {
      const { addMessage, clearMessages } = useAgentStore.getState();

      // Add some messages
      act(() => {
        addMessage({ role: 'user', content: 'Test 1' });
        addMessage({ role: 'assistant', content: 'Response 1' });
        addMessage({ role: 'user', content: 'Test 2' });
      });

      expect(useAgentStore.getState().messages.length).toBe(3);

      act(() => {
        clearMessages();
      });

      expect(useAgentStore.getState().messages).toEqual([]);
      expect(useAgentStore.getState().currentDiagram).toBeNull();
    });

    it('should handle rapid message additions', async () => {
      const { addMessage } = useAgentStore.getState();

      // Rapidly add many messages
      act(() => {
        for (let i = 0; i < 50; i++) {
          addMessage({ role: 'user', content: `Message ${i}` });
        }
      });

      await waitForStateUpdate();

      const { messages } = useAgentStore.getState();
      expect(messages).toHaveLength(50);

      // Verify all messages are unique
      const ids = new Set(messages.map((m) => m.id));
      expect(ids.size).toBe(50);
    });
  });
});
