import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import PlayerImage from "../../../players/components/images/PlayerImage";
import { useTeam } from "../../context/TeamContext";
import PlayerService from "../../../../api/service/playerService";

export default function TableTeamRegister() {
  const {
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
    team,
    setTeam,
    create,
    searchButton,
  } = useTeam();
  const playerService = new PlayerService();

  useEffect(() => {
    playerService.getAllPlayers().then((response) => {
      setAvailablePlayers(response.data || []);
    });
  }, []);

  return (
    <>
      <Divider />
      <div className="grid justify-content-center">
        {/* Tabela de jogadores disponíveis */}
        <div className="col-12 md:col-6 lg:col-4 flex flex-column">
          <DataTable
            value={availablePlayers}
            globalFilter={globalFilter}
            paginator
            scrollable
            scrollHeight="400px"
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            tableStyle={{ minWidth: "20rem" }}
            size="small"
            className="h-full"
            removableSort
            stripedRows
            header={
              <>
                <label>Nickname</label>
                <div className="flex gap-2">
                  <InputText
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search player"
                  />
                  <Button
                    icon="pi pi-search"
                    label="Search"
                    onClick={searchButton}
                    loading={loading}
                  />
                </div>
              </>
            }
          >
            <Column
              header="Photo"
              body={(rowData) => <PlayerImage rowData={rowData} />}
              style={{ width: "15%" }}
            />
            <Column
              field="username"
              header="Username"
              sortable
              style={{ width: "15%" }}
            />
            <Column
              field="nickname"
              header="Nickname"
              sortable
              style={{ width: "20%" }}
            />
            <Column
              header="Action"
              body={(rowData) => (
                <Button
                  icon="pi pi-plus"
                  rounded
                  outlined
                  text
                  severity="success"
                  tooltip="Add Player"
                  tooltipOptions={{ position: "top" }}
                  onClick={() => addPlayer(rowData)}
                />
              )}
              style={{ width: "10%" }}
            />
          </DataTable>
        </div>

        {/* Tabela de jogadores selecionados */}
        <div className="col-12 md:col-6 lg:col-4 flex flex-column md:mt-7 pt-4 h-full">
          <DataTable
            value={selectedPlayers}
            paginator
            scrollable
            scrollHeight="400px"
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            tableStyle={{ minWidth: "20rem" }}
            size="normal"
            removableSort
            stripedRows
          >
            <Column
              header="Photo"
              body={(rowData) => <PlayerImage rowData={rowData} />}
            />
            <Column field="username" header="Username" sortable />
            <Column field="nickname" header="Nickname" sortable />
            <Column
              header="Action"
              body={(rowData) => (
                <Button
                  icon="pi pi-minus"
                  rounded
                  outlined
                  text
                  severity="danger"
                  tooltip="Remove Player"
                  tooltipOptions={{ position: "top" }}
                  onClick={() => removePlayer(rowData)}
                />
              )}
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
