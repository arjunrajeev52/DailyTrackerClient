import React, { useState, useEffect } from "react";
import { Dimmer, Loader, Container, Header, Button, Divider, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import "./App.css";
import TableDetails from './components/TableDetails';
import ModalForm from "./components/ModalForm";

const TrackerData = {
  date: '',
  item: '',
  income: '',
  expense: '',
  accounttype: '',
  row: 0,
  type: true,
  apiData: [],
  dataRefresh: [],
  showForm: false,
  showModal: false,
  searchValue: '',
  searchFlag: false,
  AccountOptions: [
    { key: 'm', text: 'HDFC', value: 'HDFC' },
    { key: 'f', text: 'SBI', value: 'SBI' },
    { key: 'o', text: 'FBI', value: 'FBI' },
    { key: 'c', text: 'Cash', value: 'Cash' },
  ],
  toggleIncome: true,
  loaderFlag: false
}

function App() {
  const [trackerData, setTrackerData] = useState(TrackerData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    const dataObj = { date: trackerData.date, 
      item: trackerData.item, 
      income: trackerData.toggleIncome?trackerData.income:'',
      expense: !trackerData.toggleIncome?trackerData.expense:'',
      accounttype: trackerData.accounttype };

    axios
      .post(
        "https://daily-tracker-project.herokuapp.com/Posts/",
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
      income: trackerData.toggleIncome?trackerData.income:'',
      expense: !trackerData.toggleIncome?trackerData.expense:'',
      accounttype: trackerData.accounttype
    };
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    axios
      .put(
        `https://daily-tracker-project.herokuapp.com/Posts/Sheet1!A${trackerData.row}:E${trackerData.row}`,
        dataObj
      )
      .then((response) => {
        setTrackerData((e) => ({ ...e, dataRefresh: response, showForm: false, loaderFlag: false }));
      });
    setTrackerData((e) => ({ ...e, showForm: false }));
  };

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
  }
  const newItem = () => {
    setTrackerData((e) => ({ ...e, showForm: true, date: '', item: '', income: '', expense: '', accounttype: '', type: true }));
  }

  // const deleteRow = (rowNumber)=>{
  // axios
  //     .delete(
  //       `https://daily-tracker-project.herokuapp.com/Posts/Sheet1!A${rowNumber}:B${rowNumber}`
  //     )
  //     .then((response) => {
  //       setDataRefresh(response)
  //     });
  // };

  const search = (data) => {
    if (data !== '') {
      setTrackerData((e) => ({ ...e, searchValue: data }));
      setTrackerData((e) => ({ ...e, searchFlag: true }));
    } else {
      setTrackerData((e) => ({ ...e, searchFlag: false }));
    }

  };

  const getResult = (data) => {
    if (!trackerData.searchFlag) {
      return data;
    } else {
      return data.filter(d => {
        return (d[4].toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d[1].toLowerCase().includes(trackerData.searchValue.toLowerCase()))
      });
    }
  };

  useEffect(() => {
    setTrackerData((e) => ({ ...e, loaderFlag: true }));
    axios
      .get("https://daily-tracker-project.herokuapp.com/Posts")
      .then((readData) => {
        readData.data.shift();
        setTrackerData((e) => ({ ...e, apiData: readData.data }));
        console.log('APIData', readData.data)
        setTrackerData((e) => ({ ...e, loaderFlag: false }));
      });
  }, [trackerData.dataRefresh]);

  return (
    <>
      <Container fluid className="container">
        <Dimmer active={trackerData.loaderFlag}>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
        <Header as="h2">Daily Tracker</Header>
        {!trackerData.showForm &&
          <Segment basic textAlign='center'>
            <Input
              action={{ color: 'blue', content: 'Search' }}
              icon='search'
              iconPosition='left'
              placeholder='Item/Account Type #'
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
        <TableDetails apiData={getResult(trackerData.apiData)} updateRow={updateRow} />
      </Container>
      <ModalForm open={trackerData.showForm} size='small' trackerData={trackerData} setTrackerData={setTrackerData} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </>
  );
}

export default App;
