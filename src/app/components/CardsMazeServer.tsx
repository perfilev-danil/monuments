import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export async function CardsMazeServer() {
  const monuments = await getMonuments();
  process.stderr.write(`Памятники 2: ${JSON.stringify(monuments)}\n`);
  return <CardsMaze monuments={monuments} />;
}
