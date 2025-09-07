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

  const onChangeTeam = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPlayer = (player) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.key !== player.key));
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const removePlayer = (player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.key !== player.key));
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const searchButton = () => {
    load();
    setGlobalFilter(searchTerm);
  };

  const create = () => {
    console.log(team);
  };

  return {
    load,
    availablePlayers,
    setAvailablePlayers,
    selectedPlayers,
    searchTerm,
    setSearchTerm,
    globalFilter,
    setGlobalFilter,
    addPlayer,
    removePlayer,
    loading,
    onChangeTeam,
    team,
    setTeam,
    create,
    searchButton,
  };
}
