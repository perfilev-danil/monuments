import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export async function CardsMazeServer() {
  const monuments = await getMonuments();
  console.log("Памятники 2", monuments);
  return <CardsMaze monuments={monuments} />;
}
