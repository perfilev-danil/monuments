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
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

declare global {
  interface HTMLCanvasElement {
    willReadFrequently: boolean;
  }
}

export default function MapView({ monuments }: { monuments: any[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<VectorLayer | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const start = fromLonLat([92.877789, 56.015342]);

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [baseLayer],
      view: new View({
        center: start,
        zoom: 6,
        constrainResolution: true,
      }),
      pixelRatio: window.devicePixelRatio || 2,
    });

    const applyBWFilters = () => {
      const canvases = mapRef.current?.querySelectorAll(".ol-layer canvas");
      canvases?.forEach((element) => {
        if (element instanceof HTMLCanvasElement) {
          element.willReadFrequently = true;
          element.style.filter = "grayscale(100%) contrast(200%)";
          element.style.imageRendering = "crisp-edges";
        }
      });
    };

    const handleMapClick = (evt: any) => {
      const feature = mapInstance.current?.forEachFeatureAtPixel(
        evt.pixel,
        (feat) => feat
      );

      if (feature) {
        const geometry = feature.getGeometry();
        if (geometry instanceof Point) {
          const coordinates = geometry.getCoordinates();
          const url = feature.get("url");
          const name = feature.get("name");
          const year = feature.get("year");
          const id = feature.get("id");

          popupRef.current!.innerHTML = `
            <div class="relative h-64 w-80 gap-4 bg-white overflow-hidden" style="border: 1px solid black">
              <img 
                src="${url}" 
                alt="" 
                class="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute bottom-0 right-0 z-10 w-full p-2 bg-white flex gap-2 items-center justify-between" style="border-top: 1px solid black">
                <div class="truncate">${name} (${year} г.)</div>
                <a href="/monuments/${id}" target="_blank" class="rounded-full w-10 h-10 shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300" style="border: 1px solid black">
                  <img 
                    src="/images/icons/arrow-b.png"
                    alt="" 
                    class="w-full h-full p-2 rotate-180"
                  />
                </a>
              </div>
            </div>
          `;

          /*
          const button = popupRef.current?.querySelector("#popup-button");
          if (button) {
            button.addEventListener("click", () => {
              window.open(`/monuments/${id}`, "_blank");
            });
          }
*/

          overlayRef.current?.setPosition(coordinates);
        }
      } else {
        overlayRef.current?.setPosition(undefined);
      }
    };

    overlayRef.current = new Overlay({
      element: popupRef.current!,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [30, -50],
    });

    mapInstance.current.addOverlay(overlayRef.current);
    mapInstance.current.on("postrender", applyBWFilters);
    mapInstance.current.on("click", handleMapClick);
    mapInstance.current.on("pointermove", (evt) => {
      const hasFeature = mapInstance.current?.hasFeatureAtPixel(evt.pixel);
      if (mapRef.current) {
        mapRef.current.style.cursor = hasFeature ? "pointer" : "";
      }
    });

    setMapReady(true);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !monuments?.length || !mapReady) return;

    const features = monuments
      .map((monument) => {
        const lon = monument?.place?.appellation_address?.coordinates?.lon;
        const lat = monument?.place?.appellation_address?.coordinates?.lat;
        if (!lon || !lat) return null;

        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: monument?.appellation_monument?.value,
          year: monument?.year?.value,
          url: monument?.images?.[0]?.id
            ? `/api/images/${monument.images[0].id}`
            : "/images/contents/noimage.jpg",
          id: monument.id,
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: "/images/icons/marker-b.png",
              scale: 0.5,
              anchor: [0.5, 1],
              crossOrigin: "anonymous",
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
      <style jsx global>{`
        .ol-layer canvas {
          filter: grayscale(100%) contrast(150%) brightness(1.05) !important;
          image-rendering: crisp-edges;
        }
      `}</style>
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
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

export default function MapView({ monuments }: { monuments: any }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<VectorLayer | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const start = [92.877789, 56.015342];

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [baseLayer],
      view: new View({
        center: fromLonLat(start),
        zoom: 5,
        constrainResolution: true,
      }),
      pixelRatio: window.devicePixelRatio || 1,
    });

    const applyBWFilters = () => {
      const canvases = mapRef.current?.querySelectorAll(
        ".ol-layer canvas"
      ) as NodeListOf<HTMLCanvasElement>;
      canvases?.forEach((canvas) => {
        canvas.style.filter = "grayscale(100%) contrast(150%) brightness(1.05)";
        canvas.style.imageRendering = "crisp-edges";
      });
    };

    mapInstance.current.on("postrender", applyBWFilters);
    mapInstance.current.on("moveend", applyBWFilters);

    overlayRef.current = new Overlay({
      element: popupRef.current!,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [30, -50],
    });

    mapInstance.current.addOverlay(overlayRef.current);

    mapInstance.current.on("pointermove", (e) => {
      const hasFeature = mapInstance.current?.hasFeatureAtPixel(e.pixel);
      mapRef.current!.style.cursor = hasFeature ? "pointer" : "";
    });

    mapInstance.current.on("click", function (evt) {
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
            <div class="relative h-64 w-80 gap-4 bg-white overflow-hidden" style="border: 1px solid black">
              <img 
                src="${url}" 
                alt="" 
                class="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute bottom-0 right-0 z-10 w-full p-2 bg-white flex items-center justify-between" style="border-top: 1px solid black">
                <div class="truncate">${name} ${year} г.</div>
                <button id="popup-button" class="rounded-full w-10 h-10 shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300" style="border: 1px solid black">
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

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

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
      <style jsx global>{`
        .grayscale-layer canvas {
          filter: grayscale(100%) contrast(1.2) brightness(0.9) !important;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
      <div ref={popupRef} className="absolute z-10" />
    </div>
  );
}

*/
