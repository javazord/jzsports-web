import { Dropdown } from "primereact/dropdown";

export default function EChampionshipData({ types, value, onChange }) {
  return (
    <Dropdown
      value={value}
      name="championshipType"
      onChange={onChange}
      options={types}
      optionLabel="description"
      optionValue="description"
      placeholder="Select a type"
      className="w-full"
    />
  );
}
