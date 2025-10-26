/**
 * Script de Exportación Automática a PDF
 * Usa Puppeteer para generar PDF desde el HTML
 *
 * Uso: node scripts/export-pdf.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function exportToPDF() {
    console.log('🚀 Iniciando exportación a PDF...\n');

    // Verificar que index.html existe
    const htmlPath = path.join(__dirname, '../index.html');
    if (!fs.existsSync(htmlPath)) {
        console.error('❌ Error: index.html no encontrado');
        process.exit(1);
    }

    // Crear directorio output si no existe
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log('📁 Directorio output/ creado');
    }

    try {
        // Lanzar navegador
        console.log('🌐 Lanzando navegador...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Navegar a la página
        console.log('📄 Cargando infografía...');
        const fileUrl = `file://${htmlPath}`;
        await page.goto(fileUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Esperar a que el contenido se cargue completamente
        console.log('⏳ Esperando carga de contenido...');
        await page.waitForSelector('#main-sections', { timeout: 10000 });

        // Pequeña espera adicional para asegurar que todo está renderizado
        await page.waitForTimeout(2000);

        // Configurar PDF
        const pdfPath = path.join(outputDir, 'infografia-mlops.pdf');
        console.log('💾 Generando PDF...');

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '1.5cm',
                right: '1.5cm',
                bottom: '2cm',
                left: '1.5cm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: false
        });

        await browser.close();

        // Verificar tamaño del archivo
        const stats = fs.statSync(pdfPath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log('\n✅ PDF generado exitosamente!');
        console.log(`📊 Ubicación: ${pdfPath}`);
        console.log(`📦 Tamaño: ${fileSizeInMB} MB`);
        console.log('\n🎉 Exportación completada');

    } catch (error) {
        console.error('\n❌ Error durante la exportación:');
        console.error(error.message);
        process.exit(1);
    }
}

// Ejecutar
exportToPDF();
