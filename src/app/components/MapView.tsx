"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { apply } from "ol-mapbox-style";

interface Monument {
  id: string;
  appellation_monument: { value: string };
  year: { value: string };
  images: Array<{ id: string }>;
  place: {
    appellation_address: {
      coordinates: {
        lon: number;
        lat: number;
      };
    };
  };
}

interface MapViewProps {
  monuments: any;
  isFirst: boolean;
}

export default function MapView({ monuments, isFirst }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const router = useRouter();

  // Мемоизированный стиль маркера
  const markerStyle = useMemo(
    () =>
      new Style({
        image: new Icon({
          src: "/images/icons/marker-b.png",
          scale: 0.5,
          anchor: [0.5, 1],
        }),
      }),
    []
  );

  // Создание features с мемоизацией
  const createFeatures = useCallback(
    (monumentsData: Monument[]) => {
      return monumentsData
        .map((monument) => {
          const coords = [
            monument?.place?.appellation_address?.coordinates?.lon,
            monument?.place?.appellation_address?.coordinates?.lat,
          ];

          if (!coords[0] || !coords[1]) return null;

          const feature = new Feature({
            geometry: new Point(fromLonLat(coords)),
            name: monument?.appellation_monument?.value,
            year: monument?.year?.value,
            url:
              monument?.images?.length === 0
                ? "/images/contents/noimage.jpg"
                : `/api/images/${monument?.images[0]?.id}`,
            id: monument?.id,
          });

          feature.setStyle(markerStyle);
          return feature;
        })
        .filter(Boolean) as Feature[];
    },
    [markerStyle]
  );

  // Инициализация карты
  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    const startPosition = [92.877789, 56.015342];
    const initialZoom = 5;

    mapInstance.current = new Map({
      target: mapRef.current,
      view: new View({
        center: fromLonLat(startPosition),
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 8,
      }),
      layers: [],
      controls: [],
      pixelRatio: 1,
    });

    // Инициализация оверлея для попапа
    overlayRef.current = new Overlay({
      element: popupRef.current!,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [30, -50],
    });
    mapInstance.current.addOverlay(overlayRef.current);

    // Загрузка стиля карты
    const styleUrl =
      "https://api.maptiler.com/maps/01970c44-5bd0-7113-88a3-16ff53d79702/style.json?key=OFdna1UVR8QPIS2lGPxZ";

    apply(mapInstance.current, styleUrl)
      .then(() => {
        // Обработчик движения курсора
        mapInstance.current?.on("pointermove", (e) => {
          const hasFeature = mapInstance.current?.hasFeatureAtPixel(e.pixel);
          if (mapRef.current) {
            mapRef.current.style.cursor = hasFeature ? "pointer" : "";
          }
        });

        // Обработчик клика по маркеру
        mapInstance.current?.on("click", (evt) => {
          const feature = mapInstance.current?.forEachFeatureAtPixel(
            evt.pixel,
            (feat) => feat
          );

          if (feature && popupRef.current) {
            const geometry = feature.getGeometry();
            if (geometry instanceof Point) {
              const coordinates = geometry.getCoordinates();
              const { url, name, year, id } = feature.getProperties();

              popupRef.current.innerHTML = `
                <div class="relative h-64 w-64 lg:w-80 gap-4 bg-white overflow-hidden" style="border:1px solid black">
                  <img 
                    src="${url}" 
                    alt="${name}" 
                    class="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute bottom-0 right-0 z-10 w-full p-2 bg-white flex items-center justify-between" style="border-top:1px solid black">
                    <div class="truncate">${name} ${year} г.</div>
                    <button id="popup-button" class="rounded-full w-10 h-10 shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300" style="border:1px solid black">
                      <img 
                        src="/images/icons/arrow-b.png"
                        alt="Open details" 
                        class="w-full h-full p-2 rotate-180"
                      />
                    </button>
                  </div>
                </div>
              `;

              const button = popupRef.current.querySelector("#popup-button");
              button?.addEventListener("click", () => {
                router.push(`/monuments/${id}`);
              });

              overlayRef.current?.setPosition(coordinates);
              return;
            }
          }
          overlayRef.current?.setPosition(undefined);
        });

        setMapReady(true);
      })
      .catch((error) => {
        console.error("Failed to load map style:", error);
      });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current.dispose();
        mapInstance.current = null;
      }
    };
  }, [router]);

  // Обновление маркеров при изменении данных
  useEffect(() => {
    if (!mapInstance.current || !monuments?.length || !mapReady) return;

    const features = createFeatures(monuments);
    const source = new VectorSource({ features });

    if (markerLayerRef.current) {
      markerLayerRef.current.setSource(source);
    } else {
      const vectorLayer = new VectorLayer({ source });
      mapInstance.current.addLayer(vectorLayer);
      markerLayerRef.current = vectorLayer;
    }
  }, [monuments, mapReady, createFeatures]);

  // Обработка видимости карты
  useEffect(() => {
    if (!mapInstance.current || !mapRef.current) return;

    if (isFirst) {
      mapInstance.current.setTarget(undefined);
    } else {
      mapInstance.current.setTarget(mapRef.current);
      // Обновляем размер при повторном отображении
      setTimeout(() => {
        mapInstance.current?.updateSize();
      }, 100);
    }
  }, [isFirst]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ border: "1px solid black" }}
    >
      <div
        ref={mapRef}
        className="w-full h-full"
        aria-label="Interactive map with monuments"
      />
      <div
        ref={popupRef}
        className="absolute z-10"
        role="tooltip"
        aria-live="polite"
      />
    </div>
  );
}
/*

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { apply } from "ol-mapbox-style";

export default function MapView({
  monuments,
  isFirst,
}: {
  monuments: any;
  isFirst: any;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<VectorLayer | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFirst || !mapRef.current || mapInstance.current) return;

    const start = [92.877789, 56.015342];

    mapInstance.current = new Map({
      target: mapRef.current,
      view: new View({
        center: fromLonLat(start),
        zoom: 5,
      }),
      pixelRatio: 1,
    });

    apply(
      mapInstance.current,
      "https://api.maptiler.com/maps/01970c44-5bd0-7113-88a3-16ff53d79702/style.json?key=OFdna1UVR8QPIS2lGPxZ"
    ).then(() => {
      overlayRef.current = new Overlay({
        element: popupRef.current!,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [30, -50],
      });

      mapInstance.current?.addOverlay(overlayRef.current);

      mapInstance.current?.on("pointermove", (e) => {
        const hasFeature = mapInstance.current?.hasFeatureAtPixel(e.pixel);
        mapRef.current!.style.cursor = hasFeature ? "pointer" : "";
      });

      mapInstance.current?.on("click", function (evt) {
        const feature = mapInstance.current?.forEachFeatureAtPixel(
          evt.pixel,
          (feat) => feat
        );

        if (feature) {
          const geometry = feature.getGeometry();

          if (geometry instanceof Point) {
            const coordinates = (geometry as Point).getCoordinates();
            const url = feature.get("url");
            const name = feature.get("name");
            const year = feature.get("year");
            const id = feature.get("id");

            popupRef.current!.innerHTML = `
            <div class="relative h-64 w-80 gap-4 bg-white overflow-hidden" style = {{ border: "1px solid black"}}>
            
                <img 
                  src="${url}" 
                  alt="" 
                  class="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                />
            
              <div class="absolute bottom-0 right-0 z-10 w-full p-2 bg-white  flex items-center justify-between" style = {{ borderTop: "1px solid black"}}>
                <div class="truncate">${name} ${year} г.</div>
                <button id="popup-button" class="rounded-full w-10 h-10  shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300" style = {{ border: "1px solid black"}}>
                <img 
                  src="/images/icons/arrow-b.png"
                  alt="" 
                  class="w-full h-full p-2 rotate-180"
                />
                </button>
              </div>
            </div>
          `;

            const button = popupRef.current?.querySelector("#popup-button");
            if (button) {
              button.addEventListener("click", () => {
                window.open(`/monuments/${id}`, "_blank");
              });
            }

            overlayRef.current?.setPosition(coordinates);
          } else {
            overlayRef.current?.setPosition(undefined);
          }
        } else {
          overlayRef.current?.setPosition(undefined);
        }
      });

      setMapReady(true);
    });
  }, []);
  //isFirst

  useEffect(() => {
    if (!mapInstance.current || !monuments?.length || !mapReady) return;

    const features = monuments
      .map((monument: any) => {
        const coords = [
          monument?.place?.appellation_address?.coordinates?.lon,
          monument?.place?.appellation_address?.coordinates?.lat,
        ];

        if (!coords[0] || !coords[1]) return null;

        const name = monument?.appellation_monument?.value;
        const year = monument?.year?.value;
        const url =
          monument?.images?.length === 0
            ? "/images/contents/noimage.jpg"
            : `/api/images/${monument?.images[0]?.id}`;
        const id = monument?.id;

        const feature = new Feature({
          geometry: new Point(fromLonLat(coords)),
          name,
          year,
          url,
          id,
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: "/images/icons/marker-b.png",
              scale: 0.5,
              anchor: [0.5, 1],
            }),
          })
        );

        return feature;
      })
      .filter(Boolean) as Feature[];

    if (markerLayerRef.current) {
      mapInstance.current.removeLayer(markerLayerRef.current);
    }

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features }),
    });

    mapInstance.current.addLayer(vectorLayer);
    markerLayerRef.current = vectorLayer;
  }, [monuments, mapReady]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ border: "1px solid black" }}
    >
      <div ref={mapRef} className="w-full h-full" />
      <div ref={popupRef} className="absolute z-10" />
    </div>
  );
}


*/
