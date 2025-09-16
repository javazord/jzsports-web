import ApiService from "../apiService";

export default class ChampionshipService extends ApiService {
  constructor() {
    super("api/championships");
  }

  save(championship) {
    return this.post("", championship);
  }

  update(id, championship) {
    return this.put(`/${id}`, championship);
  }

  getChampionshipByCreated(id) {
    return this.get(`/${id}/createdBy`);
  }

  getByPlayerIncluded(id) {
    return this.get(`/${id}`);
  }
}
