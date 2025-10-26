# Infografía MLOps: Mejores Prácticas en Machine Learning

Infografía interactiva y programática sobre las mejores prácticas en MLOps, diseñada para ser exportada a PDF con calidad profesional.

## Descripción

Esta infografía cubre los conceptos fundamentales de MLOps incluyendo:

- **Programación Orientada a Objetos en ML**: Principios de encapsulación, abstracción, herencia y polimorfismo
- **Estructura de Proyectos**: Organización con Cookiecutter Data Science
- **Refactorización**: Transformación de notebooks a código productivo
- **Control de Versiones**: Git, DVC, MLFlow para código, datos y modelos
- **MLFlow**: Tracking, Registry, Models y Projects
- **Reproducibilidad**: Desafíos, estrategias y mejores prácticas
- **Roles en MLOps**: Data Scientists, ML Engineers, DevOps
- **Herramientas**: Ecosistema completo de MLOps
- **Pipelines**: Flujo end-to-end de proyectos ML

## Características

- **Contenido desacoplado**: Todo el contenido está en `data/content.json` para fácil edición
- **Diseño profesional**: Paleta de colores azul tech con diseño modular
- **Optimizado para PDF**: Estilos específicos para exportación perfecta
- **Carga dinámica**: JavaScript vanilla para inyectar contenido sin frameworks
- **Responsive**: Funciona en desktop, tablet y móvil
- **Semántico**: HTML5 semántico para mejor accesibilidad

## Estructura del Proyecto

```
mlops-infography/
├── index.html              # Página principal
├── styles/
│   ├── main.css           # Estilos principales
│   └── print.css          # Estilos para PDF
├── js/
│   └── data-loader.js     # Carga dinámica de contenido
├── data/
│   └── content.json       # Contenido de la infografía
├── assets/
│   ├── icons/             # Iconos SVG
│   └── diagrams/          # Diagramas visuales
├── books/                 # Referencias bibliográficas (PDFs)
├── README.md              # Este archivo
├── CLAUDE.md              # Documentación técnica
└── package.json           # Dependencias (opcional)
```

## Cómo Usar

### Visualización Local

1. **Clonar o descargar el repositorio**

2. **Abrir en navegador**:
   - Método 1: Doble click en `index.html`
   - Método 2: Usar servidor local (recomendado):
     ```bash
     # Con Python 3
     python3 -m http.server 8000

     # Con Node.js
     npx serve

     # Con PHP
     php -S localhost:8000
     ```
   - Navegar a `http://localhost:8000`

3. **Visualizar**: La infografía se cargará automáticamente

### Exportar a PDF

#### Método 1: Exportación Manual (Recomendado)

1. Abrir `index.html` en **Google Chrome** o **Microsoft Edge** (mejores resultados)

2. Presionar `Ctrl + P` (Windows/Linux) o `Cmd + P` (Mac)

3. Configurar opciones de impresión:
   - **Destino**: Guardar como PDF
   - **Diseño**: Vertical (Portrait)
   - **Papel**: A4
   - **Márgenes**: Predeterminados o Personalizados (1.5cm)
   - **Opciones**:
     - ✅ Gráficos de fondo (IMPORTANTE)
     - ✅ Encabezados y pies de página (opcional)
   - **Escala**: 100% (o ajustar si es necesario)

4. Guardar el PDF

**Resultado esperado**: PDF de aproximadamente 15-20 páginas con colores, gráficos y formato completo.

#### Método 2: Exportación Automática con Puppeteer

Si prefieres automatizar la exportación:

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar script de exportación:
   ```bash
   npm run export-pdf
   ```

3. El PDF se guardará en `output/infografia-mlops.pdf`

### Editar Contenido

Para modificar el contenido de la infografía:

1. Abrir `data/content.json`

2. Editar el texto, agregar/quitar secciones, modificar datos

3. Guardar el archivo

4. Recargar `index.html` en el navegador (F5)

**Estructura del JSON**:

```json
{
  "metadata": { ... },
  "introduction": { ... },
  "sections": [
    {
      "id": "section-name",
      "title": "Título de la Sección",
      "description": "Descripción...",
      "icon": "icon-name",
      "color": "#0066CC",
      ...
    }
  ],
  "benefits": { ... },
  "references": [ ... ],
  "footer": { ... }
}
```

