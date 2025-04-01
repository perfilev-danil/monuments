import Header from "./Header";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-black/60 to-transparent"></div>
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        poster="images/contents/hero.jpg"
        className="w-full h-full object-cover"
      >
        <source src="videos/hero.mp4" type="video/mp4" />
      </video>
      <Header />
    </div>
  );
}
