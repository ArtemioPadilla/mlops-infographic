# CLAUDE.md - Documentación Técnica

## Información del Proyecto

**Proyecto**: Infografía MLOps Programática
**Versión**: 1.0
**Fecha de Creación**: 2025
**Tipo**: Aplicación web estática con contenido dinámico
**Propósito**: Infografía educativa sobre mejores prácticas en MLOps, exportable a PDF

## Arquitectura del Proyecto

### Filosofía de Diseño

El proyecto sigue el principio de **separación de contenido y presentación**:

1. **Contenido**: Almacenado completamente en `data/content.json` (formato JSON estructurado)
2. **Presentación**: HTML semántico + CSS modular
3. **Lógica**: JavaScript vanilla para inyección dinámica (sin dependencias externas)

Esta arquitectura permite:
- Editar contenido sin tocar código
- Reutilizar la estructura para otras infografías
- Mantener consistencia visual automáticamente
- Exportar a PDF con calidad profesional

### Stack Tecnológico

```
Frontend:
├── HTML5 (Semantic markup)
├── CSS3 (Grid, Flexbox, CSS Variables, @media print)
└── JavaScript ES6+ (Vanilla, sin frameworks)

Formato de datos:
└── JSON (content.json)

Herramientas opcionales:
├── Puppeteer (para exportación automatizada a PDF)
└── http-server / serve (servidor local)
```

**Decisión de no usar frameworks**: Se eligió vanilla JavaScript para:
- Cero dependencias en runtime
- Carga instantánea
- Máximo control sobre renderizado para PDF
- Simplicidad y mantenibilidad

## Estructura de Archivos

```
mlops-infography/
│
├── index.html                 # Punto de entrada, estructura HTML semántica
│
├── data/
│   └── content.json          # ⭐ Fuente única de verdad para el contenido
│
├── styles/
│   ├── main.css              # Estilos principales (pantalla)
│   │   ├── Variables CSS (paleta, espaciado, tipografía)
│   │   ├── Reset y base
│   │   ├── Layout (Grid, Flexbox)
│   │   ├── Componentes (cards, timeline, tables)
│   │   └── Responsive (media queries)
│   │
│   └── print.css             # ⭐ Estilos específicos para PDF export
│       ├── @page config (A4, márgenes)
│       ├── color-adjust: exact (preservar colores)
│       ├── page-break-* (control de paginación)
│       └── Optimizaciones tipográficas
│
├── js/
│   └── data-loader.js        # ⭐ Motor de carga y renderizado
│       ├── fetch() de content.json
│       ├── Generadores de HTML por sección
│       ├── Biblioteca de iconos SVG inline
│       └── Manejo de errores
│
├── assets/
│   ├── icons/                # SVG icons (inline en JS)
│   └── diagrams/             # Diagramas adicionales si se necesitan
│
├── books/                    # Referencias bibliográficas (PDFs)
│
├── README.md                 # Documentación de usuario
├── CLAUDE.md                 # Este archivo - documentación técnica
└── package.json              # Dependencias opcionales (Puppeteer)
```

## Flujo de Datos

```
┌─────────────────┐
│  Browser loads  │
│   index.html    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Loading overlay│
│    displayed    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ data-loader.js  │
│   executes      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  fetch() call   │
│ content.json    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Parse JSON     │
│  contentData    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Populate header │
│ populateHeader()│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Populate intro  │
│populateIntro()  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ For each section│
│generateSection()│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Inject HTML via │
│  innerHTML      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hide loading    │
│   Display page  │
└─────────────────┘
```

## Esquema de content.json

### Estructura General

```json
{
  "metadata": {
    "title": "string",
    "subtitle": "string",
    "author": "string",
    "date": "string",
    "version": "string"
  },

  "introduction": {
    "title": "string",
    "description": "string",
    "keyPoints": ["string", ...],
    "icon": "string"
  },

  "sections": [
    {
      "id": "string (unique identifier)",
      "title": "string",
      "icon": "string (nombre del icono)",
      "color": "string (hex color)",
      "description": "string",
      // Propiedades específicas por tipo de sección
      ...
    }
  ],

  "benefits": {
    "title": "string",
    "items": [
      {
        "benefit": "string",
        "description": "string",
        "metric": "string"
      }
    ]
  },

  "references": [
    {
      "type": "book|article|documentation",
      "title": "string",
      "author": "string (opcional)",
      "year": "string (opcional)",
      "publisher": "string (opcional)",
      "url": "string (opcional)",
      ...
    }
  ],

  "footer": {
    "tagline": "string",
    "license": "string",
    "note": "string"
  }
}
```

