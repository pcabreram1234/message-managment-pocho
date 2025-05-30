import React from "react";
import { Button, Popconfirm } from "antd";

export const AccountActions = () => {
  return (
    <div>
      <Button type="default" style={{ marginRight: 8 }}>
        Exportar mis datos
      </Button>
      <Popconfirm
        title="¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible."
        okText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={() => console.log("Cuenta eliminada")}
      >
        <Button danger>Eliminar cuenta</Button>
      </Popconfirm>
    </div>
  );
};
