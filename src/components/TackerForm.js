import React from 'react';
import { Button, Form } from "semantic-ui-react";

const TrackerForm =(props)=>{
    const {trackerData,setTrackerData,handleSubmit,handleUpdate} = props;

    return (
        <>
      <Form className="form">
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Enter your Name"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, name: e.target.value }))}
            value={trackerData.name}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input
            placeholder="Enter your Age"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, age: e.target.value }))}
            value={trackerData.age}
          />
        </Form.Field>
        <Form.Field>
          <label>Salary</label>
          <input
            placeholder="Enter your Salary"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, salary: e.target.value }))}
            value={trackerData.salary}
          />
        </Form.Field>
        <Form.Field>
          <label>Hobby</label>
          <input
            placeholder="Enter your Hobby"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, hobby: e.target.value }))}
            value={trackerData.hobby}
          />
        </Form.Field>
 
        {/* {trackerData.type?<Button color="blue" type="submit" onClick={handleSubmit}>
          Submit
        </Button>:
        <Button color="blue" type="submit" onClick={handleUpdate}>
        Update
      </Button>} */}
      <Button.Group>
    <Button onClick={()=>setTrackerData((e) => ({ ...e, showForm:false}))}>Cancel</Button>
    <Button.Or />
    {trackerData.type?<Button positive onClick={handleSubmit}>Submit</Button>:<Button positive onClick={handleUpdate}>Update</Button>}
  </Button.Group>
      </Form>
        </>
    );
};

export default TrackerForm;