import { useEffect, useState } from "react";
import TeamService from "../../../api/service/teamService";
import ChampionshipService from "../../../api/service/championshipService";

export function useChampionship() {
  const [teams, setTeams] = useState([]); // tabela começa vazia
  const [loading, setLoading] = useState(false);
  const [teamFilter, setTeamFilter] = useState({
    teamName: "",
    createdAt: null,
    playerId: 5,
  });
  const canSearch = Boolean(
    teamFilter.teamName?.trim() || teamFilter.createdAt
  );
  const [championship, setChampionship] = useState({
    championshipName: "",
    championshipType: null,
    createdBy: { id: 3 },
    teamsList: [],
  });
  const [selectedTeams, setSelectedTeams] = useState([]);
  const types = [
    { description: "FPS" },
    { description: "FIGHT" },
    { description: "RACING" },
    { description: "SPORT" },
    { description: "MOBA" },
  ];
  const teamService = new TeamService();
  const championshipService = new ChampionshipService();

  useEffect(() => {}, [championship]);

  const handleSearch = async () => {
    if (!canSearch) return; // evita consulta sem filtros

    setLoading(true);
    try {
      // normaliza a data para enviar ao backend (yyyy-mm-dd)
      const createdAtStr = teamFilter.createdAt
        ? new Date(teamFilter.createdAt).toISOString().slice(0, 10)
        : null;

      const payload = {
        teamName: teamFilter.teamName?.trim() || null,
        createdAt: createdAtStr,
      };

      const response = await teamService.search(payload);
      setTeams(response.data || []);
    } catch (err) {
      console.error("Erro ao buscar times:", err);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTeams([]); // limpa tabela
    setTeamFilter({ teamName: "", createdAt: null });
  };

  const onHandleChange = (e) => {
    const name = e.target?.name || e.name; // pega do input ou manual
    const value = e.target?.value ?? e.value; // pega do input ou dropdown

    setChampionship((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const create = () => {
    const updatedChampionship = {
      ...championship,
      teamsList: selectedTeams,
    };

    setChampionship(updatedChampionship);
    console.log(updatedChampionship);
    championshipService.save(updatedChampionship).then((response) => {
      console.log("Salvo com sucesso", response);
    });
  };

  const getRandomType = () => {
    const index = Math.floor(Math.random() * types.length);
    return types[index].description;
  };

  return {
    teams,
    championship,
    selectedTeams,
    teamFilter,
    types,
    canSearch,
    loading,
    setSelectedTeams,
    setTeamFilter,
    setLoading,
    setChampionship,
    getRandomType,
    handleSearch,
    handleClear,
    onHandleChange,
    create,
  };
}
