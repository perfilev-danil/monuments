"use client";

import { useState, useEffect } from "react";

export default function PersonalitiesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [personalities, setPersonalities] = useState<any>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    link: "",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/admin/roles");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPersonalities = async () => {
      try {
        const response = await fetch("/api/admin/personalities");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setPersonalities(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
    fetchPersonalities();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("role", formData.role);
    form.append("link", formData.link);

    try {
      const response = await fetch("/api/admin/personalities", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при создании");
      const created = await response.json();
      setPersonalities([...personalities, created]);
      setFormData({ name: "", role: "", link: "" });
      setShowFormModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const personality = personalities.find((m: any) => m.id === selectedId);
    if (!personality) return;

    setFormData({
      name: personality?.appellation_personality?.value || "",
      role: personality?.role?.value || "",
      link: personality?.information_object_personality?.value || "",
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
    form.append("role", formData.role);
    form.append("link", formData.link);

    try {
      const response = await fetch(`/api/admin/personalities/${selectedId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      const updated = await response.json();
      setPersonalities(
        personalities.map((m: any) => (m.id === selectedId ? updated : m))
      );

      setFormData({ name: "", role: "", link: "" });
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
    if (!confirm(`Удалить с ID ${id}?`)) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/personalities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      setPersonalities(personalities.filter((m: any) => m.id !== id));
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
          <div className="bg-white p-6 max-w-lg w-full relative">
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
                <label className="block mb-1">ФИО</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Роль</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full p-2 border "
                  required
                >
                  <option value="" disabled>
                    Выберите роль
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.value}>
                      {role.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Ссылка</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full p-2 border"
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
              <th className="border border-[var(--dark)] px-4 py-2">ФИО</th>
              <th className="border border-[var(--dark)] px-4 py-2">Роль</th>
              <th className="border border-[var(--dark)] px-4 py-2">Ссылка</th>

              {/* Добавь другие заголовки */}
            </tr>
          </thead>
          <tbody>
            {personalities.map((personality: any) => (
              <tr
                key={personality?.id}
                onClick={() => setSelectedId(personality.id)}
                className={`cursor-pointer ${
                  selectedId === personality?.id ? "bg-blue-100" : ""
                }`}
              >
                <td className="border border-[var(--dark)] px-4 py-2">
                  {personality?.id}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2">
                  {personality?.appellation_personality?.value}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2">
                  {personality?.role?.value}
                </td>
                <td className="border border-[var(--dark)] px-4 py-2 break-all">
                  {personality?.information_object_personality?.value}
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
