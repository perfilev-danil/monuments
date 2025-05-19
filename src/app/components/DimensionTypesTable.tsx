"use client";

import { useEffect, useState } from "react";

export default function DimensionTypesTable() {
  const [dimensionTypes, setDimensionTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/dimensionTypes");
        const data = await res.json();
        setDimensionTypes(data);
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
            <th className="border p-2">Тип размера</th>
          </tr>
        </thead>
        <tbody>
          {dimensionTypes?.map((dimensionType: any) => (
            <tr key={dimensionType?.id}>
              <td className="border p-2">{dimensionType?.id}</td>
              <td className="border p-2">{dimensionType?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
