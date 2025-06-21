"use client";

import { useState, useEffect } from "react";

export default function MarksList() {
  const [isLoading, setIsLoading] = useState(true);
  const [marks, setMarks] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch("/api/admin/marks");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setMarks(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("name", formData.name);

    try {
      const response = await fetch("/api/admin/marks", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при создании");
      const created = await response.json();
      setMarks([...marks, created]);
      setFormData({ name: "" });
      setShowFormModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const mark = marks.find((m: any) => m.id === selectedId);
    if (!mark) return;

    setFormData({
      name: mark?.value || "",
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

    try {
      const response = await fetch(`/api/admin/marks/${selectedId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      const updated = await response.json();
      setMarks(marks.map((m: any) => (m.id === selectedId ? updated : m)));

      setFormData({ name: "" });
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
      const response = await fetch(`/api/admin/marks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      setMarks(marks.filter((m: any) => m.id !== id));
      setSelectedId(null);
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
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
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
            <tr className="">
              <th className="border border-[var(--dark)] px-4 py-2">ID</th>
              <th className="border border-[var(--dark)] px-4 py-2">
                Название
              </th>
              {/* Добавь другие заголовки */}
            </tr>
          </thead>
          <tbody>
            {marks.map((mark: any) => (
              <tr
                key={mark.id}
                onClick={() => setSelectedId(mark.id)}
                className={`cursor-pointer ${
                  selectedId === mark.id ? "bg-blue-100" : ""
                }`}
              >
                <td className="border border-[var(--dark)] px-4 py-2">
                  {mark?.id}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2">
                  {mark?.value}
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
