import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ChampionshipService from "../../../../api/service/championshipService";
import { formatDate } from "../../../../utils/dateUtils";
import useChampionshipList from "../hooks/UseChampionshipList";

export default function ChampionshipListTable() {
  const [championships, setChampionships] = useState([
    {
      id: null,
      championshipName: "",
      championshipType: "",
      championshipStatus: "",
      createdBy: {
        id: null,
        nickname: "",
        username: "",
        photoURL: "",
      },
      startDate: null,
      endDate: null,
    },
  ]);
  const championshipService = new ChampionshipService();
  const {
    statusBodyTemplate,
    championshipBodyTemplate,
    addActionsButtons,
    playerBodyTemplate,
  } = useChampionshipList();

  useEffect(() => {
    championshipService.getByPlayerIncluded(3).then((response) => {
      setChampionships(response.data);
    });
  }, [championships]);

  return (
    <div className="grid justify-content-center align-content-center lg:mt-4">
      <div className="col-12 md:col-12 lg:col-10 flex flex-column">
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
            field="championshipName"
            body={championshipBodyTemplate}
            header="Name"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="championshipTypeDescription"
            header="Type"
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="startDate"
            header="Created At"
            body={(rowData) => formatDate(rowData.startDate)}
            filter
            filterPlaceholder="Search"
            sortable
          />
          <Column
            field="championshipStatusDescription"
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
