import React from "react";
import axios from "axios";
import { Table, Icon, Button, Divider, Input, Segment, Container,Menu,Dropdown } from "semantic-ui-react";
import ModalForm from "./ModalForm";
import { Tracker_Url } from '../constant';

const TableDetails = (props) => {
  const { setTrackerData, trackerData, getResult } = props;
  const newItem = () => {
    setTrackerData((e) => ({ ...e, showForm: true, date: '', item: '', income: '', expense: '', accounttype: '', type: true }));
  }
  const search = (data) => {
    if (data !== '') {
      setTrackerData((e) => ({ ...e, searchValue: data }));
      setTrackerData((e) => ({ ...e, searchFlag: true }));
    } else {
      setTrackerData((e) => ({ ...e, searchFlag: false }));
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    const dataObj = {
      date: trackerData.date,
      item: trackerData.item,
      income: trackerData.toggleIncome ? trackerData.income : '',
      expense: !trackerData.toggleIncome ? trackerData.expense : '',
      accounttype: trackerData.accounttype
    };

    axios
      .post(
        `${Tracker_Url.Server_url}/Posts/`,
        dataObj
      )
      .then((response) => {
        setTrackerData((e) => ({ ...e, dataRefresh: response, showForm: false, loaderFlag: false }));
      });
    setTrackerData((e) => ({ ...e, showForm: false }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const dataObj = {
      date: trackerData.date,
      item: trackerData.item,
      income: trackerData.toggleIncome ? trackerData.income : '',
      expense: !trackerData.toggleIncome ? trackerData.expense : '',
      accounttype: trackerData.accounttype
    };
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    axios
      .put(
        `${Tracker_Url.Server_url}/Posts/Sheet1!A${trackerData.row}:E${trackerData.row}`,
        dataObj
      )
      .then((response) => {
        setTrackerData((e) => ({ ...e, dataRefresh: response, showForm: false, loaderFlag: false }));
      });
    setTrackerData((e) => ({ ...e, showForm: false }));
  };

  // const deleteRow = (rowNumber)=>{
  // axios
  //     .delete(
  //       `http://localhost:5000/Posts/Sheet1!A${rowNumber}:B${rowNumber}`
  //     )
  //     .then((response) => {
  //       setDataRefresh(response)
  //     });
  // };

  React.useEffect(() => {
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    axios
      .get(`${Tracker_Url.Server_url}/Posts`, {
        params: {
          sheet: 'Sheet1'
        }
      })
      .then((readData) => {
        readData.data.shift();
        setTrackerData((e) => ({ ...e, apiData: readData.data,loaderFlag: false }));
      });
  }, [trackerData.dataRefresh]);

  const updateRow = (rowNumber) => {
    const updatedData = trackerData.apiData[rowNumber];
    setTrackerData((e) =>
    ({
      ...e,
      showForm: true,
      date: updatedData[0],
      item: updatedData[1],
      income: updatedData[2],
      expense: updatedData[3],
      accounttype: updatedData[4],
      type: false,
      row: rowNumber + 2,
      toggleIncome: updatedData[2] ? true : false
    }));
  };

  return (
    <>
      {!trackerData.showForm &&
        <Segment basic textAlign='center'>
          <Input
            action={{ color: 'blue', content: 'Search' }}
            icon='search'
            iconPosition='left'
            placeholder='Item/Account Type/Date #'
            onChange={(e) => search(e.target.value)}
          />

          <Divider horizontal>Or</Divider>

          <Button
            color='teal'
            content='Create New Item'
            icon='add'
            labelPosition='left'
            onClick={() => newItem()}
          />
        </Segment>}
      <Menu compact position='right'>
        <Dropdown 
        text={trackerData.MonthOptions.filter(e=>e.value === trackerData.selectedMonth)[0].text} 
        options={trackerData.MonthOptions} simple item
        onChange={(e,{value})=>setTrackerData((ev) => ({ ...ev, selectedMonth: value }))}
        />
      </Menu>
      <Table fixed color='orange' key='orange'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Income</Table.HeaderCell>
            <Table.HeaderCell>Expense</Table.HeaderCell>
            <Table.HeaderCell>Account Type</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {getResult(trackerData.apiData).length
            ? getResult(trackerData.apiData).map((data, index) => {
              return (
                // index !==0 &&
                <>
                  <Table.Row>
                    <Table.Cell>{data[0]}</Table.Cell>
                    <Table.Cell>{data[1]}</Table.Cell>
                    <Table.Cell>{data[2]}</Table.Cell>
                    <Table.Cell>{data[3]}</Table.Cell>
                    <Table.Cell>{data[4]}</Table.Cell>
                    <Table.Cell onClick={() => updateRow(index)}>
                      <Icon enabled name='edit outline' />
                    </Table.Cell>
                  </Table.Row>
                </>
              );
            })
            : <Container textAlign='center'>
              No data Found
            </Container>}
        </Table.Body>
      </Table>
      <ModalForm open={trackerData.showForm} size='small' trackerData={trackerData} setTrackerData={setTrackerData} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </>);
};

export default TableDetails;