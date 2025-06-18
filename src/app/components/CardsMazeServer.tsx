import CardsMaze from "./CardsMaze";
import CardsServer from "../../../lib/CardsServer";

export default async function CardsMazeServer() {
  const monuments = await CardsServer();

  return <CardsMaze initialMonuments={monuments} />;
}
