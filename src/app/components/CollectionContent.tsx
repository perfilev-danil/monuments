"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";

import Header from "../components/Header";

export default function CollectionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [monuments, setMonuments] = useState<any[]>([]);

  // Periods
  const [periods, setPeriods] = useState<any[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);

  // Materials
  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);

  // Colors
  const [colors, setColors] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  const [techniques, setTechniques] = useState<any[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<number[]>([]);

  const [personalities, setPersonalities] = useState<any[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<number[]>(
    []
  );

  // Инициализация из URL
  useEffect(() => {
    setSelectedPeriods(
      searchParams
        .getAll("periodId")
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id))
    );
    setSelectedMaterials(
      searchParams.getAll("materialId").map((id) => parseInt(id))
    );
    setSelectedColors(searchParams.getAll("colorId").map((id) => parseInt(id)));

    setSelectedTechniques(
      searchParams.getAll("techniqueId").map((id) => parseInt(id))
    );

    setSelectedPlaces(searchParams.getAll("placeId").map((id) => parseInt(id)));

    setSelectedPersonalities(
      searchParams.getAll("personId").map((id) => parseInt(id))
    );
  }, [searchParams]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [
          periodsRes,
          materialsRes,
          colorsRes,
          techniquesRes,
          placesRes,
          personalitiesRes,
        ] = await Promise.all([
          fetch("/api/periods"),
          fetch("/api/materials"),
          fetch("/api/colors"),
          fetch("api/techniques"),
          fetch("api/places"),
          fetch("api/personalities"),
        ]);

        const [
          periodsData,
          materialsData,
          colorsData,
          techniquesData,
          placesData,
          personalitiesData,
        ] = await Promise.all([
          periodsRes.json(),
          materialsRes.json(),
          colorsRes.json(),
          techniquesRes.json(),
          placesRes.json(),
          personalitiesRes.json(),
        ]);

        setPeriods(periodsData);
        setMaterials(materialsData);
        setColors(colorsData);
        setTechniques(techniquesData);
        setPlaces(placesData);
        setPersonalities(personalitiesData);
      } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
      }
    };

    fetchFilters();
  }, []);

  // Загрузка данных с фильтрами
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        selectedPeriods.forEach((id) =>
          params.append("periodId", id.toString())
        );

        selectedMaterials.forEach((id) =>
          params.append("materialId", id.toString())
        );

        selectedColors.forEach((id) => params.append("colorId", id.toString()));

        selectedTechniques.forEach((id) =>
          params.append("techniqueId", id.toString())
        );

        selectedPlaces.forEach((id) => params.append("placeId", id.toString()));

        selectedPersonalities.forEach((id) =>
          params.append("personId", id.toString())
        );

        const res = await fetch(`/api/monuments?${params.toString()}`);
        const data = await res.json();
        setMonuments(data);
      } catch (error) {
        console.error("Ошибка при загрузке памятников:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, [
    selectedPeriods,
    selectedMaterials,
    selectedColors,
    selectedPersonalities,
    selectedPlaces,
    selectedPersonalities,
  ]);

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const params = new URLSearchParams();

    // Период
    selectedPeriods.forEach((id) => params.append("periodId", id.toString()));

    // Материалы
    selectedMaterials.forEach((id) =>
      params.append("materialId", id.toString())
    );

    // Цвета
    selectedColors.forEach((id) => params.append("colorId", id.toString()));

    selectedTechniques.forEach((id) =>
      params.append("techniqueId", id.toString())
    );

    selectedPlaces.forEach((id) => params.append("placeId", id.toString()));

    selectedPersonalities.forEach((id) =>
      params.append("personId", id.toString())
    );

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    selectedPeriods,
    selectedMaterials,
    selectedColors,
    selectedTechniques,
    selectedPlaces,
    selectedPersonalities,
    pathname,
    router,
  ]);

  // Обработчики изменения фильтров
  const handlePeriodChange = (id: number) => {
    setSelectedPeriods((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleMaterialChange = (id: number) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleColorChange = (id: number) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleTechniqueChange = (id: number) => {
    setSelectedTechniques((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handlePlaceChange = (id: number) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handlePersonChange = (id: number) => {
    setSelectedPersonalities((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const getImageUrl = (imageId: number) => {
    return `/api/monumentsImages/${imageId}`;
  };

  return (
    <div className="w-full h-screen max-h-screen flex flex-col justify-between gap-8 p-8">
      <Header />
      <div className="min-h-0 h-full max-h-full w-full flex gap-8">
        {/* Filter */}
        <div className="w-1/3 flex flex-col gap-8 p-8 border-black border-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          {/* Periods */}
          <div>
            <h3 className="text-lg mb-2">Периоды</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {periods.map((period) => (
                <div key={period.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`period-${period.id}`}
                    checked={selectedPeriods.includes(period.id)}
                    onChange={() => handlePeriodChange(period.id)}
                    className=" h-8 w-8 "
                  />
                  <label
                    htmlFor={`period-${period.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {period.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Materials */}
          <div>
            <h3 className="text-lg mb-2">Материалы</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`material-${material.id}`}
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() => handleMaterialChange(material.id)}
                    className=" h-8 w-8 "
                  />
                  <label
                    htmlFor={`material-${material.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {material.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Colors */}
          <div>
            <h3 className="text-lg mb-2">Цвета</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`color-${color.id}`}
                    checked={selectedColors.includes(color.id)}
                    onChange={() => handleColorChange(color.id)}
                    className=" h-8 w-8"
                  />
                  <label
                    htmlFor={`color-${color.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        style={{ backgroundColor: `#${color.code}` }}
                        className="w-4 h-4 rounded-full"
                      ></span>
                      {color.value}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Techniques */}
          <div>
            <h3 className="text-lg mb-2">Техники</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {techniques.map((technique) => (
                <div key={technique.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`technique-${technique.id}`}
                    checked={selectedTechniques.includes(technique.id)}
                    onChange={() => handleTechniqueChange(technique.id)}
                    className=" h-8 w-8 "
                  />
                  <label
                    htmlFor={`technique-${technique.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {technique.value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Places */}
          <div>
            <h3 className="text-lg mb-2">Населённые пункты</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {places.map((place) => (
                <div key={place.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`place-${place.id}`}
                    checked={selectedPlaces.includes(place.id)}
                    onChange={() => handlePlaceChange(place.id)}
                    className=" h-8 w-8 "
                  />
                  <label
                    htmlFor={`place-${place.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {place.value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Personalities */}
          <div>
            <h3 className="text-lg mb-2">Личности</h3>
            <div className="h-28 space-y-2 overflow-x-hidden overflow-y-auto">
              {personalities.map((person) => (
                <div key={person.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`person-${person.id}`}
                    checked={selectedPersonalities.includes(person.id)}
                    onChange={() => handlePersonChange(person.id)}
                    className=" h-8 w-8 "
                  />
                  <label
                    htmlFor={`person-${person.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {person.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="h-full w-full flex flex-col gap-8">
          <div className="flex w-full gap-8">
            <button className="h-10 border-black border-1 rounded-full p-2 cursor-pointer">
              Коллекция
            </button>
            <button className="h-10 border-black border-1 rounded-full p-2 cursor-pointer">
              Карта
            </button>
            <input className="w-full h-10 border-black border-1 rounded-full px-4 py-2"></input>
            <button className="relative w-10 h-10 rounded-full border-black border-1 cursor-pointer shrink-0">
              <Image
                src="/images/icons/search-b.png"
                alt=""
                className="p-2"
                fill
              />
            </button>
          </div>
          {/* LIST */}
          <div className="h-full w-full p-8 flex flex-wrap gap-8 border-black border-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            {loading ? (
              <div className="h-screen">Загрузка...</div>
            ) : monuments.length > 0 ? (
              monuments.map((monument) => (
                <div
                  key={monument.id}
                  className="relative h-64 w-[calc(25%-32px)] border-1"
                  onClick={() => router.push(`/monuments/${monument.id}`)}
                >
                  {monument.images?.[0] && (
                    <Image
                      src={getImageUrl(monument?.images[0]?.id)}
                      alt=""
                      fill
                      className="image object-cover"
                      unoptimized // Важно для кастомных URL изображений
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-[var(--darkcyan)] bg-opacity-50 text-white text-center p-2">
                    {monument?.appellation_monument?.value}
                  </div>
                </div>
              ))
            ) : (
              <div>Нет памятников, соответствующих выбранным фильтрам</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
