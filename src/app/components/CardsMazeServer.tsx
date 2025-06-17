import CardsMaze from "./CardsMaze";

export default async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`);

  const monuments = await res.json();

  return <CardsMaze initialMonuments={monuments} />;
}
