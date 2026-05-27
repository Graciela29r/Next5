'use client';

import { Edit2, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ImageCard({
  id,
  title,
  description,
  imageUrl,
  onEdit,
  onDelete,
}: ImageCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition duration-300"
          priority
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition font-medium text-sm"
          >
            <Edit2 className="h-4 w-4" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition font-medium text-sm"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
