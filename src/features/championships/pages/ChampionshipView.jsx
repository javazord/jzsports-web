import { useLocation } from "react-router-dom";
import ChampionshipChart from "../components/list/ChampionshipChart";
import { useEffect, useState } from "react";
import PhaseService from "../../../api/service/phaseService";
import { Divider } from "primereact/divider";

export default function ChampionshipView() {
  const { state } = useLocation();
  const [phase, setPhase] = useState({
    id: null,
    phaseType: "",
    championshipId: null,
    champinoshipName: "",
    matches: [],
  });
  const phaseService = new PhaseService();
  const championship = state;

  useEffect(() => {
    phaseService.getByChampionshipId(championship.id).then((response) => {
      setPhase(response.data);
      console.log(response.data);
    });
  }, [championship]);

  return (
    <>
      <div className="grid justify-content-center align-content-center mt-2 gap-2">
        <span className="align-content-center pi pi-arrow-left"></span>
        <h2 className="">{phase.phaseType}</h2>
        <span className="align-content-center pi pi-arrow-right"></span>
      </div>
      <Divider />
      <ChampionshipChart phase={phase} />
    </>
  );
}
