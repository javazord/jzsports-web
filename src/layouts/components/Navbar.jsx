import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

export default function TemplateDemo() {
  const navigate = useNavigate();
  const menu = useRef(null);

  const itemRenderer = (item) => (
    <div className="p-menuitem-content">
      <a className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-3">{item.label}</span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
        {item.shortcut && (
          <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
            {item.shortcut}
          </span>
        )}
      </a>
    </div>
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
          command: () => navigate("/team-list"),
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
          command: () => navigate("/championship-register"),
        },
        {
          label: "Search",
          icon: "pi pi-search",
        },
      ],
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
      command: () => navigate("/about"),
    },
  ];

  const profileItems = [
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          template: itemRenderer,
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          template: itemRenderer,
        },
      ],
    },
    {
      separator: true,
    },
    {
      template: (item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            )}
          >
            <Avatar
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YyjdoI1aXnQiCggqLHXNNC3oQSXxw__Hag&s"
              className="mr-2"
              shape="circle"
            />
            <div className="flex flex-column align">
              <span className="font-bold">Amy Elsner</span>
              <span className="text-sm">User</span>
            </div>
          </button>
        );
      },
    },
  ];

  const start = <img alt="logo" src="./navbar.png" height="40" />;

  const end = (
    <div className="flex align-items-center gap-2">
      {/* Avatar que abre o menu */}
      <Avatar
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YyjdoI1aXnQiCggqLHXNNC3oQSXxw__Hag&s"
        shape="circle"
        size="normal"
        onClick={(e) => menu.current.toggle(e)} // abre/fecha o menu
        className="cursor-pointer"
      />
      {/* Menu popup */}
      <Menu model={profileItems} popup ref={menu} />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
