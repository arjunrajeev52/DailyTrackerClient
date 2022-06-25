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
  dataRefresh: true,
  showForm: false,
  showModal: false,
  searchValue: '',
  searchFlag: false,
  AccountOptions: [
    { key: 'm', text: 'HDFC', value: 'HDFC' },
    { key: 'f', text: 'SBI', value: 'SBI' },
    { key: 'o', text: 'FBI', value: 'FBI' },
    { key: 'c', text: 'Cash', value: 'Cash' },
    { key: 'l', text: 'Liability', value: 'Liability' },
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
    { key: 5, text: 'June', value: 6 },
    { key: 5, text:'July', value: 7 },
    { key: 5, text: 'August', value: 8 },
    { key: 5, text: 'Sebtember', value: 9 },
    { key: 5, text: 'October', value: 10 },
    { key: 5, text: 'November', value: 11 },
    { key: 5, text: 'December', value: 12 },
  ],
  selectedMonth:new Date().getMonth()+1
}

function App() {
  const [trackerData, setTrackerData] = useState(TrackerData);

  const getResult = (data) => {
    if (!trackerData.searchFlag) {
      return data.filter(d => {
        return ((new Date(d.date).getMonth()+1 === trackerData.selectedMonth))
      });
    } else {
      return data.filter(d => {
        return ((d.date.toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d.accountType.toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d.item.toLowerCase().includes(trackerData.searchValue.toLowerCase())) && (new Date(d.date).getMonth()+1 === trackerData.selectedMonth))
      });
    }
  };
  const getTotalResult = (data) => {
    if (!trackerData.searchFlag) {
      return data;
    } else {
      return data.filter(d => {
        return ((d.date.toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d.accountType.toLowerCase().includes(trackerData.searchValue.toLowerCase()) || d.item.toLowerCase().includes(trackerData.searchValue.toLowerCase())))
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
            <Dashboard setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult} getTotalResult={getTotalResult}/>
            <TableDetails setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult}/>
            <Charts trackerData={trackerData} />
          </>}
      </Container>
    </>
  );
}

export default App;
