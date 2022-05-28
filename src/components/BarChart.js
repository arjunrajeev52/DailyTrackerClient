import * as d3 from 'd3';

export const BarChart =(height,width)=>{
    const margin = 60;
    const chartWidth = width -2 * margin;
    const chartHeight = height -2*margin; 
    const svg = d3.select('svg');
    const chart = svg.append('g').attr('transform',`translate(${margin},${margin})`);

    const yScale = d3.scaleLinear().range([chartHeight,0]).domain([0,100]);
    chart.append('g').call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand().range([0,chartWidth]).domain([0,10,20,30,40]).padding(0.2);
    chart.append('g').attr('transform',`translate(0,${chartHeight})`).call(d3.axisBottom(xScale));

};