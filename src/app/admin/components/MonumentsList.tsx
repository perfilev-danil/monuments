"use client";

import { useState, useEffect } from "react";

export default function MonumentsList() {
  const [isLoading, setIsLoading] = useState(true);

  const [monuments, setMonuments] = useState<any>([]);
  const [personalities, setPersonalities] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const [periods, setPeriods] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const [marks, setMarks] = useState<any>([]);
  const [techniques, setTechniques] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [materials, setMaterials] = useState<any>([]);

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
    document: "",
    document_link: "",

    period: "",
    location: "",
    address: "",
    lat: "",
    lon: "",

    personalities: [] as string[],
    events: [] as string[],
    marks: [] as string[],
    techniques: [] as string[],
    colors: [] as string[],
    materials: [] as string[],

    images: [] as File[],
  });
  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/periods`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setPeriods(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/locations`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setLocations(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPersonalities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/personalities`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setPersonalities(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/events`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setEvents(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMarks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/marks`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setMarks(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTechniques = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/techniques`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setTechniques(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/colors`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setColors(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/materials`
        );
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setMaterials(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMonuments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/monuments`
        );
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
    fetchLocations();
    fetchPersonalities();
    fetchEvents();
    fetchMarks();
    fetchTechniques();
    fetchColors();
    fetchMaterials();
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
    form.append("document", formData.document);
    form.append("document_link", formData.document_link);

    form.append("period", formData.period);
    form.append("location", formData.location);

    form.append("address", formData.address);
    form.append("lat", formData.lat);
    form.append("lon", formData.lon);

    for (const personalityId of formData.personalities) {
      form.append("personalities", personalityId);
    }

    for (const eventId of formData.events) {
      form.append("events", eventId);
    }

    for (const markId of formData.marks) {
      form.append("marks", markId);
    }

    for (const techniqueId of formData.techniques) {
      form.append("techniques", techniqueId);
    }

    for (const colorId of formData.colors) {
      form.append("colors", colorId);
    }

    for (const materialId of formData.materials) {
      form.append("materials", materialId);
    }

    for (const file of formData.images) {
      form.append("images", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/monuments`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) throw new Error("Ошибка при создании памятника");
      const created = await response.json();
      setMonuments([...monuments, created]);
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
        document: "",
        document_link: "",
        period: "",
        location: "",
        address: "",
        lat: "",
        lon: "",
        personalities: [],
        events: [],
        marks: [],
        techniques: [],
        colors: [],
        materials: [],
        images: [],
      });
      setShowFormModal(false);
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
      year: monument?.year.value || "",
      concept: monument?.conceptual_object?.value || "",
      inscription: monument?.inscription?.value || "",
      registry: monument?.appellation_registry?.value || "",
      registry_link:
        monument?.appellation_registry?.information_object_registry?.value ||
        "",
      info: monument?.appellation_info?.value || "",
      info_link:
        monument?.appellation_info?.information_object_info?.value || "",
      document: monument?.document?.value || "",
      document_link:
        monument?.document?.information_object_document?.value || "",

      period: monument?.periodId?.toString() || "",
      location: monument?.place?.appellation_place?.id.toString() || "",

      address: monument?.place?.appellation_address?.value || "",
      lat: monument?.place?.appellation_address?.coordinates?.lat || "",
      lon: monument?.place?.appellation_address?.coordinates?.lon || "",

      personalities:
        monument?.personalities?.map((p: any) => p.id.toString()) || [],

      events: monument?.events?.map((p: any) => p.id.toString()) || [],
      marks: monument?.marks?.map((p: any) => p.id.toString()) || [],
      techniques: monument?.techniques?.map((p: any) => p.id.toString()) || [],
      colors: monument?.colors?.map((p: any) => p.id.toString()) || [],
      materials: monument?.materials?.map((p: any) => p.id.toString()) || [],
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
    form.append("document", formData.document);
    form.append("document_link", formData.document_link);
    form.append("period", formData.period);
    form.append("location", formData.location);

    form.append("address", formData.address);
    form.append("lat", formData.lat);
    form.append("lon", formData.lon);

    for (const personalityId of formData.personalities) {
      form.append("personalities", personalityId);
    }

    for (const eventId of formData.events) {
      form.append("events", eventId);
    }

    for (const markId of formData.marks) {
      form.append("marks", markId);
    }

    for (const techniqueId of formData.techniques) {
      form.append("techniques", techniqueId);
    }

    for (const colorId of formData.colors) {
      form.append("colors", colorId);
    }

    for (const materialId of formData.materials) {
      form.append("materials", materialId);
    }

    for (const file of formData.images) {
      form.append("images", file);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/monuments/${selectedId}`,
        {
          method: "PUT",
          body: form,
        }
      );

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
        document: "",
        document_link: "",
        period: "",
        location: "",
        address: "",
        lat: "",
        lon: "",
        personalities: [],
        events: [],
        marks: [],
        techniques: [],
        colors: [],
        materials: [],
        images: [],
      });
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/monuments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Ошибка удаления");

      setMonuments(monuments.filter((m: any) => m.id !== id));
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
        <div className="fixed inset-0 bg-black z-50 p-8">
          <div className="relative bg-white w-full h-full p-8">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowFormModal(false)}
            >
              &times;
            </button>

            <form
              onSubmit={isEditing ? handleUpdate : handleCreate}
              className="w-full h-full flex flex-col justify-between"
              encType="multipart/form-data"
            >
              <div className="flex gap-4">
                <div className="w-1/5 flex flex-col gap-4">
                  <div>
                    <label className="block mb-1">Название:</label>
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
                    <label className="block mb-1">Описание:</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                      required
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
                      className="w-full p-2 border"
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
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Надпись на табличке:</label>
                    <input
                      type="text"
                      value={formData.inscription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inscription: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">
                      Номер в гос. реестре ОКН:
                    </label>
                    <input
                      type="text"
                      value={formData.registry}
                      onChange={(e) =>
                        setFormData({ ...formData, registry: e.target.value })
                      }
                      className="w-full p-2 border"
                    />
                  </div>
                </div>

                <div className="w-1/5 flex flex-col gap-4">
                  <div>
                    <label className="block mb-1">
                      Ссылка на гос. реестр ОКН:
                    </label>
                    <input
                      type="text"
                      value={formData.registry_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registry_link: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
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
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Ссылка на источник:</label>
                    <input
                      type="text"
                      value={formData.info_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          info_link: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Адрес:</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Широта:</label>
                    <input
                      type="text"
                      value={formData.lat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lat: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Долгота:</label>
                    <input
                      type="text"
                      value={formData.lon}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lon: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>
                </div>

                <div className="w-1/5 flex flex-col gap-4">
                  <div className="">
                    <label className="block mb-1">Материалы</label>
                    <select
                      name="materials"
                      multiple
                      value={formData.materials}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setFormData({
                          ...formData,
                          materials: selectedOptions,
                        });
                      }}
                      className="w-full p-2 border h-32"
                    >
                      {materials.map((material: any) => (
                        <option key={material.id} value={material.id}>
                          {material?.value}
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
                      className="w-full p-2 border h-32"
                    >
                      {personalities.map((personality: any) => (
                        <option key={personality.id} value={personality.id}>
                          {personality?.appellation_personality?.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="block mb-1">События</label>
                    <select
                      name="events"
                      multiple
                      value={formData.events}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setFormData({
                          ...formData,
                          events: selectedOptions,
                        });
                      }}
                      className="w-full p-2 border h-32"
                    >
                      {events.map((event: any) => (
                        <option key={event.id} value={event.id}>
                          {event?.time_span?.beginning}{" "}
                          {event?.time_span?.end
                            ? ` -  ${event?.time_span?.end}`
                            : ""}{" "}
                          - {event?.appellation_event?.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-1/5 flex flex-col gap-4">
                  <div className="">
                    <label className="block mb-1">Символы</label>
                    <select
                      name="marks"
                      multiple
                      value={formData.marks}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setFormData({
                          ...formData,
                          marks: selectedOptions,
                        });
                      }}
                      className="w-full p-2 border h-32"
                    >
                      {marks.map((mark: any) => (
                        <option key={mark.id} value={mark.id}>
                          {mark?.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="block mb-1">Техники</label>
                    <select
                      name="techniques"
                      multiple
                      value={formData.techniques}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setFormData({
                          ...formData,
                          techniques: selectedOptions,
                        });
                      }}
                      className="w-full p-2 border h-32"
                    >
                      {techniques.map((technique: any) => (
                        <option key={technique.id} value={technique.id}>
                          {technique?.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="block mb-1">Цвета</label>
                    <select
                      name="colors"
                      multiple
                      value={formData.colors}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setFormData({
                          ...formData,
                          colors: selectedOptions,
                        });
                      }}
                      className="w-full p-2 border h-32"
                    >
                      {colors.map((color: any) => (
                        <option key={color.id} value={color.id}>
                          {color?.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-1/5 flex flex-col gap-4">
                  <div>
                    <label className="block mb-1">Документ(ы)</label>
                    <input
                      type="text"
                      value={formData.document}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          document: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Ссылка на документ(ы)</label>
                    <input
                      type="text"
                      value={formData.document_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          document_link: e.target.value,
                        })
                      }
                      className="w-full p-2 border"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Период</label>
                    <select
                      name="period"
                      value={formData.period || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          period: e.target.value,
                        });
                      }}
                      className="w-full p-2 border"
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
                    <label className="block mb-1">Населённый пункт</label>
                    <select
                      name="location"
                      value={formData.location || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          location: e.target.value,
                        });
                      }}
                      className="w-full p-2 border"
                    >
                      <option value="">Выберите населённый пункт</option>
                      {locations.map((location: any) => (
                        <option key={location.id} value={location.id}>
                          {location?.value}
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
                      className="w-full p-2 border"
                    />
                  </div>
                </div>
              </div>

              <div>
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
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto pretty-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="">
                <th className="border border-[var(--dark)] px-4 py-2">ID</th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Название
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Описание
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">Год</th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Мемориальное значение
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Надпись на табличке
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Номер в гос. реестре ОКН
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Ссылка на гос. реестр ОКН
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Источник
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Ссылка на источник
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Документ(ы)
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Ссылка на документ(ы)
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Период
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Населённый пункт
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">Адрес</th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Широта
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Долгота
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Личности
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  События
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Символы
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Техники
                </th>
                <th className="border border-[var(--dark)] px-4 py-2">Цвета</th>
                <th className="border border-[var(--dark)] px-4 py-2">
                  Материалы
                </th>
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
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.id}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.appellation_monument?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.description_monument?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.year?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.conceptual_object?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.inscription?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.appellation_registry?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2 break-all">
                    {
                      monument?.appellation_registry
                        ?.information_object_registry?.value
                    }
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.appellation_info?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2 break-all">
                    {monument?.appellation_info?.information_object_info?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.document?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2 break-all">
                    {monument?.document?.information_object_document?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.period?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.place?.appellation_place?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.place?.appellation_address?.value}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.place?.appellation_address?.coordinates?.lat}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.place?.appellation_address?.coordinates?.lon}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.personalities?.map(
                      (personality: any, index: number) => (
                        <div key={index}>
                          {personality.appellation_personality?.value}
                        </div>
                      )
                    )}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.events?.map((event: any, index: number) => (
                      <div key={index}>
                        {event?.time_span?.beginning}{" "}
                        {event?.time_span?.end
                          ? ` -  ${event?.time_span?.end}`
                          : ""}{" "}
                        - {event?.appellation_event?.value}
                      </div>
                    ))}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.marks?.map((mark: any, index: number) => (
                      <div key={index}>{mark?.value}</div>
                    ))}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.techniques?.map(
                      (technique: any, index: number) => (
                        <div key={index}>{technique?.value}</div>
                      )
                    )}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.colors?.map((color: any, index: number) => (
                      <div key={index}>{color?.value}</div>
                    ))}
                  </td>
                  <td className="border border-[var(--dark)] px-4 py-2">
                    {monument?.materials?.map(
                      (material: any, index: number) => (
                        <div key={index}>{material?.value}</div>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4">
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
