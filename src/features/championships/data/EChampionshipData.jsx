import { Dropdown } from "primereact/dropdown";
import { useChampionshipData } from "./useChampionshipData";

export default function EChampionshipData() {
  const { types, type, setType } = useChampionshipData();
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
