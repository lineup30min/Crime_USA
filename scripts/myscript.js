// add your JavaScript/D3 to this file

// Create 2 datasets (same as the d3_ts.csv)
var juvenile = [{'year': 1994, 'arrestCount': 2220784},
  {'year': 1995, 'arrestCount': 2227409},
  {'year': 1996, 'arrestCount': 2159457},
  {'year': 1997, 'arrestCount': 2144632},
  {'year': 1998, 'arrestCount': 1954723},
  {'year': 1999, 'arrestCount': 1765550},
  {'year': 2000, 'arrestCount': 1733097},
  {'year': 2001, 'arrestCount': 1723268},
  {'year': 2002, 'arrestCount': 1707837},
  {'year': 2003, 'arrestCount': 1676919},
  {'year': 2004, 'arrestCount': 1650066},
  {'year': 2005, 'arrestCount': 1669020},
  {'year': 2006, 'arrestCount': 1688403},
  {'year': 2007, 'arrestCount': 1710149},
  {'year': 2008, 'arrestCount': 1669658},
  {'year': 2009, 'arrestCount': 1540076},
  {'year': 2010, 'arrestCount': 1387969},
  {'year': 2011, 'arrestCount': 1239778},
  {'year': 2012, 'arrestCount': 1131418},
  {'year': 2013, 'arrestCount': 1033191},
  {'year': 2014, 'arrestCount': 872243},
  {'year': 2015, 'arrestCount': 792796},
  {'year': 2016, 'arrestCount': 742483}];

var adult =  [{'year': 1994, 'arrestCount': 9742152},
  {'year': 1995, 'arrestCount': 9834653},
  {'year': 1996, 'arrestCount': 9259837},
  {'year': 1997, 'arrestCount': 9454807},
  {'year': 1998, 'arrestCount': 9291469},
  {'year': 1999, 'arrestCount': 8897400},
  {'year': 2000, 'arrestCount': 8964238},
  {'year': 2001, 'arrestCount': 9040623},
  {'year': 2002, 'arrestCount': 8740017},
  {'year': 2003, 'arrestCount': 8644571},
  {'year': 2004, 'arrestCount': 8893755},
  {'year': 2005, 'arrestCount': 9242920},
  {'year': 2006, 'arrestCount': 9219299},
  {'year': 2007, 'arrestCount': 9419587},
  {'year': 2008, 'arrestCount': 9433013},
  {'year': 2009, 'arrestCount': 9524037},
  {'year': 2010, 'arrestCount': 9221217},
  {'year': 2011, 'arrestCount': 8748808},
  {'year': 2012, 'arrestCount': 8818851},
  {'year': 2013, 'arrestCount': 8581052},
  {'year': 2014, 'arrestCount': 8169720},
  {'year': 2015, 'arrestCount': 8031139},
  {'year': 2016, 'arrestCount': 8075886}];

var total =  [{'year': 1994, 'arrestCount': 11962936},
  {'year': 1995, 'arrestCount': 12062062},
  {'year': 1996, 'arrestCount': 11419294},
  {'year': 1997, 'arrestCount': 11599439},
  {'year': 1998, 'arrestCount': 11246192},
  {'year': 1999, 'arrestCount': 10662950},
  {'year': 2000, 'arrestCount': 10697335},
  {'year': 2001, 'arrestCount': 10763891},
  {'year': 2002, 'arrestCount': 10447854},
  {'year': 2003, 'arrestCount': 10321490},
  {'year': 2004, 'arrestCount': 10543821},
  {'year': 2005, 'arrestCount': 10911940},
  {'year': 2006, 'arrestCount': 10907702},
  {'year': 2007, 'arrestCount': 11129736},
  {'year': 2008, 'arrestCount': 11102671},
  {'year': 2009, 'arrestCount': 11064113},
  {'year': 2010, 'arrestCount': 10609186},
  {'year': 2011, 'arrestCount': 9988586},
  {'year': 2012, 'arrestCount': 9950269},
  {'year': 2013, 'arrestCount': 9614243},
  {'year': 2014, 'arrestCount': 9041963},
  {'year': 2015, 'arrestCount': 8823935},
  {'year': 2016, 'arrestCount': 8818369}];


// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 80},
    width = 600- margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("div#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleLinear()
    .range([0, width-100]);


var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","Xaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","Yaxis")

svg.selectAll(".point")
  .data(data)
  .enter().append("circle")
  .attr("class", "point")
  .attr("cx", function(d) { return x(d.year); })
  .attr("cy", function(d) { return y(d.arrestCount); })
  .attr("r", 5) // radius of the point
  .style("opacity", 0) // make the point invisible
  .on('click', function(event, d) {
    // Display the values when clicked
    displayValues(d.ser1, d.arrestCount);
  });

function displayValues(xValue, yValue) {
  // Remove previous values
  svg.selectAll('.text-info').remove();

  // Append new text
  var text = svg.append('text')
    .attr('class', 'text-info')
    .attr('x', x(xValue))
    .attr('y', y(yValue))
    .attr('dy', '-1em') // to position the text above the point
    .style('fill', 'black')
    .style('font-size', '12px');

  text.append('tspan')
    .attr('x', x(xValue)) // Set the x position of the tspan element
    .attr('dy', '-1.2em') // Shift the tspan position up
    .text(`year: ${xValue}`);

  // Add 'arrestCount' on a new line
  text.append('tspan')
    .attr('x', x(xValue)) // Align this tspan element with the first
    .attr('dy', '1.2em') // Move this tspan below the first
    .text(`arrestCount: ${yValue}`);

}


// Create a function that takes a dataset as input and update the plot:
function update(data) {

  // Create the X axis:
  x.domain(d3.extent(data, function(d) { return d.year; }));
  svg.selectAll(".Xaxis").transition()
    .duration(3000)
    .call(xAxis);

// create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.arrestCount; })]);
  svg.selectAll(".Yaxis").transition()
    .duration(3000)
    .call(yAxis);

  // create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.arrestCount  }) ]);
  svg.selectAll(".Yaxis")
    .transition()
    .duration(3000)
    .call(yAxis);

  // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest")
    .data([data], function(d){ return d.year });

  // Updata the line
  u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.arrestCount); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)

       var points = svg.selectAll(".point")
    .data(data);

  points.enter().append("circle")
    .merge(points)
    .attr("class", "point")
    .attr("cx", function(d) { return x(d.year); })
    .attr("cy", function(d) { return y(d.arrestCount); })
    .attr("r", 5)
    .style("opacity", 0)
    .on('click', function(event, d) {
      displayValues(d.year, d.arrestCount);
    });
}

update(juvenile)










