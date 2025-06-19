"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FilteredMonumentsServer } from "../../../lib/FilteredMonumentsServer";

import Image from "next/image";
import Header from "../components/Header";

import Collection from "./Collection";
import MapView from "./MapView";

import Filter from "./Filter";

export default function CollectionContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [clickToFilter, setClickToFilter] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFirst, setFirst] = useState(true);

  const [loading, setLoading] = useState(true);

  const [monuments, setMonuments] = useState<number[]>([]);

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
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
        const monuments = await res.json();
        setMonuments(monuments);
      } catch (error) {
        console.error("Ошибка при загрузке памятников:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, [toFilter, activeSearchQuery]);

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
    setActiveSearchQuery("");
  };

  const ResetFilters = () => {
    setSelectedPeriods([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedTechniques([]);
    setSelectedMarks([]);
    setSelectedPlaces([]);
    setSelectedPersonalities([]);

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
    <div className="w-full h-[620px] md:h-[900px] lg:h-screen flex flex-col justify-between gap-4 lg:gap-8 p-4 lg:p-8">
      <Header />
      <div className="min-h-0 h-full max-h-full w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
        {!isMobile && (
          <Filter
            FilterProps={{
              periods,
              materials,
              colors,
              techniques,
              marks,
              places,
              personalities,
              selectedPeriods,
              selectedColors,
              selectedMaterials,
              selectedTechniques,
              selectedMarks,
              selectedPlaces,
              selectedPersonalities,
              toFilter,
              filtersContainerRef,
              setSelectedPeriods,
              setSelectedColors,
              setSelectedMaterials,
              setSelectedTechniques,
              setSelectedMarks,
              setSelectedPlaces,
              setSelectedPersonalities,
              setToFilter,
              handleFilterChange,
              handleScrollUp,
              ResetFilters,
            }}
          />
        )}

        {/* Right */}
        <div className="h-full w-full flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-col md:flex-row w-full gap-4 lg:gap-8">
            <div className="flex gap-4 lg:gap-8 order-2 md:order-1">
              {isMobile && (
                <button
                  onClick={() => setClickToFilter((prev) => !prev)}
                  className={`h-10 truncate ${
                    clickToFilter ? `bg-[var(--dark)] text-white` : `text-black`
                  } rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-300`}
                  style={
                    clickToFilter
                      ? { border: "1px solid white" }
                      : { border: "1px solid black" }
                  }
                >
                  Применить фильтры
                </button>
              )}
              <button
                onClick={() => setFirst(true)}
                className={`h-10 ${
                  isFirst ? `bg-[var(--dark)] text-white` : `text-black`
                } rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-300`}
                style={
                  isFirst
                    ? { border: "1px solid white" }
                    : { border: "1px solid black" }
                }
              >
                Коллекция
              </button>
              <button
                onClick={() => setFirst(false)}
                className={`h-10 ${
                  !isFirst ? `bg-[var(--dark)] text-white` : `text-black`
                } rounded-full p-2 cursor-pointer hover:scale-110 transition-transform duration-300`}
                style={
                  !isFirst
                    ? { border: "1px solid white" }
                    : { border: "1px solid black" }
                }
              >
                Карта
              </button>
            </div>
            <div className="flex w-full gap-4 lg:gap-8 md:order-1">
              <div
                className="relative w-full flex rounded-full"
                style={{ border: "1px solid black" }}
              >
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
                      sizes="(max-width: 768px) 60vw"
                    />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearchSubmit}
                className="relative w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                style={{ border: "1px solid black" }}
              >
                <Image
                  src="/images/icons/search-b.png"
                  alt=""
                  className="p-2"
                  fill
                  sizes="(max-width: 768px) 60vw"
                />
              </button>
            </div>
          </div>

          {isMobile && clickToFilter && (
            <Filter
              FilterProps={{
                periods,
                materials,
                colors,
                techniques,
                marks,
                places,
                personalities,
                selectedPeriods,
                selectedColors,
                selectedMaterials,
                selectedTechniques,
                selectedMarks,
                selectedPlaces,
                selectedPersonalities,
                toFilter,
                filtersContainerRef,
                setSelectedPeriods,
                setSelectedColors,
                setSelectedMaterials,
                setSelectedTechniques,
                setSelectedMarks,
                setSelectedPlaces,
                setSelectedPersonalities,
                setToFilter,
                handleFilterChange,
                handleScrollUp,
                ResetFilters,
              }}
            />
          )}

          {loading ? (
            <div
              className="h-full w-full flex items-center p-4 lg:p-8 "
              style={{ border: "1px solid black" }}
            >
              <p className="mx-auto font-american">Загрузка ...</p>
            </div>
          ) : (
            <div className="h-full">
              {isFirst ? (
                <Collection monuments={monuments} />
              ) : (
                <MapView monuments={monuments} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
