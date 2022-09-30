import React, { useState } from "react";
import "./App.css";
import { Button, Upload, Table } from "antd";

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const App = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const processRawFileData = (rawStr) => {
    const delimiter = ",";
    const lines = rawStr.split(/\r\n|\n|\r/);
    const headers = lines[0].split(delimiter);
    const rows = lines.slice(1);

    setColumns(
      headers.map((item) => ({
        title: item,
        dataIndex: item.toLowerCase(),
        key: item.toLowerCase(),
      }))
    );

    const data = rows.map((row, idx) => {
      const values = row.split(delimiter);
      const item = headers.reduce((obj, header, i) => {
        obj[header.toLowerCase()] = values[i];
        obj.key = header + idx;
        return obj;
      }, {});
      return item;
    });

    setData(data);
  };

  const getFileContents = (file) => {
    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      processRawFileData(result);
    };

    reader.readAsText(file);
  };

  const onUpload = (info) => {
    if ((info.file.status = "done")) {
      getFileContents(info.file.originFileObj);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="title">
          AI Labs | <strong>Frontend case study</strong>
        </div>
        <Upload
          onChange={onUpload}
          maxCount={1}
          accept=".csv"
          customRequest={dummyRequest}
          showUploadList={false}
        >
          <Button>Open</Button>
        </Upload>
      </header>
      <main>
        <Table columns={columns} dataSource={data} />
      </main>
    </div>
  );
};

export default App;
