import React from 'react';
import TrackerBox from './TrackerBox';
import { Segment } from 'semantic-ui-react'


const Dashboard = ({ trackerData, setTrackerData, getResult }) => {
    return (
        <Segment basic textAlign='center'>
            <TrackerBox setTrackerData={setTrackerData} trackerData={trackerData} getResult={getResult} />
        </Segment>
    );
};

export default Dashboard;