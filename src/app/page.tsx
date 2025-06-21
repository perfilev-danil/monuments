import Hero from "./components/Hero";
import Opening from "./components/Opening";

import Info from "./components/Info";

import Footer from "./components/Footer";
import { CardsMazeServer } from "./components/CardsMazeServer";

export default async function Home() {
  return (
    <div className="relative scroll-smooth">
      <Hero />
      <Opening />
      <CardsMazeServer />
      <Info />
      <Footer />
    </div>
  );
}
