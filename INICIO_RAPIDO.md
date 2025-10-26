# 🚀 Inicio Rápido - Infografía MLOps

## Vista Previa Inmediata

### Opción 1: Servidor Local con Python (Recomendado)

```bash
# En el directorio del proyecto
python3 -m http.server 8000
```

Luego abre en tu navegador: `http://localhost:8000`

### Opción 2: Servidor Local con Node.js

```bash
# Instalar serve (solo primera vez)
npm install -g serve

# Ejecutar servidor
serve -l 8000
```

Luego abre: `http://localhost:8000`

### Opción 3: Abrir directamente (puede tener problemas CORS)

Doble click en `index.html` para abrir en tu navegador predeterminado.

---

## 📄 Exportar a PDF

### Método Manual (Sin instalación)

1. Abre `index.html` en **Chrome** o **Edge**
2. Presiona `Ctrl+P` (Windows) o `Cmd+P` (Mac)
3. Configura:
   - Destino: **Guardar como PDF**
   - Diseño: **Vertical**
   - Papel: **A4**
   - **✅ IMPORTANTE**: Habilita "Gráficos de fondo"
4. Guarda el PDF

### Método Automático (Requiere Node.js)

```bash
# Instalar dependencias (solo primera vez)
npm install

# Generar PDF
npm run export-pdf
```

El PDF se guardará en `output/infografia-mlops.pdf`

---

## ✏️ Editar Contenido

1. Abre `data/content.json` en tu editor favorito
2. Modifica el texto, secciones, o datos
3. Guarda el archivo
4. Recarga la página en el navegador (F5)

**Ejemplo**: Cambiar el título principal

```json
{
  "metadata": {
    "title": "Tu Nuevo Título Aquí",
    ...
  }
}
```

---

## 🎨 Cambiar Colores

Edita `styles/main.css` y modifica las variables:

```css
:root {
    --color-primary: #0066CC;    /* Cambia este valor */
    --color-secondary: #004080;  /* Y este */
    --color-accent: #00A3E0;     /* Y este */
}
```

Recarga la página para ver los cambios.

---

## 🔍 Verificar Contenido

Para validar que tu `content.json` está correcto:

```bash
node scripts/validate-content.js
```

---

## 📊 Estructura del Contenido

```
content.json
├── metadata (título, subtítulo, autor)
├── introduction (introducción y estadísticas clave)
├── sections[] (9 secciones principales)
│   ├── OOP
│   ├── Estructura de Proyectos
│   ├── Refactorización
│   ├── Control de Versiones
│   ├── MLFlow
│   ├── Reproducibilidad
│   ├── Roles
│   ├── Herramientas
│   └── Pipeline
├── benefits (6 beneficios de MLOps)
├── references (11 referencias bibliográficas)
└── footer (tagline y licencia)
```

---

## ❓ Problemas Comunes

### "Cargando..." no desaparece

**Solución**: Usa un servidor local (Opción 1 o 2 arriba)

### PDF sin colores

**Solución**: En la ventana de impresión, activa "Gráficos de fondo"

### Cambios no se ven

**Solución**:
1. Recarga con Ctrl+Shift+R (fuerza recarga)
2. Verifica que guardaste el archivo JSON
3. Revisa la consola del navegador (F12) para errores

---

## 📚 Más Información

- **README.md**: Guía completa de uso
- **CLAUDE.md**: Documentación técnica detallada

---

**¡Listo! Ya puedes visualizar y exportar tu infografía MLOps.**
