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
import EventsList from "./components/EventsList";
import ImagesList from "./components/ImagesList";

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
      console?.error("Logout failed:", error);
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
      case "roles":
        return <RolesList />;
      case "personalities":
        return <PersonalitiesList />;
      case "events":
        return <EventsList />;
      case "images":
        return <ImagesList />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-8 w-full h-screen flex items-center">
        <p className="mx-auto font-american">Проверка авторизации...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // или redirect через useEffect
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <button
          onClick={() => setActiveSection("monuments")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "monuments"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Памятники
        </button>
        <button
          onClick={() => setActiveSection("colors")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "colors"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Цвета
        </button>
        <button
          onClick={() => setActiveSection("materials")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "materials"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Материалы
        </button>
        <button
          onClick={() => setActiveSection("marks")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "marks"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Символы
        </button>
        <button
          onClick={() => setActiveSection("periods")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "periods"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Периоды
        </button>
        <button
          onClick={() => setActiveSection("techniques")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "techniques"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Техники
        </button>
        <button
          onClick={() => setActiveSection("roles")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "roles"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Роли
        </button>

        <button
          onClick={() => setActiveSection("personalities")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "personalities"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Личности
        </button>

        <button
          onClick={() => setActiveSection("locations")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 truncate ${
            activeSection === "locations"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Населённые пункты
        </button>

        <button
          onClick={() => setActiveSection("events")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "events"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          События
        </button>

        <button
          onClick={() => setActiveSection("images")}
          className={`p-2 rounded-full hover:scale-110 transition-transform duration-300 ${
            activeSection === "images"
              ? "bg-[var(--dark)] text-white"
              : "text-black"
          }`}
          style={{ border: "1px solid black" }}
        >
          Изображения
        </button>

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid black" }}
        >
          Выйти
        </button>
      </div>

      {renderSection()}
    </div>
  );
}
