import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)

async function exportToPDF() {
    console.log('Starting PDF export...')

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    // Navigate to the presentation
    await page.goto('http://localhost:3000?print-pdf', {
        waitUntil: 'networkidle'
    })

    // Wait for Reveal.js to be ready
    await page.waitForTimeout(2000)

    // Create dist directory if it doesn't exist
    const distDir = join(__dirname, '..', 'dist')
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
    }

    // Export to PDF
    const pdfPath = join(distDir, 'presentation.pdf')
    await page.pdf({
        path: pdfPath,
        width: '1920px',
        height: '1080px',
        printBackground: true,
        pageRanges: '1-9'
    })

    console.log(`PDF exported successfully to: ${pdfPath}`)

    await browser.close()
}

exportToPDF().catch(console.error)