import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function TeamListTable() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado

  useEffect(() => {
    let players = [];
    for (let i = 0; i < 10; i++) {
      let player = {
        key: i,
        data: {
          name: `Tchotchomeri ${i}`,
          nickname: `Nick${i}`,
        },
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

  const addActionsButtons = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="success"
        aria-label="Edit"
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        aria-label="Edit"
      />
    </div>
  );

  return (
    <>
      <div className="grid justify-content-center">
        <div className="col-12 md:col-12 lg:col-6 flex flex-column">
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
            <Column header="Photo" body={imagePlayers} />
            <Column field="data.name" header="Name" sortable />
            <Column field="data.nickname" header="Players" sortable />
            <Column header="Action" body={addActionsButtons} />
          </DataTable>
        </div>
      </div>
    </>
  );
}
