//5 lines, 1 for each gesture
//line: freq of bad notification vs time per user
var usersRef = new Firebase('https://carpal-tunnel.firebaseio.com/users/John_Doe')

drawGraph()

function drawGraph() {
	var notifications
	usersRef.orderByChild("notification").on("child_added", function(snapshot) {
	   	var res = snapshot.val()
	   	if (Array.isArray(res))
	   		drawLineGraphs(res)
	})   
}

function drawLineGraphs(data) {
	console.log(data)

	var vis = d3.select("#visualization"),
	WIDTH = 570,
	HEIGHT = 500,
	MARGINS = {
		top : 20,
		right : 20,
		bottom : 40,
		left : 35
	}

	
	var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,4])

	var xScale = d3.time.scale()
			.domain([new Date(2015, 8, 19), new Date(2015, 8, 21)]) //year, month (0-11), day
			.range([0, WIDTH * 0.95]);//0.6
		
	//setting up x-axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(d3.time.days, 1)
		.tickFormat(d3.time.format("%d"));
  
	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient('left')

	vis.append("svg:g")
		.attr("transform", "translate(30," + (HEIGHT - MARGINS.bottom) + ")")
		.call(xAxis)

	vis.append("svg:g")
		.attr("transform", "translate(" + (MARGINS.left) + ",-20)")
		.call(yAxis)

	//label for x axis
	vis.append('text')
			.attr('class', 'xLabel')
			.attr('transform', 'translate(' + WIDTH * 0.6 + ',' + 0.99 * HEIGHT + ')')
			.attr('text-anchor', 'end')
			.text("September");

	//conv data to line data = value and day
	var mouseLineData = []
	var bendLeftLineData = []
	var bendRightLineData = []
	var knittingLineData = []

	
	for (var i = 0; i < data.length; i++) {
		if (data[i]["id"] == "bendLeft") 
			allocateNotification(bendLeftLineData, data, i)
		else if (data[i]["id"] == "bendRight")
			allocateNotification(bendRightLineData, data, i)
		else if (data[i]["id"] == "mouse")
			allocateNotification(mouseLineData, data, i)
		else if (data[i]["id"] == "knitting")
			allocateNotification(knittingLineData, data, i)
	}
	
	console.log("mouse data is")
	console.log(mouseLineData)

	console.log("bend left")
	console.log(bendLeftLineData)

	console.log("bend right")
	console.log(bendRightLineData)

	console.log("knitting")
	console.log(knittingLineData)

	//line
	var line = d3.svg.line()
					 .x (function(d) {return xScale(d.day);})
					 .y (function(d) {return yScale(d.value);});

	vis.append('svg:path')
			.attr("d", line(mouseLineData))
			.style('opacity', 0.7)
			.attr('class', 'linePath')
			.attr("transform", 'translate(' + 0 + ',' + -25 + ')')//same as y-axis transform
				.style("stroke", function() { 
					return "yellow"; 
				})
				.style("fill", "none")
				.style('stroke-width', 5)

	vis.append('svg:path')
			.attr("d", line(bendLeftLineData))
			.style('opacity', 0.7)
			.attr('class', 'linePath')
			.attr("transform", 'translate(' + 0 + ',' + -25 + ')')
				.style("stroke", function() { 
					return "red"; 
				})
				.style("fill", "none")
				.style('stroke-width', 5)

	vis.append('svg:path')
			.attr("d", line(bendRightLineData))
			.style('opacity', 0.7)
			.attr('class', 'linePath')
			.attr("transform", 'translate(' + 0 + ',' + -25 + ')')
				.style("stroke", function() { 
					return "green"; 
				})
				.style("fill", "none")
				.style('stroke-width', 5)

	vis.append('svg:path')
			.attr("d", line(knittingLineData))
			.style('opacity', 0.7)
			.attr('class', 'linePath')
			.attr("transform", 'translate(' + 0 + ',' + -25 + ')')
				.style("stroke", function() { 
					return "blue"; 
				})
				.style("fill", "none")
				.style('stroke-width', 5)
	/*
	var maxVal = getMaxValue(lineData);
			var currentYear = new Date().getFullYear();
			
			//setting up y-axis scale
			var yScale = d3.scale.linear()
								.range([ 0, height*0.6])
								.domain([maxVal, 0]);
			
			//setting up y-axis
			var yAxis = d3.svg.axis().scale(yScale)
									.orient('left');
			
			//setting up x-axis scale
			var xScale = d3.time.scale()
				.domain([new Date(currentYear, 0, 1), new Date(currentYear, 11, 1)]) //year, month (0-11), day
				.range([0, width*0.5]);//0.6
			
			//setting up x-axis
			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(d3.time.months, 1)
				.tickFormat(d3.time.format("%b"));
			
			//mapping lineData to line path
			var line = d3.svg.line()
						 .x (function(d) {return xScale(d.label);})
						 .y (function(d) {return yScale(d.value);});
	*/
}

function allocateNotification(arr, data, index) {
	tempObj = {}
	tempObj.value = 1
	tempObj.day = new Date(data[index].day)

	if (arr.length > 0 ){
		if ((arr[arr.length - 1].day+"").substring(0, 14) == (tempObj.day+"").substring(0, 14))
			arr[arr.length - 1].value++
		else
			arr.push(tempObj)
	}
	else
		arr.push(tempObj)
}