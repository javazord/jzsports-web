import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import EChampionshipData from "../../data/eChampionshipData";
import TeamService from "../../../../api/service/teamService";
import ChampionshipService from "../../../../api/service/championshipService";
import TeamImage from "../../../players/components/images/PlayerImage";

export default function ChampionshipRegisterForm() {
  const [teams, setTeams] = useState([]); // tabela começa vazia
  const [rowClick, setRowClick] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [championship, setChampionship] = useState({
    championshipName: "",
    type: "",
    teamList: [],
  });
  const teamService = new TeamService();
  const championshipService = new ChampionshipService();

  // filtros por coluna (controlados)
  const [teamFilter, setTeamFilter] = useState({
    teamName: "",
    createdAt: null, // Date
  });

  const canSearch = Boolean(
    teamFilter.teamName?.trim() || teamFilter.createdAt
  );

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

  const playersOptionTemplate = (option) => (
    <div className="flex align-items-center">
      <img
        alt={option.photoURL}
        src={option.photoURL}
        className="mr-2"
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div>{option.nickname}</div>
    </div>
  );

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setChampionship((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const create = () => {
    championshipService.save(championship).then((response) => ({}));
  };

  return (
    <>
      <div className="grid justify-content-center">
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Championship Name</label>
          <InputText
            name="championshipName"
            value={championship.championshipName}
            onChange={onHandleChange}
          />
        </div>
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Type</label>
          <EChampionshipData onChange={onHandleChange} />
        </div>
      </div>

      <Divider />

      {/* Ações gerais de filtro */}
      <div className="grid justify-content-center">
        <div className="col-12 md:col-12 lg:col-8 flex flex-column gap-2">
          <div className="flex gap-2 justify-content-end">
            <Button
              icon="pi pi-search"
              label="Search"
              onClick={handleSearch}
              loading={loading}
              disabled={!canSearch}
            />
            <Button
              icon="pi pi-filter-slash"
              label="Clear"
              className="p-button-secondary"
              onClick={handleClear}
              disabled={loading && !teams.length}
            />
          </div>

          <DataTable
            value={teams}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            scrollable
            scrollHeight="400px"
            tableStyle={{ minWidth: "24rem" }}
            size="small"
            loading={loading}
            emptyMessage="No team found. Enter the filters in the columns and click in Search."
            filterDisplay="row" // habilita inputs na linha de filtros
            showGridlines
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedTeams}
            onSelectionChange={(e) => setSelectedTeams(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

            <Column
              field="photoURL"
              header="Photo"
              body={(rowData) => <TeamImage rowData={rowData} />}
              sortable
              headerStyle={{ width: "6rem" }}
            />

            {/* Nome do time - filtro na própria coluna */}
            <Column
              field="teamName"
              header="Name"
              sortable
              filter
              filterField="teamName"
              filterElement={
                <InputText
                  value={teamFilter.teamName}
                  onChange={(e) =>
                    setTeamFilter((prev) => ({
                      ...prev,
                      teamName: e.target.value,
                    }))
                  }
                  placeholder="Team Name"
                  className="w-full"
                />
              }
            />

            {/* Data de criação - filtro na própria coluna */}
            <Column
              field="createdAt"
              header="Created At"
              sortable
              filter
              filterField="createdAt"
              filterElement={
                <Calendar
                  value={teamFilter.createdAt}
                  onChange={(e) =>
                    setTeamFilter((prev) => ({ ...prev, createdAt: e.value }))
                  }
                  dateFormat="dd/mm/yy"
                  showIcon
                  placeholder="Select Date"
                  className="w-full"
                />
              }
              body={(row) =>
                row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString()
                  : "-"
              }
              style={{ width: "25%" }}
              headerStyle={{ width: "12rem" }}
            />

            <Column
              field="nickname"
              header="Players"
              body={(rowData) => (
                <Dropdown
                  value={rowData.playersList?.[0]}
                  options={rowData.playersList}
                  optionLabel="nickname"
                  className="w-full"
                  filter
                  filterDelay={200}
                  valueTemplate={playersOptionTemplate}
                  itemTemplate={playersOptionTemplate}
                  placeholder="Selecione um player"
                />
              )}
              style={{ width: "25%" }}
            />
          </DataTable>
        </div>
      </div>

      <Divider />

      <div className="flex justify-content-end flex-wrap m-4">
        <Button
          label="Submit"
          icon="pi pi-check"
          loading={loading}
          onClick={() => create}
        />
      </div>
    </>
  );
}
