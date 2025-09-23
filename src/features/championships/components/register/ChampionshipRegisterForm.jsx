import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import TeamImage from "../../../players/components/images/PlayerImage";
import { Message } from "primereact/message";
import { useChampionship } from "../../data/useChampionship";
import PlayerOption from "../../../players/components/PlayerOption";
import EChampionshipData from "../../data/EChampionshipData";
import { classNames } from "primereact/utils";

export default function ChampionshipRegisterForm() {
  const [rowClick, setRowClick] = useState(true);
  const {
    teams,
    types,
    championship,
    selectedTeams,
    teamFilter,
    canSearch,
    loading,
    setSelectedTeams,
    setTeamFilter,
    handleSearch,
    handleClear,
    onHandleChange,
    create,
  } = useChampionship();

  const stockBodyTemplate = () => {
    const stockClassName = classNames(
      "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
      {
        "bg-red-100 text-red-900": selectedTeams.length === 0,
        "bg-blue-100 text-blue-900":
          selectedTeams.length > 0 && selectedTeams.length < 10,
      }
    );

    return <div className={stockClassName}>{selectedTeams.length}</div>;
  };

  return (
    <>
      {/* Campos principais do campeonato */}
      <div className="grid justify-content-center">
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Championship Name</label>
          <InputText
            autoFocus
            name="championshipName"
            value={championship.championshipName}
            onChange={onHandleChange}
          />
        </div>
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Type</label>
          <EChampionshipData
            types={types}
            value={championship.championshipType}
            onChange={(e) =>
              onHandleChange({ name: "championshipType", value: e.value })
            }
          />
        </div>
      </div>

      <Divider />

      {/* Ações de filtro de times */}
      <div className="grid justify-content-center">
        <div className="col-12 md:col-12 lg:col-8 flex flex-column gap-2">
          <div className="flex flex-row justify-content-between align-items-center gap-2 w-full mb-2">
            <Message
              className="p-0"
              severity="secondary"
              text={
                <div className="flex align-items-center gap-2">
                  <span>Total teams selected:</span>
                  {stockBodyTemplate()} {/* <- Executa e renderiza o JSX */}
                </div>
              }
            />
            <div className="flex gap-2">
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
            emptyMessage="No team found. Enter the filters and click Search."
            filterDisplay="row"
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
              headerStyle={{ width: "6rem" }}
            />

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
              field="players"
              header="Players"
              body={(rowData) => (
                <Dropdown
                  value={rowData.players?.[0]}
                  options={rowData.players || []}
                  optionLabel="nickname"
                  className="w-full"
                  filter
                  filterDelay={200}
                  valueTemplate={(option) =>
                    option && <PlayerOption option={option} />
                  }
                  itemTemplate={(option) => <PlayerOption option={option} />}
                  placeholder="Select a player"
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
          onClick={create}
        />
      </div>
    </>
  );
}
