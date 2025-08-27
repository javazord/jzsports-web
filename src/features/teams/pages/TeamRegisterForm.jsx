import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

export default function TeamRegisterForm() {
  return (
    <>
      <div className="">
        <h2>Register Team</h2>
        <Divider />
      </div>
      <div className="flex justify-content-center align-items-center">
        <div className="grid w-full md:w-8 lg:w-6">
          <div className="field col-12 md:col-6">
            <label>Team Name</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users"></i>
              </span>
              <InputText name="teamName" />
            </div>
          </div>

          <div className="field col-12 md:col-6">
            <label>Photo URL</label>
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
