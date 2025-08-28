import React, { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

export default function TableTeamRegister() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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

  const addPlayer = (player) => {
    setAvailablePlayers((prev) => prev.filter((p) => p.key !== player.key));
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const removePlayer = (player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.key !== player.key));
    setAvailablePlayers((prev) => [...prev, player]);
  };

  const addActionTemplate = (rowData) => (
    <Button
      icon="pi pi-plus"
      className="p-button-sm p-button-success"
      onClick={() => addPlayer(rowData)}
    />
  );

  const removeActionTemplate = (rowData) => (
    <Button
      icon="pi pi-minus"
      className="p-button-sm p-button-danger"
      onClick={() => removePlayer(rowData)}
    />
  );

  return (
    <>
      <Divider />
      <div className="grid">
        {/* Tabela de jogadores disponíveis */}
        <div className="col-12 md:col-6 flex flex-column">
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
              <div className="flex gap-2">
                <InputText
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search player"
                />
                <Button
                  icon="pi pi-search"
                  label="Search"
                  onClick={() => setGlobalFilter(searchTerm)}
                />
              </div>
            }
          >
            <Column header="Photo" body={imagePlayers} />
            <Column
              field="data.name"
              header="Name"
              sortable
              className="text-center"
            />
            <Column
              field="data.nickname"
              header="Nickname"
              sortable
              className="text-center"
            />
            <Column
              header="Action"
              body={addActionTemplate}
              className="text-center"
            />
          </DataTable>
        </div>

        {/* Tabela de jogadores selecionados */}
        <div className="col-12 md:col-6 flex flex-column md:mt-6 pt-3 h-full">
          <DataTable
            value={selectedPlayers}
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
          >
            <Column header="Photo" body={imagePlayers} />
            <Column
              field="data.name"
              header="Name"
              sortable
              className="text-center"
            />
            <Column
              field="data.nickname"
              header="Nickname"
              sortable
              className="text-center"
            />
            <Column
              header="Action"
              body={removeActionTemplate}
              className="text-center"
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
          onClick={load}
        />
      </div>
    </>
  );
}
