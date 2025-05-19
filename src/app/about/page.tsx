"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [monuments, setMonuments] = useState([]);

  useEffect(() => {
    fetch("/api/monuments")
      .then((res) => res.json())
      .then((data) => setMonuments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Памятники</h2>
      <ul>
        {monuments.map((m: any) => (
          <div key={m.id}>
            <p>{m.appellation?.value}</p>
            <p>{m.description?.value}</p>
            <div>
              Материалы:
              {m.materials?.map((r: any) => (
                <p key={r.id}>{r?.value}</p>
              ))}
            </div>
            <div>
              Периоды:
              {m.periods?.map((p: any) => (
                <p key={p.id}>{p?.value}</p>
              ))}
            </div>
            <p>{m.inscription?.value}</p>
            <p>{m.conceptual_object?.value}</p>
            <div>
              Документы:
              {m.documents?.map((d: any) => (
                <p key={d.id}>
                  {d?.value} {d?.url}
                </p>
              ))}
            </div>
            <div>
              Размеры:
              {m.dimensions?.map((l: any) => (
                <div key={l.id}>
                  {l?.value}
                  {l?.dimension_types.map((k: any) => (
                    <p key={k.id}> {k.value} </p>
                  ))}
                </div>
              ))}
            </div>

            <div>
              Личности:
              {m.personalities.map((l: any) => (
                <p key={l.id}>
                  {l.appellation.value} {l.description.value} {l.role.value}{" "}
                  {l.time_span.beginning} - {l.time_span.end}
                </p>
              ))}
            </div>

            <p>Адрес: {m.place?.value}</p>
            <p>Координаты: {m.place.coordinates.value}</p>

            <div>
              Изображения:
              {m.images.map((l: any) => (
                <p key={l.id}>{l.url}</p>
              ))}
            </div>

            <div>
              Изображения:
              {m.images.map((l: any) => (
                <p key={l.id}>{l.url}</p>
              ))}
            </div>

            <div>
              События:
              {m.events.map((l: any) => (
                <p key={l.id}>
                  {l.appellation.value} {l.description.value}{" "}
                  {l.time_span.beginning} {l.time_span.end}
                </p>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
