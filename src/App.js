import React, { useState } from "react";
import { Dimmer, Loader, Container } from "semantic-ui-react";
import "./App.css";
import TableDetails from './components/TableDetails';
import LoginForm from './components/Login';
import TopNav from './components/TopNav';
import Charts from './components/charts';
import Dashboard from './components/Dashboard/Dashboard';

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
  loaderFlag: false,
  showLoginPage: true,
  user: '',
  pass: '',
  loginStatus: true,
  totalExpense: 0,
  totalIncome: 0,
  MonthOptions:[
    { key: 1, text: 'January', value: 1 },
    { key: 2, text: 'February', value: 2 },
    { key: 3, text: 'March', value: 3 },
    { key: 4, text: 'April', value: 4 },
    { key: 5, text: 'May', value: 5 },
  ],
  selectedMonth:new Date().getMonth()+1
}

function App() {
  const [trackerData, setTrackerData] = useState(TrackerData);

  const getResult = (data) => {
    if (!trackerData.searchFlag) {
      return data.filter(d => {
        return ((new Date(d[0]).getMonth()+1 === trackerData.selectedMonth))
      });
    } else {
      return data.filter(d => {
        return ((d[0].toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d[4].toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d[1].toLowerCase().includes(trackerData.searchValue.toLowerCase())) && (new Date(d[0]).getMonth()+1 === trackerData.selectedMonth))
      });
    }
  };

  return (
    <>
      <Container fluid className="container">
        <Dimmer active={trackerData.loaderFlag}>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
        {trackerData.showLoginPage ?
          <LoginForm setTrackerData={setTrackerData} trackerData={trackerData} />
          :
          <>
            <TopNav setTrackerData={setTrackerData} />
            <Dashboard setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult} />
            <TableDetails setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult}/>
            <Charts />
          </>}
      </Container>
    </>
  );
}

export default App;
