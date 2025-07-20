import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAbility } from "../../hooks/useAbility";
import { useToast } from "../../hooks/useToast";
import Table from "../common/Table";
import Button from "../common/Button";
import Can from "../permissions/Can";

const TenantDataTable = ({
  data,
  columns,
  actions,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const { currentUser } = useAuth();
  const ability = useAbility();
  const { showToast } = useToast();

  // Filter data by tenant
  const filteredData = data.filter(
    (item) => item.tenantId === currentUser?.tenantId
  );

  const handleEdit = (item) => {
    if (ability.can("update", item)) {
      onEdit(item);
    } else {
      showToast("You don't have permission to edit this item", "error");
    }
  };

  const handleDelete = (item) => {
    if (ability.can("delete", item)) {
      onDelete(item);
    } else {
      showToast("You don't have permission to delete this item", "error");
    }
  };

  // Use provided actions or create default ones
  const tableActions = actions || [
    {
      render: (row) => (
        <Can I="update" a={row}>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            Edit
          </Button>
        </Can>
      ),
    },
    {
      render: (row) => (
        <Can I="delete" a={row}>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          >
            Delete
          </Button>
        </Can>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={filteredData}
      actions={tableActions}
      onRowClick={onRowClick}
      emptyMessage={`No data available for ${currentUser?.tenant?.name}`}
    />
  );
};

export default TenantDataTable;
