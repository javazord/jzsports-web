import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ChampionshipService from "../../../../api/service/championshipService";
import PlayerService from "../../../../api/service/playerService";
import { formatDate } from "../../../../utils/dateUtils";
import useChampionshipList from "../hooks/UseChampionshipList";

export default function ChampionshipListTable() {
  const [championships, setChampionships] = useState([]);
  const championshipService = new ChampionshipService();
  const playerService = new PlayerService(); // Para buscar info do player
  const {
    statusBodyTemplate,
    championshipBodyTemplate,
    addActionsButtons,
    playerBodyTemplate,
  } = useChampionshipList();

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        const response = await championshipService.getByPlayerIncluded(3);
        const transformedData = await Promise.all(
          response.data.map(async (item) => {
            // Buscar info do criador
            let createdByPlayer = null;
            if (item.createdByPlayerId) {
              const playerRes = await playerService.getPlayer(
                item.createdByPlayerId
              );
              createdByPlayer = playerRes.data;
            }

            return {
              id: item.id,
              name: item.championshipName,
              type: item.championshipType,
              status: item.championshipStatus,
              createdAt: item.createdAt,
              startDate: item.startDate,
              endDate: item.endDate,
              createdBy: createdByPlayer, // { id, nickname, username, photoURL }
              teams: item.teams || [],
              phases: item.phases || [],
            };
          })
        );
        setChampionships(transformedData);
      } catch (error) {
        console.error("Erro ao buscar campeonatos:", error);
      }
    };

    fetchChampionships();
  }, []);

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
            field="startDate"
            header="Start Date"
            body={(rowData) =>
              formatDate(rowData.startDate) != "" || null
                ? rowData.startDate
                : "Not Started"
            }
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
