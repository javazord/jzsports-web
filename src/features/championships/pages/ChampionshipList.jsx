import { Divider } from "primereact/divider";
import ChampionshipListTable from "../components/list/ChampionshipListTable";

export default function ChampionshipList() {
  return (
    <>
      <div>
        <h2>List Championship</h2>
      </div>
      <Divider />
      <ChampionshipListTable />
    </>
  );
}
