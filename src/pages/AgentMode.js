/**
 * FINNISH - Agent Mode
 *
 * Chat interface with:
 * - Prompt input at bottom (like ChatGPT)
 * - Message history display
 * - Generated diagram preview
 * - Action buttons: [Send to Editor] [Download] [Regenerate]
 * - Template suggestions (CONSORT, Forest Plot, Pathway, etc.)
 */

// SVG Icons
const Icons = {
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
    </svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>`,
    consort: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="4" rx="1"/>
        <rect x="3" y="10" width="8" height="4" rx="1"/>
        <rect x="13" y="10" width="8" height="4" rx="1"/>
        <rect x="3" y="17" width="8" height="4" rx="1"/>
        <rect x="13" y="17" width="8" height="4" rx="1"/>
    </svg>`,
    forest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="3" x2="12" y2="21"/>
        <rect x="4" y="5" width="6" height="2"/>
        <rect x="14" y="8" width="4" height="2"/>
        <rect x="6" y="11" width="8" height="2"/>
        <rect x="10" y="14" width="6" height="2"/>
        <rect x="8" y="17" width="5" height="2"/>
    </svg>`,
    pathway: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="4" cy="12" r="2"/><circle cx="12" cy="6" r="2"/>
        <circle cx="12" cy="18" r="2"/><circle cx="20" cy="12" r="2"/>
        <path d="M6 12h4M14 6l4 4M14 18l4-4"/>
    </svg>`,
    flowchart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="8" y="2" width="8" height="4" rx="1"/>
        <rect x="8" y="10" width="8" height="4" rx="1"/>
        <rect x="8" y="18" width="8" height="4" rx="1"/>
        <line x1="12" y1="6" x2="12" y2="10"/>
        <line x1="12" y1="14" x2="12" y2="18"/>
    </svg>`,
    prisma: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12,2 20,8 20,16 12,22 4,16 4,8"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="4" y1="8" x2="20" y2="8"/>
        <line x1="4" y1="16" x2="20" y2="16"/>
    </svg>`,
    table: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="15" y1="3" x2="15" y2="21"/>
    </svg>`
};

// Template definitions
const TEMPLATES = [
    { id: 'consort', name: 'CONSORT', icon: Icons.consort, description: 'Clinical trial flow diagram' },
    { id: 'forest', name: 'Forest Plot', icon: Icons.forest, description: 'Meta-analysis visualization' },
    { id: 'pathway', name: 'Pathway', icon: Icons.pathway, description: 'Biological pathway diagram' },
    { id: 'flowchart', name: 'Flowchart', icon: Icons.flowchart, description: 'Process flow diagram' },
    { id: 'prisma', name: 'PRISMA', icon: Icons.prisma, description: 'Systematic review flow' },
    { id: 'table', name: 'Table', icon: Icons.table, description: 'Data table layout' }
];

class AgentMode {
    constructor(container, app) {
        this.container = container;
        this.app = app;

        // State
        this.messages = [];
        this.isLoading = false;
        this.currentDiagram = null;

        // DOM references
        this.chatMessages = null;
        this.chatInput = null;
        this.sendBtn = null;

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.loadHistory();

        // Show welcome message if no history
        if (this.messages.length === 0) {
            this.showWelcomeMessage();
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="agent-mode">
                <!-- Left Sidebar: Templates -->
                <aside class="agent-sidebar">
                    <div class="agent-sidebar-header">
                        <h3>Templates</h3>
                        <p style="font-size: 12px; color: var(--text-secondary);">
                            Click to start with a template
                        </p>
                    </div>
                    <div class="template-grid">
                        ${TEMPLATES.map(t => `
                            <div class="template-card" data-template="${t.id}" title="${t.description}">
                                ${t.icon}
                                <span>${t.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </aside>

                <!-- Main Chat Area -->
                <main class="agent-main">
                    <div class="chat-container">
                        <div class="chat-messages" id="chat-messages">
                            <!-- Messages will be rendered here -->
                        </div>

                        <div class="chat-input-container">
                            <div class="chat-input-wrapper">
                                <textarea
                                    class="chat-input"
                                    id="chat-input"
                                    placeholder="Describe the diagram you want to create..."
                                    rows="1"
                                ></textarea>
                                <button class="send-btn" id="send-btn" disabled>
                                    ${Icons.send}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;

        // Store DOM references
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
    }

    setupEventListeners() {
        // Send button click
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Input handling
        this.chatInput.addEventListener('input', () => {
            this.updateSendButtonState();
            this.autoResizeInput();
        });

        // Enter to send (Shift+Enter for new line)
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!this.sendBtn.disabled) {
                    this.sendMessage();
                }
            }
        });

        // Template clicks
        const templateCards = this.container.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.dataset.template;
                this.useTemplate(templateId);
            });
        });

        // Message action buttons (delegated)
        this.chatMessages.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const messageId = actionBtn.closest('.message').dataset.id;
                this.handleMessageAction(action, messageId);
            }
        });
    }

    updateSendButtonState() {
        const hasContent = this.chatInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasContent || this.isLoading;
    }

    autoResizeInput() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 200) + 'px';
    }

    showWelcomeMessage() {
        const welcomeMessage = {
            id: 'welcome',
            role: 'assistant',
            content: `Welcome to FINNISH! I can help you create publication-quality diagrams for your research.

Try asking me to:
- Create a CONSORT flow diagram for a clinical trial
- Generate a forest plot for meta-analysis
- Design a biological pathway diagram
- Build a PRISMA flowchart for systematic review

Or select a template from the sidebar to get started.`,
            timestamp: new Date().toISOString()
        };

        this.messages.push(welcomeMessage);
        this.renderMessages();
    }

    useTemplate(templateId) {
        const template = TEMPLATES.find(t => t.id === templateId);
        if (!template) return;

        const prompts = {
            consort: 'Create a CONSORT flow diagram for a randomized controlled trial with enrollment, allocation to two treatment arms, follow-up, and analysis phases.',
            forest: 'Create a forest plot showing effect sizes and confidence intervals for 5 studies comparing treatment vs control.',
            pathway: 'Create a biological signaling pathway diagram showing the MAPK/ERK cascade.',
            flowchart: 'Create a flowchart showing the steps of a research methodology.',
            prisma: 'Create a PRISMA flow diagram for a systematic review showing identification, screening, eligibility, and included studies.',
            table: 'Create a formatted table layout for presenting demographic data with rows for Age, Sex, BMI, and columns for Treatment and Control groups.'
        };

        this.chatInput.value = prompts[templateId] || `Create a ${template.name} diagram.`;
        this.updateSendButtonState();
        this.autoResizeInput();
        this.chatInput.focus();
    }

    async sendMessage() {
        const content = this.chatInput.value.trim();
        if (!content || this.isLoading) return;

        // Add user message
        const userMessage = {
            id: this.generateId(),
            role: 'user',
            content: content,
            timestamp: new Date().toISOString()
        };
        this.messages.push(userMessage);

        // Clear input
        this.chatInput.value = '';
        this.autoResizeInput();
        this.updateSendButtonState();

        // Render messages
        this.renderMessages();
        this.scrollToBottom();

        // Show loading state
        this.isLoading = true;
        this.updateSendButtonState();
        this.showTypingIndicator();

        try {
            // Simulate AI response (in production, this would call the AI API)
            const response = await this.generateResponse(content);

            // Remove typing indicator
            this.hideTypingIndicator();

            // Add assistant message
            const assistantMessage = {
                id: this.generateId(),
                role: 'assistant',
                content: response.text,
                diagram: response.diagram,
                timestamp: new Date().toISOString()
            };
            this.messages.push(assistantMessage);

            // Store current diagram
            if (response.diagram) {
                this.currentDiagram = response.diagram;
            }

        } catch (error) {
            this.hideTypingIndicator();

            // Add error message
            this.messages.push({
                id: this.generateId(),
                role: 'assistant',
                content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
                isError: true,
                timestamp: new Date().toISOString()
            });
        }

        this.isLoading = false;
        this.updateSendButtonState();
        this.renderMessages();
        this.scrollToBottom();
        this.saveHistory();
    }

    async generateResponse(prompt) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a sample diagram based on prompt keywords
        const lowerPrompt = prompt.toLowerCase();

        let diagramSvg = null;
        let responseText = '';

        if (lowerPrompt.includes('consort') || lowerPrompt.includes('trial')) {
            diagramSvg = this.generateConsortDiagram();
            responseText = 'I\'ve created a CONSORT flow diagram for your clinical trial. The diagram shows the enrollment, allocation, follow-up, and analysis phases. You can edit it further in the Editor mode.';
        } else if (lowerPrompt.includes('forest') || lowerPrompt.includes('meta')) {
            diagramSvg = this.generateForestPlot();
            responseText = 'Here\'s a forest plot showing effect sizes and confidence intervals. Each study is represented with its weight and the diamond shows the overall effect.';
        } else if (lowerPrompt.includes('pathway') || lowerPrompt.includes('signaling')) {
            diagramSvg = this.generatePathwayDiagram();
            responseText = 'I\'ve created a signaling pathway diagram. The nodes represent proteins/molecules and arrows show activation relationships.';
        } else if (lowerPrompt.includes('flowchart') || lowerPrompt.includes('process')) {
            diagramSvg = this.generateFlowchart();
            responseText = 'Here\'s a flowchart for your process. You can customize the steps and connections in the Editor.';
        } else if (lowerPrompt.includes('prisma') || lowerPrompt.includes('systematic')) {
            diagramSvg = this.generatePrismaDiagram();
            responseText = 'I\'ve created a PRISMA flow diagram for your systematic review, showing the four phases: Identification, Screening, Eligibility, and Included.';
        } else {
            diagramSvg = this.generateGenericDiagram();
            responseText = 'I\'ve created a diagram based on your description. You can further customize it in the Editor mode, or provide more specific requirements.';
        }

        return {
            text: responseText,
            diagram: diagramSvg
        };
    }

    generateConsortDiagram() {
        return `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
            <style>
                .box { fill: #f8f9fa; stroke: #333; stroke-width: 2; }
                .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
                .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
            </style>
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
            </defs>

            <!-- Enrollment -->
            <rect class="box" x="200" y="20" width="200" height="50" rx="5"/>
            <text class="text" x="300" y="50">Assessed for eligibility (n=500)</text>

            <line class="arrow" x1="300" y1="70" x2="300" y2="100"/>

            <!-- Excluded -->
            <rect class="box" x="420" y="75" width="150" height="60" rx="5"/>
            <text class="text" x="495" y="100">Excluded (n=100)</text>
            <text class="text" x="495" y="120" font-size="10">Not meeting criteria: 80</text>
            <line x1="400" y1="85" x2="420" y2="85" stroke="#333" stroke-width="2"/>

            <!-- Randomized -->
            <rect class="box" x="200" y="100" width="200" height="50" rx="5"/>
            <text class="text" x="300" y="130">Randomized (n=400)</text>

            <line class="arrow" x1="250" y1="150" x2="150" y2="200"/>
            <line class="arrow" x1="350" y1="150" x2="450" y2="200"/>

            <!-- Allocation -->
            <rect class="box" x="50" y="200" width="180" height="60" rx="5"/>
            <text class="text" x="140" y="225">Allocated to Treatment</text>
            <text class="text" x="140" y="245">(n=200)</text>

            <rect class="box" x="370" y="200" width="180" height="60" rx="5"/>
            <text class="text" x="460" y="225">Allocated to Control</text>
            <text class="text" x="460" y="245">(n=200)</text>

            <line class="arrow" x1="140" y1="260" x2="140" y2="300"/>
            <line class="arrow" x1="460" y1="260" x2="460" y2="300"/>

            <!-- Follow-up -->
            <rect class="box" x="50" y="300" width="180" height="60" rx="5"/>
            <text class="text" x="140" y="325">Lost to follow-up</text>
            <text class="text" x="140" y="345">(n=10)</text>

            <rect class="box" x="370" y="300" width="180" height="60" rx="5"/>
            <text class="text" x="460" y="325">Lost to follow-up</text>
            <text class="text" x="460" y="345">(n=15)</text>

            <line class="arrow" x1="140" y1="360" x2="140" y2="400"/>
            <line class="arrow" x1="460" y1="360" x2="460" y2="400"/>

            <!-- Analysis -->
            <rect class="box" x="50" y="400" width="180" height="60" rx="5"/>
            <text class="text" x="140" y="425">Analyzed</text>
            <text class="text" x="140" y="445">(n=190)</text>

            <rect class="box" x="370" y="400" width="180" height="60" rx="5"/>
            <text class="text" x="460" y="425">Analyzed</text>
            <text class="text" x="460" y="445">(n=185)</text>
        </svg>`;
    }

    generateForestPlot() {
        return `<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
            <style>
                .label { font-family: Arial, sans-serif; font-size: 11px; }
                .header { font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; }
                .line { stroke: #333; stroke-width: 1; }
                .ci-line { stroke: #333; stroke-width: 2; }
                .point { fill: #333; }
                .diamond { fill: #0066cc; }
                .null-line { stroke: #999; stroke-width: 1; stroke-dasharray: 4,4; }
            </style>

            <!-- Headers -->
            <text class="header" x="20" y="30">Study</text>
            <text class="header" x="150" y="30">Year</text>
            <text class="header" x="550" y="30">OR (95% CI)</text>
            <text class="header" x="650" y="30">Weight</text>

            <!-- Null effect line -->
            <line class="null-line" x1="350" y1="50" x2="350" y2="280"/>

            <!-- Scale -->
            <line class="line" x1="220" y1="290" x2="480" y2="290"/>
            <text class="label" x="220" y="305" text-anchor="middle">0.1</text>
            <text class="label" x="350" y="305" text-anchor="middle">1.0</text>
            <text class="label" x="480" y="305" text-anchor="middle">10</text>

            <!-- Study 1 -->
            <text class="label" x="20" y="75">Smith et al.</text>
            <text class="label" x="150" y="75">2019</text>
            <line class="ci-line" x1="280" y1="70" x2="380" y2="70"/>
            <rect class="point" x="320" y="65" width="10" height="10"/>
            <text class="label" x="550" y="75">0.85 (0.62-1.15)</text>
            <text class="label" x="650" y="75">22.4%</text>

            <!-- Study 2 -->
            <text class="label" x="20" y="115">Johnson et al.</text>
            <text class="label" x="150" y="115">2020</text>
            <line class="ci-line" x1="300" y1="110" x2="420" y2="110"/>
            <rect class="point" x="355" y="105" width="12" height="12"/>
            <text class="label" x="550" y="115">1.02 (0.78-1.34)</text>
            <text class="label" x="650" y="115">25.1%</text>

            <!-- Study 3 -->
            <text class="label" x="20" y="155">Williams et al.</text>
            <text class="label" x="150" y="155">2021</text>
            <line class="ci-line" x1="260" y1="150" x2="340" y2="150"/>
            <rect class="point" x="295" y="145" width="8" height="8"/>
            <text class="label" x="550" y="155">0.72 (0.55-0.94)</text>
            <text class="label" x="650" y="155">18.3%</text>

            <!-- Study 4 -->
            <text class="label" x="20" y="195">Brown et al.</text>
            <text class="label" x="150" y="195">2022</text>
            <line class="ci-line" x1="320" y1="190" x2="400" y2="190"/>
            <rect class="point" x="355" y="185" width="9" height="9"/>
            <text class="label" x="550" y="195">1.05 (0.82-1.35)</text>
            <text class="label" x="650" y="195">19.7%</text>

            <!-- Study 5 -->
            <text class="label" x="20" y="235">Davis et al.</text>
            <text class="label" x="150" y="235">2023</text>
            <line class="ci-line" x1="290" y1="230" x2="370" y2="230"/>
            <rect class="point" x="325" y="225" width="7" height="7"/>
            <text class="label" x="550" y="235">0.88 (0.69-1.12)</text>
            <text class="label" x="650" y="235">14.5%</text>

            <!-- Overall -->
            <line class="line" x1="20" y1="260" x2="680" y2="260"/>
            <text class="header" x="20" y="278">Overall</text>
            <polygon class="diamond" points="330,275 350,265 370,275 350,285"/>
            <text class="header" x="550" y="278">0.89 (0.78-1.02)</text>
            <text class="header" x="650" y="278">100%</text>

            <!-- Labels -->
            <text class="label" x="280" y="325" text-anchor="middle">Favors Treatment</text>
            <text class="label" x="420" y="325" text-anchor="middle">Favors Control</text>
        </svg>`;
    }

    generatePathwayDiagram() {
        return `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <style>
                .node { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
                .receptor { fill: #fff3e0; stroke: #f57c00; stroke-width: 2; }
                .enzyme { fill: #e8f5e9; stroke: #388e3c; stroke-width: 2; }
                .tf { fill: #fce4ec; stroke: #c2185b; stroke-width: 2; }
                .text { font-family: Arial, sans-serif; font-size: 11px; text-anchor: middle; }
                .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
                .inhibit { stroke: #d32f2f; stroke-width: 2; fill: none; }
            </style>
            <defs>
                <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
            </defs>

            <!-- Title -->
            <text x="300" y="25" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">MAPK/ERK Signaling Pathway</text>

            <!-- Receptor -->
            <ellipse class="receptor" cx="300" cy="70" rx="60" ry="25"/>
            <text class="text" x="300" y="75">Growth Factor Receptor</text>

            <path class="arrow" d="M300,95 L300,120"/>

            <!-- RAS -->
            <ellipse class="node" cx="300" cy="150" rx="40" ry="20"/>
            <text class="text" x="300" y="155">RAS</text>

            <path class="arrow" d="M300,170 L300,200"/>

            <!-- RAF -->
            <rect class="enzyme" x="260" y="210" width="80" height="35" rx="5"/>
            <text class="text" x="300" y="232">RAF</text>

            <path class="arrow" d="M300,245 L300,275"/>

            <!-- MEK -->
            <rect class="enzyme" x="260" y="285" width="80" height="35" rx="5"/>
            <text class="text" x="300" y="307">MEK1/2</text>

            <path class="arrow" d="M300,320 L300,350"/>

            <!-- ERK -->
            <rect class="enzyme" x="260" y="355" width="80" height="35" rx="5"/>
            <text class="text" x="300" y="377">ERK1/2</text>

            <!-- Transcription Factors -->
            <path class="arrow" d="M260,372 L150,372 L150,320"/>
            <ellipse class="tf" cx="150" cy="290" rx="45" ry="20"/>
            <text class="text" x="150" y="295">c-Fos</text>

            <path class="arrow" d="M340,372 L450,372 L450,320"/>
            <ellipse class="tf" cx="450" cy="290" rx="45" ry="20"/>
            <text class="text" x="450" y="295">c-Jun</text>

            <!-- Inhibitor -->
            <rect x="420" y="210" width="80" height="30" rx="5" fill="#ffebee" stroke="#d32f2f" stroke-width="2"/>
            <text class="text" x="460" y="230">MEK Inhibitor</text>
            <line class="inhibit" x1="420" y1="225" x2="340" y2="300"/>
            <line class="inhibit" x1="415" y1="295" x2="425" y2="305"/>
            <line class="inhibit" x1="425" y1="295" x2="415" y2="305"/>

            <!-- Legend -->
            <rect x="20" y="350" width="15" height="15" class="receptor"/>
            <text x="40" y="362" font-size="10">Receptor</text>
            <rect x="100" y="350" width="15" height="15" class="enzyme"/>
            <text x="120" y="362" font-size="10">Kinase</text>
            <rect x="170" y="350" width="15" height="15" class="tf"/>
            <text x="190" y="362" font-size="10">Transcription Factor</text>
        </svg>`;
    }

    generateFlowchart() {
        return `<svg viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
            <style>
                .box { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
                .decision { fill: #fff8e1; stroke: #f9a825; stroke-width: 2; }
                .terminal { fill: #e8f5e9; stroke: #388e3c; stroke-width: 2; }
                .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
                .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead3); }
                .label { font-family: Arial, sans-serif; font-size: 10px; }
            </style>
            <defs>
                <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
            </defs>

            <!-- Start -->
            <ellipse class="terminal" cx="250" cy="35" rx="60" ry="25"/>
            <text class="text" x="250" y="40">Start</text>

            <line class="arrow" x1="250" y1="60" x2="250" y2="85"/>

            <!-- Process 1 -->
            <rect class="box" x="150" y="90" width="200" height="45" rx="5"/>
            <text class="text" x="250" y="118">Collect Data</text>

            <line class="arrow" x1="250" y1="135" x2="250" y2="160"/>

            <!-- Decision -->
            <polygon class="decision" points="250,165 350,210 250,255 150,210"/>
            <text class="text" x="250" y="215">Valid Data?</text>

            <line class="arrow" x1="250" y1="255" x2="250" y2="285"/>
            <text class="label" x="260" y="275">Yes</text>

            <line class="arrow" x1="350" y1="210" x2="420" y2="210 L420,115 L350,115"/>
            <text class="label" x="380" y="200">No</text>

            <!-- Process 2 -->
            <rect class="box" x="150" y="290" width="200" height="45" rx="5"/>
            <text class="text" x="250" y="318">Analyze Results</text>

            <line class="arrow" x1="250" y1="335" x2="250" y2="360"/>

            <!-- Process 3 -->
            <rect class="box" x="150" y="365" width="200" height="45" rx="5"/>
            <text class="text" x="250" y="393">Generate Report</text>

            <line class="arrow" x1="250" y1="410" x2="250" y2="435"/>

            <!-- End -->
            <ellipse class="terminal" cx="250" cy="460" rx="60" ry="25"/>
            <text class="text" x="250" y="465">End</text>
        </svg>`;
    }

    generatePrismaDiagram() {
        return `<svg viewBox="0 0 650 550" xmlns="http://www.w3.org/2000/svg">
            <style>
                .box { fill: #f5f5f5; stroke: #333; stroke-width: 2; }
                .phase { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
                .text { font-family: Arial, sans-serif; font-size: 11px; text-anchor: middle; }
                .phase-label { font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; fill: #1976d2; }
                .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead4); }
            </style>
            <defs>
                <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
            </defs>

            <!-- Phase Labels -->
            <text class="phase-label" transform="rotate(-90)" x="-80" y="25">Identification</text>
            <text class="phase-label" transform="rotate(-90)" x="-200" y="25">Screening</text>
            <text class="phase-label" transform="rotate(-90)" x="-320" y="25">Eligibility</text>
            <text class="phase-label" transform="rotate(-90)" x="-460" y="25">Included</text>

            <!-- Identification -->
            <rect class="box" x="100" y="30" width="200" height="50" rx="5"/>
            <text class="text" x="200" y="50">Records from databases</text>
            <text class="text" x="200" y="68">(n = 2,500)</text>

            <rect class="box" x="350" y="30" width="200" height="50" rx="5"/>
            <text class="text" x="450" y="50">Records from other sources</text>
            <text class="text" x="450" y="68">(n = 150)</text>

            <line class="arrow" x1="200" y1="80" x2="200" y2="100"/>
            <line class="arrow" x1="450" y1="80" x2="450" y2="100 L450,115 L320,115"/>

            <rect class="phase" x="100" y="110" width="220" height="50" rx="5"/>
            <text class="text" x="210" y="130">Records after duplicates removed</text>
            <text class="text" x="210" y="148">(n = 2,100)</text>

            <!-- Screening -->
            <line class="arrow" x1="210" y1="160" x2="210" y2="190"/>

            <rect class="phase" x="100" y="195" width="220" height="50" rx="5"/>
            <text class="text" x="210" y="215">Records screened</text>
            <text class="text" x="210" y="233">(n = 2,100)</text>

            <line x1="320" y1="220" x2="380" y2="220" stroke="#333" stroke-width="2"/>
            <rect class="box" x="380" y="195" width="180" height="50" rx="5"/>
            <text class="text" x="470" y="215">Records excluded</text>
            <text class="text" x="470" y="233">(n = 1,800)</text>

            <!-- Eligibility -->
            <line class="arrow" x1="210" y1="245" x2="210" y2="290"/>

            <rect class="phase" x="100" y="295" width="220" height="50" rx="5"/>
            <text class="text" x="210" y="315">Full-text articles assessed</text>
            <text class="text" x="210" y="333">(n = 300)</text>

            <line x1="320" y1="320" x2="380" y2="320" stroke="#333" stroke-width="2"/>
            <rect class="box" x="380" y="280" width="180" height="80" rx="5"/>
            <text class="text" x="470" y="300">Full-text excluded (n=260)</text>
            <text class="text" x="470" y="318" font-size="10">- Wrong population: 120</text>
            <text class="text" x="470" y="333" font-size="10">- Wrong outcome: 80</text>
            <text class="text" x="470" y="348" font-size="10">- Wrong design: 60</text>

            <!-- Included -->
            <line class="arrow" x1="210" y1="345" x2="210" y2="400"/>

            <rect class="phase" x="100" y="405" width="220" height="50" rx="5"/>
            <text class="text" x="210" y="425">Studies in qualitative synthesis</text>
            <text class="text" x="210" y="443">(n = 40)</text>

            <line class="arrow" x1="210" y1="455" x2="210" y2="480"/>

            <rect class="phase" x="100" y="485" width="220" height="50" rx="5"/>
            <text class="text" x="210" y="505">Studies in meta-analysis</text>
            <text class="text" x="210" y="523">(n = 32)</text>
        </svg>`;
    }

    generateGenericDiagram() {
        return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <style>
                .box { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
                .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
                .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead5); }
            </style>
            <defs>
                <marker id="arrowhead5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                </marker>
            </defs>

            <!-- Main box -->
            <rect class="box" x="125" y="30" width="150" height="50" rx="5"/>
            <text class="text" x="200" y="60">Input</text>

            <line class="arrow" x1="200" y1="80" x2="200" y2="115"/>

            <rect class="box" x="125" y="120" width="150" height="50" rx="5"/>
            <text class="text" x="200" y="150">Process</text>

            <line class="arrow" x1="200" y1="170" x2="200" y2="205"/>

            <rect class="box" x="125" y="210" width="150" height="50" rx="5"/>
            <text class="text" x="200" y="240">Output</text>
        </svg>`;
    }

    renderMessages() {
        this.chatMessages.innerHTML = this.messages.map(msg => {
            const avatarLetter = msg.role === 'user' ? 'U' : 'F';
            const avatarClass = msg.role;

            let content = `
                <div class="message ${msg.role}" data-id="${msg.id}">
                    <div class="message-avatar">${avatarLetter}</div>
                    <div class="message-content">
                        <div class="message-text">${this.formatMessage(msg.content)}</div>
            `;

            // Add diagram preview if present
            if (msg.diagram) {
                content += `
                    <div class="diagram-preview">
                        ${msg.diagram}
                    </div>
                    <div class="message-actions">
                        <button class="action-btn" data-action="send-to-editor">
                            ${Icons.edit}
                            <span>Send to Editor</span>
                        </button>
                        <button class="action-btn" data-action="download">
                            ${Icons.download}
                            <span>Download SVG</span>
                        </button>
                        <button class="action-btn" data-action="regenerate">
                            ${Icons.refresh}
                            <span>Regenerate</span>
                        </button>
                    </div>
                `;
            }

            content += `
                    </div>
                </div>
            `;

            return content;
        }).join('');
    }

    formatMessage(text) {
        // Convert line breaks to <br>
        return text.replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message assistant typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar">F</div>
            <div class="message-content">
                <div class="message-text">
                    <span class="spinner"></span>
                    Generating diagram...
                </div>
            </div>
        `;
        this.chatMessages.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    handleMessageAction(action, messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (!message || !message.diagram) return;

        switch (action) {
            case 'send-to-editor':
                this.sendToEditor(message.diagram);
                break;
            case 'download':
                this.downloadDiagram(message.diagram, `diagram-${messageId}.svg`);
                break;
            case 'regenerate':
                this.regenerateDiagram(messageId);
                break;
        }
    }

    sendToEditor(diagramSvg) {
        this.app.sendToEditor({
            svg: diagramSvg,
            timestamp: new Date().toISOString()
        });
    }

    downloadDiagram(svgContent, filename) {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    regenerateDiagram(messageId) {
        // Find the user message that preceded this assistant message
        const msgIndex = this.messages.findIndex(m => m.id === messageId);
        if (msgIndex > 0) {
            const userMessage = this.messages[msgIndex - 1];
            if (userMessage.role === 'user') {
                // Re-send the same prompt
                this.chatInput.value = userMessage.content;
                this.sendMessage();
            }
        }
    }

    generateId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('finnish_chat_history');
            if (saved) {
                this.messages = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to load chat history:', e);
        }
    }

    saveHistory() {
        try {
            // Keep only last 50 messages
            const toSave = this.messages.slice(-50);
            localStorage.setItem('finnish_chat_history', JSON.stringify(toSave));
        } catch (e) {
            console.warn('Failed to save chat history:', e);
        }
    }

    getHistory() {
        return [...this.messages];
    }

    cleanup() {
        this.saveHistory();
    }
}

export { AgentMode };
