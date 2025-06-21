import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export default async function CardsMazeServer() {
  const monuments = await getMonuments();

  return <CardsMaze monuments={monuments} />;
}