### Tipos de Secciones

Cada sección puede tener estructura diferente según su `id`:

#### 1. OOP (`id: "oop"`)
```json
{
  "id": "oop",
  "principles": [
    {
      "name": "string",
      "description": "string",
      "example": "string",
      "benefit": "string"
    }
  ],
  "bestPractices": ["string", ...]
}
```

#### 2. Structure (`id: "structure"`)
```json
{
  "id": "structure",
  "template": "string",
  "folderStructure": [
    {
      "name": "string",
      "purpose": "string",
      "subfolders": ["string", ...]
    }
  ],
  "benefits": ["string", ...]
}
```

#### 3. Versioning (`id: "versioning"`)
```json
{
  "id": "versioning",
  "components": [
    {
      "type": "string",
      "tool": "string",
      "what": "string",
      "why": "string",
      "bestPractices": ["string", ...]
    }
  ]
}
```

## Sistema de Estilos

### Paleta de Colores

```css
/* Primarios */
--color-primary: #0066CC;      /* Azul tech principal */
--color-secondary: #004080;    /* Azul oscuro */
--color-accent: #00A3E0;       /* Azul claro / acento */

/* Backgrounds */
--color-bg-light: #F5F7FA;     /* Gris claro */
--color-bg-white: #FFFFFF;     /* Blanco */

/* Texto */
--color-text-dark: #2C3E50;    /* Texto principal */
--color-text-medium: #5A6C7D;  /* Texto secundario */
--color-text-light: #8899A6;   /* Texto terciario */

/* Bordes */
--color-border: #E1E8ED;       /* Bordes sutiles */

/* Estados */
--color-success: #28A745;
--color-warning: #FFC107;
--color-info: #17A2B8;
```

**Rationale**: Paleta azul profesional estilo tech, inspirada en Material Design y GitHub. Alta legibilidad, contraste WCAG AA.

### Tipografía

```css
/* Familias */
--font-primary: 'Inter', sans-serif;        /* Títulos */
--font-secondary: 'Open Sans', sans-serif;  /* Texto */
--font-mono: 'Fira Code', monospace;        /* Código */

/* Escala tipográfica (Major Third - 1.25) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Sistema de Espaciado

```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
```

**Escala**: Basada en múltiplos de 8px para consistencia visual y alineación perfecta.

### Componentes CSS

#### Cards
- Border radius: 12px
- Shadow: 0 4px 6px rgba(0,0,0,0.1)
- Hover: translateY(-4px) + shadow elevado
- Padding: 1.5rem

#### Timeline
- Línea vertical: 3px, gradient primary
- Puntos: 16px círculos, color primary
- Espaciado entre items: 2rem

#### Tables
- Header: gradient primary, texto blanco
- Rows: hover con bg light
- Borders: 1px solid border color

## Optimización para PDF

### Configuración @page

```css
@page {
    size: A4 portrait;
    margin: 1.5cm 1.5cm 2cm 1.5cm;
}
```

### Preservación de Colores

```css
* {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
}
```

**Crítico**: Sin esto, navegadores eliminan backgrounds y colores en PDF.

### Control de Paginación

```css
/* Evitar cortes en secciones */
.section {
    page-break-inside: avoid;
}

/* Evitar huérfanos de títulos */
h2, h3 {
    page-break-after: avoid;
}

