# FINN-001: Agent Mode (Chat/Prompt Interface)

## Status
**Draft** | Priority: P0 | Effort: Large

## Overview
Agent Mode provides a natural language interface for creating and modifying illustrations. Users describe what they want in plain English, and the AI agent interprets their intent, generating appropriate SVG elements on the canvas.

## User Stories

### US-1: Basic Illustration Creation
> As an academic user, I want to describe an illustration in natural language so that I can quickly create a first draft without manual drawing.

**Acceptance Criteria:**
- User can type a description like "Draw a cell membrane with phospholipid bilayer"
- Agent generates appropriate SVG elements on the canvas
- Generated elements are fully editable in Editor Mode
- Response time < 5 seconds for simple requests

### US-2: Iterative Refinement
> As a user, I want to refine my illustration through conversation so that I can achieve my desired result incrementally.

**Acceptance Criteria:**
- User can say "Make the nucleus larger" after initial generation
- Agent understands context from previous commands
- Changes are applied non-destructively
- User can undo any agent action

### US-3: Domain-Specific Understanding
> As a biology researcher, I want the agent to understand scientific terminology so that I don't have to explain basic concepts.

**Acceptance Criteria:**
- Agent recognizes terms like "mitochondria", "synapse", "catalyst"
- Agent applies appropriate visual conventions for each domain
- Agent suggests relevant symbols from domain libraries
- Agent warns about potential scientific inaccuracies

## Technical Design

### Architecture
```
User Input --> Intent Parser --> Action Planner --> Canvas Executor
                    |                  |                   |
                    v                  v                   v
             Domain Context      Template Matcher    Fabric.js API
```

### Components

#### Intent Parser
- Extracts entities, actions, and modifiers from natural language
- Maps to internal command vocabulary
- Handles ambiguity through clarifying questions

#### Action Planner
- Sequences atomic operations to achieve user intent
- Considers spatial relationships and layering
- Optimizes for minimal canvas operations

#### Canvas Executor
- Translates planned actions to Fabric.js operations
- Maintains undo/redo stack
- Emits events for UI synchronization

### API Endpoints

```typescript
interface AgentRequest {
  prompt: string;
  context?: ConversationContext;
  canvasState?: CanvasSnapshot;
}

interface AgentResponse {
  actions: CanvasAction[];
  explanation: string;
  suggestions?: string[];
  clarifyingQuestions?: string[];
}
```

## UI/UX Design

### Chat Panel
- Collapsible panel on right side of screen
- Message history with user/agent distinction
- Inline previews of suggested changes
- Quick action buttons for common refinements

### Command Palette
- Keyboard shortcut (Cmd/Ctrl + K) for quick access
- Autocomplete for common commands
- Recent command history
- Fuzzy search for templates

## Dependencies
- LLM API integration (Claude/GPT-4)
- Fabric.js canvas instance
- Domain template libraries (FINN-005)

## Testing Strategy
- Unit tests for Intent Parser with diverse inputs
- Integration tests for Action Planner sequences
- E2E tests for complete user workflows
- A/B testing for response quality

## Open Questions
1. How to handle ambiguous requests? (Clarify vs. best guess)
2. Should agent explain its reasoning by default?
3. Offline mode with reduced capabilities?

## References
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [Scientific Illustration Best Practices](https://example.com)
