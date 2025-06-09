"use client";

import { useState, useEffect } from "react";

export default function MonumentsList() {
  const [isLoading, setIsLoading] = useState(true);

  const [monuments, setMonuments] = useState<any>([]);
  const [personalities, setPersonalities] = useState<any>([]);
  const [periods, setPeriods] = useState<any>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    concept: "",

    inscription: "",
    registry: "",
    registry_link: "",
    info: "",
    info_link: "",

    period: "",

    personalities: [] as string[],

    images: [] as File[],
  });
  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetch("/api/admin/periods");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setPeriods(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
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

    const fetchMonuments = async () => {
      try {
        const response = await fetch("/api/admin/monuments");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setMonuments(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeriods();
    fetchPersonalities();
    fetchMonuments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("year", formData.year);
    form.append("concept", formData.concept);
    form.append("inscription", formData.inscription);
    form.append("registry", formData.registry);
    form.append("registry_link", formData.registry_link);
    form.append("info", formData.info);
    form.append("info_link", formData.info_link);
    form.append("period", formData.period);

    for (const personalityId of formData.personalities) {
      form.append("personalities", personalityId); // Используем одно имя для массива
    }

    for (const file of formData.images) {
      form.append("images", file);
    }

    try {
      const response = await fetch("/api/admin/monuments", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при создании памятника");
      const created = await response.json();
      setMonuments([...monuments, created]); // обновление списка
      setFormData({
        name: "",
        description: "",
        year: "",
        concept: "",
        inscription: "",
        registry: "",
        registry_link: "",
        info: "",
        info_link: "",
        period: "",
        personalities: [],
        images: [],
      }); // очистка формы
      setShowFormModal(false); // закрыть модалку
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const monument = monuments.find((m: any) => m.id === selectedId);
    if (!monument) return;

    setFormData({
      name: monument?.appellation_monument?.value || "",
      description: monument?.description_monument?.value || "",
      year: monument?.year.value,
      concept: monument?.conceptual_object?.value,
      inscription: monument?.inscription?.value,
      registry: monument?.appellation_registry?.value,
      registry_link:
        monument?.appellation_registry?.information_object_registry?.value,
      info: monument?.appellation_info?.value,
      info_link: monument?.appellation_info?.information_object_info?.value,
      period: monument?.periodId?.toString() || "",

      personalities:
        monument?.personalities?.map((p: any) => p.id.toString()) || [], // Получаем массив ID личностей

      images: [],
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
    form.append("description", formData.description);
    form.append("year", formData.year);
    form.append("concept", formData.concept);
    form.append("inscription", formData.inscription);
    form.append("registry", formData.registry);
    form.append("registry_link", formData.registry_link);
    form.append("info", formData.info);
    form.append("info_link", formData.info_link);
    form.append("period", formData.period);

    for (const personalityId of formData.personalities) {
      form.append("personalities", personalityId); // Используем одно имя для массива
    }

    for (const file of formData.images) {
      form.append("images", file);
    }

    try {
      const response = await fetch(`/api/admin/monuments/${selectedId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      const updated = await response.json();
      setMonuments(
        monuments.map((m: any) => (m.id === selectedId ? updated : m))
      );

      setFormData({
        name: "",
        description: "",
        year: "",
        concept: "",
        inscription: "",
        registry: "",
        registry_link: "",
        info: "",
        info_link: "",
        period: "",
        personalities: [],
        images: [],
      }); // очистка формы
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
    if (!confirm(`Удалить памятник с ID ${id}?`)) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/monuments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      setMonuments(monuments.filter((m: any) => m.id !== id));
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
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowFormModal(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Новый памятник</h2>

            <form
              onSubmit={isEditing ? handleUpdate : handleCreate}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label className="block mb-1">Название:</label>
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
                <label className="block mb-1">Описание:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-1">Год:</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Мемориальное значение:</label>
                <input
                  type="text"
                  value={formData.concept}
                  onChange={(e) =>
                    setFormData({ ...formData, concept: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Надпись на табличке:</label>
                <input
                  type="text"
                  value={formData.inscription}
                  onChange={(e) =>
                    setFormData({ ...formData, inscription: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Номер в гос. реестре ОКН:</label>
                <input
                  type="text"
                  value={formData.registry}
                  onChange={(e) =>
                    setFormData({ ...formData, registry: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Ссылка на гос. реестр ОКН:</label>
                <input
                  type="text"
                  value={formData.registry_link}
                  onChange={(e) =>
                    setFormData({ ...formData, registry_link: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Источник:</label>
                <input
                  type="text"
                  value={formData.info}
                  onChange={(e) =>
                    setFormData({ ...formData, info: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Ссылка на источник:</label>
                <input
                  type="text"
                  value={formData.info_link}
                  onChange={(e) =>
                    setFormData({ ...formData, info_link: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Период</label>
                <select
                  name="period"
                  value={formData.period || ""} // Добавляем fallback для undefined
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      period: e.target.value, // Берем просто значение, без массива
                    });
                  }}
                  className="w-full p-2 border rounded" // Убрали h-40 (не нужно для одиночного выбора)
                >
                  <option value="">Выберите период</option>
                  {periods.map((period: any) => (
                    <option key={period.id} value={period.id}>
                      {period?.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Личности</label>
                <select
                  name="personalities"
                  multiple
                  value={formData.personalities}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions
                    ).map((option) => option.value);
                    setFormData({
                      ...formData,
                      personalities: selectedOptions,
                    });
                  }}
                  className="w-full p-2 border rounded h-40"
                >
                  {personalities.map((personality: any) => (
                    <option key={personality.id} value={personality.id}>
                      {personality?.appellation_personality?.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Изображения:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: Array.from(e.target.files || []),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Отмена
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {isEditing ? "Редактировать памятник" : "Новый памятник"}
                </h2>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
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

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Название</th>
            <th className="border border-gray-300 px-4 py-2">Описание</th>
            <th className="border border-gray-300 px-4 py-2">Год</th>
            <th className="border border-gray-300 px-4 py-2">
              Мемориальное значение
            </th>

            <th className="border border-gray-300 px-4 py-2">
              Надпись на табличке
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Номер в гос. реестре ОКН
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Ссылка на гос. реестр ОКН
            </th>
            <th className="border border-gray-300 px-4 py-2">Источник</th>
            <th className="border border-gray-300 px-4 py-2">
              Ссылка на источник
            </th>
            <th className="border border-gray-300 px-4 py-2">Период</th>
            <th className="border border-gray-300 px-4 py-2">Личности</th>

            {/* Добавь другие заголовки */}
          </tr>
        </thead>
        <tbody>
          {monuments.map((monument: any) => (
            <tr
              key={monument.id}
              onClick={() => setSelectedId(monument.id)}
              className={`cursor-pointer ${
                selectedId === monument.id ? "bg-blue-100" : ""
              }`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {monument?.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.appellation_monument?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.description_monument?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.year?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.conceptual_object?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.inscription?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.appellation_registry?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {
                  monument?.appellation_registry?.information_object_registry
                    ?.value
                }
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.appellation_info?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.appellation_info?.information_object_info?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.period?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {monument?.personalities?.map(
                  (personality: any, index: number) => (
                    <div key={index}>
                      {personality.appellation_personality?.value}
                    </div>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        {selectedId && (
          <button
            onClick={() => handleDelete(selectedId)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Удаление..." : `Удалить памятник ID ${selectedId}`}
          </button>
        )}

        <button
          onClick={() => setShowFormModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Добавить памятник
        </button>
        <button
          onClick={handleEditClick}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
        >
          Изменить
        </button>
      </div>
    </div>
  );
}
