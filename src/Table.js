import React, { useState, useEffect } from 'react';
import './Table.css';
import { Table } from 'antd';
import ResizableTitle from './resizeTable'; 
import data from './data';

const CustomTable = ({searchText}) => {

  const [filteredData, setFilteredData] = useState(data);

  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      width: 100,
    },
    {
      title: 'Birthdate',
      dataIndex: 'birthdate',
      key: 'birthdate',
      width: 100,
    },
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
      width: 100,
    },
  ]);

  useEffect(() => {
    const savedColumnWidths = localStorage.getItem('columnWidths');
    if (savedColumnWidths) {
        console.log("saved", savedColumnWidths)
        setColumns(JSON.parse(savedColumnWidths));
        console.log("set", columns)
    }
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchText, data]);


  const handleResize = (index) => (_, { size }) => {
    console.log('Resizing column', index, 'to width', size.width);
    const newColumns = [...columns];
    newColumns[index] = {
      ...newColumns[index],
      width: size.width,
    };
    setColumns(newColumns);

    localStorage.setItem('columnWidths', JSON.stringify(newColumns));
  };

  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));


  return (
    <div>
      <Table
       className="striped-table fixed-table"
        bordered
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        dataSource={filteredData}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 1000}}
      />
    </div>
  );
};

export default CustomTable;
