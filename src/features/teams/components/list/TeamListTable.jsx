import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import SelectPlayerList from "../../../championships/data/SelectPlayerList";
import ConfirmDeleteDialog from "../../../../layouts/components/ConfirmDeleteDialog";

export default function TeamListTable() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [selectedTeam, setSelectedTeam] = useState(null); // time selecionado p/ deletar
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  useEffect(() => {
    let players = [];
    for (let i = 1; i < 10; i++) {
      let player = {
        id: i,
        name: `Tchotchomeri ${i}`,
        nickname: `Nick ${i}`,
      };
      players.push(player);
    }
    setAvailablePlayers(players);
  }, []);

  const imagePlayers = () => (
    <img
      src="https://i.redd.it/semgwb8aiex71.jpg"
      className="w-3rem shadow-2 border-round"
    />
  );

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
            value={availablePlayers}
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
            <Column field="photo" header="Photo" body={imagePlayers} />
            <Column field="name" header="Name" sortable />
            <Column
              field="nickname"
              body={<SelectPlayerList />}
              header="Players"
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
