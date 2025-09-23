import { useEffect, useState } from "react";
import TeamService from "../../../api/service/teamService";
import ChampionshipService from "../../../api/service/championshipService";

export function useChampionship() {
  const [teams, setTeams] = useState([]); // tabela com resultados da busca
  const [loading, setLoading] = useState(false);

  // filtro de busca de times
  const [teamFilter, setTeamFilter] = useState({
    teamName: "",
    createdAt: null,
  });

  const canSearch = Boolean(
    teamFilter.teamName?.trim() || teamFilter.createdAt
  );

  // Modelo alinhado ao DTO do backend
  const [championship, setChampionship] = useState({
    id: null,
    championshipName: "",
    championshipType: null,
    championshipStatus: null, // backend seta IN_PROGRESS por padrão
    createdAt: null,
    startDate: null,
    endDate: null,
    createdByPlayerId: 1, // fixo temporário
    teams: [], // backend espera lista de DTOs de times
    phases: [], // controlado pelo backend
  });

  const [selectedTeams, setSelectedTeams] = useState([]);

  // Tipos disponíveis — ideal seria vir do backend
  const types = [
    { code: "FPS", description: "FPS" },
    { code: "FIGHT", description: "FIGHT" },
    { code: "RACING", description: "RACING" },
    { code: "SPORT", description: "SPORT" },
    { code: "MOBA", description: "MOBA" },
  ];

  const teamService = new TeamService();
  const championshipService = new ChampionshipService();

  useEffect(() => {
    console.log("Championship atualizado:", championship);
  }, [championship]);

  // busca times
  const handleSearch = async () => {
    if (!canSearch) return;

    setLoading(true);
    try {
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
    setTeams([]);
    setTeamFilter({ teamName: "", createdAt: null });
  };

  // alteração de campos do championship
  const onHandleChange = (e) => {
    const name = e.target?.name || e.name;
    const value = e.target?.value ?? e.value;

    setChampionship((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // salvar championship
  const create = async () => {
    const updatedChampionship = {
      ...championship,
      teamIds: selectedTeams.map((team) => team.id), // apenas array de IDs
    };

    try {
      console.log("Payload enviado:", updatedChampionship);
      const response = await championshipService.save(updatedChampionship);
      console.log("Salvo com sucesso", response);
      setChampionship(response.data);
    } catch (error) {
      console.error("Erro ao salvar championship:", error);
    }
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
    handleSearch,
    handleClear,
    onHandleChange,
    create,
  };
}
