import { InputText } from "primereact/inputtext";

export default function TeamRegisterForm() {
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
            <InputText name="teamName" />
          </div>
        </div>

        {/* Campo Photo -> 8 colunas */}
        <div className="field col-12 md:col-8">
          <label>Photo</label>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">URL</span>
            <InputText name="photoURL" />
          </div>
        </div>
      </div>
    </>
  );
}
