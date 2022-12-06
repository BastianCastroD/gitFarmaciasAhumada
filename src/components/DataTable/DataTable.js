import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const Table = props => {
  const columns = [
    {
        name: 'Nombre',
        selector: row => row.nombre
    },
    {
        name: 'Apellido',
        selector: row => row.apellido
    },
    {
        name: 'Apellido2',
        selector: row => row.apellido2
    },
    {
      name: "Buttons",
      button: true,
      cell: row =>
      
          <>
            <button className="buttonEliminar" onClick={() => props.click(row)}>Eliminar</button>
          </>
  
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Usuarios"
      columns={columns}
      data={filteredItems}
      defaultSortField="nombre"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;