/* Timeline no cortado */
.timeline {
    page-break-inside: avoid;
}
```

### Ajustes Tipográficos

- Tamaños en `pt` (puntos) en vez de `px`
- Line-height reducido (1.4 vs 1.6)
- Font-size reducido (10pt base vs 16px)

## JavaScript: data-loader.js

### Funciones Principales

#### `init()`
- Entry point
- Coordina carga y renderizado
- Maneja errores globales

#### `loadContent()`
- fetch() de content.json
- Parsing JSON
- Validación básica
- Return: Promise<contentData>

#### `generateSectionHtml(section)`
- Router de generadores por section.id
- Switch/case a funciones específicas
- Return: HTML string

#### Generadores Específicos

```javascript
generateOOPContent(section)
generateStructureContent(section)
generateRefactoringContent(section)
generateVersioningContent(section)
generateMLFlowContent(section)
generateReproducibilityContent(section)
generateRolesContent(section)
generateToolsContent(section)
generatePipelineContent(section)
```

Cada generador:
1. Recibe objeto `section` del JSON
2. Extrae propiedades relevantes
3. Construye HTML string con template literals
4. Retorna HTML completo

### Biblioteca de Iconos

```javascript
const icons = {
    'intro': '<svg>...</svg>',
    'code-block': '<svg>...</svg>',
    'folder-tree': '<svg>...</svg>',
    // ...
};
```

**Ventaja**: SVG inline sin requests externos, perfecto para PDF.

### Manejo de Errores

```javascript
try {
    contentData = await loadContent();
    // ...
} catch (error) {
    showError(error.message);
}
```

UI de error: Overlay con mensaje y botón de recarga.

## Extensibilidad

### Agregar Nueva Sección

1. **Actualizar content.json**:
   ```json
   {
     "id": "nueva-seccion",
     "title": "Nueva Sección",
     "description": "...",
     "icon": "nuevo-icono",
     "color": "#0066CC",
     "customData": { ... }
   }
   ```

2. **Agregar generador en data-loader.js**:
   ```javascript
   function generateNuevaSeccionContent(section) {
       let html = '';
       // Construir HTML desde section.customData
       return html;
   }

   // En generateSectionHtml():
   case 'nueva-seccion':
       contentHtml += generateNuevaSeccionContent(section);
       break;
   ```

3. **Agregar icono si es necesario**:
   ```javascript
   const icons = {
       // ...
       'nuevo-icono': '<svg>...</svg>'
   };
   ```

4. **(Opcional) Estilos específicos en main.css**:
   ```css
   #section-nueva-seccion {
       /* estilos específicos */
   }
   ```

### Agregar Nuevo Tipo de Componente

Ejemplo: Agregar gráficos de barras

1. **Definir estructura en JSON**:
   ```json
   "chartData": [
       {"label": "X", "value": 100},
       {"label": "Y", "value": 150}
   ]
   ```

2. **Crear generador HTML**:
   ```javascript
   function generateBarChart(data) {
       return `
           <div class="bar-chart">
               ${data.map(item => `
                   <div class="bar">
                       <div class="bar-fill" style="height: ${item.value}px"></div>
                       <span>${item.label}</span>
                   </div>
               `).join('')}
           </div>
       `;
   }
   ```

3. **Agregar estilos**:
   ```css
   .bar-chart {
       display: flex;
       gap: 1rem;
       align-items: flex-end;
   }

   .bar-fill {
       background: var(--color-primary);
       width: 50px;
   }
   ```

## Exportación a PDF Automatizada

### Con Puppeteer

**package.json**:
```json
{
  "scripts": {
    "export-pdf": "node scripts/export-pdf.js"
  },
  "devDependencies": {
    "puppeteer": "^21.0.0"
  }
}
```

**scripts/export-pdf.js**:
```javascript
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`file://${path.join(__dirname, '../index.html')}`, {
        waitUntil: 'networkidle0'
    });

    await page.pdf({
        path: 'output/infografia-mlops.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '1.5cm',
            right: '1.5cm',
            bottom: '2cm',
            left: '1.5cm'
        }
    });

    await browser.close();
    console.log('✅ PDF generado exitosamente');
})();
```

## Performance

### Métricas Objetivo

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: < 50KB (sin imágenes)
- **JSON Size**: < 100KB

### Optimizaciones Implementadas

1. **Preload de content.json**: `<link rel="preload">`
2. **SVG inline**: Sin requests externos
3. **CSS crítico inline**: (opcional) Para FCP
4. **Vanilla JS**: Sin parsing/ejecución de frameworks
5. **Lazy loading**: (no implementado, no necesario por tamaño)

### Medición

```bash
# Con Lighthouse
lighthouse http://localhost:8000

