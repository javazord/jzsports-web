import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { ListBox } from "primereact/listbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [theme, setTheme] = useState("white");

  const options = [
    { icon: "pi pi-user-edit", label: "Profile", value: "profile" },
    { icon: "pi pi-palette", label: "Appearance", value: "appearance" },
    { icon: "pi pi-bell", label: "Notifications", value: "notifications" },
  ];

  const itemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <i className={`${option.icon}`} />
        <span>{option.label}</span>
      </div>
    );
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return (
          <div className="flex flex-column gap-3">
            <h2 className="m-0">Profile Settings</h2>
            <span className="p-float-label">
              <InputText id="username" className="w-full" />
              <label>Username</label>
            </span>
            <span className="p-float-label">
              <InputText id="nickName" className="w-full" />
              <label>Nickname</label>
            </span>
            <span className="p-float-label">
              <InputText id="email" className="w-full" />
              <label>Email</label>
            </span>
            <Button label="Save" icon="pi pi-save" />
          </div>
        );

      case "appearance":
        return (
          <div className="flex flex-column gap-3">
            <h2 className="m-0">Appearance</h2>
            <div className="flex align-items-center gap-2">
              <RadioButton
                inputId="light"
                name="theme"
                value="white"
                onChange={(e) => setTheme(e.value)}
                checked={theme === "white"}
              />
              <label htmlFor="light">Light</label>
            </div>
            <div className="flex align-items-center gap-2">
              <RadioButton
                inputId="dark"
                name="theme"
                value="black-alpha-90"
                onChange={(e) => setTheme(e.value)}
                checked={theme === "black-alpha-90"}
              />
              <label htmlFor="dark">Black</label>
            </div>
            <Button label="Apply" icon="pi pi-check" />
          </div>
        );

      case "notifications":
        return (
          <div className="flex flex-column gap-3">
            <h2 className="m-0">Notifications</h2>
            <p>Configurações de notificações podem ser adicionadas aqui.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div>
        <h2>Settings</h2>
      </div>
      <Divider />

      <div className="grid p-4">
        {/* Lado esquerdo - Opções */}
        <div className="col-12 md:col-3">
          <ListBox
            value={selectedOption}
            options={options}
            itemTemplate={itemTemplate}
            onChange={(e) => setSelectedOption(e.value)}
            className="w-full"
          />
        </div>

        {/* Divider vertical */}
        <Divider layout="vertical" className="hidden md:flex" />

        {/* Lado direito - Conteúdo */}
        <div className="col-12 md:col-8">{renderContent()}</div>
      </div>
    </div>
  );
}
