"use client";

import { useEffect, useState } from "react";

export default function DocumentTable() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        setDocuments(data);
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
            <th className="border p-2">Название документа</th>
            <th className="border p-2">Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {documents?.map((document: any) => (
            <tr key={document?.id}>
              <td className="border p-2">{document?.id}</td>
              <td className="border p-2">{document?.value}</td>
              <td className="border p-2">{document?.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
