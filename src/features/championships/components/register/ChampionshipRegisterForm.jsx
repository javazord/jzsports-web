import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import EChampionshipData from "../../data/eChampionshipData";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { UseChampionshipRegister } from "../hooks/UseChampionshipRegister";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import SelectPlayerList from "../../data/SelectPlayerList";

export default function ChampionshipRegisterForm() {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState(null);
  const [rowClick, setRowClick] = useState(true);
  const { imageTeamRender } = UseChampionshipRegister();
  const [searchTerm, setSearchTerm] = useState(""); // input de busca
  const [globalFilter, setGlobalFilter] = useState(null); // filtro aplicado
  const [loading, setLoading] = useState();

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const randomDate = new Date(2025, 0, 1);
    const tempTeams = [];
    for (let i = 0; i < 10; i++) {
      tempTeams.push({
        id: i,
        name: `Team ${i}`,
        createdAt: randomDate.toLocaleDateString(),
      });
      setTeams(tempTeams);
    }
  }, []);

  return (
    <>
      <div className="grid justify-content-center">
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Championship Name</label>
          <InputText name="championshipName" />
        </div>
        <div className="field col-12 md:col-12 lg:col-4 flex flex-column">
          <label>Type</label>
          <EChampionshipData />
        </div>
      </div>
      <Divider />

      <div className="grid justify-content-center">
        <div className="col-12 md:col-12 lg:col-8 flex flex-column h-full">
          <div className="flex flex-column mb-3">
            <label className="mb-2">Team Name</label>
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
          <DataTable
            value={teams}
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedTeams}
            onSelectionChange={(e) => setSelectedTeams(e.value)}
            dataKey="id"
            paginator
            scrollable
            scrollHeight="400px"
            globalFilter={globalFilter}
            tableStyle={{ minWidth: "20rem" }}
            size="small"
            rows={5}
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "2rem" }}
            ></Column>
            <Column body={imageTeamRender} header="Photo" sortable />
            <Column field="name" header="Name" sortable />
            <Column field="createdAt" header="Created At" sortable />
            <Column body={<SelectPlayerList />} header="Players" />
          </DataTable>
        </div>
        <Divider />
      </div>
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
