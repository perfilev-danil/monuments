"use client";

import { useState, useEffect } from "react";

export default function PlacesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<any>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    address: "",
    lon: "",
    lat: "",
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/admin/locations");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await fetch("/api/admin/places");
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setPlaces(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
    fetchPlaces();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("location", formData.location);
    form.append("address", formData.address);
    form.append("lon", formData.lon);
    form.append("lat", formData.lat);

    try {
      const response = await fetch("/api/admin/places", {
        method: "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при создании");
      const created = await response.json();
      setPlaces([...places, created]);
      setFormData({ location: "", address: "", lon: "", lat: "" });
      setShowFormModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    const place = places.find((m: any) => m.id === selectedId);
    if (!place) return;

    setFormData({
      location: place?.appellation_place?.value || "",
      address: place?.appellation_address?.value || "",
      lon: place?.appellation_address?.coordinates?.lon || "",
      lat: place?.appellation_address?.coordinates?.lat || "",
    });

    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    setIsLoading(true);

    const form = new FormData();
    form.append("location", formData.location);
    form.append("address", formData.address);
    form.append("lon", formData.lon);
    form.append("lat", formData.lat);

    try {
      const response = await fetch(`/api/admin/places/${selectedId}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) throw new Error("Ошибка при обновлении");

      const updated = await response.json();
      setPlaces(places.map((m: any) => (m.id === selectedId ? updated : m)));

      setFormData({ location: "", address: "", lon: "", lat: "" });

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
      const response = await fetch(`/api/admin/places/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      setPlaces(places.filter((m: any) => m.id !== id));
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

            <h2 className="text-xl font-semibold mb-4">Новое место</h2>

            <form
              onSubmit={isEditing ? handleUpdate : handleCreate}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div>
                <label className="block mb-1">Населённый пункт</label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Выберите населённый пункт
                  </option>
                  {locations.map((location) => (
                    <option key={location?.id} value={location?.value}>
                      {location?.value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Адрес</label>
                <input
                  type="text"
                  value={formData?.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Широта</label>
                <input
                  type="text"
                  value={formData.lat}
                  onChange={(e) =>
                    setFormData({ ...formData, lat: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Долгота</label>
                <input
                  type="text"
                  value={formData.lon}
                  onChange={(e) =>
                    setFormData({ ...formData, lon: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
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
                  {isEditing ? "Редактировать" : "Новый"}
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
            <th className="border border-gray-300 px-4 py-2">
              Населённый пункт
            </th>
            <th className="border border-gray-300 px-4 py-2">Адрес</th>
            <th className="border border-gray-300 px-4 py-2">Широта</th>
            <th className="border border-gray-300 px-4 py-2">Долгота</th>

            {/* Добавь другие заголовки */}
          </tr>
        </thead>
        <tbody>
          {places.map((place: any) => (
            <tr
              key={place?.id}
              onClick={() => setSelectedId(place.id)}
              className={`cursor-pointer ${
                selectedId === place?.id ? "bg-blue-100" : ""
              }`}
            >
              <td className="border border-gray-300 px-4 py-2">{place?.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {place?.appellation_place?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {place?.appellation_address?.value}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {place?.appellation_address?.coordinates?.lat}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {place?.appellation_address?.coordinates?.lon}
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
            {isLoading ? "Удаление..." : `Удалить цвет ID ${selectedId}`}
          </button>
        )}

        <button
          onClick={() => setShowFormModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Добавить
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
