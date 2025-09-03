import { Divider } from "primereact/divider";
import ChampionshipRegisterForm from "../components/register/ChampionshipRegisterForm";

export default function ChampionshipRegister(params) {
  return (
    <>
      <div>
        <h2>New Championship</h2>
      </div>
      <Divider />
      <ChampionshipRegisterForm />
    </>
  );
}
