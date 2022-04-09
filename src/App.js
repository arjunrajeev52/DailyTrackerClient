import React, { useState, useEffect } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";
import axios from "axios";
import "./App.css";
import TableDetails from './components/TableDetails'
import { updateMapper } from "./mapper/updateMapper";
 
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [hobby, setHobby] = useState("");
  const [row,setRow] = useState(0);
  const [type, setType] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [dataRefresh, setDataRefresh] = useState([]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const dataObj = { name, age, salary, hobby };
 
    axios
      .post(
        "http://localhost:5000/Posts/",
        dataObj
      )
      .then((response) => {
        setDataRefresh(response)
      });
  };
 
  const handleUpdate = (e)=>{
    e.preventDefault();
 
    const dataObj = { name, age, salary, hobby };
 
    axios
      .put(
        `http://localhost:5000/Posts/Sheet1!A${row}:D${row}`,
        dataObj
      )
      .then((response) => {
        setDataRefresh(response)
      });
    };
 
    const updateRow = (rowNumber)=>{
      const updatedData = apiData[rowNumber-1];
      setName(updatedData[0]);
      setAge(updatedData[1]);
      setSalary(updatedData[2]);
      setHobby(updatedData[3]);
      setType(false);
      setRow(rowNumber);
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
        setApiData(readData.data);
    console.log('APIData',readData)
      });
  },[dataRefresh]);
 
  return (
    <Container fluid className="container">
      <Header as="h2">React google sheet</Header>
      <Form className="form">
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input
            placeholder="Enter your Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </Form.Field>
        <Form.Field>
          <label>Salary</label>
          <input
            placeholder="Enter your Salary"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
        </Form.Field>
        <Form.Field>
          <label>Hobby</label>
          <input
            placeholder="Enter your Hobby"
            onChange={(e) => setHobby(e.target.value)}
            value={hobby}
          />
        </Form.Field>
 
        {type?<Button color="blue" type="submit" onClick={handleSubmit}>
          Submit
        </Button>:
        <Button color="blue" type="submit" onClick={handleUpdate}>
        Update
      </Button>}
      </Form>
      <TableDetails apiData={apiData} updateRow={updateRow}/>
    </Container>
  );
}
 
export default App;
