import React, { useEffect, useState } from "react";
import HistoryMessageTable from "../components/layout/HistoryMessageTable";
import SearchInput from "../components/SearchInput";
import { fetchData } from "../utility/fetchData";
import {
  filterTableInput,
  renderMessages,
  deleteDuplicateInFilter,
} from "../utility/Funtions";
import { Layout, Typography } from "antd";

const HistoRyPanel = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const [sendToFilter, setSendToFilter] = useState([]);
  const [sendOnDateFilter, setSendOnDateFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "http://localhost:3120/api/v1/configuration/";
  const messages = fetchData(API_URL);
  const [tableDataSource, setTableDataSource] = useState(messages);

  let tmp = {
    dataSource: [],
    categoriesTmpFilter: [],
    categoriesFilter: [],
    statusMessageFilter: [
      { text: "Pending", value: "Pending" },
      { text: "Sended", value: "Sended" },
      { text: "Error", value: "Error" },
    ],
  };

  const { dataSource, categoriesFilter, categoriesTmpFilter } = tmp;

  const data = renderMessages(messages, {
    dataSource,
    categoriesTmpFilter,
    categoriesFilter,
  });

  const handleTableDataSource = (data) => {
    setTableDataSource(data);
    let tmpSendToFilter = [];
    let tmpSendOnDateFilter = [];
    8;

    data.map((message) => {
      tmpSendToFilter.push(message.send_to);
      tmpSendOnDateFilter.push(message.send_on_date);
    });

    const sendTo = deleteDuplicateInFilter(tmpSendToFilter);
    const sendOn = deleteDuplicateInFilter(tmpSendOnDateFilter);

    setSendToFilter(
      sendTo.map((contact) => {
        return { text: contact, value: contact };
      })
    );

    setSendOnDateFilter(
      sendOn.map((date) => {
        return {
          text: new Date(date).toLocaleDateString(),
          value: new Date(date).toLocaleDateString(),
        };
      })
    );
  };

  useEffect(() => {
    if (isLoading === true && data.length > 0) {
      handleTableDataSource(data);
      setIsLoading(false);
    }
  }, [isLoading, data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      <Header>
        <Title style={{ color: "white", textAlign: "center" }}>
          Message's History
        </Title>
      </Header>
      <SearchInput
        cb={filterTableInput}
        dataSource={data}
        handleTableDataSource={handleTableDataSource}
        cbLoading={setIsLoading}
      />
      <Content>
        <HistoryMessageTable
          tableDataSource={tableDataSource}
          categoriesFilter={tmp.categoriesFilter}
          statusMessageFilter={tmp.statusMessageFilter}
          sendOnDateFilter={sendOnDateFilter}
          sendToFilter={sendToFilter}
        />
      </Content>
    </Layout>
  );
};

export default HistoRyPanel;
