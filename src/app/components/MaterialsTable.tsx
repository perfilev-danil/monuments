"use client";

import { useEffect, useState } from "react";

export default function MaterialsTable() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        setMaterials(data);
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
            <th className="border p-2">Материал</th>
          </tr>
        </thead>
        <tbody>
          {materials?.map((material: any) => (
            <tr key={material?.id}>
              <td className="border p-2">{material?.id}</td>
              <td className="border p-2">{material?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
