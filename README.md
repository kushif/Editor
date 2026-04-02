# Editor! 🐾 — PWA

Editor de escritura creativa con capítulos, entidades, recordar e ideas privadas.

---

## Cómo publicar en GitHub Pages (5 minutos)

### 1. Crear cuenta en GitHub
Ve a [github.com](https://github.com) y crea una cuenta gratuita si no tienes.

### 2. Crear un repositorio **privado**
- Clic en el **+** de arriba a la derecha → *New repository*
- Nombre: `editor` (o el que quieras)
- Marca **Private** ✓
- Clic en *Create repository*

### 3. Subir los archivos
En la página del repositorio vacío, clic en **uploading an existing file** y sube estos 5 archivos:
```
index.html
manifest.json
sw.js
icon-192.png
icon-512.png
```

### 4. Activar GitHub Pages
- Ve a **Settings** (pestaña del repositorio)
- Menú izquierdo → **Pages**
- En *Source* selecciona **Deploy from a branch**
- Branch: **main** / carpeta: **/ (root)**
- Clic en **Save**

### 5. Espera 1-2 minutos
GitHub te dará una URL del tipo:
```
https://TU-USUARIO.github.io/editor/
```

¡Listo! Abre esa URL en el móvil o en el ordenador y verás el botón **Instalar** para añadirla a la pantalla de inicio.

---

## Funcionamiento offline

Una vez instalada o visitada por primera vez con conexión, la app funciona **completamente sin internet**. Tus textos se guardan siempre en archivos `.escritor` en tu dispositivo, nunca en ningún servidor.

---

## Actualizar la app

Si haces cambios al código, sube el nuevo `index.html` al repositorio. Para que el Service Worker recargue el caché, cambia el número de versión en `sw.js`:

```js
const CACHE_NAME = 'editor-v2'; // ← incrementar
```

---

## Privacidad

- ✅ El repositorio es **privado** (nadie ve tu código)
- ✅ La URL es pública pero solo tú la conoces
- ✅ Tus textos **nunca salen de tu dispositivo**
- ✅ Sin cookies, sin tracking, sin publicidad
