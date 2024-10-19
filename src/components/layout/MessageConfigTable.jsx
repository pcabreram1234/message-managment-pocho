import React, { useEffect, useState, useRef } from "react";
import { Table, Tag } from "antd";
import { fetchData } from "../../utility/fetchData";
import { getObjectProp, deleteDuplicateInFilter } from "../../utility/Funtions";
import ConfigMessageButton from "../buttons/ConfigMessageButton";

const API_URL =
  import.meta.env.VITE_API_URL +
  import.meta.env.VITE_API_URL_ROUTER +
  "messages";
const MessageConfigTable = ({
  handleData,
  setShowModal,
  setShowConfigurationButton,
  setMesssages,
}) => {
  const messages = fetchData(API_URL);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  let categoriesFilter = [];
  let categoriesTmpFilter = [];
  let messageTmpFilter = [];

  const tableRef = useRef();

  let dataSource = [];
  let columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      filtered: true,
      filterSearch: true,
      width: "auto",
      filters: messageTmpFilter,
      ellipsis: true,
      onFilter: (value, record) => record.message.indexOf(value) !== -1,
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      filtered: true,
      filterSearch: true,
      filters: categoriesFilter,
      onFilter: (value, record) => record.categories.indexOf(value) !== -1,
      render: (categories) => (
        <>
          {categories.map((category) => {
            return (
              <Tag
                key={category}
                color={"rgb(158, 255, 206)"}
                style={{ color: "black" }}
              >
                {category}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Config",
      dataIndex: "config",
      key: "config",
    },
  ];

  const renderMessages = () => {
    const { result } = messages;
    if (result) {
      result.map((message) => {
        dataSource.push({
          key: message.id,
          message: message.message,
          categories: getObjectProp(message.Categories, "categorie_name"),
          config: (
            <ConfigMessageButton
              setShowModal={setShowModal}
              id={message.id}
              setId={handleData}
            />
          ),
        });

        /* En dado caso que el mensaje tenga categorias asociadas
         agregar a la variable de filtros temporal*/
        message.Categories.map((record) => {
          categoriesTmpFilter.push(record.categorie_name);
        });

        /* Agregamos valores a la variable de filtros */
        messageTmpFilter.push({
          text: message.message,
          value: message.message,
        });
      });
    }
    /* Las variables de filtros temporales se les reasigna su valor en base a la 
    funcion que elimina los duplicados */
    categoriesTmpFilter = deleteDuplicateInFilter(categoriesTmpFilter);

    /* Se recorre las dos variables de filtros temporales para que 
    en cada recorrido le agregue las propiedades del objeto que necesita
    la UI para mostrar las opciones de los filtros */
    categoriesTmpFilter.map((category) => {
      categoriesFilter.push({ text: category, value: category });
    });
  };

  const onSelect = (key, row) => {
    setSelectedRowKeys(key);
    setMesssages(row);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelect,
    onSelect: onSelect,
    onSelectMultiple: onSelect,
    preserveSelectedRowKeys: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  useEffect(() => {
    if (selectedRowKeys.length > 1) {
      setShowConfigurationButton(true);
      handleData(selectedRowKeys);
    } else {
      setShowConfigurationButton(false);
    }
  }, [selectedRowKeys]);

  renderMessages();

  return (
    <Table
      ref={tableRef}
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
    />
  );
};

export default MessageConfigTable;
