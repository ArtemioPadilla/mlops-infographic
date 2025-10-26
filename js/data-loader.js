/**
 * MLOps Infografía - Data Loader
 * Loads content from JSON and dynamically populates the HTML
 */

// SVG Icons Library
const icons = {
    intro: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    'code-block': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    'folder-tree': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>`,
    'refresh': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    'git-branch': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7 9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5v5c0 .83.67 1.5 1.5 1.5S7 15.33 7 14.5v-5zm6 0c0-.83-.67-1.5-1.5-1.5h-1C9.67 8 9 8.67 9 9.5S9.67 11 10.5 11h1c.83 0 1.5-.67 1.5-1.5zm4 0c0-.83-.67-1.5-1.5-1.5S14 8.67 14 9.5v5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5z"/></svg>`,
    'chart-line': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>`,
    'repeat': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`,
    'users': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    'toolbox': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6h6v2H9V6zm11 14H4v-3h2v1h2v-1h8v1h2v-1h2v3zm-2-5v-1h-2v1H8v-1H6v1H4v-5h16v5h-2z"/></svg>`,
    'flow': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    'checkmark': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    'star': '★',
    'arrow-right': '→',
    'bullet': '▸'
};

// Main application state
let contentData = null;

/**
 * Initialize the application
 */
async function init() {
    try {
        // Load content
        contentData = await loadContent();

        // Populate all sections
        populateHeader();
        populateIntroduction();
        populateMainSections();
        // populateBenefits(); // Benefits fusionados con introduction
        populateReferences();
        populateFooter();

        // Hide loading overlay
        hideLoading();

        console.log('✅ Infografía cargada exitosamente');
    } catch (error) {
        console.error('❌ Error cargando la infografía:', error);
        showError(error.message);
    }
}

