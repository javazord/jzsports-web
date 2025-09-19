import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";

export default function useChampionshipList() {
  const navigate = useNavigate();

  const statusBodyTemplate = (rowData) => {
    switch (rowData.championshipStatusDescription) {
      case "In Progress":
        return (
          <Tag
            value={rowData.championshipStatusDescription}
            severity="info"
            rounded
          />
        );
      case "Finished":
        return (
          <Tag
            value={rowData.championshipStatusDescription}
            severity="success"
            rounded
          />
        );
      case "Cancelled":
        return (
          <Tag
            value={rowData.championshipStatusDescription}
            style={{ background: "gray", color: "white", borderRadius: "1rem" }}
          />
        );
      default:
        return <Tag value="Unknown" severity="warning" rounded />;
    }
  };

  const championshipBodyTemplate = (rowData) => {
    const finishedImg =
      "https://cdn-icons-png.flaticon.com/512/8348/8348232.png";
    const defaultImg =
      "https://cdn-icons-png.flaticon.com/512/1077/1077196.png";
    return (
      <div className="flex align-items-center gap-2">
        {/* Tooltip associado à imagem */}
        <Tooltip
          target={`#status-img-${rowData.id}`}
          content={
            rowData.championshipStatusDescription === "Finished"
              ? rowData.createdBy.nickname
              : "No Winner"
          }
          position="top"
        />
        <img
          id={`status-img-${rowData.id}`}
          src={
            rowData.championshipStatusDescription === "Finished"
              ? finishedImg
              : defaultImg
          }
          width={32}
          alt="status icon"
        />

        <span>
          {rowData.championshipName ? rowData.championshipName : "No name"}
        </span>
      </div>
    );
  };

  const addActionsButtons = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        rounded
        text
        severity="info"
        aria-label="View"
        tooltip="View"
        tooltipOptions={{ position: "top" }}
        onClick={() => navigate("/championship-view", { state: rowData })}
      />
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="success"
        aria-label="Edit"
        tooltip="Edit"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        aria-label="Delete"
        tooltip="Delete"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );

  const playerBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={rowData.createdBy.photoURL}
          width={32}
          alt="profile"
          style={{ width: "32px", borderRadius: "50%" }}
        />
        <span>{rowData.createdBy.nickname}</span>
      </div>
    );
  };

  return {
    statusBodyTemplate,
    championshipBodyTemplate,
    addActionsButtons,
    playerBodyTemplate,
  };
}
