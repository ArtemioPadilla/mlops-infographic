/**
 * Script de Validación de content.json
 * Verifica estructura y completitud del contenido
 *
 * Uso: node scripts/validate-content.js
 */

const fs = require('fs');
const path = require('path');

function validateContent() {
    console.log('🔍 Validando content.json...\n');

    const contentPath = path.join(__dirname, '../data/content.json');

    // Verificar que el archivo existe
    if (!fs.existsSync(contentPath)) {
        console.error('❌ Error: data/content.json no encontrado');
        process.exit(1);
    }

    try {
        // Leer y parsear JSON
        const rawData = fs.readFileSync(contentPath, 'utf8');
        const content = JSON.parse(rawData);

        let errors = [];
        let warnings = [];

        // Validar estructura principal
        console.log('📋 Validando estructura...');

        const requiredKeys = ['metadata', 'introduction', 'sections', 'benefits', 'references', 'footer'];
        requiredKeys.forEach(key => {
            if (!content[key]) {
                errors.push(`Falta clave requerida: ${key}`);
            }
        });

        // Validar metadata
        if (content.metadata) {
            const metadataKeys = ['title', 'subtitle', 'author', 'date', 'version'];
            metadataKeys.forEach(key => {
                if (!content.metadata[key]) {
                    warnings.push(`Metadata falta: ${key}`);
                }
            });
        }

        // Validar secciones
        if (content.sections && Array.isArray(content.sections)) {
            console.log(`📚 Validando ${content.sections.length} secciones...`);

            content.sections.forEach((section, idx) => {
                const requiredSectionKeys = ['id', 'title', 'description', 'icon', 'color'];
                requiredSectionKeys.forEach(key => {
                    if (!section[key]) {
                        errors.push(`Sección ${idx} (${section.id || 'sin id'}) falta: ${key}`);
                    }
                });

                // Validar formato de color
                if (section.color && !/^#[0-9A-Fa-f]{6}$/.test(section.color)) {
                    warnings.push(`Sección ${section.id}: color inválido (${section.color})`);
                }
            });
        } else {
            errors.push('sections debe ser un array');
        }

        // Validar referencias
        if (content.references && Array.isArray(content.references)) {
            console.log(`📖 Validando ${content.references.length} referencias...`);

            content.references.forEach((ref, idx) => {
                if (!ref.type || !ref.title) {
                    warnings.push(`Referencia ${idx} falta type o title`);
                }
            });
        }

        // Validar benefits
        if (content.benefits && content.benefits.items) {
            console.log(`✨ Validando ${content.benefits.items.length} beneficios...`);

            content.benefits.items.forEach((benefit, idx) => {
                if (!benefit.benefit || !benefit.description || !benefit.metric) {
                    warnings.push(`Beneficio ${idx} incompleto`);
                }
            });
        }

        // Mostrar resultados
        console.log('\n' + '='.repeat(50));

        if (errors.length > 0) {
            console.log('\n❌ ERRORES:');
            errors.forEach(err => console.log(`  • ${err}`));
        }

        if (warnings.length > 0) {
            console.log('\n⚠️  ADVERTENCIAS:');
            warnings.forEach(warn => console.log(`  • ${warn}`));
        }

        if (errors.length === 0 && warnings.length === 0) {
            console.log('\n✅ Validación exitosa! El contenido está correcto.');
            console.log(`\n📊 Estadísticas:`);
            console.log(`   • Secciones: ${content.sections?.length || 0}`);
            console.log(`   • Referencias: ${content.references?.length || 0}`);
            console.log(`   • Beneficios: ${content.benefits?.items?.length || 0}`);
        } else {
            console.log(`\n📊 Resumen: ${errors.length} errores, ${warnings.length} advertencias`);
            if (errors.length > 0) {
                process.exit(1);
            }
        }

        console.log('\n' + '='.repeat(50));

    } catch (error) {
        console.error('\n❌ Error parseando JSON:');
        console.error(error.message);
        process.exit(1);
    }
}

// Ejecutar
validateContent();
