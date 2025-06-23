"use client";

import { useState, useEffect } from "react";

export default function ColorsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch("/api/admin/colors");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setColors(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("code", formData.code);

    try {
      const response = await fetch("/api/admin/colors", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при создании цвета");
      const created = await response.json();
      setColors([...colors, created]);
      setFormData({ name: "", code: "" });
      setShowFormModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const color = colors.find((m: any) => m.id === selectedId);
    if (!color) return;

    setFormData({
      name: color?.value || "",
      code: color?.code || "",
    });

    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    setIsLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("code", formData.code);

    try {
      const response = await fetch(`/api/admin/colors/${selectedId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      const updated = await response.json();
      setColors(colors.map((m: any) => (m.id === selectedId ? updated : m)));

      setFormData({ name: "", code: "" });
      setShowFormModal(false);
      setIsEditing(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Удалить цвет с ID ${id}?`)) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/colors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      setColors(colors.filter((m: any) => m.id !== id));
      setSelectedId(null); // сброс выбранного
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Модальное окно */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowFormModal(false)}
            >
              &times;
            </button>

            <form
              onSubmit={isEditing ? handleUpdate : handleCreate}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label className="block mb-1">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Код</label>
                <input
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="w-full p-2 border"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  {isLoading
                    ? isEditing
                      ? "Обновление..."
                      : "Создание..."
                    : isEditing
                    ? "Сохранить"
                    : "Создать"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-[var(--dark)]">
              <th className="border border-[var(--dark)] px-4 py-2">ID</th>
              <th className="border border-[var(--dark)] px-4 py-2">
                Название
              </th>
              <th className="border border-[var(--dark)] px-4 py-2">
                HEX-код (без #)
              </th>
              {/* Добавь другие заголовки */}
            </tr>
          </thead>
          <tbody>
            {colors.map((color: any) => (
              <tr
                key={color.id}
                onClick={() => setSelectedId(color.id)}
                className={`cursor-pointer ${
                  selectedId === color.id ? "bg-blue-100" : ""
                }`}
              >
                <td className="border border-[var(--dark)] px-4 py-2">
                  {color?.id}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2">
                  {color?.value}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2">
                  {color?.code}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-8">
          {selectedId && (
            <button
              onClick={() => handleDelete(selectedId)}
              className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
              style={{ border: "1px solid black" }}
              disabled={isLoading}
            >
              {isLoading ? "Удаление..." : `Удалить ID ${selectedId}`}
            </button>
          )}

          <button
            onClick={() => setShowFormModal(true)}
            className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid black" }}
          >
            Добавить
          </button>
          <button
            onClick={handleEditClick}
            className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid black" }}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
}
