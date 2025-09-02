import { Button } from "primereact/button";
import { useState } from "react";

export function useTeamRegister() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState({
    teamName: "",
    photoURL: "",
    createdAt: "",
    playersList: [],
  });
  const [teamErrors, setTeamErrors] = useState({
    teamName: "",
    photoURL: "",
    count: "",
  });

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const imagePlayers = (rowData) => (
    <img
      src={rowData?.data?.photo || "https://i.redd.it/semgwb8aiex71.jpg"}
      className="w-3rem shadow-2 border-round"
    />
  );

  const addPlayer = (player) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.key !== player.key));
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const removePlayer = (player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.key !== player.key));
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const addActionTemplate = (rowData) => (
    <Button
      icon="pi pi-plus"
      rounded
      text
      raised
      size="small"
      severity="success"
      aria-label="Bookmark"
      onClick={() => addPlayer(rowData)}
    />
  );

  const removeActionTemplate = (rowData) => (
    <Button
      icon="pi pi-minus"
      rounded
      text
      raised
      className="p-button-sm p-button-danger"
      onClick={() => removePlayer(rowData)}
    />
  );

  return {
    load,
    imagePlayers,
    addActionTemplate,
    removeActionTemplate,
    availablePlayers,
    setAvailablePlayers,
    selectedPlayers,
    searchTerm,
    setSearchTerm,
    globalFilter,
    setGlobalFilter,
    loading,
  };
}
