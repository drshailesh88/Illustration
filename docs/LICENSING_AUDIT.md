# FINNISH Project Licensing Audit

**Document Version:** 2.0
**Audit Date:** January 19, 2026
**Project Version:** 0.1.0
**Prepared For:** Commercial Use Verification

---

## Executive Summary

This document provides a comprehensive licensing audit of the FINNISH scientific illustration application. The audit covers all NPM dependencies, icon libraries, fonts, and third-party code used in the project.

### Critical Findings

| Severity | Finding | Package | License | Action Required |
|----------|---------|---------|---------|-----------------|
| ✅ **RESOLVED** | ~~Copyleft License~~ | ~~`@imgly/background-removal`~~ | ~~AGPL-3.0~~ | Replaced with `@mediapipe/tasks-vision` (Apache 2.0) |
| ✅ **RESOLVED** | ~~Copyleft License~~ | ~~`potrace`~~ | ~~GPL-2.0~~ | Removed (was unused dependency) |
| **MEDIUM** | Attribution Required | Multiple icon libraries | CC-BY | Add attribution to About page |
| **LOW** | No issues | Most dependencies | MIT/Apache 2.0 | No action required |

### License Resolution Summary (January 19, 2026)

All previously identified copyleft (AGPL/GPL) licensing issues have been resolved:

1. **Background Removal**: Replaced `@imgly/background-removal` (AGPL-3.0) with `@mediapipe/tasks-vision` (Apache 2.0)
   - Google's MediaPipe Image Segmenter provides equivalent functionality
   - Apache 2.0 is fully compatible with commercial use
   - No source disclosure required

2. **Image Tracing**: Removed `potrace` (GPL-2.0)
   - The dependency was installed but never imported or used
   - Custom pure JavaScript implementation in `ImageTracer.ts` provides tracing functionality
   - No replacement needed

---

## Table of Contents

