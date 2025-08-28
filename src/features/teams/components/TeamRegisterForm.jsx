import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";

export default function TeamRegisterForm() {
  return (
    <>
      <div className="">
        <h2>Register Team</h2>
        <Divider />
      </div>
      <div className="flex justify-content-center align-items-center">
        <div className="grid">
          <div className="field col-12 md:col-6 mb-0">
            <label>Team Name</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users"></i>
              </span>
              <InputText name="teamName" />
            </div>
          </div>
          <div className="field col-12 md:col-6 mb-0">
            <label>Photo</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">URL</span>
              <InputText name="photoURL" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
