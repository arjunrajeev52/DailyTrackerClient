import React from 'react';
import {BarChart} from './BarChart';

const Charts =()=>{
    React.useEffect(()=>{
        BarChart(100,150);
    },[]);
    return (
        <div id="chart"/>
    );
};

export default Charts;