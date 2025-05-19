"use client";

import { useEffect, useState } from "react";

export default function EventsTable() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Начало</th>
            <th className="border p-2">Конец</th>
            <th className="border p-2">Название</th>
            <th className="border p-2">Описание</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: any) => (
            <tr key={event?.id}>
              <td className="border p-2">{event?.id}</td>
              <td className="border p-2">{event?.time_span.beginning}</td>
              <td className="border p-2">{event?.time_span.end}</td>
              <td className="border p-2">{event?.appellation.value}</td>
              <td className="border p-2">{event?.description.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
