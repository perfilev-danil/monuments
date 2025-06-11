"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MonumentsList from "./components/MonumentsList";
import ColorsList from "./components/ColorsList";
import MaterialsList from "./components/MaterialList";
import MarksList from "./components/MarksList";
import PeriodsList from "./components/PeriodsList";
import TechniquesList from "./components/TechniquesList";
import RolesList from "./components/RolesList";
import LocationsList from "./components/LocationsList";
import PersonalitiesList from "./components/PersonalitiesList";
import PlacesList from "./components/PlacesList";
import EventsList from "./components/EventsList";
import DocumentsList from "./components/Documents";
import DimensionsTypesList from "./components/DimensionsTypesList";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("monuments");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию при загрузке компонента
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth", {
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "monuments":
        return <MonumentsList />;
      case "colors":
        return <ColorsList />;
      case "materials":
        return <MaterialsList />;
      case "marks":
        return <MarksList />;
      case "periods":
        return <PeriodsList />;
      case "techniques":
        return <TechniquesList />;

      case "locations":
        return <LocationsList />;
      case "places":
        return <PlacesList />;
      case "roles":
        return <RolesList />;
      case "personalities":
        return <PersonalitiesList />;
      case "events":
        return <EventsList />;
      case "documents":
        return <DocumentsList />;
      case "dimensionsTypes":
        return <DimensionsTypesList />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="p-4">Проверка авторизации...</div>;
  }

  if (!isAuthenticated) {
    return null; // или redirect через useEffect
  }

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveSection("monuments")}
          className={`px-4 py-2 rounded ${
            activeSection === "monuments"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Памятники
        </button>
        <button
          onClick={() => setActiveSection("colors")}
          className={`px-4 py-2 rounded ${
            activeSection === "colors"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Цвета
        </button>
        <button
          onClick={() => setActiveSection("materials")}
          className={`px-4 py-2 rounded ${
            activeSection === "materials"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Материалы
        </button>
        <button
          onClick={() => setActiveSection("marks")}
          className={`px-4 py-2 rounded ${
            activeSection === "marks"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Символы
        </button>
        <button
          onClick={() => setActiveSection("periods")}
          className={`px-4 py-2 rounded ${
            activeSection === "periods"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Периоды
        </button>
        <button
          onClick={() => setActiveSection("techniques")}
          className={`px-4 py-2 rounded ${
            activeSection === "techniques"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Техники
        </button>
        <button
          onClick={() => setActiveSection("roles")}
          className={`px-4 py-2 rounded ${
            activeSection === "roles"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Роли
        </button>

        <button
          onClick={() => setActiveSection("personalities")}
          className={`px-4 py-2 rounded ${
            activeSection === "personalities"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Личности
        </button>
      </div>

      <button
        onClick={() => setActiveSection("locations")}
        className={`px-4 py-2 rounded ${
          activeSection === "locations"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Населённые пункты
      </button>

      <button
        onClick={() => setActiveSection("places")}
        className={`px-4 py-2 rounded ${
          activeSection === "places"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Места
      </button>

      <button
        onClick={() => setActiveSection("events")}
        className={`px-4 py-2 rounded ${
          activeSection === "events"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        События
      </button>

      <button
        onClick={() => setActiveSection("documents")}
        className={`px-4 py-2 rounded ${
          activeSection === "documents"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Документы
      </button>

      <button
        onClick={() => setActiveSection("dimensionsTypes")}
        className={`px-4 py-2 rounded ${
          activeSection === "dimensionsTypes"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        Типы размеров
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Выйти
      </button>

      {renderSection()}
    </div>
  );
}
