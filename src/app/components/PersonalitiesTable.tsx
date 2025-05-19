"use client";

import { useEffect, useState } from "react";

export default function PersonalitiesTable() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/personalities");
        const data = await res.json();
        setPersonalities(data);
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
            <th className="border p-2">Роль</th>
            <th className="border p-2">Описание</th>
          </tr>
        </thead>
        <tbody>
          {personalities?.map((personality: any) => (
            <tr key={personality?.id}>
              <td className="border p-2">{personality?.id}</td>
              <td className="border p-2">{personality?.time_span.beginning}</td>
              <td className="border p-2">{personality?.time_span.end}</td>
              <td className="border p-2">{personality?.appellation.value}</td>
              <td className="border p-2">{personality?.role.value}</td>
              <td className="border p-2">{personality?.description.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
