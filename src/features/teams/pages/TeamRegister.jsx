import { Divider } from "primereact/divider";
import TableTeamRegister from "../components/register/TableTeamRegister";
import TeamRegisterForm from "../components/register/TeamRegisterForm";
import { TeamProvider } from "../context/TeamContext";

export default function TeamRegister() {
  return (
    <>
      <TeamProvider>
        <h2>New Team</h2>
        <Divider />
        <TeamRegisterForm />
        <TableTeamRegister />
      </TeamProvider>
    </>
  );
}