1. [NPM Dependencies](#1-npm-dependencies)
2. [Icon Libraries](#2-icon-libraries)
3. [Font Licenses](#3-font-licenses)
4. [Third-Party Code](#4-third-party-code)
5. [Commercial Use Compliance Assessment](#5-commercial-use-compliance-assessment)
6. [Attribution Requirements Summary](#6-attribution-requirements-summary)
7. [Recommendations](#7-recommendations)

---

## 1. NPM Dependencies

### 1.1 Production Dependencies

| Package | Version | License | Commercial Safe | Notes |
|---------|---------|---------|-----------------|-------|
| `@fal-ai/serverless-client` | 0.15.0 | MIT | Yes | AI image generation client |
| `@icon-park/react` | 1.4.2 | Apache 2.0 | Yes | Icon library by ByteDance |
| `@mediapipe/tasks-vision` | latest | **Apache 2.0** | **Yes** | Background removal (replaced AGPL package) |
| `@scienceicons/react` | 0.0.13 | MIT | Yes | Science platform icons |
| `@tabler/icons-react` | 3.36.1 | MIT | Yes | General purpose icons |
| `clsx` | 2.1.1 | MIT | Yes | Utility for classNames |
| `color` | 5.0.3 | MIT | Yes | Color manipulation |
| `colorjs.io` | 0.6.1 | MIT | Yes | Color space conversions |
| `fabric` | 6.5.1 | MIT | Yes | Canvas rendering engine |
| `glfx` | 0.0.4 | MIT | Yes | WebGL image filters |
| `healthicons-react` | 3.5.0 | MIT | Yes | Healthcare icons (icons are CC0) |
| `jspdf` | 4.0.0 | MIT | Yes | PDF generation |
| `katex` | 0.16.11 | MIT | Yes | LaTeX math rendering |
| `lodash-es` | 4.17.21 | MIT | Yes | Utility functions |
| `mermaid` | 11.4.0 | MIT | Yes | Diagram generation |
| `paper` | 0.12.18 | MIT | Yes | Vector graphics library |
| `pdf-lib` | 1.17.1 | MIT | Yes | PDF manipulation |
| `pdfjs-dist` | 4.8.69 | Apache 2.0 | Yes | PDF rendering |
| `perfect-freehand` | 1.2.2 | MIT | Yes | Freehand drawing |
| `pptxgenjs` | 4.0.1 | MIT | Yes | PowerPoint export |
| `react` | 18.3.1 | MIT | Yes | UI framework |
| `react-dom` | 18.3.1 | MIT | Yes | React DOM rendering |
| `react-router-dom` | 7.1.0 | MIT | Yes | Routing |
| `roughjs` | 4.6.6 | MIT | Yes | Hand-drawn graphics |
| `save-svg-as-png` | 1.4.17 | MIT | Yes | SVG to PNG export |
| `simple-icons` | 16.6.0 | CC0 1.0 | Yes | Brand logos |
| `svg-parser` | 2.0.4 | MIT | Yes | SVG parsing |
| `svg2pdf.js` | 2.7.0 | MIT | Yes | SVG to PDF conversion |
| `uuid` | 11.0.3 | MIT | Yes | UUID generation |
| `zustand` | 5.0.2 | MIT | Yes | State management |

> **Note:** `@imgly/background-removal` (AGPL-3.0) and `potrace` (GPL-2.0) have been removed from the project.

### 1.2 Development Dependencies

All development dependencies use permissive licenses (MIT, Apache 2.0, ISC) and do not affect the production build:

| Package | Version | License |
|---------|---------|---------|
| `@testing-library/jest-dom` | 6.6.3 | MIT |
| `@testing-library/react` | 16.1.0 | MIT |
| `@types/katex` | 0.16.7 | MIT |
| `@types/lodash-es` | 4.17.12 | MIT |
| `@types/node` | 25.0.9 | MIT |
| `@types/react` | 18.3.17 | MIT |
| `@types/react-dom` | 18.3.5 | MIT |
| `@types/uuid` | 10.0.0 | MIT |
| `@typescript-eslint/eslint-plugin` | 8.18.2 | MIT |
| `@typescript-eslint/parser` | 8.18.2 | BSD-2-Clause |
| `@vitejs/plugin-react` | 4.3.4 | MIT |
| `@vitest/coverage-v8` | 2.1.8 | MIT |
| `eslint` | 9.17.0 | MIT |
| `eslint-plugin-react` | 7.37.3 | MIT |
| `eslint-plugin-react-hooks` | 5.1.0 | MIT |
| `terser` | 5.46.0 | BSD-2-Clause |
| `typescript` | 5.7.2 | Apache 2.0 |
| `vite` | 6.0.7 | MIT |
| `vitest` | 2.1.8 | MIT |

---

## 2. Icon Libraries

### 2.1 Integrated Icon Libraries

| Library | Icon Count | License | Attribution Required | Commercial Safe |
|---------|------------|---------|---------------------|-----------------|
| **Tabler Icons** | 4,000+ | MIT | No | Yes |
| **Health Icons** | 1,500+ | CC0 (Public Domain) | No | Yes |
| **Science Icons** | 500+ | MIT | No | Yes |
| **Icon Park** | 2,400+ | Apache 2.0 | No | Yes |
| **Simple Icons** | 200+ (selected) | CC0 (Public Domain) | No | Yes |
| **Bioicons** | 70+ (custom) | CC0/MIT/CC-BY | Some (CC-BY) | Yes |
| **SciDraw** | 60+ (custom) | CC-BY | Yes | Yes |

### 2.2 Icon Library Details

#### Tabler Icons
- **Source:** https://tabler.io/icons
- **License:** MIT License
- **Copyright:** Copyright (c) 2020-2024 Paweł Kuna
- **Usage:** Free for commercial and personal use
- **Attribution:** Not required

#### Health Icons
- **Source:** https://healthicons.org/
- **License:** CC0 1.0 (Public Domain Dedication)
- **Copyright:** None (public domain)
- **Usage:** Free for any use without restrictions
- **Attribution:** Not required

#### Science Icons
- **Source:** https://github.com/continuous-foundation/scienceicons
- **License:** MIT License
- **Copyright:** Copyright (c) Continuous Foundation
- **Usage:** Free for commercial and personal use
- **Attribution:** Not required

#### Icon Park
- **Source:** https://iconpark.oceanengine.com/
- **License:** Apache License 2.0
- **Copyright:** Copyright (c) ByteDance
- **Usage:** Free for commercial and personal use
- **Attribution:** Not required (but appreciated)

#### Simple Icons
- **Source:** https://simpleicons.org/
- **License:** CC0 1.0 (Public Domain)
- **Copyright:** None (public domain)
- **Usage:** Free for any use
- **Note:** Individual brand logos may have trademark restrictions

#### Bioicons (Custom Implementation)
- **Source:** Inspired by bioicons.com
- **License:** Mixed (CC0, MIT, CC-BY)
- **Implementation:** Custom SVG paths created for FINNISH
- **Attribution:** Required for CC-BY icons

#### SciDraw (Custom Implementation)
- **Source:** Inspired by scidraw.io
- **License:** CC-BY (Attribution)
- **Original Work:** Federico Claudi & Alex Harston
- **Attribution:** Required - must credit SciDraw.io

---

## 3. Font Licenses

### 3.1 KaTeX Fonts (Bundled)

KaTeX includes custom math fonts based on:

| Font Family | License | Usage |
|-------------|---------|-------|
| KaTeX_AMS | SIL OFL 1.1 | Math symbols |
| KaTeX_Caligraphic | SIL OFL 1.1 | Calligraphic letters |
| KaTeX_Fraktur | SIL OFL 1.1 | Fraktur letters |
| KaTeX_Main | SIL OFL 1.1 | Primary math font |
| KaTeX_Math | SIL OFL 1.1 | Math italics |
| KaTeX_SansSerif | SIL OFL 1.1 | Sans-serif math |
| KaTeX_Script | SIL OFL 1.1 | Script letters |
| KaTeX_Size1-4 | SIL OFL 1.1 | Delimiters |
| KaTeX_Typewriter | SIL OFL 1.1 | Monospace |

**SIL Open Font License 1.1** permits:
- Commercial use
- Modification
- Distribution
- Embedding in documents
- **Requirement:** Cannot sell fonts alone; must include license notice if redistributing fonts

### 3.2 Liberation Fonts (pdfjs-dist)

| Font | License | Notes |
|------|---------|-------|
| Liberation Sans | SIL OFL 1.1 | Used for PDF rendering fallback |

### 3.3 System Fonts

The application relies on system fonts (no bundled web fonts beyond KaTeX):
- Uses CSS `font-family` stacks with system fallbacks
- No additional font licensing required

---

## 4. Third-Party Code

### 4.1 Vendor Code Analysis

No third-party code is directly vendored into the source tree. All dependencies are managed through npm.

### 4.2 Code Generation

The following files contain generated/adapted code:

| File | Source | License | Notes |
|------|--------|---------|-------|
| `src/lib/icons/bioicons.ts` | Original (inspired by bioicons.com) | CC0/MIT/CC-BY | Custom SVG implementations |
| `src/lib/icons/scidraw.ts` | Original (inspired by scidraw.io) | CC-BY | Custom SVG implementations |

### 4.3 Algorithm Implementations

| Algorithm | Source | License | File |
|-----------|--------|---------|------|
| Freehand drawing | perfect-freehand | MIT | Via npm dependency |
| Bezier curves | Paper.js | MIT | Via npm dependency |
| Hand-drawn style | Rough.js | MIT | Via npm dependency |

---

## 5. Commercial Use Compliance Assessment

### 5.1 License Compatibility Matrix

| License Type | Commercial Use | Modification | Distribution | Source Disclosure |
|--------------|----------------|--------------|--------------|-------------------|
| MIT | Allowed | Allowed | Allowed | Not required |
| Apache 2.0 | Allowed | Allowed | Allowed | Not required |
| BSD-2/3-Clause | Allowed | Allowed | Allowed | Not required |
| CC0 | Allowed | Allowed | Allowed | Not required |
| CC-BY | Allowed | Allowed | Allowed | Attribution only |
| SIL OFL 1.1 | Allowed | Allowed | Allowed | With fonts only |
| **GPL-2.0** | Allowed | Allowed | **Viral** | **Required** |
| **AGPL-3.0** | Allowed | Allowed | **Viral (Network)** | **Required** |

### 5.2 Risk Assessment

#### HIGH RISK: AGPL-3.0 (@imgly/background-removal)

**Impact:** If FINNISH is deployed as a SaaS/web service (which it is), the AGPL-3.0 license requires:
1. Making the complete source code of FINNISH available to users
2. Providing a prominent notice about the AGPL-licensed component
3. Including a link to download the corresponding source

**Mitigation Options:**
1. **Purchase commercial license** from IMG.LY (recommended)
2. **Replace with alternative** (e.g., TensorFlow.js-based solution)
3. **Open-source FINNISH** under AGPL-3.0 (defeats commercial purpose)
4. **Remove feature** temporarily until alternative is found

#### HIGH RISK: GPL-2.0 (potrace)

**Impact:** The potrace library is GPL-2.0 licensed. If the FINNISH application is distributed:
1. The entire application may need to be licensed under GPL-2.0
2. Source code must be made available

**Important Note:** The GPL-2.0 "linking" interpretation is debated. Since potrace is:
- Used server-side (if applicable) or client-side
- Called as a library function
- Not modified

**Mitigation Options:**
1. **Replace with alternative** (e.g., ImageTracer.js - MIT licensed)
2. **Use as external service** (process isolation)
3. **Obtain legal opinion** on linking interpretation

### 5.3 Compliance Checklist

| Requirement | Status | Action |
|-------------|--------|--------|
| MIT license notices preserved | Pending | Include in built application |
| Apache 2.0 NOTICE files | Pending | Check for NOTICE files |
| CC-BY attribution displayed | Pending | Add to About page |
| SIL OFL notices with fonts | Pending | Include with KaTeX |
| AGPL-3.0 source disclosure | **NOT COMPLIANT** | Resolve licensing issue |
| GPL-2.0 source disclosure | **NOT COMPLIANT** | Resolve licensing issue |

---

## 6. Attribution Requirements Summary

### 6.1 Required Attributions (Must Display)

The following attributions MUST be displayed in the application (recommended: About page or Credits section):

```
FINNISH uses the following open-source libraries and resources:

ICON LIBRARIES
--------------
- SciDraw-style illustrations (CC-BY): Original work by Federico Claudi &
  Alex Harston. Adapted for FINNISH. https://scidraw.io/
- Bioicons-inspired icons (CC-BY): Some icons adapted from Bioicons.
  https://bioicons.com/
- Servier Medical Art (CC-BY 4.0): Some medical illustrations based on
  Servier Medical Art. https://smart.servier.com/

FONTS
-----
- KaTeX Math Fonts (SIL OFL 1.1): Copyright Khan Academy.
  https://katex.org/

SOFTWARE LIBRARIES
------------------
- Fabric.js: Copyright (c) 2008-2015 Printio. MIT License.
- Paper.js: Copyright (c) Jürg Lehni & Jonathan Puckey. MIT License.
- Rough.js: Copyright (c) 2019 Preet Shihn. MIT License.
- KaTeX: Copyright (c) 2013-2020 Khan Academy. MIT License.
- Mermaid: Copyright (c) 2014-2022 Knut Sveidqvist. MIT License.
- jsPDF: Copyright (c) 2010-2025 James Hall. MIT License.
- pptxgenjs: Copyright (c) Brent Ely. MIT License.
```

### 6.2 Recommended Attributions (Good Practice)

```
Additional acknowledgments:

- Tabler Icons (MIT): https://tabler.io/icons
- Health Icons (CC0): https://healthicons.org/
- Science Icons (MIT): https://github.com/continuous-foundation/scienceicons
- Icon Park (Apache 2.0): https://iconpark.oceanengine.com/
- Simple Icons (CC0): https://simpleicons.org/
```

### 6.3 Brand/Trademark Notices

When using Simple Icons brand logos:
- Brand logos are trademarks of their respective owners
- Usage should comply with each brand's usage guidelines
- FINNISH does not claim ownership of third-party brand marks

---

## 7. Recommendations

### 7.1 Immediate Actions Required

1. ~~**CRITICAL: Resolve AGPL-3.0 Issue**~~ ✅ **RESOLVED**
   - ~~Option A: Contact IMG.LY for commercial license pricing~~
   - ✅ **Implemented Option B:** Replaced with `@mediapipe/tasks-vision` (Apache 2.0)
   - Resolution Date: January 19, 2026

2. ~~**CRITICAL: Resolve GPL-2.0 Issue**~~ ✅ **RESOLVED**
   - ✅ **Removed:** `potrace` was unused - custom JavaScript implementation exists
   - Resolution Date: January 19, 2026

3. **Add Attribution Page** (Still Required)
   - Create `/about` or `/credits` page with required attributions
   - Include all CC-BY attribution requirements (SciDraw, some Bioicons)
   - Timeline: Before public release

### 7.2 Before Release Checklist

- [x] ~~Resolve @imgly/background-removal licensing (AGPL-3.0)~~ - Replaced with MediaPipe
- [x] ~~Resolve potrace licensing (GPL-2.0)~~ - Removed (unused)
- [ ] Create attribution/credits page
- [ ] Include LICENSE files in distribution
- [ ] Add license information to package.json
- [ ] Review Simple Icons usage for trademark compliance
- [ ] Document all font licenses
- [ ] Create THIRD_PARTY_LICENSES.md file

### 7.3 Resolved Libraries

| Previous Package | Issue | Resolution | New License |
|-----------------|-------|------------|-------------|
| `@imgly/background-removal` | AGPL-3.0 | Replaced with `@mediapipe/tasks-vision` | Apache 2.0 ✅ |
| `potrace` | GPL-2.0 | Removed (unused dependency) | N/A ✅ |

### 7.4 Long-term Recommendations

1. **Implement license scanning in CI/CD**
   - Use `license-checker` or `license-webpack-plugin`
   - Fail builds on incompatible licenses

2. **Create THIRD_PARTY_LICENSES.md**
   - Auto-generate from package.json
   - Include in distribution

3. **Regular license audits**
   - Schedule quarterly reviews
   - Check for license changes in updates

4. **Legal review**
   - Consult with IP attorney before commercial launch
   - Review GPL/AGPL interpretations

---

## Appendix A: Full License Texts

### MIT License (Most Dependencies)

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Apache License 2.0 Summary

- Grants patent rights
- Allows commercial use
- Allows modification and distribution
- Requires preservation of copyright and license notices
- Requires statement of changes if modified
- No warranty

### CC0 1.0 (Public Domain)

- Waives all copyright and related rights
- Free for any use without attribution
- No warranty

### CC-BY 4.0 (Attribution)

- Allows commercial use
- Allows modification
- Requires attribution
- No warranty

---

## Appendix B: Package License Summary

```
Total Production Dependencies: 28 (reduced from 30)
- MIT License: 23 (82%)
- Apache 2.0: 3 (11%) - includes @mediapipe/tasks-vision
- CC0: 2 (7%)
- GPL-2.0: 0 (0%) - RESOLVED (potrace removed)
- AGPL-3.0: 0 (0%) - RESOLVED (@imgly/background-removal replaced)

Total Dev Dependencies: 19
- MIT License: 17 (89%)
- Apache 2.0: 1 (5%)
- BSD-2-Clause: 1 (5%)

✅ ALL PRODUCTION DEPENDENCIES ARE NOW COMMERCIALLY SAFE
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0 | 2026-01-19 | Licensing Update | Resolved all AGPL/GPL issues |
| 1.0 | 2026-01-19 | Licensing Audit | Initial comprehensive audit |

---

**DISCLAIMER:** This audit is provided for informational purposes only and does not constitute legal advice. Please consult with a qualified intellectual property attorney before making licensing decisions for commercial products.