/**
 * Load content from JSON file
 */
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error cargando datos: ${error.message}`);
    }
}

/**
 * Populate header section
 */
function populateHeader() {
    const { metadata } = contentData;

    document.getElementById('main-title').textContent = metadata.title;
    document.getElementById('main-subtitle').textContent = metadata.subtitle;

    // Add decorative SVG to header
    const headerSvg = document.getElementById('header-svg');
    headerSvg.innerHTML = `
        <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.2)" />
        <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.3)" />
        <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.4)" />
        <text x="100" y="110" text-anchor="middle" fill="white" font-size="40" font-weight="bold">ML</text>
    `;
}

/**
 * Populate introduction section
 */
function populateIntroduction() {
    const { introduction } = contentData;

    document.getElementById('intro-title').textContent = introduction.title;
    document.getElementById('intro-description').textContent = introduction.description;

    // Add icon
    const iconContainer = document.getElementById('intro-icon');
    iconContainer.innerHTML = icons[introduction.icon] || icons.intro;

    // Add key stats
    const statsContainer = document.getElementById('key-stats');
    statsContainer.innerHTML = introduction.keyPoints.map(point => `
        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <p class="stat-text">${point}</p>
        </div>
    `).join('');
}

/**
 * Populate main content sections
 */
function populateMainSections() {
    const { sections } = contentData;
    const container = document.getElementById('main-sections');

    sections.forEach(section => {
        const sectionHtml = generateSectionHtml(section);
        container.innerHTML += sectionHtml;
    });
}

/**
 * Generate HTML for a content section based on its type
 */
function generateSectionHtml(section) {
    let contentHtml = '';

    // Section header
    contentHtml += `
        <section class="section content-section" id="section-${section.id}">
            <div class="section-header">
                <div class="icon-container" style="background: linear-gradient(135deg, ${section.color} 0%, ${adjustColor(section.color, 20)} 100%)">
                    ${icons[section.icon] || ''}
                </div>
                <h2>${section.title}</h2>
            </div>
            <p class="section-description">${section.description}</p>
    `;

    // Generate content based on section type
    switch (section.id) {
        case 'oop':
            contentHtml += generateOOPContent(section);
            break;
        case 'structure':
            contentHtml += generateStructureContent(section);
            break;
        case 'refactoring':
            contentHtml += generateRefactoringContent(section);
            break;
        case 'versioning':
            contentHtml += generateVersioningContent(section);
            break;
        case 'mlflow':
            contentHtml += generateMLFlowContent(section);
            break;
        case 'reproducibility':
            contentHtml += generateReproducibilityContent(section);
            break;
        case 'roles':
            contentHtml += generateRolesContent(section);
            break;
        case 'tools':
            contentHtml += generateToolsContent(section);
            break;
        case 'pipeline':
            contentHtml += generatePipelineContent(section);
            break;
        default:
            contentHtml += '<p>Contenido en desarrollo...</p>';
    }

    contentHtml += '</section>';
    return contentHtml;
}

/**
 * Generate OOP section content
 */
function generateOOPContent(section) {
    let html = '<div class="cards-grid">';

    section.principles.forEach(principle => {
        html += `
            <div class="card">
                <h4>${principle.name}</h4>
                <p><strong>Descripción:</strong> ${principle.description}</p>
                <p><strong>Ejemplo:</strong> ${principle.example}</p>
                <p><strong>Beneficio:</strong> ${principle.benefit}</p>
            </div>
        `;
    });

    html += '</div>';

    if (section.bestPractices) {
        html += '<h3>Mejores Prácticas</h3><ul class="card"><li>' +
                section.bestPractices.join('</li><li>') +
                '</li></ul>';
    }

    return html;
}

/**
 * Generate Structure section content
 */
function generateStructureContent(section) {
    let html = `
        <div class="file-tree">
            <div class="file-tree-title">📦 ${section.template}</div>
            <div class="file-tree-item">
                <span class="tree-icon">📂</span>
                <span class="folder-name">project/</span>
            </div>
    `;

    // Determine tree structure connectors
    section.folderStructure.forEach((item, idx) => {
        const isLast = idx === section.folderStructure.length - 1;
        const nextItem = section.folderStructure[idx + 1];

        // Count depth by slashes in name
        const depth = (item.name.match(/\//g) || []).length;
        const isFile = item.isFile || !item.name.endsWith('/');

        // Determine level class
        let levelClass = '';
        let paddingLeft = 0;
        if (depth === 0 || (depth === 1 && item.name.endsWith('/'))) {
            levelClass = 'level-1';
            paddingLeft = 30;
        } else if (depth === 1 || (depth === 2 && item.name.endsWith('/'))) {
            levelClass = 'level-2';
            paddingLeft = 60;
        } else {
            levelClass = 'level-2';
            paddingLeft = 60 + (depth - 1) * 20;
        }

        // Get display name
        const parts = item.name.split('/').filter(p => p);
        const displayName = parts[parts.length - 1] || item.name;
        const fullName = item.name.endsWith('/') ? displayName + '/' : displayName;

        // Determine icon
        const icon = isFile ? '📄' : '📁';

        // Determine tree character
        const isLastInLevel = !nextItem ||
            (nextItem.name.match(/\//g) || []).length < depth ||
            (nextItem.name.split('/')[0] !== item.name.split('/')[0]);
        const treeChar = isLastInLevel ? '└──' : '├──';

        html += `
            <div class="file-tree-item ${levelClass}" style="padding-left: ${paddingLeft}px;">
                <span class="tree-icon">${treeChar}</span>
                <span class="folder-icon">${icon}</span>
                <span class="${isFile ? 'subfolder-name' : 'folder-name'}">${fullName}</span>
                <span class="folder-purpose">// ${item.purpose}</span>
            </div>
        `;
    });

    html += '</div>';

    // Benefits as a clean grid
    html += '<h3>Beneficios de esta Estructura</h3>';
    html += '<div class="structure-benefits">';
    section.benefits.forEach(benefit => {
        html += `
            <div class="structure-benefit-item">
                <span class="benefit-icon">✓</span>
                <span class="benefit-text">${benefit}</span>
            </div>
        `;
    });
    html += '</div>';

    return html;
}

/**
 * Generate Refactoring section content
 */
function generateRefactoringContent(section) {
    let html = '<h3>Transformaciones Clave</h3>';
    html += '<table class="comparison-table"><thead><tr><th>De</th><th>A</th><th>Impacto</th></tr></thead><tbody>';

    section.transformations.forEach(t => {
        html += `<tr><td>${t.from}</td><td>${t.to}</td><td><strong>${t.impact}</strong></td></tr>`;
    });

    html += '</tbody></table>';

    html += '<h3>Técnicas de Refactorización</h3><div class="cards-grid">';
    section.techniques.forEach(technique => {
        html += `
            <div class="card">
                <h4>${technique.name}</h4>
                <p>${technique.description}</p>
                <p><em>Ejemplo: ${technique.example}</em></p>
            </div>
        `;
    });
    html += '</div>';

    html += '<h3>Workflow de Refactorización</h3><div class="timeline">';
    section.workflow.forEach((step, idx) => {
        html += `
            <div class="timeline-item">
                <div class="timeline-item-content">
                    <h4>${step.split(':')[0]}</h4>
                    <p>${step.includes(':') ? step.split(':')[1].trim() : step}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';

    return html;
}

