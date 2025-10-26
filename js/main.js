/**
 * MLOps Infografía - Main Application (Compact Version)
 * Single-page compact layout
 */

import { initAnimations, addParallaxEffect } from './animations.js';
import { initCounters, animateHeroStat, animateMetricNumbers } from './counters.js';

// Application state
let contentData = null;

/**
 * Initialize the application
 */
async function init() {
  try {
    // Load content data
    contentData = await loadContent();

    // Populate all sections
    populateMetrics();
    populateRoles();
    populatePipeline();
    populateConcepts();
    populateStack();
    populateMLFlow();
    populateReferences();
    populateFooter();

    // Hide loading overlay
    hideLoading();

    // Initialize animations after content is loaded
    setTimeout(() => {
      initAnimations();
      addParallaxEffect();
      initCounters();
      animateHeroStat();
      animateMetricNumbers();
    }, 100);

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
 * Populate metrics section
 */
function populateMetrics() {
  const container = document.getElementById('metrics-container');
  if (!container || !contentData.metrics) return;

  container.innerHTML = contentData.metrics.map(metric => `
    <div class="metric-mini">
      <div class="metric-icon-mini">${metric.icon}</div>
      <div class="metric-content-mini">
        <div class="metric-number-line">
          ${metric.prefix ? `<span class="metric-prefix">${metric.prefix}</span>` : ''}
          <span class="metric-number-mini">${metric.number}</span>
          <span class="metric-symbol-mini">${metric.symbol}</span>
        </div>
        <div class="metric-label-mini">${metric.label}</div>
        <div class="metric-text-mini">${metric.text}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Populate roles section
 */
function populateRoles() {
  const container = document.getElementById('roles-container');
  if (!container || !contentData.roles) return;

  container.innerHTML = contentData.roles.map(role => `
    <div class="role-mini">
      <div class="role-icon-mini">
        <span>${role.icon}</span>
      </div>
      <div class="role-content-mini">
        <h4>${role.role}</h4>
        <div class="role-tools-mini">${role.tools.join(' • ')}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Populate pipeline section
 */
function populatePipeline() {
  const container = document.getElementById('pipeline-container');
  if (!container || !contentData.pipeline) return;

  container.innerHTML = contentData.pipeline.map(step => `
    <div class="pipeline-step">
      <div class="pipeline-icon">${step.icon}</div>
      <div class="pipeline-stage">${step.stage}</div>
      <div class="pipeline-tools">${step.tools.join(', ')}</div>
    </div>
  `).join('');
}

/**
 * Populate concepts section
 */
function populateConcepts() {
  const container = document.getElementById('concepts-container');
  if (!container || !contentData.concepts) return;

  container.innerHTML = contentData.concepts.map(concept => `
    <div class="concept-mini">
      <div class="concept-header-mini">
        <span class="concept-icon-mini">${concept.icon}</span>
        <span class="concept-title-mini">${concept.title}</span>
      </div>
      <div class="concept-keywords-mini">• ${concept.keywords.join(' • ')}</div>
      <div class="concept-benefit-mini">${concept.benefit}</div>
    </div>
  `).join('');
}

/**
 * Populate stack section
 */
function populateStack() {
  const container = document.getElementById('stack-container');
  if (!container || !contentData.stack) return;

  container.innerHTML = contentData.stack.map(tool => `
    <div class="stack-item">${tool.name}</div>
  `).join('');
}

/**
 * Populate MLFlow section
 */
function populateMLFlow() {
  const container = document.getElementById('mlflow-container');
  if (!container || !contentData.mlflow) return;

  container.innerHTML = contentData.mlflow.modules.map(module => `
    <div class="mlflow-module-mini">
      <div class="mlflow-module-header">
        <span class="mlflow-module-icon">${module.icon}</span>
        <span class="mlflow-module-name">${module.name}</span>
      </div>
      <div class="mlflow-module-desc">${module.desc}</div>
    </div>
  `).join('');
}

/**
 * Populate references section
 */
function populateReferences() {
  const container = document.getElementById('references-container');
  if (!container || !contentData.references) return;

  container.innerHTML = contentData.references.map(ref => `
    <div class="reference-item">
      <span class="reference-number">[${ref.id}]</span>
      <span class="reference-apa">${ref.apa}</span>
    </div>
  `).join('');
}

/**
 * Populate footer
 */
function populateFooter() {
  if (!contentData.footer) return;

  const authorElement = document.getElementById('footer-author');
  const noteElement = document.getElementById('footer-note');
  const yearElement = document.getElementById('footer-year');

  if (authorElement) authorElement.textContent = contentData.footer.author;
  if (noteElement) noteElement.textContent = contentData.footer.note;
  if (yearElement) yearElement.textContent = contentData.footer.year;
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('hidden');
      setTimeout(() => overlay.style.display = 'none', 300);
    }, 500);
  }
}

/**
 * Show error message
 */
function showError(message) {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.innerHTML = `
      <div style="text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-width: 500px;">
        <h2 style="color: #DC3545; margin-bottom: 20px;">❌ Error</h2>
        <p style="color: #666; margin-bottom: 20px;">${message}</p>
        <button onclick="location.reload()" style="padding: 12px 24px; background: #0066CC; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
          Recargar Página
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
