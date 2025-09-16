import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import ConfirmDeleteDialog from "../../../../layouts/components/ConfirmDeleteDialog";
import TeamImage from "../../../players/components/images/PlayerImage";
import { Dropdown } from "primereact/dropdown";
import TeamService from "../../../../api/service/teamService";
import { formatDate } from "../../../../utils/dateUtils";

export default function TeamListTable() {
  const [availableTeams, setAvailableTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [selectedTeam, setSelectedTeam] = useState(null); // time selecionado p/ deletar
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const teamService = new TeamService();

  useEffect(() => {
    teamService.getByPlayer_Id(5).then((response) => {
      setAvailableTeams(response.data);
    });
  }, []);

  const editButtonTeam = (rowData) => {
    console.log(rowData.id);
  };

  const deleteButtonTeam = (rowData) => {
    setSelectedTeam(rowData);
    setDeleteDialogVisible(true);
  };

  const addActionsButtons = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="success"
        aria-label="Edit"
        tooltip="Edit Team"
        tooltipOptions={{ position: "top" }}
        onClick={() => editButtonTeam(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        aria-label="Edit"
        tooltip="Delete Team"
        tooltipOptions={{ position: "top" }}
        onClick={() => deleteButtonTeam(rowData)}
      />
    </div>
  );

  const playersOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.photoURL}
          src={option.photoURL}
          className={`mr-2 flag flag-${option.nickname.toLowerCase()}`}
          style={{ width: "22px", borderRadius: "50%" }}
        />
        <div>{option.nickname}</div>
      </div>
    );
  };

  return (
    <>
      <div className="grid justify-content-center">
        <div className="col-12 md:col-12 lg:col-6 flex flex-column lg:mt-4">
          {/* Filtro acima da tabela */}
          <div className="flex flex-column mb-3">
            <label className="mb-2">Name</label>
            <div className="flex gap-2">
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Team"
              />
              <Button
                icon="pi pi-search"
                label="Search"
                onClick={() => setGlobalFilter(searchTerm)}
              />
            </div>
          </div>

          {/* Tabela */}
          <DataTable
            value={availableTeams}
            globalFilter={globalFilter}
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
              field="photoURL"
              header="Photo"
              body={(rowData) => <TeamImage rowData={rowData} />}
            />
            <Column field="teamName" header="Name" sortable />
            <Column
              field="createdAt"
              header="Created At"
              body={(rowData) => formatDate(rowData.createdAt)}
              sortable
            />
            <Column
              field="nickname"
              header="Players"
              style={{ width: "10%" }}
              body={(rowData) => (
                <Dropdown
                  value={rowData.playersList[0]}
                  options={rowData.playersList}
                  optionLabel="nickname"
                  className="w-full"
                  filter
                  filterDelay={200}
                  valueTemplate={playersOptionTemplate}
                  itemTemplate={playersOptionTemplate}
                />
              )}
            />
            <Column header="Action" body={addActionsButtons} />
          </DataTable>
        </div>
      </div>

      <ConfirmDeleteDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        entity={selectedTeam}
        entityType={"team"}
      />
    </>
  );
}
