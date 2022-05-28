import React from 'react';
import {BarChart} from './BarChart';

const Charts =()=>{
    React.useEffect(()=>{
        BarChart(600,1000);
    },[]);
    return (
        // <div id="chart"/>
        <svg viewBox='0 0 800 700'/>
    );
};

export default Charts;