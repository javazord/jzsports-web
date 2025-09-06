import ApiService from "../apiService";

export default class PlayerService extends ApiService {
  constructor() {
    super("api/players");
  }

  save(player) {
    return this.post("", player);
  }

  update(player) {
    return this.put(`/${player.id}`, player);
  }

  updateProfile(player) {
    return this.put(`/${player.id}/player-profile`, player);
  }

  getPlayer(id) {
    return this.get(`/${id}`);
  }

  getAllPlayers() {
    return this.get("");
  }
}
