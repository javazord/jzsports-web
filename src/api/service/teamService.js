import ApiService from "../apiService";

export default class TeamService extends ApiService {
  constructor() {
    super("api/teams");
  }

  save(team) {
    return this.post("", team);
  }

  update(team) {
    return this.put(`/${team}`, team);
  }

  getByPlayer_Id(id) {
    return this.get(`/all-player/${id}`);
  }

  getTeam(id) {
    return this.get(`/${id}`);
  }

  getAll() {
    return this.get("");
  }

  search(teamFilter) {
    let params = "";
    if (teamFilter.teamName) {
      params += `?teamName=${teamFilter.teamName}`;
    }
    if (teamFilter.createdAt) {
      params += `?createdAt=${teamFilter.createdAt}`;
    }
    if (teamFilter.playerId) {
      params += `?playerId=${teamFilter.playerId}`;
    }
    return this.get(params);
  }
}
