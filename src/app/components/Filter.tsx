import Image from "next/image";

interface FilterProps {
  periods: { id: number; value: string }[];
  materials: { id: number; value: string }[];
  colors: { id: number; value: string; code: string }[];
  techniques: { id: number; value: string }[];
  marks: { id: number; value: string }[];
  places: { id: number; value: string }[];
  personalities: { id: number; value: string }[];
  selectedPeriods: number[];
  selectedMaterials: number[];
  selectedColors: number[];
  selectedTechniques: number[];
  selectedMarks: number[];
  selectedPlaces: number[];
  selectedPersonalities: number[];
  toFilter: boolean;
  filtersContainerRef: React.RefObject<HTMLDivElement | null>;

  setSelectedPeriods: (v: number[]) => void;
  setSelectedMaterials: (v: number[]) => void;
  setSelectedColors: (v: number[]) => void;
  setSelectedTechniques: (v: number[]) => void;
  setSelectedMarks: (v: number[]) => void;
  setSelectedPlaces: (v: number[]) => void;
  setSelectedPersonalities: (v: number[]) => void;
  setToFilter: (v: boolean) => void;
  handleFilterChange: any;
  handleScrollUp: () => void;
  ResetFilters: () => void;
}

export default function Filter({ FilterProps }: { FilterProps: FilterProps }) {
  const {
    periods,
    techniques,
    materials,
    colors,
    marks,
    places,
    personalities,
    selectedPeriods,
    selectedMaterials,
    selectedColors,
    selectedTechniques,
    selectedMarks,
    selectedPlaces,
    selectedPersonalities,
    toFilter,
    filtersContainerRef,
    setSelectedPeriods,
    setSelectedMaterials,
    setSelectedColors,
    setSelectedTechniques,
    setSelectedMarks,
    setSelectedPlaces,
    setSelectedPersonalities,
    setToFilter,
    handleFilterChange,
    handleScrollUp,
    ResetFilters,
  } = FilterProps;
  return (
    <div
      className="lg:w-1/3 h-1/2 lg:h-full p-4 lg:p-8 flex flex-col gap-4 lg:gap-8"
      style={{ border: "1px solid black" }}
    >
      <div
        ref={filtersContainerRef}
        className="w-full h-full flex flex-col gap-4 lg:gap-8 pr-4 lg:pr-8 overflow-x-hidden overflow-y-auto scroll-smooth pretty-scrollbar "
      >
        {/* Periods */}
        <div>
          <h3 className="mb-2">Периоды</h3>
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
            {periods?.map((period: any) => (
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
          <div className="h-18 lg:h-20 space-y-2 overflow-x-hidden overflow-y-auto pretty-scrollbar">
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
        <div className="w-full relative flex items-center justify-between gap-4 lg:gap-8 lg:px-2 lg:pb-2">
          <button
            onClick={handleScrollUp}
            className="relative w-10 h-10 shrink-0  rounded-full hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid black" }}
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
            className="p-2 truncate  broder-black rounded-full hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid black" }}
          >
            Сбросить
          </button>
          <button
            onClick={() => setToFilter(true)}
            className={`p-2 truncate rounded-full shrink-0 hover:scale-110 transition-transform duration-300 ${
              toFilter ? `text-white bg-[var(--dark)]` : `text-black`
            }`}
            style={
              toFilter
                ? { border: "1px solid white" }
                : { border: "1px solid black" }
            }
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
}