## Personalización

### Cambiar Colores

Editar variables CSS en `styles/main.css`:

```css
:root {
    --color-primary: #0066CC;      /* Azul principal */
    --color-secondary: #004080;    /* Azul oscuro */
    --color-accent: #00A3E0;       /* Azul claro */
    /* ... */
}
```

### Agregar Secciones

1. Agregar nueva sección en `data/content.json`:
   ```json
   {
     "id": "nueva-seccion",
     "title": "Nueva Sección",
     "description": "Descripción de la sección",
     "icon": "icon-name",
     "color": "#0066CC",
     "content": { ... }
   }
   ```

2. (Opcional) Agregar generador de contenido en `js/data-loader.js`:
   ```javascript
   case 'nueva-seccion':
       contentHtml += generateNuevaSeccionContent(section);
       break;
   ```

### Cambiar Tipografía

Las fuentes actuales son:
- **Títulos**: Inter (vía Google Fonts CDN o sistema)
- **Texto**: Open Sans
- **Código**: Fira Code / Monaco

Para cambiar, editar en `styles/main.css`:
```css
--font-primary: 'Tu-Fuente', sans-serif;
```

## Requisitos

- **Navegador moderno**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **JavaScript habilitado**: Necesario para carga dinámica
- **Servidor local** (opcional): Para evitar restricciones CORS al cargar JSON

## Compatibilidad

| Navegador | Visualización | Exportación PDF |
|-----------|---------------|-----------------|
| Chrome    | ✅ Excelente  | ✅ Excelente    |
| Edge      | ✅ Excelente  | ✅ Excelente    |
| Firefox   | ✅ Muy buena  | ⚠️ Buena*       |
| Safari    | ✅ Muy buena  | ⚠️ Aceptable*   |

*Algunos navegadores pueden no renderizar perfectamente los gradientes y sombras en PDF. Se recomienda Chrome o Edge.

## Solución de Problemas

### La página no carga / "Cargando..." permanente

**Causa**: Restricciones CORS al cargar `content.json`

**Solución**:
1. Usar un servidor local (ver sección "Visualización Local")
2. O abrir Chrome con flag: `chrome --allow-file-access-from-files`

### El PDF no tiene colores

**Causa**: Opción "Gráficos de fondo" deshabilitada

**Solución**: En la ventana de impresión, habilitar "Gráficos de fondo" o "Background graphics"

### El contenido se corta en el PDF

**Causa**: Escala incorrecta o márgenes muy grandes

**Solución**:
1. Ajustar escala a 90-95%
2. Reducir márgenes
3. Editar `@page` en `styles/print.css`

### Las secciones se dividen mal entre páginas

**Causa**: Página de destino demasiado grande o pequeña

**Solución**: Editar `page-break-before` y `page-break-inside` en `print.css`

## Referencias

Esta infografía se basa en:

- **Machine Learning Engineering with MLFlow** - Lauchande, N. (2021)
- **Designing Machine Learning Systems** - Huyen, C. (2022)
- **Machine Learning Engineering in Action** - Wilson, B. (2022)
- **Introducing MLOps** - Treveil, M. et al. (2020)
- **Machine Learning Design Patterns** - Lakshmanan, V. et al. (2020)
- MLFlow Documentation oficial

Ver sección completa de referencias en la infografía.

## Licencias y Créditos

- **MLFlow**: © MLflow Project, a Series of LF Projects, LLC
- **Contenido**: Creado para fines educativos - Curso MLOps
- **Iconos SVG**: Material Design Icons (Apache 2.0)
- **Tipografías**: Inter, Open Sans (SIL Open Font License)

## Contribuciones

Este proyecto fue creado como material educativo. Para sugerencias o mejoras:

1. Editar `data/content.json` con el contenido actualizado
2. Modificar estilos en `styles/main.css` o `styles/print.css`
3. Actualizar lógica de renderizado en `js/data-loader.js`

## Autor

Creado para el curso de MLOps

## Contacto

Para preguntas o soporte, consultar la documentación técnica en `CLAUDE.md`

---

**Versión**: 1.0
**Última actualización**: 2025
**Formato**: HTML5 + CSS3 + JavaScript (Vanilla)
