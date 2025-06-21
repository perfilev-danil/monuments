"use client";

import { useState, useEffect } from "react";

export default function ImagesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/admin/images");
      if (!response.ok) throw new Error("Ошибка загрузки изображений");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(`Удалить изображение с ID ${id}?`)) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка при удалении");

      await fetchImages();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  // Функция для создания URL из blob
  const getImageUrl = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/images/${id}`);
      if (!response.ok) throw new Error("Ошибка загрузки изображения");
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Предпросмотр</th>
            <th className="border px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <ImageRow
              key={image.id}
              image={image}
              onDelete={handleDelete}
              isDeleting={deletingId === image.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageRow({
  image,
  onDelete,
  isDeleting,
}: {
  image: any;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetch(`/api/admin/images/${image.id}`)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob));
      setImageUrl(url);
    };

    loadImage();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [image.id]);

  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">{image.id}</td>
      <td className="border px-4 py-2">
        <div className="flex justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Image ${image.id}`}
              className="h-20 object-contain"
            />
          ) : (
            <div className="h-20 flex items-center">Загрузка...</div>
          )}
        </div>
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => onDelete(image.id)}
          disabled={isDeleting}
          className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid black" }}
        >
          {isDeleting ? "Удаление..." : "Удалить"}
        </button>
      </td>
    </tr>
  );
}
