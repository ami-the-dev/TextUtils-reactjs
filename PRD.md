PRD: Text-Utils — Web-Based Text Manipulation & SEO Toolkit
1. Product Overview
A browser-based text utility suite providing text transformation, analysis, content SEO auditing, keyword research simulation, and plagiarism checking — all client-side with no backend dependency.

2. Tech Stack
Layer	Technology	Version
Framework	React (Create React App)	^18.2.0
Routing	react-router-dom	^5.0.0
UI Kit	Bootstrap 5 (CDN)	5.2.0
Icons	lucide-react	^0.523.0
PDF Parsing	pdfjs-dist	^3.11.174
DOCX Parsing	mammoth	^1.9.1
QR Generation	qrcode.react	^4.2.0
3. Routes
Path	Component	Props
/	TextForm (Home)	showAlert, heading, mode
/about	About	mode
/GoogleKeywordPlanner	GoogleKeywordPlanner	—
/PlagiarismChecker	PlagiarismChecker	—
/SeoTool	SeoMatrics	—
4. Feature Specifications
4.1 Text Transformation (TextForm)
Uppercase — Convert all text to uppercase
Lowercase — Convert all text to lowercase
Capitalize — Capitalize first letter of each word
Remove Extra Spaces — Collapse multiple spaces to single
Clear — Clear entire text content
Copy — Copy text to clipboard via navigator.clipboard
Download — Download text as .txt file via Blob URL
Text-to-Speech — Read text aloud using Web Speech API (max 1000 words, English voice preference)
Embed URLs — Auto-detect YouTube/Vimeo URLs; convert to iframe embed code
QR Code — Generate QR code from text using qrcode.react
URL Find & Replace — Find/replace URLs via regex
4.2 Analytics (TextForm)
Word count, character count, estimated reading time (0.08 min/word).

4.3 Dark/Light Theme (App + Navbar)
Toggle switch in navbar
Default: dark mode (#09090B background)
CSS custom properties for full theme coverage
Recursion 2026 color palette (violet→cyan gradient accent, zinc neutrals)
4.4 Alert System (App + Alert)
Global toast notification with auto-dismiss (1.5s). Types: success, danger.

4.5 Keyword Planner
Input keyword → simulated 1s API call → 4 mock suggestions + random monthly search volume + 12-month trend bar chart. Simulated

4.6 Plagiarism Checker
File upload: .txt, .docx (mammoth), .pdf (pdfjs-dist). Simulated 1.5s check → random uniqueness % + mock sources. Simulated

4.7 SEO Tool (SeoMatrics)
External API: Microlink.io. Sidebar (13 features): Content and Indexability implemented. Others are placeholders.

5. Design System
5.1 Color Palette (Recursion 2026)
Token	Light	Dark
--bg-primary	#FAFAFA	#09090B
--bg-surface	#FFFFFF	#18181B
--bg-elevated	#FFFFFF	#27272A
--bg-border	#E4E4E7	#3F3F46
--text-primary	#18181B	#FAFAFA
--text-secondary	#71717A	#A1A1AA
--accent-gradient-from	#7C3AED	#8B5CF6
--accent-gradient-to	#06B6D4	#06B6D4
--success	#10B981	#34D399
--warning	#F59E0B	#FBBF24
--danger	#EF4444	#F87171
5.2 Theming Mechanism
data-theme="dark" on <html> toggles CSS variables
All component colors inherit from CSS variables
Smooth 0.3s transition on background/text color changes
6. Edge Cases & States
State	Handling
Empty text	Actions disabled when text.length === 0
Loading (Keyword Planner)	Simulated 1s delay
Loading (Plagiarism Checker)	Simulated 1.5s delay
Loading (SEO Tool)	Loading state while fetching
Speech unsupported	Alert: "Speech synthesis not supported!"
Alert auto-dismiss	1500ms timeout
Routing mismatch	/seoTool vs /SeoTool
7. External Dependencies & Risks
Dependency	Risk	Mitigation
Microlink.io API	Rate limits, uptime	Retry + fallback UI
Bootstrap CDN	CDN outage	Bundle CSS locally
Web Speech API	Browser varies	Feature detection
mammoth / pdfjs-dist	Large bundle	Code-split on route
8. Future Scope
Upgrade react-router-dom to v6
Integrate real Google Keyword Planner API
Integrate real plagiarism API
Implement remaining SEO sidebar features
Wire structure.js for JSON-LD extraction
Add loading spinners/skeletons
Support .doc files
PDF export for text analysis
Persist theme in localStorage
Unit tests for text transformation
9. Project Structure
src/
├── App.js                    # Root: routing, theme toggle, alert state
├── App.css                   # Legacy CRA styles
├── index.js                  # Entry point
├── index.css                 # Theme CSS variables + global resets
├── components/
│   ├── Navbar.js             # Navigation, theme toggle, color swatches
│   ├── TextForm.js           # All text transformation logic
│   ├── About.js              # Static info accordion
│   ├── Alert.js              # Toast notification component
│   ├── GoogleKeywordPlanner.js  # Simulated keyword research
│   ├── PlagiarismChecker.js     # File upload + simulated plagiarism check
│   ├── SeoMatrics.js         # SEO audit tool (Microlink API)
│   └── structure.js          # Orphaned JSON-LD extractor