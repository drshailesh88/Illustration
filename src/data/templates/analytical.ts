/**
 * analytical.ts
 * Analytical Chemistry diagram templates
 *
 * Contains comprehensive templates for analytical chemistry including:
 * - Spectroscopic techniques (UV-Vis, IR, NMR, MS)
 * - Chromatographic methods (HPLC, GC, TLC)
 * - Electrochemical analysis
 * - Quality control and method validation
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// SPECTROSCOPY
// =============================================================================

/**
 * UV-Vis Spectroscopy template
 */
export const uvVisSpectroscopy: DiagramTemplate = {
  id: 'analytical-uv-vis',
  name: 'UV-Vis Spectroscopy Analysis',
  description: 'Electronic absorption spectroscopy with Beer-Lambert law',
  domain: 'chemistry',
  promptTemplate: `Create a UV-Vis spectroscopy diagram:
- Sample type: {{sampleType}}
- Chromophore: {{chromophore}}
- Lambda max: {{lambdaMax}}
- Molar absorptivity: {{molarAbsorptivity}}
- Beer-Lambert application: {{beerLambert}}
- Concentration determination: {{concentration}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleType',
    'chromophore',
    'lambdaMax',
    'molarAbsorptivity',
    'beerLambert',
    'concentration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Light Source"] --> B["Monochromator"]
    B --> C["Sample"]
    C --> D["Detector"]
    D --> E["A = εlc"]
    subgraph Analysis
        F["λmax identification"]
        G["Concentration calc"]
    end`,
};

/**
 * IR Spectroscopy template
 */
export const irSpectroscopy: DiagramTemplate = {
  id: 'analytical-ir-spectroscopy',
  name: 'IR Spectroscopy Analysis',
  description: 'Vibrational spectroscopy for functional group identification',
  domain: 'chemistry',
  promptTemplate: `Create an IR spectroscopy diagram:
- Sample preparation: {{samplePrep}}
- Key absorption bands: {{absorptionBands}}
- Functional groups identified: {{functionalGroups}}
- Fingerprint region: {{fingerprint}}
- Characteristic peaks: {{characteristicPeaks}}
- Interpretation: {{interpretation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'samplePrep',
    'absorptionBands',
    'functionalGroups',
    'fingerprint',
    'characteristicPeaks',
    'interpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Regions["IR Regions"]
        A["4000-2500: X-H stretches"]
        B["2500-2000: Triple bonds"]
        C["2000-1500: Double bonds"]
        D["1500-400: Fingerprint"]
    end
    style A fill:#4ecdc4`,
};

/**
 * NMR Spectroscopy template
 */
export const nmrSpectroscopy: DiagramTemplate = {
  id: 'analytical-nmr-spectroscopy',
  name: 'NMR Spectroscopy Analysis',
  description: 'Nuclear magnetic resonance for structure determination',
  domain: 'chemistry',
  promptTemplate: `Create an NMR spectroscopy diagram:
- Nucleus: {{nucleus}}
- Solvent: {{solvent}}
- Chemical shifts: {{chemicalShifts}}
- Coupling patterns: {{couplingPatterns}}
- Integration: {{integration}}
- Structure elucidation: {{structureElucidation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nucleus',
    'solvent',
    'chemicalShifts',
    'couplingPatterns',
    'integration',
    'structureElucidation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph 1H["1H NMR Regions"]
        A["0-2 ppm: Alkyl"]
        B["2-4.5 ppm: α to EWG"]
        C["4.5-6.5 ppm: Vinyl/Allyl"]
        D["6.5-8.5 ppm: Aromatic"]
        E["9-10 ppm: Aldehyde"]
    end`,
};

/**
 * Mass Spectrometry template
 */
export const massSpectrometry: DiagramTemplate = {
  id: 'analytical-mass-spec',
  name: 'Mass Spectrometry Analysis',
  description: 'Molecular weight and fragmentation pattern analysis',
  domain: 'chemistry',
  promptTemplate: `Create a mass spectrometry diagram:
- Ionization method: {{ionizationMethod}}
- Molecular ion: {{molecularIon}}
- Base peak: {{basePeak}}
- Key fragments: {{keyFragments}}
- Isotope pattern: {{isotopePattern}}
- Structure confirmation: {{structureConfirmation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ionizationMethod',
    'molecularIon',
    'basePeak',
    'keyFragments',
    'isotopePattern',
    'structureConfirmation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Sample"] --> B["Ionization"]
    B --> C["Mass Analyzer"]
    C --> D["Detector"]
    D --> E["m/z Spectrum"]
    subgraph Fragments
        F["M+• → fragments"]
    end`,
};

// =============================================================================
// CHROMATOGRAPHY
// =============================================================================

/**
 * HPLC Method template
 */
