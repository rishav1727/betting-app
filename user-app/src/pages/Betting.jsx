import { useParams } from "react-router-dom";
import Bet from "../components/Bet";

export default function Betting() {

  const { id } = useParams();

  const market = {
    id: id
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">
        🎯 Betting Panel
      </h1>

      <Bet market={market} />

    </div>
  );
}