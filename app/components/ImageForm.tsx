'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    file: File;
  }) => Promise<void>;
  isLoading?: boolean;
  defaultTitle?: string;
  defaultDescription?: string;
  isEdit?: boolean;
}

export function ImageForm({
  onSubmit,
  isLoading = false,
  defaultTitle = '',
  defaultDescription = '',
  isEdit = false,
}: ImageFormProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe pesar más de 5MB');
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('El título es requerido');
      return;
    }

    if (!file && !isEdit) {
      toast.error('La imagen es requerida');
      return;
    }

    if (!file && isEdit) {
      // If editing without changing the image
      try {
        await onSubmit({
          title,
          description,
          file: new File([], ''),
        });
      } catch (error) {
        console.error('Error:', error);
      }
      return;
    }

    if (file) {
      try {
        await onSubmit({
          title,
          description,
          file,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la imagen"
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la imagen"
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      {!isEdit && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 flex justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition cursor-pointer"
          >
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded"
                  />
                  <p className="text-sm text-gray-600">{file?.name}</p>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Clic para cargar
                    </span>
                    {' '}o arrastra y suelta
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isEdit ? 'Actualizar' : 'Crear'} Imagen
      </button>
    </form>
  );
}
