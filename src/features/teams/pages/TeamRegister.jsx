import { Divider } from "primereact/divider";
import TableTeamRegister from "../components/register/TableTeamRegister";
import TeamRegisterForm from "../components/register/TeamRegisterForm";

export default function TeamRegister() {
  return (
    <>
      <div className="">
        <h2>New Team</h2>
        <Divider />
      </div>
      <TeamRegisterForm />
      <TableTeamRegister />
    </>
  );
}