# Con Chrome DevTools
Performance tab → Record → Analyze
```

## Testing

### Checklist de Calidad

- [ ] **Contenido completo**: Todas las secciones del JSON renderizadas
- [ ] **Sin errores de consola**: 0 errors, 0 warnings
- [ ] **Responsive**: Mobile (375px), Tablet (768px), Desktop (1440px)
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **PDF export**: Colores preservados, no cortes, tipografía correcta
- [ ] **Accesibilidad**: Semantic HTML, alt texts, contraste WCAG AA
- [ ] **Performance**: LCP < 2.5s, CLS < 0.1

### Testing Manual

1. **Funcional**:
   - Cargar página → ¿Se muestra contenido?
   - Editar JSON → ¿Se refleja cambio?
   - Exportar PDF → ¿Formato correcto?

2. **Visual**:
   - ¿Colores consistentes?
   - ¿Espaciado uniforme?
   - ¿Tipografía legible?

3. **PDF**:
   - Imprimir a PDF desde Chrome
   - Verificar que todos los backgrounds están
   - Verificar que no hay cortes de contenido

## Troubleshooting

### CORS Error al cargar JSON

**Error**: `Failed to load content.json: CORS error`

**Causa**: Navegadores bloquean fetch() de archivos locales

**Solución**:
```bash
# Usar servidor local
python3 -m http.server 8000
# o
npx serve
```

### Colores no aparecen en PDF

**Error**: PDF es blanco/negro

**Causa**: Opción "Background graphics" deshabilitada

**Solución**: En print dialog, habilitar "Background graphics"

### Contenido cortado entre páginas

**Error**: Secciones divididas en mitad

**Causa**: page-break-inside no respetado

**Solución**: Ajustar en print.css:
```css
.section {
    page-break-inside: avoid !important;
}
```

## Decisiones de Diseño

### ¿Por qué no React/Vue?

- **Simplicidad**: Proyecto estático, no necesita reactivity
- **Performance**: Vanilla JS carga instantáneamente
- **PDF**: Menos overhead = mejor renderizado en print
- **Portabilidad**: Un solo HTML sin build process

### ¿Por qué JSON y no Markdown?

- **Estructura**: JSON permite anidación compleja
- **Tipado**: Fácil validar esquema
- **Acceso**: JavaScript nativo `.property` access
- **Flexibilidad**: Diferentes estructuras por sección

### ¿Por qué no usar librería de charts?

- **Peso**: Chart.js ~200KB
- **Necesidad**: Infografía estática, no interactiva
- **PDF**: Libraries JS no renderizan bien en print
- **Solución**: CSS puro para visualizaciones simples

## Mejoras Futuras

### Corto Plazo

- [ ] Agregar más iconos SVG custom
- [ ] Implementar modo oscuro (opcional)
- [ ] Script de validación de content.json
- [ ] Tests automatizados (Jest)

### Largo Plazo

- [ ] Editor WYSIWYG para content.json
- [ ] Generación de múltiples idiomas
- [ ] Exportación a otros formatos (PNG, PPTX)
- [ ] Versión interactiva con animaciones

## Mantenimiento

### Actualizar Contenido

1. Editar `data/content.json`
2. Validar JSON: `jsonlint content.json`
3. Probar en navegador
4. Exportar nuevo PDF
5. Commit cambios

### Actualizar Estilos

1. Editar variables CSS en `main.css` (colores, espaciado)
2. Probar responsive (DevTools)
3. Probar exportación PDF
4. Ajustar `print.css` si es necesario

### Actualizar Lógica

1. Editar `data-loader.js`
2. Testing en consola
3. Verificar no rompe otras secciones
4. Documentar cambios en este archivo

## Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Smashing Magazine: Print CSS](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)
- [Material Design Icons](https://fonts.google.com/icons)

## Changelog

### v1.0 (2025)
- ✨ Implementación inicial
- ✅ Contenido completo de MLOps
- ✅ 9 secciones principales
- ✅ Exportación PDF optimizada
- ✅ Responsive design
- ✅ Documentación completa

---

**Mantenido por**: Curso MLOps
**Última actualización**: 2025
**Licencia**: Educativo
