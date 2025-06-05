"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";
import Header from "../components/Header";

import Collection from "./Collection";
import MapView from "./MapView";

type Monument = {
  name: string;
  url: string;
  coords: [number, number]; // [lon, lat]
};

const mon: Monument[] = [
  //{ name: "Памятник Победы", coords: [37.618423, 55.751244] },
  //{ name: "Медный всадник", coords: [30.3086, 59.9375] },
  //{ name: "Родина-мать зовёт!", coords: [44.5168, 48.7347] },
  {
    name: "Памятник В.И. Ленину",
    url: "/images/contents/hero.jpg",
    coords: [92.877789, 56.015342],
  },
];

export default function CollectionContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFirst, setFirst] = useState(true);

  const [loading, setLoading] = useState(true);

  const [monuments, setMonuments] = useState<any[]>([]);

  const [periods, setPeriods] = useState<any[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);

  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);

  const [colors, setColors] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<number[]>([]);

  const [techniques, setTechniques] = useState<any[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<number[]>([]);

  const [marks, setMarks] = useState<any[]>([]);
  const [selectedMarks, setSelectedMarks] = useState<number[]>([]);

  const [personalities, setPersonalities] = useState<any[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<number[]>(
    []
  );

  const [toFilter, setToFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const filtersContainerRef = useRef<HTMLDivElement>(null);

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

    setSelectedMarks(searchParams.getAll("markId").map((id) => parseInt(id)));

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
          marksRes,
          placesRes,
          personalitiesRes,
        ] = await Promise.all([
          fetch("/api/periods"),
          fetch("/api/materials"),
          fetch("/api/colors"),
          fetch("api/techniques"),
          fetch("api/marks"),
          fetch("api/places"),
          fetch("api/personalities"),
        ]);

        const [
          periodsData,
          materialsData,
          colorsData,
          techniquesData,
          marksData,
          placesData,
          personalitiesData,
        ] = await Promise.all([
          periodsRes.json(),
          materialsRes.json(),
          colorsRes.json(),
          techniquesRes.json(),
          marksRes.json(),
          placesRes.json(),
          personalitiesRes.json(),
        ]);

        setPeriods(periodsData);
        setMaterials(materialsData);
        setColors(colorsData);
        setTechniques(techniquesData);
        setMarks(marksData);
        setPlaces(placesData);
        setPersonalities(personalitiesData);
      } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (activeSearchQuery) {
          params.append("search", activeSearchQuery);
        } else {
          selectedPeriods.forEach((id) =>
            params.append("periodId", id.toString())
          );
          selectedMaterials.forEach((id) =>
            params.append("materialId", id.toString())
          );
          selectedColors.forEach((id) =>
            params.append("colorId", id.toString())
          );
          selectedTechniques.forEach((id) =>
            params.append("techniqueId", id.toString())
          );
          selectedMarks.forEach((id) => params.append("markId", id.toString()));
          selectedPlaces.forEach((id) =>
            params.append("placeId", id.toString())
          );
          selectedPersonalities.forEach((id) =>
            params.append("personId", id.toString())
          );
        }

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
  }, [toFilter, activeSearchQuery]);

  //if router gets changed
  useEffect(() => {
    const params = new URLSearchParams();

    if (activeSearchQuery) {
      params.append("search", activeSearchQuery);
    } else {
      selectedPeriods.forEach((id) => params.append("periodId", id.toString()));

      selectedMaterials.forEach((id) =>
        params.append("materialId", id.toString())
      );

      selectedColors.forEach((id) => params.append("colorId", id.toString()));

      selectedTechniques.forEach((id) =>
        params.append("techniqueId", id.toString())
      );

      selectedMarks.forEach((id) => params.append("markId", id.toString()));

      selectedPlaces.forEach((id) => params.append("placeId", id.toString()));

      selectedPersonalities.forEach((id) =>
        params.append("personId", id.toString())
      );
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    selectedPeriods,
    selectedMaterials,
    selectedColors,
    selectedTechniques,
    selectedMarks,
    selectedPlaces,
    selectedPersonalities,
    activeSearchQuery,
    //searchQuery,
    pathname,
    router,
  ]);

  const handleFilterChange = (
    id: number,
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    setToFilter(false);
    setActiveSearchQuery(""); // Сбрасываем поиск при изменении фильтров
  };

  const ResetFilters = () => {
    // Сброс всех состояний фильтров
    setSelectedPeriods([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedTechniques([]);
    setSelectedMarks([]);
    setSelectedPlaces([]);
    setSelectedPersonalities([]);

    // Сброс поиска
    setSearchQuery("");
    setActiveSearchQuery("");
    setToFilter(false);
    router.replace(pathname, undefined);
  };

  const ResetInput = () => {
    setSearchQuery("");
    setActiveSearchQuery("");
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActiveSearchQuery(searchQuery.trim());
      setSelectedPeriods([]);
    } else {
      setActiveSearchQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleScrollUp = () => {
    filtersContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-screen max-h-screen flex flex-col justify-between gap-8 p-8">
      <Header />
      <div className="min-h-0 h-full max-h-full w-full flex gap-8">
        {/* Filter */}
        <div className="w-1/3 p-8 border-black border-1 flex flex-col gap-8">
          <div
            ref={filtersContainerRef}
            className="w-full h-full flex flex-col gap-8 pr-8 overflow-x-hidden overflow-y-auto scroll-smooth pretty-scrollbar "
          >
            {/* Periods */}
            <div>
              <h3 className="mb-2">Периоды</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {periods.map((period) => (
                  <div key={period.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`period-${period.id}`}
                      checked={selectedPeriods.includes(period.id)}
                      onChange={() =>
                        handleFilterChange(
                          period.id,

                          setSelectedPeriods
                        )
                      }
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
              <h3 className="mb-2">Материалы</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {materials.map((material) => (
                  <div key={material.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`material-${material.id}`}
                      checked={selectedMaterials.includes(material.id)}
                      onChange={() =>
                        handleFilterChange(
                          material.id,

                          setSelectedMaterials
                        )
                      }
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
              <h3 className="mb-2">Цвета</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`color-${color.id}`}
                      checked={selectedColors.includes(color.id)}
                      onChange={() =>
                        handleFilterChange(
                          color.id,

                          setSelectedColors
                        )
                      }
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
              <h3 className="mb-2">Техники</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {techniques.map((technique) => (
                  <div key={technique.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`technique-${technique.id}`}
                      checked={selectedTechniques.includes(technique.id)}
                      onChange={() =>
                        handleFilterChange(
                          technique.id,

                          setSelectedTechniques
                        )
                      }
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

            {/* Marks */}
            <div>
              <h3 className="mb-2">Символы</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {marks.map((mark) => (
                  <div key={mark.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mark-${mark.id}`}
                      checked={selectedMarks.includes(mark.id)}
                      onChange={() =>
                        handleFilterChange(
                          mark.id,

                          setSelectedMarks
                        )
                      }
                      className=" h-8 w-8 "
                    />
                    <label
                      htmlFor={`mark-${mark.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {mark.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Places */}
            <div>
              <h3 className="mb-2">Населённые пункты</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {places.map((place) => (
                  <div key={place.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`place-${place.id}`}
                      checked={selectedPlaces.includes(place.id)}
                      onChange={() =>
                        handleFilterChange(
                          place.id,

                          setSelectedPlaces
                        )
                      }
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
              <h3 className="mb-2">Личности</h3>
              <div className="h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
                {personalities.map((person) => (
                  <div key={person.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`person-${person.id}`}
                      checked={selectedPersonalities.includes(person.id)}
                      onChange={() =>
                        handleFilterChange(
                          person.id,

                          setSelectedPersonalities
                        )
                      }
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
            <div className="w-full relative flex items-center gap-8 px-2 pb-2">
              <button
                onClick={handleScrollUp}
                className="relative w-10 h-10 border-1 broder-black rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src="/images/icons/arrow-b.png"
                  alt=""
                  className="p-2 rotate-90"
                  fill
                />
              </button>
              <button
                onClick={() => ResetFilters()}
                className="p-2 truncate border-1 broder-black rounded-full hover:scale-110 transition-transform duration-300"
              >
                Сбросить
              </button>
              <button
                onClick={() => setToFilter(true)}
                className={`p-2 truncate border-1 rounded-full shrink-0 hover:scale-110 transition-transform duration-300 ${
                  toFilter
                    ? `border-white text-white bg-[var(--dark)]`
                    : `border-black text-black`
                }`}
              >
                Применить
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="h-full w-full flex flex-col gap-8">
          <div className="flex w-full gap-8">
            <button
              onClick={() => setFirst(true)}
              className={`h-10 ${
                isFirst
                  ? `border-white bg-[var(--dark)] text-white`
                  : `border-black border-1 text-black`
              } rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-300`}
            >
              Коллекция
            </button>
            <button
              onClick={() => setFirst(false)}
              className={`h-10 ${
                !isFirst
                  ? `border-white bg-[var(--dark)] text-white`
                  : `border-black border-1 text-black`
              } rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-300`}
            >
              Карта
            </button>
            <div className="relative w-full flex border-black border-1 rounded-full">
              <input
                placeholder="Начинайте ввод ..."
                className="w-full h-10 pl-4 pr-10 py-2 rounded-full"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <button
                  onClick={ResetInput}
                  className="absolute right-0 w-10 h-10 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                >
                  <Image
                    src="/images/icons/cancel-b.png"
                    alt=""
                    className="p-2"
                    fill
                  />
                </button>
              )}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="relative w-10 h-10 rounded-full border-black border-1 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
            >
              <Image
                src="/images/icons/search-b.png"
                alt=""
                className="p-2"
                fill
              />
            </button>
          </div>

          {loading ? (
            <div className="h-full w-full flex items-center  p-8 border-black border-1">
              <p className="mx-auto font-american">Загрузка ...</p>
            </div>
          ) : (
            <div className="h-full">
              {isFirst ? (
                <Collection monuments={monuments} />
              ) : (
                <MapView monuments={monuments} isFirst={isFirst} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
