import ApiService from "../apiService";

export default class PhaseService extends ApiService {
  constructor() {
    super("api/phases");
  }

  update(id, phase) {
    return this.put(`/${id}`, phase);
  }

  getByChampionshipId(id) {
    return this.get(`/${id}`);
  }
}
