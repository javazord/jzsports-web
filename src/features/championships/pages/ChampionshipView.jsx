import { useLocation } from "react-router-dom";
import ChampionshipChart from "../components/list/ChampionshipChart";
import { useEffect, useState } from "react";
import PhaseService from "../../../api/service/phaseService";

export default function ChampionshipView() {
  const { state } = useLocation();
  const [phase, setPhase] = useState({
    id: null,
    phase: "",
    championship: null,
    matchesList: [],
  });
  const phaseService = new PhaseService();
  const championship = state;

  useEffect(() => {
    phaseService.getByChampionshipId(championship.id).then((response) => {
      setPhase(response.data);
    });
  }, [championship]);

  return <ChampionshipChart phase={phase} />;
}
