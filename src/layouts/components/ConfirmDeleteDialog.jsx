// ConfirmDeleteDialog.jsx
import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function ConfirmDeleteDialog({
  visible,
  onHide,
  onConfirm,
  entity,
  entityType = "register", // fallback se não passar
}) {
  const footerContent = (
    <div>
      <Button
        label="Não"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        onClick={() => {
          onConfirm(entity);
          onHide();
        }}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header={`Delete Confirm`}
      visible={visible}
      style={{ width: "30vw" }}
      onHide={onHide}
      footer={footerContent}
    >
      <p className="m-0">
        Are you sure you want to delete this {entityType}?
        <b> {entity?.name || entity?.title || entity?.nickname}</b> - ID{" "}
        {entity?.id}
      </p>
    </Dialog>
  );
}
