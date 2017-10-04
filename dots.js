var myData = [
	{time_stamp:1, max_capacidad:70},
	{time_stamp:18, max_capacidad:70},
	{time_stamp:36, max_capacidad:75},
	{time_stamp:48, max_capacidad:73},
	{time_stamp:72, max_capacidad:75},  
];


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var r = 8;

var
	margin = {top:20 , left:40, right:20, bottom:50};
	
var
	yScale = d3.scale.linear()
		.range([height - margin.top - margin.bottom, 0]);
		
			
var widthScale = d3.scale.linear()
		.domain([0, d3.max(myData, function (d) {  return d.time_stamp; })])
		.range([0, width - margin.left - margin.right]);

var chart = d3.select('#chart')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.append('g')
				.attr("transform", "translate("+ margin.left+"," + margin.top + ")" );
				
var xAxisDots = chart.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0,"+ (width- margin.top - margin.bottom) + ")");

var yAxisDots = chart.append("g")
	.attr("class", "y axis");				
					
function update(myData) {
	widthScale.domain([0, d3.max(myData, function (d) {  return d.time_stamp; })]);
	yScale.domain([0, d3.max(myData, function (d) { return d.max_capacidad; })]);
	
	var rects = chart.selectAll(".point")
		.data(myData);

	var circles = 	d3.select('g')
					.selectAll('circle')
					.data(myData)
					.enter() // enter
					.append('circle') 
						.attr('class', 'point')
						.style("fill", "2B68F5")
						.attr('r', r)
						.attr("cx", function (d) {
							return widthScale(d.time_stamp);
						})
						.attr('cy', function (d, i) {	
							return yScale(d.max_capacidad);
						});
		
	//Create
	rects.enter()
  	//.merge(rects) // enter + update
	
	//Remove
	rects.exit()
		.remove();
}

update(myData);