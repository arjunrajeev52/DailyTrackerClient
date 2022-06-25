import * as d3 from 'd3';

export const BarChart =(chartHeight,chartWidth,data)=>{
    const filteredData = data.apiData.filter(d => {
        return ((new Date(d.date).getMonth()+1 === data.selectedMonth))
      });
      
    const margin = 80;
    const width = chartWidth -2 * margin;
    const height = chartHeight -2*margin; 
    const svg = d3.select('svg');

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(filteredData.map((g) => new Date(g.date).getDate()))
      .padding(0.2)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 500000]);

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));
    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(filteredData)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(new Date(g.date).getDate()))
      .attr('y', (g) => yScale(g.expense))
      .attr('height', (g) => height - yScale(g.expense))
      .attr('width', xScale.bandwidth())
      barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(new Date(g.date).getDate()))
      .attr('y', (g) => yScale(g.income))
      .attr('height', (g) => height - yScale(g.income))
      .attr('width', xScale.bandwidth())

    //   barGroups 
    //   .append('text')
    //   .attr('class', 'value')
    //   .attr('x', (a) => xScale(new Date(a.date).getDate()) + xScale.bandwidth() / 2)
    //   .attr('y', (a) => yScale(a.expense) + 30)
    //   .attr('text-anchor', 'middle')
    //   .text((a) => `${a.expense}`)
};