"use client";

import { useEffect, useState } from "react";

export default function ColorsTable() {
  const [colors, setColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    value: "",
    code: "",
  });
  const [formData, setFormData] = useState({
    value: "",
    code: "",
  });
  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/colors");
      const data = await res.json();
      setColors(data);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId || !confirm("Вы уверены, что хотите удалить этот цвет?"))
      return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/colors/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      await fetchColors();
      setSelectedId(null);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.value || !formData.code) {
      alert("Заполните все поля");
      return;
    }

    try {
      setAdding(true);
      const response = await fetch("/api/colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Ошибка при добавлении");

      await fetchColors();
      setFormData({ value: "", code: "" });
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = () => {
    if (!selectedId) return;

    const selectedColor = colors.find((c) => c.id === selectedId);
    if (selectedColor) {
      setEditFormData({
        value: selectedColor.value,
        code: selectedColor.code,
      });
      setEditing(true);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId || !editFormData.value || !editFormData.code) {
      alert("Заполните все поля");
      return;
    }

    try {
      const response = await fetch(`/api/colors/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      await fetchColors();
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowClick = (id: number) => {
    // Не сбрасываем выбор, если кликнули на ту же строку
    if (selectedId === id && editing) return;

    setSelectedId(id);
    // Сбрасываем редактирование только если кликнули на другую строку
    if (selectedId !== id) {
      setEditing(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="space-y-2">
      <div className="bg-white border-1 border-black p-2">
        <h2 className="text-base font-semibold mb-2">Добавить новый цвет</h2>
        <div className="w-full space-y-2">
          <div className="flex w-full gap-2">
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Название цвета</label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                className="w-full p-2 border-1 border-black"
                placeholder="Красный"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">
                Код цвета (HEX)
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full p-2 border-1 border-black"
                placeholder="#FF0000"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAdd}
              disabled={adding}
              className={`bg-blue-500 text-white p-2 hover:bg-blue-600 ${
                adding ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {adding ? "Добавление..." : "Добавить"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-1 border-black p-2 space-y-2">
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border p-2 text-base font-semibold">ID</th>
              <th className="border p-2 text-base font-semibold">Цвет</th>
              <th className="border p-2 text-base font-semibold">
                Код цвета (HEX)
              </th>
            </tr>
          </thead>
          <tbody>
            {colors?.map((color: any) => (
              <tr
                key={color?.id}
                className={`cursor-pointer ${
                  selectedId === color.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleRowClick(color.id)}
              >
                <td className="border p-2">{color?.id}</td>
                <td className="border p-2">
                  {editing && selectedId === color.id ? (
                    <input
                      type="text"
                      name="value"
                      value={editFormData.value}
                      onChange={handleEditInputChange}
                      className="w-full p-1 border-1 border-black"
                    />
                  ) : (
                    color?.value
                  )}
                </td>
                <td className="border p-2">
                  {editing && selectedId === color.id ? (
                    <input
                      type="text"
                      name="code"
                      value={editFormData.code}
                      onChange={handleEditInputChange}
                      className="w-full p-1 border-1 border-black"
                    />
                  ) : (
                    color?.code
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <div>
            {selectedId && (
              <span className="text-gray-700">
                Выбран цвет ID: {selectedId}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {!editing ? (
              <>
                <button
                  onClick={handleEdit}
                  disabled={!selectedId}
                  className={`bg-yellow-500 text-white p-2 hover:bg-yellow-600 ${
                    !selectedId ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Изменить
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!selectedId || deleting}
                  className={`bg-red-500 text-white p-2 hover:bg-red-600 ${
                    !selectedId || deleting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {deleting ? "Удаление..." : "Удалить"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white p-2 hover:bg-green-600"
                >
                  Сохранить
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white p-2 hover:bg-gray-600"
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
