import * as d3 from 'd3'

const Bars = (data, height, width) => {

  const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .align(0.1)

  const y = d3.scaleLinear()
  .rangeRound([height, 0])

  const z = d3.scaleOrdinal()
  .range(['#FDB12B', '#444'])

  x.domain(data.map(d => d.month))
  y.domain([0, d3.max(data, d => d.total,)]).nice()
  // z.domain(data.columns.slice(1))

  let scaleFactor = 30

  let barWidth = x.bandwidth()
  const barHeight = d => d * scaleFactor
  const xVal = d => {
    return x(d.month)
  }

  const yAxis = d3.axisLeft()
  .scale(y)
  // .orient('left')
  .ticks(7);

  const xAxis = d3.axisBottom()
  .scale(x)
  //  .orient('bottom')
  .tickValues(data.map((d,i) => {
    if(i>0) return d.month;
  }).splice(1))
  .ticks(4);

  console.log('Bars data:', data);

  return (
    {data.map( (d, i) => <rect key={i} x={xVal(d)} y={height - barHeight(d.value)} height={barHeight(d.value)} width={barWidth}></rect>
    )}
  )
}

export default Bars
