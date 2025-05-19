"use client";

import { useEffect, useState } from "react";

export default function MonumentsTable() {
  const [monuments, setMonuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    appellation_monument: "",
    description_monument: "",
    year: "",
  });
  const [formData, setFormData] = useState({
    appellation_monument: "",
    description_monument: "",
    year: "",
  });

  const [selectedColorsForAdd, setSelectedColorsForAdd] = useState<number[]>(
    []
  );
  const [selectedColorsForEdit, setSelectedColorsForEdit] = useState<number[]>(
    []
  );
  const [colors, setColors] = useState<any[]>([]);

  useEffect(() => {
    fetchMonuments();
    fetchColors();
  }, []);

  const fetchMonuments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/monuments");
      const data = await res.json();
      setMonuments(data);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchColors = async () => {
    try {
      const res = await fetch("/api/colors");
      const data = await res.json();
      setColors(data);
    } catch (error) {
      console.error("Ошибка при загрузке цветов:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedId || !confirm("Вы уверены, что хотите удалить эту запись?"))
      return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/monuments/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      await fetchMonuments();
      setSelectedId(null);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleAdd = async () => {
    if (
      !formData.appellation_monument ||
      !formData.description_monument ||
      !formData.year
    ) {
      alert("Заполните все поля");
      return;
    }

    try {
      setAdding(true);
      const response = await fetch("/api/monuments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appellation_monument: formData.appellation_monument,
          description_monument: formData.description_monument,
          year: formData.year,
          colorIds: selectedColorsForAdd,
        }),
      });

      if (!response.ok) throw new Error("Ошибка при добавлении");

      await fetchMonuments();
      setFormData({
        appellation_monument: "",
        description_monument: "",
        year: "",
      });
      setSelectedColorsForAdd([]);
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = () => {
    if (!selectedId) return;

    const selectedMonument = monuments.find((m) => m.id === selectedId);
    if (selectedMonument) {
      setEditFormData({
        appellation_monument: selectedMonument.appellation_monument.value,
        description_monument: selectedMonument.description_monument.value,
        year: selectedMonument?.year?.value || "",
      });
      setSelectedColorsForEdit(
        selectedMonument.colors?.map((c: any) => c.id) || []
      );
      setEditing(true);
    }
  };

  const handleUpdate = async () => {
    if (
      !selectedId ||
      !editFormData.appellation_monument ||
      !editFormData.description_monument ||
      !editFormData.year
    ) {
      alert("Заполните все поля");
      return;
    }

    try {
      const response = await fetch(`/api/monuments/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appellation_monument: editFormData.appellation_monument,
          description_monument: editFormData.description_monument,
          year: editFormData.year,
          colorIds: selectedColorsForEdit,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка при обновлении");
      }

      await fetchMonuments();
      setEditing(false);
    } catch (error: any) {
      console.error("Ошибка при обновлении:", error);
      alert(error.message);
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

  const handleColorSelectForAdd = (colorId: number) => {
    setSelectedColorsForAdd((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleColorSelectForEdit = (colorId: number) => {
    setSelectedColorsForEdit((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="space-y-2">
      <div className="bg-white border-1 border-black p-2">
        <h2 className="text-base font-semibold mb-2">
          Добавить новый памятник
        </h2>
        <div className="w-full space-y-2">
          <div className="flex w-full gap-2">
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Название</label>
              <input
                type="text"
                name="appellation_monument"
                value={formData.appellation_monument}
                onChange={handleInputChange}
                className="w-full p-2 border-1 border-black"
                placeholder="Бюст В.И.Сурикова"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Описание</label>
              <input
                type="text"
                name="description_monument"
                value={formData.description_monument}
                onChange={handleInputChange}
                className="w-full p-2 border-1 border-black"
                placeholder="..."
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Год</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full p-2 border-1 border-black"
                placeholder="1968"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-gray-700 mb-1">Цвета</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`p-2 border cursor-pointer ${
                    selectedColorsForAdd.includes(color.id)
                      ? "bg-blue-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleColorSelectForAdd(color.id)}
                >
                  {color.value}
                </div>
              ))}
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
              <th className="border p-2 text-base font-semibold">Название</th>
              <th className="border p-2 text-base font-semibold">Описание</th>
              <th className="border p-2 text-base font-semibold">Год</th>
              <th className="border p-2 text-base font-semibold">Цвета</th>
            </tr>
          </thead>
          <tbody>
            {monuments?.map((monument: any) => (
              <tr
                key={monument?.id}
                className={`cursor-pointer ${
                  selectedId === monument.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleRowClick(monument.id)}
              >
                <td className="border p-2">{monument?.id}</td>
                <td className="border p-2">
                  {editing && selectedId === monument.id ? (
                    <input
                      type="text"
                      name="appellation_monument"
                      value={editFormData.appellation_monument}
                      onChange={handleEditInputChange}
                      className="w-full p-1 border-1 border-black"
                    />
                  ) : (
                    monument?.appellation_monument?.value
                  )}
                </td>
                <td className="border p-2">
                  {editing && selectedId === monument.id ? (
                    <input
                      type="text"
                      name="description_monument"
                      value={editFormData.description_monument}
                      onChange={handleEditInputChange}
                      className="w-full p-1 border-1 border-black"
                    />
                  ) : (
                    monument?.description_monument?.value
                  )}
                </td>

                <td className="border p-2">
                  {editing && selectedId === monument.id ? (
                    <input
                      type="text"
                      name="year"
                      value={editFormData.year}
                      onChange={handleEditInputChange}
                      className="w-full p-1 border-1 border-black"
                    />
                  ) : (
                    monument?.year?.value || "" // Добавляем fallback для undefined
                  )}
                </td>

                <td className="border p-2">
                  {editing && selectedId === monument.id ? (
                    <div className="flex flex-wrap gap-1">
                      {colors.map((color) => (
                        <div
                          key={color.id}
                          className={`p-1 border cursor-pointer ${
                            selectedColorsForEdit.includes(color.id)
                              ? "bg-blue-100 border-blue-500"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleColorSelectForEdit(color.id)}
                        >
                          {color.value}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {monument.colors?.map((color: any) => (
                        <div
                          key={color.id}
                          className="inline-flex items-center"
                        >
                          <div>{color.value}</div>
                        </div>
                      ))}
                    </div>
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
                Выбран памятник ID: {selectedId}
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
