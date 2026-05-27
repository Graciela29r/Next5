# 🚀 GUÍA RÁPIDA - Galería de Imágenes

## ⚡ COMANDOS RÁPIDOS

### Desarrollo
```bash
npm run dev          # Iniciar servidor local (http://localhost:3000)
npm run build        # Build para producción
npm start            # Iniciar servidor producción
npm run lint         # Verificar código
```

### Git
```bash
git add .
git commit -m "Inicial: Image Gallery CRUD"
git push origin main
```

---

## 📝 CONFIGURACIÓN EN 5 MINUTOS

### 1. Supabase (2 min)

```bash
# Ir a: https://app.supabase.com
# 1. Click "New Project"
# 2. Llenar formulario y esperar
# 3. SQL Editor → New Query → Copiar SQL de SETUP_GUIDE.md → Run
# 4. Settings → API → Copiar Project URL y anon key
```

### 2. .env.local (1 min)

```bash
# Editar .env.local y pegar:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Test Local (1 min)

```bash
npm run dev
# Abrir http://localhost:3000
# Crear imagen de prueba
```

### 4. Deploy Vercel (1 min)

```bash
# Ir a: https://vercel.com/new
# Importar repo de GitHub
# Agregar variables de entorno
# Deploy
```

---

## 📋 LISTA DE CHEQUEO

- [ ] Supabase configurado (tabla creada)
- [ ] Credenciales en .env.local
- [ ] npm run dev funciona
- [ ] Página carga sin errores
- [ ] Puedo crear imágenes
- [ ] Puedo editar imágenes
- [ ] Puedo eliminar imágenes
- [ ] Puedo buscar por título
- [ ] GitHub push completado
- [ ] Vercel deploy completado
- [ ] Variables en Vercel agregadas
- [ ] URL de Vercel funciona

---

## 🆘 TROUBLESHOOTING RÁPIDO

### Error: "Invalid supabaseUrl"
```bash
# Solución:
# 1. Verificar .env.local esté correcto
# 2. Ctrl+C en npm run dev
# 3. npm run dev de nuevo
```

### Error: "Blob upload failed"
```bash
# Solución:
# 1. Verificar BLOB_READ_WRITE_TOKEN
# 2. Verificar token en Vercel está activo
# 3. Regenerar si es necesario
```

### Imágenes no se ven
```bash
# Solución:
# 1. Verificar RLS en Supabase (debe estar ON)
# 2. Verificar tabla existe: SELECT * FROM gallery_images;
# 3. Verificar remote patterns en next.config.ts
```

---

## 📂 ARCHIVOS IMPORTANTES

```
.env.local                  ← Credenciales (NO COMMITEAR)
.env.local.example          ← Plantilla de referencia
SETUP_GUIDE.md             ← Guía detallada de configuración
README_GALLERY.md          ← Documentación completa
PROJECT_SUMMARY.md         ← Este archivo
app/page.tsx               ← Página principal (galería)
app/api/images/            ← API de imágenes
app/components/            ← Componentes React
app/lib/supabase.ts        ← Cliente Supabase
next.config.ts             ← Configuración Next.js
```

---

## 🔗 ENLACES ÚTILES

- [Supabase](https://app.supabase.com) - Base de datos
- [Vercel](https://vercel.com) - Hosting y Blob
- [GitHub](https://github.com) - Control de versiones
- [Next.js Docs](https://nextjs.org/docs) - Documentación

---

## 💾 SQL PARA CREAR TABLA

```sql
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_images_title ON gallery_images(title);
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON gallery_images FOR DELETE USING (true);
```

---

## 🎯 FLUJO COMPLETO

```
1. DESARROLLO LOCAL
   └─ npm run dev → http://localhost:3000

2. CONFIGURAR SERVICIOS
   ├─ Supabase: Crear tabla
   ├─ Vercel Blob: Token
   └─ .env.local: Variables

3. TESTING
   └─ Crear/Editar/Eliminar imágenes

4. GIT PUSH
   └─ git push origin main

5. VERCEL DEPLOY
   ├─ Conectar GitHub
   ├─ Agregar env vars
   └─ Deploy automático

6. ¡LISTO!
   └─ https://tu-proyecto.vercel.app
```

---

## 📊 ESTRUCTURA DE DATOS

### Tabla: gallery_images

```sql
id              UUID (PRIMARY KEY)
title           VARCHAR(255) NOT NULL
description     TEXT
image_url       TEXT NOT NULL
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## 🔐 VARIABLES DE ENTORNO

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Vercel Blob
BLOB_READ_WRITE_TOKEN

# API
NEXT_PUBLIC_API_URL
```

---

## ✨ FEATURES

✅ Galería 4 columnas
✅ CRUD completo
✅ Búsqueda en tiempo real
✅ Upload de imágenes
✅ Modales dinámicos
✅ Toast notifications
✅ Iconos modernos
✅ Animaciones
✅ Responsive design
✅ TypeScript 100%

---

## 🚀 ¡STARTS NOW!

Siguiendo esta guía, en 5-10 minutos tendrás tu galería completamente funcional en línea.

**¡Buena suerte!** 🎉
