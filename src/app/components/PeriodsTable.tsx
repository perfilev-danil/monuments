"use client";

import { useEffect, useState } from "react";

export default function PeriodsTable() {
  const [periods, setPeriods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/periods");
        const data = await res.json();
        setPeriods(data);
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
            <th className="border p-2">Десятилетие</th>
          </tr>
        </thead>
        <tbody>
          {periods?.map((period: any) => (
            <tr key={period?.id}>
              <td className="border p-2">{period?.id}</td>
              <td className="border p-2">{period?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
