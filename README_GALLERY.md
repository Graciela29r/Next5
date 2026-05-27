# Galería CRUD de Imágenes

Una aplicación web moderna para gestionar una galería de imágenes con funcionalidad CRUD completa, construida con Next.js 16.2.6, Tailwind CSS 4.3, Supabase y Vercel Blob Storage.

## 🚀 Características

- ✅ **Galería de 4 columnas**: Diseño responsivo con cuadrícula de imágenes
- ✅ **CRUD Completo**: Crear, editar, eliminar y ver imágenes
- ✅ **Upload de Imágenes**: Sube imágenes desde tu PC a Vercel Blob
- ✅ **Búsqueda**: Busca imágenes por título en tiempo real
- ✅ **Modales Dinámicos**: Formularios en modales para crear/editar
- ✅ **Notificaciones Toast**: Feedback visual con sonner
- ✅ **Iconos**: Íconos modernos con lucide-react
- ✅ **Animaciones Loading**: Indicadores de carga con animaciones
- ✅ **Responsivo**: Adaptable a todos los tamaños de pantalla
- ✅ **Configurado para Vercel**: Listo para deployar en Vercel

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Cuenta en Supabase
- Cuenta en Vercel
- Cuenta en GitHub

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio-url>
cd next5
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

#### Crear base de datos en Supabase

1. Ir a [supabase.com](https://supabase.com) y crear una cuenta
2. Crear un nuevo proyecto
3. En el SQL Editor, ejecutar el siguiente SQL para crear la tabla:

```sql
-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for search
CREATE INDEX idx_gallery_images_title ON gallery_images(title);

-- Add RLS policies (Row Level Security)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" 
ON gallery_images FOR SELECT
USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" 
ON gallery_images FOR INSERT
WITH CHECK (true);

-- Allow public update access
CREATE POLICY "Allow public update access" 
ON gallery_images FOR UPDATE
USING (true);

-- Allow public delete access
CREATE POLICY "Allow public delete access" 
ON gallery_images FOR DELETE
USING (true);
```

4. Copiar las credenciales:
   - Ir a Settings → API
   - Copiar `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copiar `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configurar Vercel Blob

1. Ir a [vercel.com](https://vercel.com)
2. Crear un nuevo proyecto (o usar uno existente)
3. Ir a Settings → Storage
4. Crear un nuevo Blob Storage
5. Copiar el token en `.env.local` → `BLOB_READ_WRITE_TOKEN`

### 5. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase

# Vercel Blob
BLOB_READ_WRITE_TOKEN=tu_token_de_vercel_blob

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🚀 Desarrollo Local

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Build para Producción

```bash
npm run build
npm start
```

## 🌐 Deploy en Vercel

### 1. Conectar GitHub

1. Hacer push del código a GitHub
2. Ir a [vercel.com](https://vercel.com)
3. Importar el repositorio desde GitHub

### 2. Configurar variables de entorno

En Vercel, ir a Settings → Environment Variables y agregar:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
BLOB_READ_WRITE_TOKEN=tu_token
NEXT_PUBLIC_API_URL=https://tu-dominio.vercel.app
```

### 3. Deploy

Vercel desplegará automáticamente cuando hagas push a main.

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   ├── images/
│   │   │   ├── route.ts          # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE
│   │   └── upload/
│   │       └── route.ts          # POST (Vercel Blob upload)
│   ├── components/
│   │   ├── Modal.tsx             # Modal component
│   │   ├── ImageForm.tsx         # Form for create/edit
│   │   ├── ImageCard.tsx         # Individual image card
│   │   └── ToastProvider.tsx     # Toast notifications setup
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Gallery page
├── public/
│   └── images/                   # Static images
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── package.json
```

## 🛣️ Rutas de API

### Imágenes
- `GET /api/images` - Obtener todas las imágenes (con búsqueda opcional)
- `POST /api/images` - Crear nueva imagen
- `GET /api/images/[id]` - Obtener imagen específica
- `PUT /api/images/[id]` - Actualizar imagen
- `DELETE /api/images/[id]` - Eliminar imagen

### Upload
- `POST /api/upload` - Subir archivo a Vercel Blob

## 🎨 Tecnologías Utilizadas

- **Next.js 16.2.6** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4.3** - Estilos
- **Supabase** - Base de datos PostgreSQL
- **Vercel Blob** - Almacenamiento de imágenes
- **Sonner** - Notificaciones Toast
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 🔄 Flujo CRUD

### Crear Imagen
1. Click en "Nueva Imagen"
2. Completar formulario (título, descripción, imagen)
3. Sistema carga imagen a Vercel Blob
4. Se crea registro en Supabase
5. Toast confirma operación

### Editar Imagen
1. Click en "Editar" en tarjeta
2. Se abre modal con datos actuales
3. Modificar título y descripción (opcional: nueva imagen)
4. Sistema actualiza Supabase
5. Toast confirma operación

### Eliminar Imagen
1. Click en "Eliminar" en tarjeta
2. Confirmar eliminación
3. Sistema elimina imagen de Vercel Blob
4. Sistema elimina registro de Supabase
5. Toast confirma operación

### Buscar
- Escribir en la barra de búsqueda
- Filtra por título en tiempo real
- Búsqueda case-insensitive

## 🐛 Solución de Problemas

### Las imágenes no aparecen
- Verificar que NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY estén correctos
- Verificar que la tabla `gallery_images` exista en Supabase
- Verificar RLS policies en Supabase

### Upload no funciona
- Verificar que BLOB_READ_WRITE_TOKEN esté correcto
- Verificar que el token tiene permisos de lectura/escritura

### Error de CORS
- Verificar configuración de CORS en Vercel Blob
- Verificar configuración de Supabase

## 📝 Variables de Entorno

```
NEXT_PUBLIC_SUPABASE_URL      # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY # Anon key de Supabase
BLOB_READ_WRITE_TOKEN         # Token de Vercel Blob
NEXT_PUBLIC_API_URL           # URL de la API (para producción)
```

## 🔐 Seguridad

- Las variables de entorno sensibles se encuentran en `.env.local`
- Se usa Row Level Security (RLS) en Supabase
- Los tokens de Vercel Blob tienen permisos limitados
- Las contraseñas y keys no se commitean a GitHub

## 📞 Soporte

Para problemas o preguntas:
1. Revisar la documentación oficial de cada servicio
2. Consultar los logs en Vercel
3. Revisar la consola del navegador

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

**¡Disfruta tu galería de imágenes!** 🎉
