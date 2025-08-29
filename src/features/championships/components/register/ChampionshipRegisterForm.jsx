import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";

export default function ChampionshipRegisterForm() {
  const [teams, setTeams] = useState([]);
  return (
    <div className="grid justify-content-center">
      <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
        <label>Name</label>
        <InputText name="championshipName" />
      </div>
      <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
        <label>Type</label>
        <Dropdown
          options={teams}
          optionLabel="name"
          placeholder="Select a Type"
          className="w-full md:w-full"
        />
      </div>
    </div>
  );
}
