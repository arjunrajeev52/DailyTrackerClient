import React from 'react';
import TrackerBox from './TrackerBox';
import { Segment } from 'semantic-ui-react'


const Dashboard = ({ trackerData, setTrackerData, getResult,getTotalResult }) => {
    return (
        <Segment basic textAlign='center'>
            <TrackerBox setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult} getTotalResult={getTotalResult}/>
        </Segment>
    );
};

export default Dashboard;