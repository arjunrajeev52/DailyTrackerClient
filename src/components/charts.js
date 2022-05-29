import React from 'react';
import {BarChart} from './BarChart';

const Charts =({trackerData})=>{
    React.useEffect(()=>{
        BarChart(600,1000,trackerData);
    },[trackerData]);
    return (
        <div id='container'>
      <svg />
    </div>
    );
};

export default Charts;