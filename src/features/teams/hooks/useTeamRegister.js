import { useState } from "react";
import TeamService from "../../../api/service/teamService";

export function useTeamRegister() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const teamService = new TeamService();
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

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    });
  };

  const onChangeTeam = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPlayer = (player) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.id !== player.id));
    setSelectedPlayers((prev) => {
      const updated = [...prev, player];
      setTeam((teamPrev) => ({ ...teamPrev, playersList: updated }));
      return updated;
    });
  };

  const removePlayer = (player) => {
    setSelectedPlayers((prev) => {
      const updated = prev.filter((p) => p.id !== player.id);
      setTeam((teamPrev) => ({ ...teamPrev, playersList: updated }));
      return updated;
    });
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const searchButton = () => {
    load();
    setGlobalFilter(searchTerm);
  };

  const create = async () => {
    try {
      const response = await teamService.save(team);
      await load();
      setVisible(true);
      setTeam({ teamName: "", photoURL: "", playersList: [] });
      setSelectedPlayers([]);
      setAvailablePlayers(team.playersList);
    } catch (error) {
      console.error("Erro ao criar time", error);
    }
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
    visible,
    setVisible,
  };
}
