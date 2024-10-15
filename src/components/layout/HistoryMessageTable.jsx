import React from "react";
import { Table, Tag } from "antd";

const HistoryMessageTable = ({
  tableDataSource,
  categoriesFilter,
  statusMessageFilter,
  sendOnDateFilter,
  sendToFilter,
}) => {
  let columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "auto",
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
      title: "Send to:",
      dataIndex: "send_to",
      key: "send_to",
      filtered: true,
      filterSearch: true,
      filters: sendToFilter,
      onFilter: (value, record) => record.send_to === value,
    },
    {
      title: "Send On:",
      dataIndex: "send_on_date",
      key: "send_on_date",
      filtered: true,
      filterSearch: true,
      filters: sendOnDateFilter,
      onFilter: (value, record) => record.send_on_date === value,
    },
    {
      title: "Send on time",
      dataIndex: "send_on_time",
      key: "send_on_time",
    },
    {
      title: "Message Status",
      dataIndex: "status",
      filtered: true,
      filterSearch: true,
      filters: statusMessageFilter,
      onFilter: (value, record) => record.status.indexOf(value) !== -1,
      key: "status",
      render: (status) => {
        console.log(status);
        let color;
        switch (status) {
          case "Sended":
            color = "#A8FFFC";
            break;

          case "Error":
            color = "#C7A0B0";
            break;

          default:
            color = "#DDD7C6";
            break;
        }

        return (
          <Tag key={status} style={{ background: color }}>
            {status}
          </Tag>
        );
      },
    },
  ];

  console.log(tableDataSource);

  return (
    <>
      <Table dataSource={tableDataSource} columns={columns} />
    </>
  );
};

export default HistoryMessageTable;
