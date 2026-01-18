/**
 * Computer Engineering Icon Library
 * Comprehensive SVG icons for computer engineering
 *
 * Categories:
 * - Processors (CPU, GPU, cores, cache)
 * - Memory (RAM, ROM, cache, storage)
 * - Networks (routers, switches, protocols)
 * - Embedded Systems (microcontrollers, sensors, actuators)
 * - Digital Logic (gates, flip-flops, registers)
 * - System Architecture (buses, interfaces, peripherals)
 */

import type { IconDefinition } from './index';

export const computerIcons: IconDefinition[] = [
  // ===========================================================================
  // PROCESSORS
  // ===========================================================================
  {
    id: 'comp-cpu',
    name: 'CPU',
    domain: 'engineering',
    category: 'processors',
    tags: ['CPU', 'processor', 'central', 'unit', 'chip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <rect x="22" y="22" width="20" height="20" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M16 20h-8"/>
      <path d="M16 28h-8"/>
      <path d="M16 36h-8"/>
      <path d="M16 44h-8"/>
      <path d="M48 20h8"/>
      <path d="M48 28h8"/>
      <path d="M48 36h8"/>
      <path d="M48 44h8"/>
    </svg>`
  },
  {
    id: 'comp-gpu',
    name: 'GPU',
    domain: 'engineering',
    category: 'processors',
    tags: ['GPU', 'graphics', 'processor', 'parallel', 'CUDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="28" rx="2"/>
      <rect x="12" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="38" width="12" height="6"/>
      <rect x="26" y="38" width="12" height="6"/>
      <rect x="40" y="38" width="12" height="6"/>
      <path d="M16 20v-8"/>
      <path d="M32 20v-8"/>
      <path d="M48 20v-8"/>
      <path d="M16 48v8"/>
      <path d="M32 48v8"/>
      <path d="M48 48v8"/>
    </svg>`
  },
  {
    id: 'comp-core',
    name: 'Processor Core',
    domain: 'engineering',
    category: 'processors',
    tags: ['core', 'processor', 'execution', 'unit', 'multicore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <rect x="20" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="20" y="34" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="34" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <path d="M30 20v10h4v-10"/>
      <path d="M30 34v10h4v-10"/>
      <path d="M20 30h10v4h-10"/>
      <path d="M34 30h10v4h-10"/>
    </svg>`
  },
  {
    id: 'comp-cache',
    name: 'Cache Memory',
    domain: 'engineering',
    category: 'processors',
    tags: ['cache', 'L1', 'L2', 'L3', 'SRAM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="12" rx="2"/>
      <rect x="12" y="28" width="40" height="12" rx="2"/>
      <rect x="8" y="44" width="48" height="12" rx="2"/>
      <text x="28" y="22" font-size="6" fill="currentColor" stroke="none">L1</text>
      <text x="28" y="38" font-size="6" fill="currentColor" stroke="none">L2</text>
      <text x="28" y="54" font-size="6" fill="currentColor" stroke="none">L3</text>
    </svg>`
  },
  {
    id: 'comp-alu',
    name: 'ALU',
    domain: 'engineering',
    category: 'processors',
    tags: ['ALU', 'arithmetic', 'logic', 'unit', 'computation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,56 12,56" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 52,56 12,56"/>
      <path d="M20 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M32 56v8"/>
      <text x="24" y="40" font-size="8" fill="currentColor" stroke="none">ALU</text>
    </svg>`
  },

  // ===========================================================================
  // MEMORY
  // ===========================================================================
  {
    id: 'comp-ram',
    name: 'RAM Module',
    domain: 'engineering',
    category: 'memory',
    tags: ['RAM', 'memory', 'DRAM', 'DDR', 'volatile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <rect x="12" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="32" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="42" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <path d="M12 44v4"/>
      <path d="M20 44v4"/>
      <path d="M28 44v4"/>
      <path d="M36 44v4"/>
      <path d="M44 44v4"/>
      <path d="M52 44v4"/>
      <path d="M24 20v-4"/>
      <path d="M40 20v-4"/>
    </svg>`
  },
  {
    id: 'comp-rom',
    name: 'ROM Chip',
    domain: 'engineering',
    category: 'memory',
    tags: ['ROM', 'memory', 'non-volatile', 'firmware', 'BIOS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="22" cy="22" r="2"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">ROM</text>
    </svg>`
  },
  {
    id: 'comp-ssd',
    name: 'SSD',
    domain: 'engineering',
    category: 'memory',
    tags: ['SSD', 'storage', 'flash', 'NAND', 'NVMe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <rect x="12" y="20" width="16" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="34" width="16" height="10" fill="currentColor" opacity="0.2"/>
      <rect x="32" y="20" width="20" height="8" rx="1"/>
      <rect x="32" y="30" width="20" height="8" rx="1"/>
      <rect x="32" y="40" width="20" height="4" rx="1"/>
      <path d="M16 48v8"/>
      <path d="M48 48v8"/>
    </svg>`
  },
  {
    id: 'comp-register',
    name: 'Register',
    domain: 'engineering',
    category: 'memory',
    tags: ['register', 'storage', 'flip-flop', 'CPU', 'fast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="12" y="28" width="8" height="8"/>
      <rect x="22" y="28" width="8" height="8"/>
      <rect x="32" y="28" width="8" height="8"/>
      <rect x="42" y="28" width="8" height="8"/>
      <path d="M16 24v-8"/>
      <path d="M26 24v-8"/>
      <path d="M36 24v-8"/>
      <path d="M46 24v-8"/>
      <path d="M32 40v8"/>
      <text x="10" y="52" font-size="5" fill="currentColor" stroke="none">D7 D6 D5 D4</text>
    </svg>`
  },
  {
    id: 'comp-buffer',
    name: 'Buffer',
    domain: 'engineering',
    category: 'memory',
    tags: ['buffer', 'queue', 'FIFO', 'data', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <rect x="20" y="16" width="24" height="6" fill="currentColor" opacity="0.3"/>
      <rect x="20" y="24" width="24" height="6" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="32" width="24" height="6" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="40" width="24" height="6"/>
      <path d="M8 20h8"/>
      <path d="M48 44h8"/>
      <polygon points="8,20 12,17 12,23" fill="currentColor"/>
      <polygon points="56,44 52,41 52,47" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // NETWORKS
  // ===========================================================================
  {
    id: 'comp-router',
    name: 'Router',
    domain: 'engineering',
    category: 'networks',
    tags: ['router', 'network', 'IP', 'routing', 'gateway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="20" rx="4"/>
      <circle cx="20" cy="34" r="3"/>
      <circle cx="32" cy="34" r="3"/>
      <circle cx="44" cy="34" r="3"/>
      <path d="M20 24v-12"/>
      <path d="M32 24v-8"/>
      <path d="M44 24v-12"/>
      <path d="M20 44v8"/>
      <path d="M32 44v8"/>
      <path d="M44 44v8"/>
      <path d="M16 12h8"/>
      <path d="M40 12h8"/>
    </svg>`
  },
  {
    id: 'comp-switch',
    name: 'Network Switch',
    domain: 'engineering',
    category: 'networks',
    tags: ['switch', 'network', 'ethernet', 'layer 2', 'ports'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="12" y="28" width="4" height="8"/>
      <rect x="20" y="28" width="4" height="8"/>
      <rect x="28" y="28" width="4" height="8"/>
      <rect x="36" y="28" width="4" height="8"/>
      <rect x="44" y="28" width="4" height="8"/>
      <path d="M14 24v-8"/>
      <path d="M22 24v-8"/>
      <path d="M30 24v-8"/>
      <path d="M38 24v-8"/>
      <path d="M46 24v-8"/>
      <circle cx="52" cy="32" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'comp-firewall',
    name: 'Firewall',
    domain: 'engineering',
    category: 'networks',
    tags: ['firewall', 'security', 'network', 'protection', 'filter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <path d="M20 16h24"/>
      <path d="M20 24h24"/>
      <path d="M20 32h24"/>
      <path d="M20 40h24"/>
      <path d="M20 48h24"/>
      <path d="M8 20h12"/>
      <path d="M44 20h12"/>
      <path d="M8 44h12"/>
      <path d="M44 44h12"/>
      <circle cx="8" cy="20" r="2" fill="green"/>
      <circle cx="56" cy="44" r="2" fill="green"/>
      <path d="M8 32h12" stroke="red"/>
      <circle cx="8" cy="32" r="2" fill="red"/>
    </svg>`
  },
  {
    id: 'comp-server',
    name: 'Server',
    domain: 'engineering',
    category: 'networks',
    tags: ['server', 'rack', 'datacenter', 'hosting', 'compute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="14" rx="2"/>
      <rect x="12" y="25" width="40" height="14" rx="2"/>
      <rect x="12" y="42" width="40" height="14" rx="2"/>
      <circle cx="20" cy="15" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="49" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M28 15h20"/>
      <path d="M28 32h20"/>
      <path d="M28 49h20"/>
    </svg>`
  },
  {
    id: 'comp-network-node',
    name: 'Network Node',
    domain: 'engineering',
    category: 'networks',
    tags: ['node', 'network', 'host', 'endpoint', 'device'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 20v-12"/>
      <path d="M32 44v12"/>
      <path d="M20 32h-12"/>
      <path d="M44 32h12"/>
      <path d="M23.5 23.5l-8.5-8.5"/>
      <path d="M40.5 40.5l8.5 8.5"/>
      <path d="M23.5 40.5l-8.5 8.5"/>
      <path d="M40.5 23.5l8.5-8.5"/>
    </svg>`
  },

  // ===========================================================================
  // EMBEDDED SYSTEMS
  // ===========================================================================
  {
    id: 'comp-microcontroller',
    name: 'Microcontroller',
    domain: 'engineering',
    category: 'embedded',
    tags: ['microcontroller', 'MCU', 'embedded', 'Arduino', 'PIC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="22" cy="22" r="2"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M16 24h-8"/>
      <path d="M16 32h-8"/>
      <path d="M16 40h-8"/>
      <path d="M48 24h8"/>
      <path d="M48 32h8"/>
      <path d="M48 40h8"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">MCU</text>
    </svg>`
  },
  {
    id: 'comp-sensor-module',
    name: 'Sensor Module',
    domain: 'engineering',
    category: 'embedded',
    tags: ['sensor', 'module', 'IoT', 'input', 'transducer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 44v8"/>
      <path d="M28 44v8"/>
      <path d="M36 44v8"/>
      <path d="M44 44v8"/>
      <path d="M32 20v-8"/>
      <path d="M24 12h16"/>
    </svg>`
  },
  {
    id: 'comp-actuator',
    name: 'Actuator',
    domain: 'engineering',
    category: 'embedded',
    tags: ['actuator', 'motor', 'output', 'servo', 'control'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 16v-8"/>
      <path d="M32 48v8"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <path d="M32 24v16"/>
      <path d="M32 32l8-8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-pwm',
    name: 'PWM Signal',
    domain: 'engineering',
    category: 'embedded',
    tags: ['PWM', 'pulse', 'width', 'modulation', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40v-24h8v24h4v-24h8v24h4v-24h8v24h4v-24h8v24"/>
      <path d="M4 40h56" stroke-dasharray="2 2"/>
      <path d="M4 16h56" stroke-dasharray="2 2"/>
      <text x="4" y="52" font-size="5" fill="currentColor" stroke="none">Duty cycle</text>
    </svg>`
  },
  {
    id: 'comp-gpio',
    name: 'GPIO Pins',
    domain: 'engineering',
    category: 'embedded',
    tags: ['GPIO', 'pins', 'input', 'output', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <path d="M8 24h12"/>
      <path d="M8 32h12"/>
      <path d="M8 40h12"/>
      <path d="M44 24h12"/>
      <path d="M44 32h12"/>
      <path d="M44 40h12"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2"/>
      <circle cx="56" cy="24" r="2"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="40" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // DIGITAL LOGIC
  // ===========================================================================
  {
    id: 'comp-and-gate',
    name: 'AND Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['AND', 'gate', 'logic', 'digital', 'boolean'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h16c10 0 18 8 18 16s-8 16-18 16H16z" fill="currentColor" opacity="0.1"/>
      <path d="M16 16h16c10 0 18 8 18 16s-8 16-18 16H16z"/>
      <path d="M8 24h8"/>
      <path d="M8 40h8"/>
      <path d="M50 32h6"/>
    </svg>`
  },
  {
    id: 'comp-or-gate',
    name: 'OR Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['OR', 'gate', 'logic', 'digital', 'boolean'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 8 8 24 0 32h8c16 0 28-8 28-16s-12-16-28-16z" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c8 8 8 24 0 32h8c16 0 28-8 28-16s-12-16-28-16z"/>
      <path d="M8 24h12"/>
      <path d="M8 40h12"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'comp-not-gate',
    name: 'NOT Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['NOT', 'inverter', 'gate', 'logic', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,32 16,48" fill="currentColor" opacity="0.1"/>
      <polygon points="16,16 48,32 16,48"/>
      <circle cx="52" cy="32" r="4"/>
      <path d="M8 32h8"/>
      <path d="M56 32h4"/>
    </svg>`
  },
  {
    id: 'comp-xor-gate',
    name: 'XOR Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['XOR', 'exclusive OR', 'gate', 'logic', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c8 8 8 24 0 32h8c16 0 24-8 24-16s-8-16-24-16z" fill="currentColor" opacity="0.1"/>
      <path d="M20 16c8 8 8 24 0 32h8c16 0 24-8 24-16s-8-16-24-16z"/>
      <path d="M16 16c8 8 8 24 0 32"/>
      <path d="M8 24h14"/>
      <path d="M8 40h14"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'comp-flip-flop',
    name: 'D Flip-Flop',
    domain: 'engineering',
    category: 'logic',
    tags: ['flip-flop', 'D', 'latch', 'sequential', 'memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <path d="M8 20h8"/>
      <path d="M8 44h8"/>
      <path d="M48 20h8"/>
      <path d="M48 44h8"/>
      <path d="M16 32l4-4v8z"/>
      <text x="20" y="24" font-size="6" fill="currentColor" stroke="none">D</text>
      <text x="38" y="24" font-size="6" fill="currentColor" stroke="none">Q</text>
      <text x="20" y="48" font-size="6" fill="currentColor" stroke="none">CLK</text>
      <text x="38" y="48" font-size="5" fill="currentColor" stroke="none">Q'</text>
    </svg>`
  },

  // ===========================================================================
  // SYSTEM ARCHITECTURE
  // ===========================================================================
  {
    id: 'comp-bus',
    name: 'System Bus',
    domain: 'engineering',
    category: 'architecture',
    tags: ['bus', 'data', 'address', 'control', 'interconnect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" fill="currentColor" opacity="0.1"/>
      <path d="M8 28h48"/>
      <path d="M8 36h48"/>
      <path d="M16 28v-12"/>
      <path d="M32 28v-12"/>
      <path d="M48 28v-12"/>
      <path d="M16 36v12"/>
      <path d="M32 36v12"/>
      <path d="M48 36v12"/>
      <rect x="12" y="12" width="8" height="4"/>
      <rect x="28" y="12" width="8" height="4"/>
      <rect x="44" y="12" width="8" height="4"/>
      <rect x="12" y="48" width="8" height="4"/>
      <rect x="28" y="48" width="8" height="4"/>
      <rect x="44" y="48" width="8" height="4"/>
    </svg>`
  },
  {
    id: 'comp-interface',
    name: 'Interface',
    domain: 'engineering',
    category: 'architecture',
    tags: ['interface', 'I/O', 'port', 'connection', 'peripheral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="24" rx="2"/>
      <rect x="36" y="20" width="20" height="24" rx="2"/>
      <path d="M28 28h8"/>
      <path d="M28 32h8"/>
      <path d="M28 36h8"/>
      <polygon points="32,28 34,30 32,32" fill="currentColor"/>
      <polygon points="32,32 34,34 32,36" fill="currentColor"/>
      <polygon points="36,36 34,38 36,40" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-dma',
    name: 'DMA Controller',
    domain: 'engineering',
    category: 'architecture',
    tags: ['DMA', 'direct', 'memory', 'access', 'transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">DMA</text>
      <path d="M8 24h12"/>
      <path d="M8 40h12"/>
      <path d="M44 24h12"/>
      <path d="M44 40h12"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <polygon points="8,24 12,22 12,26" fill="currentColor"/>
      <polygon points="56,40 52,38 52,42" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-interrupt',
    name: 'Interrupt Controller',
    domain: 'engineering',
    category: 'architecture',
    tags: ['interrupt', 'IRQ', 'controller', 'priority', 'handler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="32" rx="2"/>
      <path d="M8 24h12"/>
      <path d="M8 32h12"/>
      <path d="M8 40h12"/>
      <path d="M44 32h12"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2" fill="currentColor"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">INT</text>
      <polygon points="56,32 52,28 52,36" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-clock',
    name: 'Clock Generator',
    domain: 'engineering',
    category: 'architecture',
    tags: ['clock', 'oscillator', 'frequency', 'timing', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M24 32c0-4 4-4 4 0s4 4 4 0 4-4 4 0s4 4 4 0"/>
      <path d="M48 32h8"/>
      <path d="M8 32h8"/>
      <circle cx="32" cy="12" r="4"/>
      <path d="M32 16v4"/>
      <text x="24" y="42" font-size="5" fill="currentColor" stroke="none">CLK</text>
    </svg>`
  }
];

export default computerIcons;