export const hplcMethod: DiagramTemplate = {
  id: 'analytical-hplc-method',
  name: 'HPLC Method Development',
  description: 'High-performance liquid chromatography method parameters',
  domain: 'chemistry',
  promptTemplate: `Create an HPLC method diagram:
- Column type: {{columnType}}
- Mobile phase: {{mobilePhase}}
- Flow rate: {{flowRate}}
- Detection: {{detection}}
- Retention times: {{retentionTimes}}
- Resolution: {{resolution}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'columnType',
    'mobilePhase',
    'flowRate',
    'detection',
    'retentionTimes',
    'resolution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Mobile Phase"] --> B["Pump"]
    B --> C["Injector"]
    C --> D["Column"]
    D --> E["Detector"]
    E --> F["Chromatogram"]
    style D fill:#4ecdc4`,
};

/**
 * GC Method template
 */
export const gcMethod: DiagramTemplate = {
  id: 'analytical-gc-method',
  name: 'Gas Chromatography Method',
  description: 'GC method parameters and optimization',
  domain: 'chemistry',
  promptTemplate: `Create a GC method diagram:
- Column: {{column}}
- Carrier gas: {{carrierGas}}
- Temperature program: {{tempProgram}}
- Detector type: {{detector}}
- Injection mode: {{injectionMode}}
- Compounds analyzed: {{compounds}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'column',
    'carrierGas',
    'tempProgram',
    'detector',
    'injectionMode',
    'compounds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Sample Injection"] --> B["Heated Inlet"]
    B --> C["Column in Oven"]
    C --> D["Detector (FID/MS)"]
    subgraph TempProg["Temperature Program"]
        E["Initial Hold"]
        F["Ramp"]
        G["Final Hold"]
    end`,
};

/**
 * Chromatogram Analysis template
 */
export const chromatogramAnalysis: DiagramTemplate = {
  id: 'analytical-chromatogram',
  name: 'Chromatogram Interpretation',
  description: 'Peak analysis and quantification from chromatograms',
  domain: 'chemistry',
  promptTemplate: `Create a chromatogram analysis diagram:
- Number of peaks: {{peakCount}}
- Retention times: {{retentionTimes}}
- Peak areas: {{peakAreas}}
- Resolution between peaks: {{resolution}}
- Tailing factors: {{tailingFactors}}
- Quantification method: {{quantMethod}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'peakCount',
    'retentionTimes',
    'peakAreas',
    'resolution',
    'tailingFactors',
    'quantMethod',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Parameters["Key Parameters"]
        A["tR = Retention Time"]
        B["k = Capacity Factor"]
        C["N = Plates"]
        D["Rs = Resolution"]
    end
    E["Rs = 1.18 × (tR2-tR1)/(w1+w2)"]`,
};

// =============================================================================
// ELECTROCHEMISTRY
// =============================================================================

/**
 * Cyclic Voltammetry template
 */
export const cyclicVoltammetry: DiagramTemplate = {
  id: 'analytical-cyclic-voltammetry',
  name: 'Cyclic Voltammetry Analysis',
  description: 'Electrochemical characterization using CV',
  domain: 'chemistry',
  promptTemplate: `Create a cyclic voltammetry diagram:
- Working electrode: {{workingElectrode}}
- Reference electrode: {{referenceElectrode}}
- Electrolyte: {{electrolyte}}
- Scan rate: {{scanRate}}
- Redox potentials: {{redoxPotentials}}
- Reversibility: {{reversibility}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'workingElectrode',
    'referenceElectrode',
    'electrolyte',
    'scanRate',
    'redoxPotentials',
    'reversibility',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CV["CV Parameters"]
        A["Epa: Anodic peak potential"]
        B["Epc: Cathodic peak potential"]
        C["ΔEp = 59/n mV (reversible)"]
        D["ipa/ipc = 1 (reversible)"]
    end`,
};

/**
 * Potentiometric Titration template
 */
export const potentiometricTitration: DiagramTemplate = {
  id: 'analytical-potentiometric',
  name: 'Potentiometric Titration',
  description: 'Endpoint detection using potential measurements',
  domain: 'chemistry',
  promptTemplate: `Create a potentiometric titration diagram:
- Analyte: {{analyte}}
- Titrant: {{titrant}}
- Indicator electrode: {{indicatorElectrode}}
- Reference electrode: {{referenceElectrode}}
- Equivalence point: {{equivalencePoint}}
- Derivative plot: {{derivativePlot}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'analyte',
    'titrant',
    'indicatorElectrode',
    'referenceElectrode',
    'equivalencePoint',
    'derivativePlot',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Add titrant"] --> B["Measure E"]
    B --> C["Plot E vs V"]
    C --> D["Find inflection"]
    D --> E["Equivalence point"]
    style E fill:#4ecdc4`,
};

// =============================================================================
// METHOD VALIDATION
// =============================================================================

/**
 * Calibration Curve template
 */
