import { InputText } from "primereact/inputtext";

export default function TeamRegisterForm() {
  return (
    <div className="">
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText placeholder="Username" />
      </div>
    </div>
  );
}
