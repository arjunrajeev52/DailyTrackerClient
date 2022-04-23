import React, { useState, useEffect } from "react";
import { Container, Header, Icon, Button, Divider, Input, Segment } from "semantic-ui-react";
import axios from "axios";
import "./App.css";
import TableDetails from './components/TableDetails';
import TrackerForm from './components/TackerForm';
import ModalForm from "./components/ModalForm";

const TrackerData = {
  name: '',
  age: '',
  salary: '',
  hobby: '',
  row: 0,
  type: true,
  apiData: [],
  dataRefresh: [],
  showForm: false,
  showModal:false
}

function App() {
  const [trackerData, setTrackerData] = useState(TrackerData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObj = { name: trackerData.name, age: trackerData.age, salary: trackerData.salary, hobby: trackerData.hobby };

    axios
      .post(
        "http://localhost:5000/Posts/",
        dataObj
      )
      .then((response) => {
        setTrackerData((e) => ({ ...e, dataRefresh: response }));
      });
    setTrackerData((e) => ({ ...e, showForm: false }))
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const dataObj = { name: trackerData.name, age: trackerData.age, salary: trackerData.salary, hobby: trackerData.hobby };

    axios
      .put(
        `http://localhost:5000/Posts/Sheet1!A${trackerData.row}:D${trackerData.row}`,
        dataObj
      )
      .then((response) => {
        setTrackerData((e) => ({ ...e, dataRefresh: response }));
      });
    setTrackerData((e) => ({ ...e, showForm: false }))
  };

  const updateRow = (rowNumber) => {
    const updatedData = trackerData.apiData[rowNumber - 1];
    setTrackerData((e) =>
    ({
      ...e,
      showForm: true,
      name: updatedData[0],
      age: updatedData[1],
      salary: updatedData[2],
      hobby: updatedData[3],
      type: false,
      row: rowNumber
    }));
  }
  const newItem = () => {
    setTrackerData((e) => ({ ...e, showForm: true, name: '', age: '', salary: '', hobby: '', type: true }));
  }

  // const deleteRow = (rowNumber)=>{
  // axios
  //     .delete(
  //       `http://localhost:5000/Posts/Sheet1!A${rowNumber}:B${rowNumber}`
  //     )
  //     .then((response) => {
  //       setDataRefresh(response)
  //     });
  // };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Posts")
      .then((readData) => {
        setTrackerData((e) => ({ ...e, apiData: readData.data }));
        console.log('APIData', readData)
      });
  }, [trackerData.dataRefresh]);

  return (
    <>
    <Container fluid className="container">
      <Header as="h2">Daily Tracker</Header>
      {!trackerData.showForm &&
        <Segment basic textAlign='center'>
          <Input
            action={{ color: 'blue', content: 'Search' }}
            icon='search'
            iconPosition='left'
            placeholder='Item #'
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
      {trackerData.showForm ? <TrackerForm trackerData={trackerData} setTrackerData={setTrackerData} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        : <TableDetails apiData={trackerData.apiData} updateRow={updateRow} />}
        <Button onClick={() =>  setTrackerData((e) => ({ ...e, showModal: true }))}>
        Small
      </Button>
    </Container>
    <ModalForm open={trackerData.showModal} size='small' setTrackerData={setTrackerData}/>
    </>
  );
}

export default App;
