import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div>
      <div className="min-h-screen flex flex-col p-4 lg:p-8">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-[20px] font-american">404</h1>
          <p className="">Страница не найдена</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