/**
 * Generate Versioning section content
 */
function generateVersioningContent(section) {
    let html = '<div class="cards-grid">';

    section.components.forEach(component => {
        html += `
            <div class="card">
                <span class="badge">${component.type}</span>
                <h4>${component.tool}</h4>
                <p><strong>Qué versionar:</strong> ${component.what}</p>
                <p><strong>Por qué:</strong> ${component.why}</p>
                <h5>Mejores Prácticas:</h5>
                <ul>
                    ${component.bestPractices.map(bp => `<li>${bp}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    html += '</div>';

    // Benefits eliminados para reducir contenido
    // html += '<h3>Beneficios del Versionamiento Integral</h3><ul class="card"><li>' +
    //         section.benefits.join('</li><li>') + '</li></ul>';

    return html;
}

/**
 * Generate MLFlow section content
 */
function generateMLFlowContent(section) {
    let html = '<div class="cards-grid">';

    section.capabilities.forEach(capability => {
        html += `
            <div class="card">
                <span class="badge accent">${capability.module}</span>
                <h4>${capability.function}</h4>
                <ul>
                    ${capability.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <p><code>${capability.codeExample}</code></p>
            </div>
        `;
    });

    html += '</div>';

    html += '<h3>Workflow con MLFlow</h3><div class="timeline">';
    section.workflow.forEach((step, idx) => {
        html += `
            <div class="timeline-item">
                <div class="timeline-item-content">
                    <h4>${step.split(':')[0]}</h4>
                    <p>${step.includes(':') ? step.split(':')[1].trim() : step}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';

    return html;
}

/**
 * Generate Reproducibility section content
 */
function generateReproducibilityContent(section) {
    // Importance eliminado para reducir contenido
    // let html = '<h3>Importancia</h3><ul class="card"><li>' +
    //            section.importance.join('</li><li>') + '</li></ul>';

    let html = '<h3>Desafíos y Soluciones</h3><div class="cards-grid">';
    section.challenges.forEach(item => {
        html += `
            <div class="card">
                <h4>⚠️ ${item.challenge}</h4>
                <p>${item.description}</p>
                <p><strong>✅ Solución:</strong> ${item.solution}</p>
            </div>
        `;
    });
    html += '</div>';

    html += '<h3>Estrategias de Implementación</h3>';
    html += '<table class="comparison-table"><thead><tr><th>Estrategia</th><th>Implementación</th><th>Efectividad</th></tr></thead><tbody>';
    section.strategies.forEach(s => {
        html += `<tr><td><strong>${s.strategy}</strong></td><td>${s.implementation}</td><td>${s.effectiveness}</td></tr>`;
    });
    html += '</tbody></table>';

    html += '<h3>Checklist de Reproducibilidad</h3><ul class="card"><li>' +
            section.checklist.join('</li><li>') + '</li></ul>';

    return html;
}

/**
 * Generate Roles section content
 */
function generateRolesContent(section) {
    let html = '<div class="cards-grid">';

    section.roles.forEach(role => {
        html += `
            <div class="card">
                <h4>👤 ${role.role}</h4>
                <p><strong>Responsabilidades:</strong></p>
                <ul>
                    ${role.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
                <p><strong>Herramientas:</strong> ${role.tools.join(', ')}</p>
                <p><em>${role.interaction}</em></p>
            </div>
        `;
    });

    html += '</div>';
    html += `<p class="section-description"><strong>💡 ${section.collaboration}</strong></p>`;

    return html;
}

/**
 * Generate Tools section content
 */
function generateToolsContent(section) {
    let html = '';

    section.categories.forEach(category => {
        html += `<h3>${category.category}</h3><div class="cards-grid">`;

        category.tools.forEach(tool => {
            html += `
                <div class="card">
                    <h4>${tool.name}</h4>
                    <p>${tool.purpose}</p>
                    <p><strong>Popularidad:</strong> ${tool.popularity}</p>
                </div>
            `;
        });

        html += '</div>';
    });

    return html;
}

/**
 * Generate Pipeline section content
 */
function generatePipelineContent(section) {
    let html = '<div class="timeline">';

    section.stages.forEach(stage => {
        html += `
            <div class="timeline-item">
                <div class="timeline-item-content">
                    <h4>${stage.stage}</h4>
                    <p><strong>Acciones:</strong></p>
                    <ul>
                        ${stage.actions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                    <p><strong>Outputs:</strong> ${stage.outputs.join(', ')}</p>
                    <p><strong>Herramientas:</strong> ${stage.tools.join(', ')}</p>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

/**
 * Populate benefits section
 */
function populateBenefits() {
    const { benefits } = contentData;
    const container = document.getElementById('benefits-grid');

    // Mapeo de iconos apropiados para cada beneficio
    const benefitIcons = {
        'Reproducibilidad': '🔄',
        'Velocidad': '⚡',
        'Calidad': '✨',
        'Escalabilidad': '📈',
        'Colaboración': '🤝',
        'Confianza': '🔒'
    };

    container.innerHTML = benefits.items.map(benefit => {
        const icon = benefitIcons[benefit.benefit] || '✨';
        return `
        <div class="benefit-card">
            <div class="benefit-card-header">
                <div class="benefit-icon">${icon}</div>
                <h3>${benefit.benefit}</h3>
            </div>
            <span class="benefit-metric">${benefit.metric}</span>
            <p class="benefit-description">${benefit.description}</p>
        </div>
        `;
    }).join('');
}

/**
 * Populate references section
 */
function populateReferences() {
    const { references } = contentData;
    const container = document.getElementById('references-container');

    // Iconos por categoría
    const categoryIcons = {
        'Libros': '📚',
        'Documentación': '📖',
        'Artículos Web': '📄',
        'Material de Curso': '🎓',
        'Plantillas y Recursos': '🔧'
    };

    // Agrupar por categoría
    const grouped = references.reduce((acc, ref) => {
        const cat = ref.category || 'Otros';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(ref);
        return acc;
    }, {});

    // Generar HTML por categoría
    let html = '';
    Object.keys(grouped).forEach(category => {
        const icon = categoryIcons[category] || '📌';
        html += `
            <div class="reference-category">
                <h3 class="reference-category-title">
                    <span class="category-icon">${icon}</span>
                    ${category}
                </h3>
        `;

        grouped[category].forEach(ref => {
            html += `
                <div class="reference-item">
                    <div class="reference-number">[${ref.id}]</div>
                    <div class="reference-content">
                        ${ref.apa ? `<div class="reference-apa">${ref.apa}</div>` : ''}
                        ${ref.chapters ? `<div class="reference-chapters">${ref.chapters}</div>` : ''}
                        ${ref.url ? `
                            <div class="reference-link">
                                <a href="${ref.url}" target="_blank" rel="noopener noreferrer">
                                    🔗 Acceder al recurso
                                    <span class="link-icon">↗</span>
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';
    });

    container.innerHTML = html;
}

/**
 * Populate footer
 */
function populateFooter() {
    const { footer } = contentData;

    document.getElementById('footer-tagline').textContent = footer.tagline;
    document.getElementById('footer-note').textContent = footer.note;
    document.getElementById('footer-license').textContent = footer.license;
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        overlay.classList.add('hidden');
        setTimeout(() => overlay.style.display = 'none', 300);
    }, 500);
}

/**
 * Show error message
 */
function showError(message) {
    const overlay = document.getElementById('loading-overlay');
    overlay.innerHTML = `
        <div style="text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
            <h2 style="color: #d32f2f; margin-bottom: 20px;">❌ Error</h2>
            <p style="color: #666;">${message}</p>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0066CC; color: white; border: none; border-radius: 6px; cursor: pointer;">
                Recargar Página
            </button>
        </div>
    `;
}

/**
 * Adjust color brightness
 */
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
