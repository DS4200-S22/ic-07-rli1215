/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
const svg1 = d3
  .select("#hard-coded-bar") // select id 'hard-coded-bar'
  .append("svg") // append to it an svg tag
  .attr("width", width-margin.left-margin.right) // add a width to svg attributes
  .attr("height", height - margin.top - margin.bottom) // add a height to svg attributes
  .attr("viewBox", [0, 0, width, height]); // add viewBox as svg attribute

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// returns the max Y1 value from data1
let maxY1 = d3.max(data1, function(d) { return d.score; });

// returns the linear yScale for data1, transform data value to pixel value  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// returns the xScale for data1, transform data value to pixel value
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// adds a y-axis
svg1.append("g") // appends an empty tag
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// adds an x-axis
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)  // move axis to bottom of svg
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))   // built in function for bottom axis given a scale function 
    .attr("font-size", '20px'); // set font size

/* 

  Tooltip Set-up  

*/

// append a tooltip to div 'hard-coded-bar'
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// when moused over, tooltip shows name of data and the score
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// when mouse moves, the tooltip will show where mouse is 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY) +"px"); 
}

// when moused out, tooltip disappears
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// adds a bar chart to the bar div with the x and y axes, and the tooltip functionality
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);




// CSV BAR
d3.csv("data/barchart.csv").then((data) =>  {
  const svg2 = d3
    .select("#csv-bar") // select id 'hard-coded-bar'
    .append("svg") // append to it an svg tag
    .attr("width", width-margin.left-margin.right) // add a width to svg attributes
    .attr("height", height - margin.top - margin.bottom) // add a height to svg attributes
    .attr("viewBox", [0, 0, width, height]); // add viewBox as svg attribute

  let maxY2 = d3.max(data, function(d) { return d.score; });
 
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  svg2.append("g") // appends an empty tag
    .attr("transform", `translate(${margin.left}, 0)`) // adds transform attribute to svg to 
    .call(d3.axisLeft(yScale2)) 
    .attr("font-size", '20px'); 

  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)  // move axis to bottom to svg
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))   // built in function for bottom axis given a scale function 
      .attr("font-size", '20px'); // set font size

  const tooltip2 = d3.select("#csv-bar") 
    .append("div") 
    .attr('id', "tooltip2") 
    .style("opacity", 0) 
    .attr("class", "tooltip"); 

  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.day + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
  }
 
  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.pageX)+"px") 
    .style("top", (event.pageY) +"px"); 
  }

  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }

  svg2.selectAll(".bar")
    .data(data) 
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
})