import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function EChampionshipData() {
  const [type, setType] = useState(null);
  const types = [
    { description: "FPS" },
    { description: "FIGHT" },
    { description: "RACING" },
    { description: "SPORT" },
    { description: "MOBA" },
  ];
  return (
    <Dropdown
      value={type}
      onChange={(e) => setType(e.value)}
      options={types}
      optionLabel="description"
      placeholder="Select a type"
      className="w-full"
      checkmark={true}
      highlightOnSelect={false}
    />
  );
}
