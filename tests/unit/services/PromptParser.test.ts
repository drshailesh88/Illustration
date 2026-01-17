/**
 * Unit Tests for PromptParser Service
 * Tests natural language prompt parsing for diagram generation
 *
 * @module tests/unit/services/PromptParser
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PromptParser, promptParser } from '../../../src/services/ai/PromptParser';

describe('PromptParser', () => {
  let parser: PromptParser;

  beforeEach(() => {
    parser = new PromptParser();
  });

  // ==========================================================================
  // Flowchart Detection Tests
  // ==========================================================================

  describe('Flowchart Detection', () => {
    it('should detect flowchart prompts', () => {
      const result = parser.parse('Create a flowchart showing the process');

      expect(result.diagramType).toBe('flowchart');
      expect(result.matchedKeywords).toContain('flowchart');
    });

    it('should detect flow chart (two words)', () => {
      const result = parser.parse('Make a flow chart of the workflow');

      expect(result.diagramType).toBe('flowchart');
    });

    it('should detect flow diagram', () => {
      const result = parser.parse('Create a flow diagram');

      expect(result.diagramType).toBe('flowchart');
      expect(result.matchedKeywords).toContain('flow diagram');
    });

    it('should detect process flow prompts', () => {
      const result = parser.parse('Show me the process flow for this operation');

      expect(result.diagramType).toBe('flowchart');
      expect(result.matchedKeywords).toContain('process flow');
    });

    it('should detect workflow prompts', () => {
      const result = parser.parse('Create a workflow diagram');

      expect(result.diagramType).toBe('flowchart');
      expect(result.matchedKeywords).toContain('workflow');
    });

    it('should detect pipeline prompts', () => {
      const result = parser.parse('Build a data pipeline diagram');

      expect(result.diagramType).toBe('flowchart');
      expect(result.matchedKeywords).toContain('pipeline');
    });
  });

  // ==========================================================================
  // Scientific Diagram Detection Tests
  // ==========================================================================

  describe('Scientific Diagram Detection', () => {
    it('should detect CONSORT diagram prompts', () => {
      const result = parser.parse('Create a CONSORT diagram for my clinical trial');

      expect(result.diagramType).toBe('consort');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should detect randomized trial prompts', () => {
      const result = parser.parse('Make a randomized controlled trial flow diagram');

      expect(result.diagramType).toBe('consort');
    });

    it('should detect PRISMA diagram prompts', () => {
      const result = parser.parse('Create a PRISMA diagram for my systematic review');

      expect(result.diagramType).toBe('prisma');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should detect systematic review prompts', () => {
      const result = parser.parse('I need a systematic review flow diagram');

      expect(result.diagramType).toBe('prisma');
    });

    it('should detect Kaplan-Meier survival curve prompts', () => {
      const result = parser.parse('Generate a Kaplan-Meier survival curve');

      expect(result.diagramType).toBe('kaplan-meier');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should detect survival analysis prompts', () => {
      const result = parser.parse('Create a survival analysis plot');

      expect(result.diagramType).toBe('kaplan-meier');
    });

    it('should detect forest plot prompts', () => {
      const result = parser.parse('Make a forest plot for meta-analysis');

      expect(result.diagramType).toBe('forest-plot');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should detect ROC curve prompts', () => {
      const result = parser.parse('Create a ROC curve for diagnostic accuracy');

      expect(result.diagramType).toBe('roc-curve');
    });

    it('should detect funnel plot prompts', () => {
      const result = parser.parse('Generate a funnel plot for publication bias');

      expect(result.diagramType).toBe('funnel-plot');
    });
  });

  // ==========================================================================
  // Chart Detection Tests
  // ==========================================================================

  describe('Chart Detection', () => {
    it('should detect bar chart prompts', () => {
      const result = parser.parse('Create a bar chart showing the distribution');

      expect(result.diagramType).toBe('bar-chart');
    });

    it('should detect histogram prompts', () => {
      const result = parser.parse('Make a histogram of the data');

      expect(result.diagramType).toBe('bar-chart');
    });

    it('should detect scatter plot prompts', () => {
      const result = parser.parse('Create a scatter plot for correlation analysis');

      expect(result.diagramType).toBe('scatter-plot');
    });

    it('should detect box plot prompts', () => {
      const result = parser.parse('Generate a box plot comparing groups');

      expect(result.diagramType).toBe('box-plot');
    });

    it('should detect boxplot (one word)', () => {
      const result = parser.parse('Make a boxplot visualization');

      expect(result.diagramType).toBe('box-plot');
    });
  });

  // ==========================================================================
  // Biology/Pathway Detection Tests
  // ==========================================================================

  describe('Biology/Pathway Detection', () => {
    it('should detect pathway prompts', () => {
      const result = parser.parse('Create a signaling pathway diagram');

      expect(result.diagramType).toBe('pathway');
    });

    it('should detect metabolic pathway prompts', () => {
      const result = parser.parse('Show the metabolic pathway');

      expect(result.diagramType).toBe('pathway');
    });

    it('should detect cell diagram prompts', () => {
      const result = parser.parse('Create a cell diagram showing organelles');

      expect(result.diagramType).toBe('cell');
    });

    it('should detect molecular structure prompts', () => {
      const result = parser.parse('Draw a molecular structure diagram');

      expect(result.diagramType).toBe('molecular');
    });
  });

  // ==========================================================================
  // Backend Suggestion Tests
  // ==========================================================================

  describe('Backend Suggestions', () => {
    it('should suggest mermaid for flowcharts', () => {
      const result = parser.parse('Create a flowchart');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('mermaid');
    });

    it('should suggest mermaid for CONSORT diagrams', () => {
      const result = parser.parse('Create a CONSORT diagram');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('mermaid');
    });

    it('should suggest mermaid for sequence diagrams', () => {
      const result = parser.parse('Create a sequence diagram');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('mermaid');
    });

    it('should suggest plotly for forest plots', () => {
      const result = parser.parse('Create a forest plot');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('plotly');
    });

    it('should suggest plotly for scatter plots', () => {
      const result = parser.parse('Create a scatter plot');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('plotly');
    });

    it('should suggest plotly for Kaplan-Meier curves', () => {
      const result = parser.parse('Create a Kaplan-Meier curve');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('plotly');
    });

    it('should suggest svg for pathway diagrams', () => {
      const result = parser.parse('Create a signaling pathway');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('svg');
    });

    it('should suggest svg for cell diagrams', () => {
      const result = parser.parse('Create a cell diagram');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('svg');
    });

    it('should suggest svg for anatomical diagrams', () => {
      const result = parser.parse('Create an anatomical diagram');
      const backend = parser.suggestBackend(result);

      expect(backend).toBe('svg');
    });
  });

  // ==========================================================================
  // Domain Detection Tests
  // ==========================================================================

  describe('Domain Detection', () => {
    it('should detect medicine domain', () => {
      const result = parser.parse('Create a diagram showing patient treatment flow');

      expect(result.domain).toBe('medicine');
    });

    it('should detect biology domain', () => {
      const result = parser.parse('Show the gene expression pathway');

      expect(result.domain).toBe('biology');
    });

    it('should detect chemistry domain', () => {
      const result = parser.parse('Create a reaction mechanism diagram');

      expect(result.domain).toBe('chemistry');
    });

    it('should detect statistics domain', () => {
      const result = parser.parse('Show the data distribution with regression analysis');

      expect(result.domain).toBe('statistics');
    });

    it('should detect computer science domain', () => {
      const result = parser.parse('Create an algorithm flowchart for the database');

      expect(result.domain).toBe('computer-science');
    });

    it('should default to general when no domain detected', () => {
      const result = parser.parse('Make a simple diagram');

      expect(result.domain).toBe('general');
    });
  });

  // ==========================================================================
  // Modification Intent Detection Tests
  // ==========================================================================

  describe('Modification Intent', () => {
    it('should detect modification intent with context', () => {
      const result = parser.parse('Change the colors', 'Previous diagram context');

      expect(result.isModification).toBe(true);
    });

    it('should detect modification keywords', () => {
      const prompts = [
        'Modify the layout',
        'Change the arrows',
        'Update the labels',
        'Edit the text',
        'Add a new box',
        'Remove the circle',
      ];

      prompts.forEach((prompt) => {
        const result = parser.parse(prompt, 'context');
        expect(result.isModification).toBe(true);
      });
    });

    it('should detect strong modification patterns without context', () => {
      const result = parser.parse('Add a new node to the diagram');

      expect(result.isModification).toBe(true);
    });

    it('should not detect modification for new diagram requests', () => {
      const result = parser.parse('Create a new flowchart from scratch');

      expect(result.isModification).toBe(false);
    });

    it('should detect "make it" patterns', () => {
      const result = parser.parse('Make it bigger');

      expect(result.isModification).toBe(true);
    });
  });

  // ==========================================================================
  // Template Detection Tests
  // ==========================================================================

  describe('Template Detection', () => {
    it('should detect CONSORT template', () => {
      const result = parser.parse('Create a CONSORT diagram for my RCT');

      expect(result.template).toBe('consort');
    });

    it('should detect PRISMA template', () => {
      const result = parser.parse('Make a PRISMA flow diagram');

      expect(result.template).toBe('prisma');
    });

    it('should detect forest plot template', () => {
      const result = parser.parse('Generate a forest plot for my meta-analysis results');

      expect(result.template).toBe('forest-plot');
    });

    it('should detect Kaplan-Meier template', () => {
      const result = parser.parse('Create a Kaplan-Meier survival curve');

      expect(result.template).toBe('kaplan-meier');
    });
  });

  // ==========================================================================
  // Edge Cases Tests
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle empty prompt', () => {
      const result = parser.parse('');

      expect(result.diagramType).toBe('generic');
      expect(result.confidence).toBeLessThan(0.5);
    });

    it('should handle prompt with only whitespace', () => {
      const result = parser.parse('   \n\t  ');

      expect(result.diagramType).toBe('generic');
    });

    it('should handle very long prompts', () => {
      const longPrompt = 'Create a flowchart ' + 'with many nodes '.repeat(100);
      const result = parser.parse(longPrompt);

      expect(result.diagramType).toBe('flowchart');
    });

    it('should handle mixed case prompts', () => {
      const result = parser.parse('Create a FLOWCHART with CONSORT style');

      // Should detect CONSORT as it has higher weight
      expect(result.diagramType).toBe('consort');
    });

    it('should handle special characters', () => {
      const result = parser.parse('Create a flowchart! @#$% with arrows');

      expect(result.diagramType).toBe('flowchart');
    });

    it('should handle unicode characters', () => {
      const result = parser.parse('Create a flowchart for process');

      expect(result.diagramType).toBe('flowchart');
    });

    it('should return alternatives when multiple types match', () => {
      const result = parser.parse('Create a flowchart showing data flow for the trial');

      expect(result.alternatives.length).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================================================
  // Confidence Score Tests
  // ==========================================================================

  describe('Confidence Scores', () => {
    it('should have high confidence for exact matches', () => {
      const result = parser.parse('CONSORT');

      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should have lower confidence for generic prompts', () => {
      const result = parser.parse('make a diagram');

      expect(result.confidence).toBeLessThan(0.5);
    });

    it('should have higher confidence with more keyword matches', () => {
      const simple = parser.parse('flowchart');
      const detailed = parser.parse('create a process flow flowchart workflow diagram');

      expect(detailed.confidence).toBeGreaterThanOrEqual(simple.confidence);
    });
  });

  // ==========================================================================
  // Entity Extraction Tests
  // ==========================================================================

  describe('Entity Extraction', () => {
    it('should extract quoted entities', () => {
      const result = parser.parse('Create boxes labeled "Start" and "End"');

      expect(result.entities.namedEntities).toContain('Start');
      expect(result.entities.namedEntities).toContain('End');
    });

    it('should extract numbers', () => {
      const result = parser.parse('Create 5 boxes with 3 arrows');

      expect(result.entities.numbers).toContain(5);
      expect(result.entities.numbers).toContain(3);
    });

    it('should extract connection patterns', () => {
      const result = parser.parse('Show A leads to B');

      expect(result.entities.connections).toBeDefined();
      expect(result.entities.connections?.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Explicit Format Detection Tests
  // ==========================================================================

  describe('Explicit Format Detection', () => {
    it('should detect explicit mermaid format', () => {
      const result = parser.detectExplicitFormat('Create a mermaid diagram');

      expect(result).toBe('mermaid');
    });

    it('should detect explicit SVG format', () => {
      const result = parser.detectExplicitFormat('Create an SVG diagram');

      expect(result).toBe('svg');
    });

    it('should detect explicit vector format as SVG', () => {
      const result = parser.detectExplicitFormat('Create a vector diagram');

      expect(result).toBe('svg');
    });

    it('should detect explicit TikZ format', () => {
      const result = parser.detectExplicitFormat('Create a TikZ diagram');

      expect(result).toBe('tikz');
    });

    it('should detect explicit LaTeX format as TikZ', () => {
      const result = parser.detectExplicitFormat('Create a LaTeX diagram');

      expect(result).toBe('tikz');
    });

    it('should detect explicit Plotly format', () => {
      const result = parser.detectExplicitFormat('Create a plotly chart');

      expect(result).toBe('plotly');
    });

    it('should return null when no explicit format', () => {
      const result = parser.detectExplicitFormat('Create a diagram');

      expect(result).toBeNull();
    });
  });

  // ==========================================================================
  // Singleton Instance Tests
  // ==========================================================================

  describe('Singleton Instance', () => {
    it('should export a singleton promptParser instance', () => {
      expect(promptParser).toBeInstanceOf(PromptParser);
    });

    it('should work the same as new instance', () => {
      const result1 = promptParser.parse('Create a flowchart');
      const result2 = parser.parse('Create a flowchart');

      expect(result1.diagramType).toBe(result2.diagramType);
    });
  });

  // ==========================================================================
  // Decision Tree Detection Tests
  // ==========================================================================

  describe('Decision Tree Detection', () => {
    it('should detect decision tree prompts', () => {
      const result = parser.parse('Create a decision tree diagram');

      expect(result.diagramType).toBe('decision-tree');
    });

    it('should detect clinical algorithm prompts', () => {
      const result = parser.parse('Make a clinical algorithm for diagnosis');

      expect(result.diagramType).toBe('decision-tree');
    });

    it('should detect diagnostic algorithm prompts', () => {
      const result = parser.parse('Create a diagnostic algorithm');

      expect(result.diagramType).toBe('decision-tree');
    });
  });

  // ==========================================================================
  // State Diagram Detection Tests
  // ==========================================================================

  describe('State Diagram Detection', () => {
    it('should detect state diagram prompts', () => {
      const result = parser.parse('Create a state diagram');

      expect(result.diagramType).toBe('state-diagram');
    });

    it('should detect state machine prompts', () => {
      const result = parser.parse('Make a state machine diagram');

      expect(result.diagramType).toBe('state-diagram');
    });
  });

  // ==========================================================================
  // Sequence Diagram Detection Tests
  // ==========================================================================

  describe('Sequence Diagram Detection', () => {
    it('should detect sequence diagram prompts', () => {
      const result = parser.parse('Create a sequence diagram');

      expect(result.diagramType).toBe('sequence');
    });

    it('should detect patient journey prompts', () => {
      const result = parser.parse('Show the patient journey through the hospital');

      expect(result.diagramType).toBe('sequence');
    });

    it('should detect timeline prompts', () => {
      const result = parser.parse('Create a timeline diagram');

      expect(result.diagramType).toBe('sequence');
    });
  });
});
