/**
 * FINNISH - Main App Component
 *
 * Dual-page layout with:
 * - Mode toggle (Agent / Editor)
 * - Shared state between modes
 * - Navigation between pages
 */

import { AgentMode } from './pages/AgentMode.js';
import { EditorMode } from './pages/EditorMode.js';

class App {
    constructor() {
        // Current mode: 'agent' or 'editor'
        this.currentMode = 'agent';

        // Shared state between modes
        this.sharedState = {
            currentDiagram: null,      // Current SVG/diagram data
            diagramHistory: [],        // History of generated diagrams
            canvasObjects: [],         // Objects on the editor canvas
            zoom: 100,                 // Current zoom level
            canvasSize: { width: 800, height: 600 }
        };

        // Mode instances
        this.agentMode = null;
        this.editorMode = null;

        // DOM references
        this.appContainer = document.getElementById('app');

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.loadMode(this.currentMode);
    }

    render() {
        this.appContainer.innerHTML = `
            <!-- Navigation Header -->
            <nav class="nav-header">
                <div class="nav-logo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <span>FINNISH</span>
                </div>

                <div class="mode-toggle">
                    <button class="mode-toggle-btn ${this.currentMode === 'agent' ? 'active' : ''}" data-mode="agent">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span>Agent</span>
                    </button>
                    <button class="mode-toggle-btn ${this.currentMode === 'editor' ? 'active' : ''}" data-mode="editor">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        <span>Editor</span>
                    </button>
                </div>

                <div class="nav-actions">
                    <!-- Future: user menu, settings, etc. -->
                </div>
            </nav>

            <!-- Main Content Area -->
            <main id="main-content" class="main-content"></main>
        `;
    }

    setupEventListeners() {
        // Mode toggle buttons
        const modeButtons = this.appContainer.querySelectorAll('.mode-toggle-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                if (mode !== this.currentMode) {
                    this.switchMode(mode);
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + 1: Agent Mode
            if ((e.ctrlKey || e.metaKey) && e.key === '1') {
                e.preventDefault();
                this.switchMode('agent');
            }
            // Ctrl/Cmd + 2: Editor Mode
            if ((e.ctrlKey || e.metaKey) && e.key === '2') {
                e.preventDefault();
                this.switchMode('editor');
            }
        });
    }

    switchMode(mode) {
        // Save current mode state before switching
        this.saveCurrentModeState();

        // Update mode
        this.currentMode = mode;

        // Update toggle buttons
        const modeButtons = this.appContainer.querySelectorAll('.mode-toggle-btn');
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Load new mode
        this.loadMode(mode);
    }

    loadMode(mode) {
        const mainContent = document.getElementById('main-content');

        // Cleanup previous mode
        if (this.agentMode && mode !== 'agent') {
            this.agentMode.cleanup?.();
        }
        if (this.editorMode && mode !== 'editor') {
            this.editorMode.cleanup?.();
        }

        // Load new mode
        if (mode === 'agent') {
            this.agentMode = new AgentMode(mainContent, this);
        } else if (mode === 'editor') {
            this.editorMode = new EditorMode(mainContent, this);
        }
    }

    saveCurrentModeState() {
        if (this.currentMode === 'agent' && this.agentMode) {
            // Save agent mode state
            this.sharedState.diagramHistory = this.agentMode.getHistory?.() || [];
        } else if (this.currentMode === 'editor' && this.editorMode) {
            // Save editor mode state
            const canvasData = this.editorMode.getCanvasData?.();
            if (canvasData) {
                this.sharedState.canvasObjects = canvasData.objects;
                this.sharedState.zoom = canvasData.zoom;
            }
        }
    }

    // Public API for mode communication

    /**
     * Send diagram from Agent to Editor
     */
    sendToEditor(diagramData) {
        this.sharedState.currentDiagram = diagramData;
        this.switchMode('editor');

        // Wait for editor to initialize, then load diagram
        setTimeout(() => {
            this.editorMode?.loadDiagram?.(diagramData);
        }, 100);
    }

    /**
     * Get current diagram from shared state
     */
    getCurrentDiagram() {
        return this.sharedState.currentDiagram;
    }

    /**
     * Update shared state
     */
    updateSharedState(updates) {
        Object.assign(this.sharedState, updates);
    }

    /**
     * Get shared state
     */
    getSharedState() {
        return { ...this.sharedState };
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

export { App };
