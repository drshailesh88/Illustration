/**
 * LLMService.ts
 * OpenAI/GPT integration for intelligent diagram generation
 *
 * This service provides LLM-powered prompt parsing and diagram data extraction.
 * It uses GPT-4 to understand user prompts and extract structured data for diagrams.
 */

import { config } from '../../config/env';

// =============================================================================
// TYPES
// =============================================================================

export interface DiagramData {
  type: 'consort' | 'prisma' | 'forest-plot' | 'pathway' | 'cell' | 'flowchart' | 'generic';
  title?: string;
  data: Record<string, unknown>;
  mermaidDsl?: string;
}

export interface ConsortData {
  enrollment: {
    assessed: number;
    excluded: number;
    excludedReasons: Array<{ reason: string; count: number }>;
  };
  randomization: {
    total: number;
    arms: Array<{
      name: string;
      allocated: number;
      received: number;
      didNotReceive: number;
    }>;
  };
  followUp: Array<{
    armName: string;
    lostToFollowUp: number;
    discontinued: number;
    reasons?: Array<{ reason: string; count: number }>;
  }>;
  analysis: Array<{
    armName: string;
    analyzed: number;
    excluded: number;
    analysisType?: string;
  }>;
}

export interface PrismaData {
  identification: {
    databases: Array<{ name: string; records: number }>;
    totalRecords: number;
    duplicatesRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
    exclusionReasons?: Array<{ reason: string; count: number }>;
  };
  eligibility: {
    fullTextAssessed: number;
    fullTextExcluded: number;
    exclusionReasons: Array<{ reason: string; count: number }>;
  };
  included: {
    studiesIncluded: number;
    studyTypes?: Array<{ type: string; count: number }>;
  };
}

export interface ForestPlotData {
  studies: Array<{
    name: string;
    year?: number;
    effectSize: number;
    ciLower: number;
    ciUpper: number;
    weight: number;
  }>;
  overall: {
    effectSize: number;
    ciLower: number;
    ciUpper: number;
    iSquared?: number;
  };
  measureType?: 'OR' | 'RR' | 'HR' | 'MD' | 'SMD';
}

export interface PathwayData {
  title: string;
  nodes: Array<{
    id: string;
    name: string;
    type: 'receptor' | 'kinase' | 'transcription-factor' | 'gene' | 'protein' | 'molecule' | 'other';
  }>;
  connections: Array<{
    from: string;
    to: string;
    type: 'activates' | 'inhibits' | 'phosphorylates' | 'binds' | 'regulates';
  }>;
}

export interface LLMResponse {
  success: boolean;
  data?: DiagramData;
  error?: string;
  rawResponse?: string;
}

// =============================================================================
// LLM SERVICE CLASS
// =============================================================================

