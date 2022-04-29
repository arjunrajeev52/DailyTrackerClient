import React from 'react';
import { Button, Form,Select ,Radio} from "semantic-ui-react";

const TrackerForm =(props)=>{
    const {trackerData,setTrackerData,handleSubmit,handleUpdate} = props;

    return (
        <>
      <Form className="form">
        <Form.Field>
          <label>Date</label>
          <input
            placeholder="Enter your date"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, date: e.target.value }))}
            value={trackerData.date}
            type="date"
          />
        </Form.Field>
        <Form.Field>
          <label>Item</label>
          <input
            placeholder="Enter your item"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, item: e.target.value }))}
            value={trackerData.item}
          />
        </Form.Field>
        <Form.Field>
          {/* <label>Income</label> */}
          <Radio
            label='Income'
            name='radioGroup'
            checked={trackerData.toggleIncome}
            onChange={(e) => setTrackerData((ev) => ({ ...ev, toggleIncome: true }))}
          />
          &nbsp;
          &nbsp;
          <Radio
            label='Expense'
            name='radioGroup'
            checked={!trackerData.toggleIncome}
            onChange={(e) => setTrackerData((ev) => ({ ...ev, toggleIncome: false }))}
          />
        </Form.Field>
        <Form.Field>
           {trackerData.toggleIncome?
           <input
            placeholder="Enter your income"
            onChange={(e) => setTrackerData((ev) => ({ ...ev, income: e.target.value }))}
            value={trackerData.income}
            type="number"
          />:
          <input
          placeholder="Enter your expense"
          onChange={(e) => setTrackerData((ev) => ({ ...ev, expense: e.target.value }))}
          value={trackerData.expense}
          type="number"
        />}
        </Form.Field>
        <Form.Field
            control={Select}
            label='Account Type'
            options={trackerData.AccountOptions}
            placeholder='Choose your type of account'
            onChange={(e,{value}) => setTrackerData((ev) => ({ ...ev, accounttype: value }))}
            value={trackerData.accounttype}
          />
 
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