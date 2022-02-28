/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

let svg = d3
    .select("#csv-scatter")
    .append("svg") // append to it an svg tag
        .attr("width", width-margin.left-margin.right) // add a width to svg attributes
        .attr("height", height - margin.top - margin.bottom) // add a height to svg attributes
        .attr("viewBox", [0, 0, width, height]); // add viewBox as svg attribute


d3.csv("data/scatter.csv").then((data) =>  {
    // find max x
    let maxX = d3.max(data, (d) => { return d.day; });
    console.log("Max x: " + maxX);

    // find max y
    let maxY = d3.max(data, (d) => { return d.score; });
    console.log("Max y: " + maxY);

    let xScale = d3.scaleLinear()
                    .domain([0, maxX])
                    .range([margin.left, width - margin.right]);
            
    let yScale = d3.scaleLinear()
                    .domain([0, maxY])
                    .range([height - margin.bottom, margin.top]);

    svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
                .attr("font-size", "20px");
        
    svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale))
                .attr("font-size", "20px");

    const tooltip2 = d3.select("#csv-scatter") 
        .append("div") 
        .attr('id', "tooltip2") 
        .style("opacity", 0) 
        .attr("class", "tooltip"); 
    
    const mouseover = function(event, d) {
        tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
        .style("opacity", 1);  
        }
        
        const mousemove = function(event, d) {
        tooltip2.style("left", (event.pageX)+"px") 
        .style("top", (event.pageY) +"px"); 
        }
        
        const mouseleave = function(event, d) { 
        tooltip2.style("opacity", 0); 
        }

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", (d) => xScale(d.day))
        .attr("cy", (d) => yScale(d.score))
        .attr("r", 10)
        .attr("fill", "black")
        .on("mouseover", mouseover) 
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    
})