export class LLMService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private proxyUrl: string;
  private claudeApiKey: string;
  private claudeModel: string;

  constructor() {
    this.apiKey = config.ai.openaiApiKey;
    this.baseUrl = config.ai.openaiBaseUrl || 'https://api.openai.com/v1';
    this.model = config.ai.openaiModel || 'gpt-4-turbo-preview';
    this.proxyUrl = config.ai.openaiProxyUrl || '';
    // Claude/Anthropic config - supports both VITE_CLAUDE_API_KEY and VITE_ANTHROPIC_API_KEY
    this.claudeApiKey = config.ai.claudeApiKey || (import.meta.env.VITE_ANTHROPIC_API_KEY as string) || '';
    this.claudeModel = config.ai.claudeModel || 'claude-sonnet-4-5-20250929';
  }

  /**
   * Check if OpenAI LLM service is available (API key configured)
   */
  isAvailable(): boolean {
    return this.apiKey.length > 0 || this.proxyUrl.length > 0;
  }

  /**
   * Check if Claude/Anthropic API is available
   */
  isClaudeAvailable(): boolean {
    return this.claudeApiKey.length > 0;
  }

  /**
   * Parse a user prompt and extract structured diagram data.
   * Fallback chain: Claude → OpenAI → regex
   */
  async parsePrompt(prompt: string, diagramType?: string): Promise<LLMResponse> {
    const systemPrompt = this.getSystemPrompt(diagramType);

    // Tier 1: Try Claude (primary)
    if (this.isClaudeAvailable()) {
      try {
        const response = await this.callClaude(systemPrompt, prompt);
        if (response.success && response.data) {
          return response;
        }
      } catch (error) {
        console.warn('Claude parsePrompt failed, trying OpenAI fallback:', error);
      }
    }

    // Tier 2: Try OpenAI (fallback)
    if (this.isAvailable()) {
      try {
        const response = await this.callOpenAI(systemPrompt, prompt);
        if (response.success && response.data) {
          return response;
        }
      } catch (error) {
        console.warn('OpenAI parsePrompt failed, using regex fallback:', error);
      }
    }

    // Tier 3: Regex fallback (always succeeds)
    return this.fallbackParse(prompt, diagramType);
  }

  /**
   * Generate Mermaid DSL for a specific diagram type with data.
   * Fallback chain: Claude → OpenAI → hardcoded templates
   */
  async generateMermaidDSL(diagramType: string, data: Record<string, unknown>): Promise<string> {
    const userPrompt = `Generate Mermaid DSL for a ${diagramType} diagram with this data: ${JSON.stringify(data)}`;
    const systemPrompt = `You are a Mermaid.js expert. Generate valid Mermaid DSL code only, no explanations.
Use flowchart TB syntax for flow diagrams. Include proper subgraphs, node labels with data, and connections.
Return ONLY the raw Mermaid DSL code without markdown code fences.`;

    // Helper to clean DSL output
    const cleanDSL = (dsl: string) => dsl.replace(/^```(?:mermaid)?\n?/i, '').replace(/\n?```$/i, '').trim();

    // Tier 1: Try Claude (primary)
    if (this.isClaudeAvailable()) {
      try {
        const response = await this.callClaude(systemPrompt, userPrompt);
        if (response.success && response.rawResponse) {
          // Claude returns JSON with the DSL; try to extract
          const raw = response.rawResponse;
          // If the response is a JSON object with a dsl/code field, extract it
          try {
            const parsed = JSON.parse(raw);
            const dsl = parsed.mermaidDsl || parsed.dsl || parsed.code || raw;
            return cleanDSL(typeof dsl === 'string' ? dsl : raw);
          } catch {
            return cleanDSL(raw);
          }
        }
      } catch (error) {
        console.warn('Claude generateMermaidDSL failed, trying OpenAI fallback:', error);
      }
    }

    // Tier 2: Try OpenAI (fallback)
    if (this.isAvailable()) {
      try {
        const result = await this.callChatCompletions({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        });

        const dsl = result.choices?.[0]?.message?.content?.trim() || '';
        if (dsl) {
          return cleanDSL(dsl);
        }
      } catch (error) {
        console.warn('OpenAI generateMermaidDSL failed, using template fallback:', error);
      }
    }

    // Tier 3: Hardcoded DSL templates (always succeeds)
    return this.generateFallbackDSL(diagramType, data);
  }

  // ===========================================================================
  // PRIVATE METHODS
  // ===========================================================================

  /**
   * Call OpenAI API
   */
  private async callOpenAI(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
    const result = await this.callChatCompletions({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    try {
      const parsed = JSON.parse(content);
      return {
        success: true,
        data: parsed,
        rawResponse: content,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to parse LLM response as JSON',
        rawResponse: content,
      };
    }
  }

  /**
   * Call Claude/Anthropic Messages API
   */
  private async callClaude(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.claudeApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: this.claudeModel,
        max_tokens: 4096,
        system: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const content = result.content?.[0]?.text;

    if (!content) {
      throw new Error('Empty response from Claude');
    }

    try {
      const parsed = JSON.parse(content);
      return {
        success: true,
        data: parsed,
        rawResponse: content,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to parse Claude response as JSON',
        rawResponse: content,
      };
    }
  }

  /**
   * Call Chat Completions (direct or via proxy)
   */
  private async callChatCompletions(payload: {
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: 'json_object' };
  }): Promise<any> {
    const url = this.proxyUrl || `${this.baseUrl}/chat/completions`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: this.model,
        ...payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get system prompt for diagram type
   */
  private getSystemPrompt(diagramType?: string): string {
    const basePrompt = `You are an expert at parsing academic/scientific text to extract structured data for diagrams.
Extract ALL numbers, labels, and relationships from the user's text.
Return a JSON object with the extracted data.`;

    switch (diagramType?.toLowerCase()) {
      case 'consort':
        return `${basePrompt}

For CONSORT flow diagrams (clinical trials), extract:
{
  "type": "consort",
  "enrollment": {
    "assessed": <number>,
    "excluded": <number>,
    "excludedReasons": [{"reason": "<text>", "count": <number>}]
  },
  "randomization": {
    "total": <number>,
    "arms": [{"name": "<arm name>", "allocated": <number>, "received": <number>, "didNotReceive": <number>}]
  },
  "followUp": [{"armName": "<arm>", "lostToFollowUp": <number>, "discontinued": <number>, "reasons": [...]}],
  "analysis": [{"armName": "<arm>", "analyzed": <number>, "excluded": <number>, "analysisType": "ITT|PP"}]
}`;

      case 'prisma':
        return `${basePrompt}

For PRISMA flow diagrams (systematic reviews), extract:
{
  "type": "prisma",
  "identification": {
    "databases": [{"name": "<database>", "records": <number>}],
    "totalRecords": <number>,
    "duplicatesRemoved": <number>
  },
  "screening": {
    "recordsScreened": <number>,
    "recordsExcluded": <number>,
    "exclusionReasons": [{"reason": "<reason>", "count": <number>}]
  },
  "eligibility": {
    "fullTextAssessed": <number>,
    "fullTextExcluded": <number>,
    "exclusionReasons": [{"reason": "<reason>", "count": <number>}]
  },
  "included": {
    "studiesIncluded": <number>,
    "studyTypes": [{"type": "<type>", "count": <number>}]
  }
}`;

      case 'forest-plot':
      case 'forest':
        return `${basePrompt}

For forest plots (meta-analysis), extract:
{
  "type": "forest-plot",
  "studies": [
    {"name": "<author year>", "year": <year>, "effectSize": <number>, "ciLower": <number>, "ciUpper": <number>, "weight": <number>}
  ],
  "overall": {
    "effectSize": <number>,
    "ciLower": <number>,
    "ciUpper": <number>,
    "iSquared": <number if provided>
  },
  "measureType": "OR|RR|HR|MD|SMD"
}`;

      case 'pathway':
        return `${basePrompt}

For signaling pathway diagrams, extract:
{
  "type": "pathway",
  "title": "<pathway name>",
  "nodes": [{"id": "<short_id>", "name": "<full name>", "type": "receptor|kinase|transcription-factor|gene|protein|molecule"}],
  "connections": [{"from": "<id>", "to": "<id>", "type": "activates|inhibits|phosphorylates|binds|regulates"}]
}`;

      default:
        return `${basePrompt}

Extract structured data from the text. Determine the diagram type and return:
{
  "type": "<consort|prisma|forest-plot|pathway|flowchart|generic>",
  "title": "<title if mentioned>",
  "data": {<extracted data relevant to diagram type>}
}`;
    }
  }

  /**
   * Fallback parsing when LLM is unavailable - Uses advanced regex to extract structured data
   */
  fallbackParse(prompt: string, diagramType?: string): LLMResponse {
    // Determine diagram type if not provided
    let type = diagramType?.toLowerCase() || 'generic';
    if (!diagramType) {
      if (/consort|randomized|rct|trial|arm|allocated/i.test(prompt)) type = 'consort';
      else if (/prisma|systematic\s*review|databases?|duplicates?/i.test(prompt)) type = 'prisma';
      else if (/forest\s*plot|meta-analysis|odds\s*ratio|confidence\s*interval/i.test(prompt)) type = 'forest-plot';
      else if (/pathway|signaling|cascade|receptor|kinase/i.test(prompt)) type = 'pathway';
    }

    // Parse based on diagram type
    switch (type) {
      case 'consort':
        return { success: true, data: { type: 'consort' as const, data: this.parseConsortPrompt(prompt) as unknown as Record<string, unknown> } };
      case 'prisma':
        return { success: true, data: { type: 'prisma' as const, data: this.parsePrismaPrompt(prompt) as unknown as Record<string, unknown> } };
      case 'forest-plot':
        return { success: true, data: { type: 'forest-plot' as const, data: this.parseForestPlotPrompt(prompt) as unknown as Record<string, unknown> } };
      case 'pathway':
        return { success: true, data: { type: 'pathway' as const, data: this.parsePathwayPrompt(prompt) as unknown as Record<string, unknown> } };
      default:
        return { success: true, data: { type: 'generic' as const, data: { rawPrompt: prompt } } };
    }
  }

  /**
   * Parse CONSORT diagram data from prompt
   */
  private parseConsortPrompt(prompt: string): ConsortData {
    // Extract screening/assessment number
    const assessedMatch = prompt.match(/(?:screened|assessed|enrolled)\s*(?:for eligibility\s*)?[\w\s]*?(\d[\d,]*)/i);
    const assessed = assessedMatch ? parseInt(assessedMatch[1].replace(/,/g, '')) : 500;

    // Extract excluded number and reasons
    const excludedMatch = prompt.match(/excluded?\s*(\d[\d,]*)/i);
    const excluded = excludedMatch ? parseInt(excludedMatch[1].replace(/,/g, '')) : 100;

    // Extract exclusion reasons with numbers
    const excludedReasons: Array<{ reason: string; count: number }> = [];
    const reasonPatterns = [
      /(\d[\d,]*)\s*(?:did(?:n'?t| not) meet|not meeting)\s*(?:inclusion\s*)?criteria/i,
      /(\d[\d,]*)\s*declined/i,
      /(\d[\d,]*)\s*(?:other|withdrew|refused)/i,
      /not meeting criteria[:\s]*(\d[\d,]*)/i,
      /criteria[:\s]*(\d[\d,]*)/i
    ];

    const reasonNames = ['Not meeting criteria', 'Declined to participate', 'Other reasons'];
    reasonPatterns.slice(0, 3).forEach((pattern, i) => {
      const match = prompt.match(pattern);
      if (match) {
        excludedReasons.push({ reason: reasonNames[i], count: parseInt(match[1].replace(/,/g, '')) });
      }
    });

    // Extract randomization number
    const randomizedMatch = prompt.match(/randomized?\s*(\d[\d,]*)/i);
    const randomized = randomizedMatch ? parseInt(randomizedMatch[1].replace(/,/g, '')) : assessed - excluded;

    // Extract arms/groups with allocation
    const arms: Array<{ name: string; allocated: number; received?: number; didNotReceive?: number }> = [];

    // Try to find Treatment A
    let armAMatch = prompt.match(/(?:treatment|group|arm)\s*(?:a|1|one)[:\s\(]*(\d[\d,]*)/i) ||
                    prompt.match(/(\d[\d,]*)\s*(?:patients?\s+)?(?:to|into|in)\s*(?:treatment|group|arm)\s*(?:a|1)/i);

    // Try to find Treatment B
    let armBMatch = prompt.match(/(?:treatment|group|arm)\s*(?:b|2|two)[:\s\(]*(\d[\d,]*)/i) ||
                    prompt.match(/(\d[\d,]*)\s*(?:patients?\s+)?(?:to|into|in)\s*(?:treatment|group|arm)\s*(?:b|2)/i);

    // Check for control/placebo
    if (!armBMatch) {
      armBMatch = prompt.match(/(?:control|placebo)\s*[:\(\s]*(\d[\d,]*)/i) ||
                  prompt.match(/(\d[\d,]*)\s*(?:to|into|in)\s*(?:control|placebo)/i);
    }

    // Extract arm names from prompt
    const armAName = prompt.match(/(?:treatment|arm)\s*(a|1|one|[\w\s]+?)(?:\s*\(|\s*:|\s*-|,)/i)?.[1]?.trim() || 'Treatment A';
    const armBName = prompt.match(/(?:treatment|arm)\s*(b|2|two|[\w\s]+?)(?:\s*\(|\s*:|\s*-|,)/i)?.[1]?.trim() || 'Treatment B';

    if (armAMatch) {
      const allocated = parseInt(armAMatch[1].replace(/,/g, ''));
      arms.push({ name: armAName === 'a' || armAName === '1' ? 'Treatment A' : armAName, allocated });
    }
    if (armBMatch) {
      const allocated = parseInt(armBMatch[1].replace(/,/g, ''));
      arms.push({ name: armBName === 'b' || armBName === '2' ? 'Treatment B' : armBName, allocated });
    }

    // Default arms if none found
    if (arms.length === 0) {
      const halfRandomized = Math.floor(randomized / 2);
      arms.push(
        { name: 'Treatment', allocated: halfRandomized },
        { name: 'Control', allocated: randomized - halfRandomized }
      );
    }

    // Extract follow-up/discontinuation data
    const followUp: Array<{ armName: string; lostToFollowUp?: number; discontinued?: number }> = [];

    // Look for discontinuation per arm
    arms.forEach((arm, i) => {
      const armIdentifier = i === 0 ? '(?:treatment\\s*a|arm\\s*a|first|treatment)' : '(?:treatment\\s*b|arm\\s*b|second|control)';
      const discMatch = prompt.match(new RegExp(`(?:in\\s*)?${armIdentifier}[^.]*?(\\d+)\\s*(?:discontinued|dropped|withdrew|lost)`, 'i')) ||
                        prompt.match(new RegExp(`${armIdentifier}[^.]*?(\\d+)\\s*discontinued`, 'i'));
      const lostMatch = prompt.match(new RegExp(`(?:in\\s*)?${armIdentifier}[^.]*?(\\d+)\\s*lost\\s*to\\s*follow`, 'i'));

      followUp.push({
        armName: arm.name,
        discontinued: discMatch ? parseInt(discMatch[1]) : 10,
        lostToFollowUp: lostMatch ? parseInt(lostMatch[1]) : 5
      });
    });

    // Extract completion/analysis numbers
    const analysis: Array<{ armName: string; analyzed: number; excluded?: number }> = [];

    // Try to find "X completed" patterns per arm
    arms.forEach((arm, i) => {
      const armIdentifier = i === 0 ? '(?:treatment\\s*a|arm\\s*a|first|treatment)' : '(?:treatment\\s*b|arm\\s*b|second|control)';
      const completedMatch = prompt.match(new RegExp(`(?:in\\s*)?${armIdentifier}[^.]*?(\\d+)\\s*(?:completed|finished|analyzed)`, 'i'));

      if (completedMatch) {
        analysis.push({ armName: arm.name, analyzed: parseInt(completedMatch[1]) });
      } else {
        // Calculate from allocation - discontinued
        const fu = followUp.find(f => f.armName === arm.name);
        const disc = (fu?.discontinued || 10) + (fu?.lostToFollowUp || 5);
        analysis.push({ armName: arm.name, analyzed: arm.allocated - disc });
      }
    });

    // Ensure analysis has proper excluded values
    const finalAnalysis = analysis.map(a => ({
      armName: a.armName,
      analyzed: a.analyzed,
      excluded: a.excluded || 0,
      analysisType: 'ITT' as const
    }));

    return {
      enrollment: {
        assessed,
        excluded,
        excludedReasons: excludedReasons.length > 0 ? excludedReasons : [{ reason: 'Not meeting criteria', count: Math.round(excluded * 0.6) }]
      },
      randomization: {
        total: randomized,
        arms: arms.map(a => ({
          name: a.name,
          allocated: a.allocated,
          received: a.received || a.allocated - 5,
          didNotReceive: a.didNotReceive || 5
        }))
      },
      followUp: followUp.map(f => ({
        armName: f.armName,
        lostToFollowUp: f.lostToFollowUp || 5,
        discontinued: f.discontinued || 10
      })),
      analysis: finalAnalysis
    };
  }

  /**
   * Parse PRISMA diagram data from prompt
   */
  private parsePrismaPrompt(prompt: string): PrismaData {
    // Extract total records
    const recordsMatch = prompt.match(/(\d[\d,]*)\s*(?:records?|articles?|citations?)/i);
    const totalRecords = recordsMatch ? parseInt(recordsMatch[1].replace(/,/g, '')) : 1000;

    // Extract duplicates
    const duplicatesMatch = prompt.match(/(\d[\d,]*)\s*duplicates?/i);
    const duplicates = duplicatesMatch ? parseInt(duplicatesMatch[1].replace(/,/g, '')) : Math.round(totalRecords * 0.2);

    // Extract screened
    const screenedMatch = prompt.match(/(\d[\d,]*)\s*screened/i);
    const screened = screenedMatch ? parseInt(screenedMatch[1].replace(/,/g, '')) : totalRecords - duplicates;

    // Extract excluded at screening
    const screenExcludedMatch = prompt.match(/(\d[\d,]*)\s*(?:excluded|removed)\s*(?:at|during|after)\s*screen/i);
    const screenExcluded = screenExcludedMatch ? parseInt(screenExcludedMatch[1].replace(/,/g, '')) : Math.round(screened * 0.7);

    // Extract full-text assessed
    const fullTextMatch = prompt.match(/(\d[\d,]*)\s*full[- ]?text/i);
    const fullText = fullTextMatch ? parseInt(fullTextMatch[1].replace(/,/g, '')) : screened - screenExcluded;

    // Extract included
    const includedMatch = prompt.match(/(\d[\d,]*)\s*(?:included|final)/i);
    const included = includedMatch ? parseInt(includedMatch[1].replace(/,/g, '')) : Math.round(fullText * 0.3);

    return {
      identification: {
        databases: [{ name: 'Database search', records: totalRecords }],
        totalRecords,
        duplicatesRemoved: duplicates
      },
      screening: {
        recordsScreened: screened,
        recordsExcluded: screenExcluded,
        exclusionReasons: []
      },
      eligibility: {
        fullTextAssessed: fullText,
        fullTextExcluded: fullText - included,
        exclusionReasons: []
      },
      included: {
        studiesIncluded: included
      }
    };
  }

  /**
   * Parse Forest Plot data from prompt
   */
  private parseForestPlotPrompt(prompt: string): ForestPlotData {
    // Try to extract study names and data
    const studies: Array<{ name: string; year?: number; effectSize: number; ciLower: number; ciUpper: number; weight?: number }> = [];

    // Pattern: "Chen 2020 OR 1.2 (0.8-1.6)" or similar
    const studyPattern = /([A-Z][a-z]+(?:\s+et\s+al\.?)?)\s*(?:\(?(\d{4})\)?)\s*(?:OR|RR|HR)?[:\s]*(\d+\.?\d*)\s*\((\d+\.?\d*)[–-](\d+\.?\d*)\)/gi;
    let match;

    while ((match = studyPattern.exec(prompt)) !== null) {
      studies.push({
        name: match[1],
        year: parseInt(match[2]),
        effectSize: parseFloat(match[3]),
        ciLower: parseFloat(match[4]),
        ciUpper: parseFloat(match[5])
      });
    }

    // If no studies found, use defaults
    if (studies.length === 0) {
      studies.push(
        { name: 'Study 1', year: 2020, effectSize: 1.2, ciLower: 0.8, ciUpper: 1.8, weight: 25 },
        { name: 'Study 2', year: 2021, effectSize: 0.9, ciLower: 0.6, ciUpper: 1.3, weight: 30 },
        { name: 'Study 3', year: 2022, effectSize: 1.1, ciLower: 0.7, ciUpper: 1.6, weight: 20 },
        { name: 'Study 4', year: 2023, effectSize: 1.3, ciLower: 0.9, ciUpper: 1.9, weight: 25 }
      );
    }

    // Ensure all studies have weight
    const studiesWithWeight = studies.map((s) => ({
      ...s,
      weight: s.weight || Math.round(100 / studies.length)
    }));

    return {
      studies: studiesWithWeight,
      overall: {
        effectSize: 1.1,
        ciLower: 0.9,
        ciUpper: 1.4
      },
      measureType: 'OR' as const
    };
  }

  /**
   * Parse Pathway data from prompt
   */
  private parsePathwayPrompt(prompt: string): PathwayData {
    type NodeType = 'receptor' | 'kinase' | 'transcription-factor' | 'gene' | 'protein' | 'molecule' | 'other';
    type ConnectionType = 'activates' | 'inhibits' | 'phosphorylates' | 'binds' | 'regulates';

    const nodes: Array<{ id: string; name: string; type: NodeType }> = [];
    const connections: Array<{ from: string; to: string; type: ConnectionType }> = [];

    // Extract component names
    const components = prompt.match(/\b([A-Z]{2,}[\d]*|[A-Z][a-z]+(?:[\s-]?[A-Z][a-z]+)?)\b/g) || [];
    const uniqueComponents = [...new Set(components)].filter(c => c.length > 2);

    uniqueComponents.forEach((comp, i) => {
      const nodeType: NodeType = i === 0 ? 'receptor' : i === uniqueComponents.length - 1 ? 'gene' : 'kinase';
      nodes.push({
        id: `n${i}`,
        name: comp,
        type: nodeType
      });
      if (i > 0) {
        connections.push({ from: `n${i-1}`, to: `n${i}`, type: 'activates' });
      }
    });

    // Default if nothing found
    if (nodes.length === 0) {
      return {
        title: 'Signaling Pathway',
        nodes: [
          { id: 'n0', name: 'Receptor', type: 'receptor' },
          { id: 'n1', name: 'Signal', type: 'kinase' },
          { id: 'n2', name: 'Target Gene', type: 'gene' }
        ],
        connections: [
          { from: 'n0', to: 'n1', type: 'activates' },
          { from: 'n1', to: 'n2', type: 'activates' }
        ]
      };
    }

    return {
      title: prompt.match(/(?:create|generate|make)\s+(?:a\s+)?(\w+(?:\s+\w+)*)\s+(?:pathway|signaling)/i)?.[1] || 'Signaling Pathway',
      nodes,
      connections
    };
  }

  /**
   * Generate fallback DSL when LLM is unavailable
   */
  private generateFallbackDSL(diagramType: string, data: Record<string, unknown>): string {
    switch (diagramType.toLowerCase()) {
      case 'consort':
        return this.generateConsortDSL(data as unknown as ConsortData);
      case 'prisma':
        return this.generatePrismaDSL(data as unknown as PrismaData);
      case 'forest-plot':
        return this.generateForestPlotDSL(data as unknown as ForestPlotData);
      default:
        return this.generateGenericFlowchartDSL(data);
    }
  }

  /**
   * Generate CONSORT DSL from structured data
   */
  private generateConsortDSL(data: ConsortData): string {
    const e = data.enrollment || { assessed: 500, excluded: 100, excludedReasons: [] };
    const r = data.randomization || { total: 400, arms: [] };
    const arms = r.arms.length > 0 ? r.arms : [
      { name: 'Treatment', allocated: 200, received: 195, didNotReceive: 5 },
      { name: 'Control', allocated: 200, received: 198, didNotReceive: 2 }
    ];
    const fu = data.followUp || [];
    const an = data.analysis || [];

    let dsl = `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=${e.assessed})"]
        excluded["Excluded (n=${e.excluded})`;

    if (e.excludedReasons?.length > 0) {
      e.excludedReasons.forEach(r => {
        dsl += `<br/>${r.reason}: ${r.count}`;
      });
    }
    dsl += `"]
    end

    randomized["Randomized<br/>(n=${r.total})"]

    subgraph allocation["Allocation"]
`;

    arms.forEach((arm, i) => {
      dsl += `        arm${i}["Allocated to ${arm.name} (n=${arm.allocated})<br/>Received: ${arm.received}<br/>Did not receive: ${arm.didNotReceive}"]
`;
    });
    dsl += `    end

    subgraph followup["Follow-up"]
`;
    arms.forEach((arm, i) => {
      const fuData = fu.find(f => f.armName === arm.name) || { lostToFollowUp: 10, discontinued: 5 };
      dsl += `        fu${i}["${arm.name}<br/>Lost to follow-up: ${fuData.lostToFollowUp}<br/>Discontinued: ${fuData.discontinued}"]
`;
    });
    dsl += `    end

    subgraph analysis["Analysis"]
`;
    arms.forEach((arm, i) => {
      const anData = an.find(a => a.armName === arm.name) || { analyzed: arm.allocated - 15, excluded: 15 };
      dsl += `        an${i}["${arm.name}<br/>Analyzed (n=${anData.analyzed})<br/>Excluded (n=${anData.excluded})"]
`;
    });
    dsl += `    end

    assessed --> excluded
    assessed --> randomized
`;
    arms.forEach((_, i) => {
      dsl += `    randomized --> arm${i}
    arm${i} --> fu${i}
    fu${i} --> an${i}
`;
    });

    return dsl;
  }

  /**
   * Generate PRISMA DSL from structured data
   */
  private generatePrismaDSL(data: PrismaData): string {
    const id = data.identification || { totalRecords: 1000, duplicatesRemoved: 200, databases: [] };
    const sc = data.screening || { recordsScreened: 800, recordsExcluded: 600 };
    const el = data.eligibility || { fullTextAssessed: 200, fullTextExcluded: 150, exclusionReasons: [] };
    const inc = data.included || { studiesIncluded: 50 };

    let dsl = `flowchart TB
    subgraph identification["Identification"]
        records["Records identified from databases<br/>(n=${id.totalRecords})`;

    if (id.databases?.length > 0) {
      id.databases.forEach(db => {
        dsl += `<br/>${db.name}: ${db.records}`;
      });
    }
    dsl += `"]
        duplicates["Duplicates removed<br/>(n=${id.duplicatesRemoved})"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=${sc.recordsScreened})"]
        excluded["Records excluded<br/>(n=${sc.recordsExcluded})"]
    end

    subgraph eligibility["Eligibility"]
        assessed["Full-text articles assessed<br/>(n=${el.fullTextAssessed})"]
        excludedFT["Full-text excluded (n=${el.fullTextExcluded})`;

    if (el.exclusionReasons?.length > 0) {
      el.exclusionReasons.forEach(r => {
        dsl += `<br/>${r.reason}: ${r.count}`;
      });
    }
    dsl += `"]
    end

    subgraph included["Included"]
        studies["Studies included in review<br/>(n=${inc.studiesIncluded})`;

    if (inc.studyTypes && inc.studyTypes.length > 0) {
      inc.studyTypes.forEach((t: { type: string; count: number }) => {
        dsl += `<br/>${t.type}: ${t.count}`;
      });
    }
    dsl += `"]
    end

    records --> duplicates
    duplicates --> screened
    screened --> excluded
    screened --> assessed
    assessed --> excludedFT
    assessed --> studies`;

    return dsl;
  }

  /**
   * Generate Forest Plot DSL (placeholder - forest plots need special rendering)
   */
  private generateForestPlotDSL(data: ForestPlotData): string {
    const studies = data.studies || [];
    const overall = data.overall || { effectSize: 0.85, ciLower: 0.7, ciUpper: 1.0 };
    const measure = data.measureType || 'OR';

    // Forest plots are better as SVG, but we can create a text representation
    let dsl = `flowchart LR
    subgraph header["Study | Year | ${measure} (95% CI) | Weight"]
    end
`;

    studies.forEach((study, i) => {
      const ci = `${study.effectSize.toFixed(2)} (${study.ciLower.toFixed(2)}-${study.ciUpper.toFixed(2)})`;
      dsl += `    s${i}["${study.name} | ${study.year || '-'} | ${ci} | ${study.weight.toFixed(1)}%"]
`;
    });

    dsl += `    overall["Overall | - | ${overall.effectSize.toFixed(2)} (${overall.ciLower.toFixed(2)}-${overall.ciUpper.toFixed(2)}) | 100%"]

    style overall fill:#e0e0e0,stroke:#333`;

    return dsl;
  }

  /**
   * Generate generic flowchart DSL
   */
  private generateGenericFlowchartDSL(data: Record<string, unknown>): string {
    const numbers = (data.extractedNumbers as number[]) || [];

    if (numbers.length >= 3) {
      return `flowchart TB
    A["Start<br/>(n=${numbers[0]})"]
    B["Process<br/>(n=${numbers[1]})"]
    C["End<br/>(n=${numbers[2]})"]

    A --> B
    B --> C`;
    }

    return `flowchart TB
    A["Start"]
    B["Process"]
    C["End"]

    A --> B
    B --> C

    %% Customize this diagram with your data`;
  }
}

// Export singleton instance
export const llmService = new LLMService();
export default llmService;
