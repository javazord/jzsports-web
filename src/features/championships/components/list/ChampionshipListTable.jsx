import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useChampionshipData } from "../../data/useChampionshipData";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function ChampionshipListTable() {
  const [championships, setChampionships] = useState([]);
  const { getRandomType } = useChampionshipData();

  useEffect(() => {
    const randomDateAt = new Date(2025, 0, 1);
    const statuses = ["IN_PROGRESS", "FINISHED", "CANCELLED"]; // possíveis status
    const tempChampionship = [];

    for (let i = 1; i <= 10; i++) {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      tempChampionship.push({
        id: i,
        name: `Championship ${i}`,
        type: getRandomType(),
        createdAt: randomDateAt.toLocaleDateString(),
        status: randomStatus,
        createdBy: `Profile ${i}`,
      });
    }

    setChampionships(tempChampionship);
  }, []);

  // renderiza as TAGS de status
  const statusBodyTemplate = (rowData) => {
    switch (rowData.status) {
      case "IN_PROGRESS":
        return <Tag value="In Progress" severity="info" rounded />;
      case "FINISHED":
        return <Tag value="Finished" severity="success" rounded />;
      case "CANCELLED":
        return (
          <Tag
            value="Cancelled"
            style={{ background: "gray", color: "white", borderRadius: "1rem" }}
          />
        );
      default:
        return <Tag value="Unknown" severity="warning" rounded />;
    }
  };

  // renderiza o nome do torneio e imagem se estiver finalizado
  const championshipBodyTemplate = (rowData) => {
    const finishedImg =
      "https://cdn-icons-png.flaticon.com/512/8348/8348232.png";
    const defaultImg =
      "https://cdn-icons-png.flaticon.com/512/1077/1077196.png";
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={rowData.status === "FINISHED" ? finishedImg : defaultImg}
          width={32}
          alt="finished icon"
        />
        <span>{rowData.name}</span>
      </div>
    );
  };

  const addActionsButtons = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" rounded text severity="info" aria-label="View" />
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
        aria-label="Delete"
      />
    </div>
  );

  const playerBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`}
          width={32}
          alt="profile"
        />
        <span>{rowData.createdBy}</span>
      </div>
    );
  };

  return (
    <div className="grid justify-content-center">
      <div className="col-12 md:col-12 lg:col-10 flex flex-column lg:mt-5">
        <DataTable
          value={championships}
          paginator
          filterDisplay="row"
          dataKey="id"
          scrollable
          scrollHeight="400px"
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          tableStyle={{ minWidth: "50rem" }}
          size="normal"
          removableSort
          stripedRows
        >
          <Column field="id" header="#Id" sortable style={{ width: "5%" }} />
          <Column
            field="name"
            body={championshipBodyTemplate}
            header="Name"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="type"
            header="Type"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="createdAt"
            header="Created At"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="status"
            body={statusBodyTemplate}
            header="Status"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="createdBy"
            body={playerBodyTemplate}
            header="Created By"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column body={addActionsButtons} header="Actions" />
        </DataTable>
      </div>
    </div>
  );
}