export const calibrationCurve: DiagramTemplate = {
  id: 'analytical-calibration-curve',
  name: 'Calibration Curve',
  description: 'Standard calibration for quantitative analysis',
  domain: 'chemistry',
  promptTemplate: `Create a calibration curve diagram:
- Analyte: {{analyte}}
- Concentration range: {{concentrationRange}}
- Number of standards: {{standardCount}}
- Linear equation: {{linearEquation}}
- R-squared value: {{rSquared}}
- Detection limit: {{detectionLimit}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'analyte',
    'concentrationRange',
    'standardCount',
    'linearEquation',
    'rSquared',
    'detectionLimit',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Calibration["Calibration Parameters"]
        A["y = mx + b"]
        B["R² > 0.999"]
        C["LOD = 3σ/slope"]
        D["LOQ = 10σ/slope"]
    end`,
};

/**
 * Method Validation template
 */
export const methodValidation: DiagramTemplate = {
  id: 'analytical-method-validation',
  name: 'Analytical Method Validation',
  description: 'ICH guidelines for method validation parameters',
  domain: 'chemistry',
  promptTemplate: `Create a method validation diagram:
- Accuracy: {{accuracy}}
- Precision (repeatability): {{precision}}
- Specificity: {{specificity}}
- Linearity: {{linearity}}
- Range: {{range}}
- Robustness: {{robustness}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'accuracy',
    'precision',
    'specificity',
    'linearity',
    'range',
    'robustness',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph ICH["ICH Validation Parameters"]
        A["Accuracy: % Recovery"]
        B["Precision: %RSD"]
        C["Specificity: Peak purity"]
        D["Linearity: R² > 0.999"]
        E["LOD/LOQ"]
        F["Robustness"]
    end`,
};

/**
 * Quality Control Chart template
 */
export const qcChart: DiagramTemplate = {
  id: 'analytical-qc-chart',
  name: 'Quality Control Chart',
  description: 'Levey-Jennings chart for QC monitoring',
  domain: 'chemistry',
  promptTemplate: `Create a QC chart diagram:
- Control material: {{controlMaterial}}
- Target value: {{targetValue}}
- Standard deviation: {{stdDev}}
- Warning limits: {{warningLimits}}
- Control limits: {{controlLimits}}
- Westgard rules: {{westgardRules}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'controlMaterial',
    'targetValue',
    'stdDev',
    'warningLimits',
    'controlLimits',
    'westgardRules',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph LJ["Levey-Jennings Chart"]
        A["+3SD: UCL"]
        B["+2SD: Warning"]
        C["Mean"]
        D["-2SD: Warning"]
        E["-3SD: LCL"]
    end
    style A fill:#ff6b6b
    style E fill:#ff6b6b
    style C fill:#4ecdc4`,
};

// =============================================================================
// SAMPLE PREPARATION
// =============================================================================

/**
 * Sample Extraction template
 */
export const sampleExtraction: DiagramTemplate = {
  id: 'analytical-sample-extraction',
  name: 'Sample Extraction Protocol',
  description: 'Liquid-liquid or solid-phase extraction procedures',
  domain: 'chemistry',
  promptTemplate: `Create a sample extraction diagram:
- Sample matrix: {{sampleMatrix}}
- Extraction method: {{extractionMethod}}
- Solvent system: {{solventSystem}}
- Extraction efficiency: {{efficiency}}
- Clean-up steps: {{cleanupSteps}}
- Recovery: {{recovery}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleMatrix',
    'extractionMethod',
    'solventSystem',
    'efficiency',
    'cleanupSteps',
    'recovery',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Sample"] --> B["Add extraction solvent"]
    B --> C["Mix/Shake"]
    C --> D["Phase separation"]
    D --> E["Collect organic phase"]
    E --> F["Evaporate/Reconstitute"]
    F --> G["Analysis"]`,
};

/**
 * Titration Procedure template
 */
export const titrationProcedure: DiagramTemplate = {
  id: 'analytical-titration',
  name: 'Titration Procedure',
  description: 'Volumetric analysis procedure and calculations',
  domain: 'chemistry',
  promptTemplate: `Create a titration procedure diagram:
- Titration type: {{titrationType}}
- Analyte: {{analyte}}
- Titrant: {{titrant}}
- Indicator: {{indicator}}
- Endpoint: {{endpoint}}
- Calculations: {{calculations}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'titrationType',
    'analyte',
    'titrant',
    'indicator',
    'endpoint',
    'calculations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pipette analyte"] --> B["Add indicator"]
    B --> C["Fill burette with titrant"]
    C --> D["Titrate to endpoint"]
    D --> E["Record volume"]
    E --> F["Calculate concentration"]
    style D fill:#ffd93d`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All analytical chemistry templates
 */
export const analyticalTemplates: DiagramTemplate[] = [
  // Spectroscopy
  uvVisSpectroscopy,
  irSpectroscopy,
  nmrSpectroscopy,
  massSpectrometry,
  // Chromatography
  hplcMethod,
  gcMethod,
  chromatogramAnalysis,
  // Electrochemistry
  cyclicVoltammetry,
  potentiometricTitration,
  // Method Validation
  calibrationCurve,
  methodValidation,
  qcChart,
  // Sample Preparation
  sampleExtraction,
  titrationProcedure,
];

export default analyticalTemplates;
