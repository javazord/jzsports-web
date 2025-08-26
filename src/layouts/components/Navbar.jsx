import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { redirect, useNavigate } from "react-router-dom";

export default function TemplateDemo() {
  const navigate = useNavigate();
  const itemRenderer = (item) => (
    <a
      onClick={() => item.command?.()} // importante para disparar a navegação
      className="flex align-items-center p-menuitem-link cursor-pointer"
    >
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Team",
      icon: "pi pi-users",
      items: [
        {
          label: "New",
          icon: "pi pi-sparkles",
          command: () => navigate("/team-register"),
        },
        {
          label: "Search",
          icon: "pi pi-search",
        },
      ],
    },
    {
      label: "Championship",
      icon: "pi pi-trophy",
      items: [
        {
          label: "New",
          icon: "pi pi-sparkles",
          template: itemRenderer,
        },
        {
          label: "Search",
          icon: "pi pi-search",
          template: itemRenderer,
        },
      ],
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      className="mr-2 h-12"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YyjdoI1aXnQiCggqLHXNNC3oQSXxw__Hag&s"
        shape="circle"
        size="large"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
