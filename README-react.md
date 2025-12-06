# IPQA Manufacturing Review Meeting - React Presentation

Professional React + Reveal.js presentation for the December 15-16, 2025 MRM meeting.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 + Vite for blazing fast performance
- **Reveal.js Integration**: Professional slide transitions and navigation
- **Interactive Charts**: Chart.js visualizations with smooth animations
- **Responsive Design**: Optimized for all screen sizes and projectors
- **Professional Styling**: Custom CSS with gradient backgrounds and card layouts
- **PDF Export**: Generate PDF for offline distribution
- **Keyboard Controls**: Full keyboard navigation support

## 📋 What's Included

### Slides
1. **Title Slide**: KPI summary cards with live data
2. **Executive Summary**: Two-column layout with metrics and achievements
3. **Agenda**: Clear meeting structure
4. **Line Clearance**: Interactive bar chart with metric cards
5. **Incident Trend**: Stacked bar chart showing severity breakdown
6. **Calibration Throughput**: Monthly calibration counts
7. **Process Improvements**: Split view of completed vs in-progress actions
8. **Recommendations**: Structured action items for Q4/Q1
9. **Closing**: Thank you slide with next meeting details

### Data Visualizations
- Line clearance approvals (Jul-Nov): Stacked bar chart
- Incident trends (Jan-Nov): Severity breakdown
- Calibration throughput (Jul-Nov): Monthly counts
- KPI cards with real-time calculations
- Color-coded metric cards
- Achievement badges with icons

## 🛠 Setup

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The presentation will automatically open at `http://localhost:3000`

## 🎮 Navigation Controls

- **Arrow Keys**: Navigate between slides
- **Space**: Next slide
- **Shift + Space**: Previous slide
- **ESC**: Slide overview
- **F**: Fullscreen mode
- **S**: Speaker notes (if enabled)
- **?**: Help menu

## 📊 Data Source

All data is imported from `src/data.js`:
- Line clearance metrics (Jul-Nov 2025)
- Incident data by severity (Jan-Nov 2025)
- Calibration counts (Jul-Nov 2025)
- Process improvement actions with status

To update data, edit `src/data.js` and the charts will automatically refresh.

## 🏗 Build for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

Output will be in the `dist/` directory.

## 📄 PDF Export

```bash
# Generate PDF (requires Playwright)
npm run export-pdf
```

PDF will be saved to `dist/presentation.pdf`

## 🌐 Deployment

### GitHub Pages

```bash
npm run build
# Push dist/ folder to gh-pages branch
```

### Azure Static Web Apps

```bash
npm run build
# Deploy dist/ folder to Azure SWA
```

### Local Sharing

```bash
npm run build
# Share the dist/ folder via USB or network
# Open index.html in any modern browser
```

## 📁 Project Structure

```
src/
├── main.jsx              # React entry point
├── Presentation.jsx      # Main presentation component
├── styles.css            # Global styles and animations
├── data.js              # All data and calculations
└── slides/
    ├── TitleSlide.jsx
    ├── ExecutiveSummary.jsx
    ├── Agenda.jsx
    ├── LineClearance.jsx
    ├── IncidentTrend.jsx
    ├── CalibrationThroughput.jsx
    ├── ProcessImprovements.jsx
    ├── Recommendations.jsx
    └── ClosingSlide.jsx
```

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles.css`:
```css
:root {
  --primary-blue: #1e40af;
  --secondary-blue: #3b82f6;
  --success-green: #10b981;
  --warning-amber: #f59e0b;
  --danger-red: #ef4444;
}
```

### Transitions
Modify Reveal.js config in `src/Presentation.jsx`:
```javascript
transition: 'slide', // slide, fade, convex, concave, zoom
transitionSpeed: 'default', // default, fast, slow
```

## 💡 Tips

1. **Presenter Mode**: Press `S` during presentation for speaker notes
2. **Overview**: Press `ESC` to see all slides at once
3. **Fullscreen**: Press `F` for fullscreen mode
4. **Print**: Use `?print-pdf` URL parameter for print layout
5. **Remote Control**: Enable with `--remote` flag (see Reveal.js docs)

## 🐛 Troubleshooting

**Charts not showing:**
- Ensure dev server is running
- Check browser console for errors
- Verify data.js is properly formatted

**PDF export fails:**
- Run `playwright install chromium`
- Ensure dev server is running before export
- Check port 3000 is available

**Build errors:**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📞 Support

For issues or questions about the presentation setup, check:
- Vite documentation: https://vitejs.dev
- Reveal.js documentation: https://revealjs.com
- Chart.js documentation: https://www.chartjs.org

---

**Ready for your December 15-16, 2025 meeting!** 🎉
