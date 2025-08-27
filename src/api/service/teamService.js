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

  getByPlayer_Id(name, id) {
    return this.get(`/${id}`, name);
  }

  getTeam(id) {
    return this.get(`/${id}`);
  }
}
