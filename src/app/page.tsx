'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/Modal';
import { ImageForm } from '@/components/ImageForm';
import { ImageCard } from '@/components/ImageCard';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Fetch images
  const fetchImages = async (search = '') => {
    setIsLoading(true);
    try {
      const url = new URL('/api/images', window.location.origin);
      if (search) url.searchParams.append('search', search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to fetch');

      const { data } = await res.json();
      setImages(data || []);
      setFilteredImages(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar las imágenes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = images.filter((img) =>
        img.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(images);
    }
  }, [searchTerm, images]);

  // Handle upload and create
  const handleCreateImage = async (data: {
    title: string;
    description: string;
    file: File;
  }) => {
    setIsFormLoading(true);
    try {
      // Upload file to Vercel Blob
      const formData = new FormData();
      formData.append('file', data.file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');
      const { url } = await uploadRes.json();

      // Create image record in Supabase
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image_url: url,
        }),
      });

      if (!res.ok) throw new Error('Create failed');

      toast.success('Imagen creada exitosamente');
      setIsModalOpen(false);
      await fetchImages(searchTerm);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear la imagen');
    } finally {
      setIsFormLoading(false);
    }
  };

  // Handle update
  const handleUpdateImage = async (data: {
    title: string;
    description: string;
    file: File;
  }) => {
    if (!editingId) return;

    setIsFormLoading(true);
    try {
      let imageUrl = editingImage?.image_url;

      // If file is provided, upload new one
      if (data.file && data.file.size > 0) {
        const formData = new FormData();
        formData.append('file', data.file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Upload failed');
        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      const res = await fetch(`/api/images/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image_url: imageUrl,
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      toast.success('Imagen actualizada exitosamente');
      setIsModalOpen(false);
      setEditingId(null);
      setEditingImage(null);
      await fetchImages(searchTerm);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar la imagen');
    } finally {
      setIsFormLoading(false);
    }
  };

  // Handle delete
  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      toast.success('Imagen eliminada exitosamente');
      await fetchImages(searchTerm);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la imagen');
    }
  };

  // Handle edit
  const handleEditClick = async (id: string) => {
    try {
      const res = await fetch(`/api/images/${id}`);
      if (!res.ok) throw new Error('Fetch failed');

      const { data } = await res.json();
      setEditingImage(data);
      setEditingId(id);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar la imagen');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setEditingImage(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Galería de Imágenes
              </h1>
              <p className="text-gray-600 mt-1">
                Crea, edita y administra tu galería
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="h-5 w-5" />
              Nueva Imagen
            </button>
          </div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                id={image.id}
                title={image.title}
                description={image.description}
                imageUrl={image.image_url}
                onEdit={handleEditClick}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <p className="text-gray-600 text-lg mb-2">
              {searchTerm
                ? 'No se encontraron imágenes que coincidan con tu búsqueda'
                : 'No hay imágenes en la galería'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Crear Primera Imagen
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Editar Imagen' : 'Crear Nueva Imagen'}
      >
        <ImageForm
          onSubmit={editingId ? handleUpdateImage : handleCreateImage}
          isLoading={isFormLoading}
          isEdit={!!editingId}
          defaultTitle={editingImage?.title}
          defaultDescription={editingImage?.description}
        />
      </Modal>
    </main>
  );
}
