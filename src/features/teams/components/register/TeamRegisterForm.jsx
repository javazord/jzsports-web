import { InputText } from "primereact/inputtext";
import { useTeam } from "../../context/TeamContext";

export default function TeamRegisterForm() {
  const { team, onChangeTeam } = useTeam();
  return (
    <>
      <div className="grid justify-content-center">
        {/* Campo Team Name -> 4 colunas */}
        <div className="field col-12 md:col-3">
          <label>Team Name</label>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-users"></i>
            </span>
            <InputText
              autoFocus
              id="teamName"
              name="teamName"
              value={team.teamName}
              onChange={onChangeTeam}
            />
          </div>
        </div>

        {/* Campo Photo -> 8 colunas */}
        <div className="field col-12 md:col-8">
          <label>Photo</label>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">URL</span>
            <InputText
              id="photoURL"
              name="photoURL"
              value={team.photoURL}
              onChange={onChangeTeam}
            />
          </div>
        </div>
      </div>
    </>
  );
}
