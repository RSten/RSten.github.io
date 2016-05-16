var width = window.innerWidth*0.6;
var height = window.innerHeight*0.9;
var path = d3.geo.path();

var svg, projection;

// Update functions
function updateChart(data){
	svg.selectAll("path")
	.data(data)
	.transition()
	.duration(500)
	.attr("fill", colorChangerBorough)
};

var zipCodes = function(d){return d.properties.postalCode};

var boroughs = function(d){return d.properties.borough};

var ffastfood = function(d){return d.properties.fastFood};

var income = function(d){return d.properties.avgIncome};

var heartfailure = function(d){return d.properties.heartFailure};

var hypertension = function(d){return d.properties.hypertension};

var diabeteslong = function(d){return d.properties.diabetesLong};

var diabetesshort = function(d){return d.properties.diabetesShort};

var incomeclass1 = function(d){return d.properties.incomeClass1};

var incomeclass2 = function(d){return d.properties.incomeClass2};

var incomeclass3 = function(d){return d.properties.incomeClass3};

var incomeclass4 = function(d){return d.properties.incomeClass4};

var incomeclass5 = function(d){return d.properties.incomeClass5};

var incomeclass6 = function(d){return d.properties.incomeClass6};

var total = function(d){return d.properties.total};


var color = ["#FB5B1F", "#fb921f", "#a12e03", "#d86b42","#fc926a"];

var colorChangerBorough = function(d){
	var tempBorough = boroughs(d)
	if(tempBorough == "Queens")
	{
		return color[0];
	}
	else if (tempBorough == "Manhattan") {
		return color[1];
	}
	else if (tempBorough == "Brooklyn") {
		return color[2];
	}
	else if (tempBorough == "Bronx") {
		return color[3];
	}
	else {
		return color[4];
	}
};

var heatmapColour = d3.scale.linear()
.domain(d3.range(0, 1, 1.0 / (color.length - 1)))
.range(color);


d3.json("json/NyZip.json", function(json) {

	svg = d3.select('#graph')
	.append("svg")
	.attr("width", width)
	.attr("height", height);


	var datajson = json.features;

	var colorScaleIncome = d3.scale.linear()
	.domain([1, 100])
	.range(["blue","red"]);

	var colorScaleHealth = d3.scale.linear()
	.domain([1, 500]) //d3.max(datajson,heartfailure)
	.range(["blue","red"]);


	projection = d3.geo.mercator().scale(1).translate([0, 0]).precision(0);

	// create the path
	var path = d3.geo.path().projection(projection);

	var bounds = path.bounds(json);
	xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
	yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
	scale = xScale < yScale ? xScale : yScale;

	var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

	projection.scale(scale).translate(transl);

	var path = d3.geo.path().projection(projection);

	svg.selectAll("path")
	.data(datajson)
	.enter()
	.append("path")
	.attr("d", path)
	.attr('data-id', zipCodes)
	.attr('data-name', boroughs)
	.attr('data-ffastfood', ffastfood)
	.attr('data-incomefunc', income)
	.attr('data-heartfailure', heartfailure)
	.attr('data-hypertension', hypertension)
	.attr('data-diabeteslong', diabeteslong)
	.attr('data-diabetesshort', diabetesshort)
	.attr('data-incomeclass1', incomeclass1)
	.attr('data-incomeclass2', incomeclass2)
	.attr('data-incomeclass3', incomeclass3)
	.attr('data-incomeclass4', incomeclass4)
	.attr('data-incomeclass5', incomeclass5)
	.attr('data-incomeclass6', incomeclass6)
	.attr('data-total', total)
	.attr("fill", colorChangerBorough)
	.attr('stroke',"#ffffff");

	$('svg path').hover(function() {
		$("#r1c2").text($(this).data('name') + " (" + $(this).data('id') + ")");
		$("#r2c2").text(parseFloat($(this).data('ffastfood')).toFixed(2));
		$("#r3c2").text(parseFloat($(this).data('incomefunc')*1000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + (" $"));
		$("#r4c2").text(parseFloat($(this).data('total')).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '1,'));
	});

	d3.select("#boxes").selectAll('Button')
	.on('click',function(d){

		var paragraphID = d3.select(this).attr("id");

		if (paragraphID == 'overview'){
			updateChart(datajson)

			$('svg path').hover(function() {
				$("#r1c2").text($(this).data('name') + " (" + $(this).data('id') + ")");
				$("#r2c1").text('Fastfood restaurants per 100,000 capita');
				$("#r2c2").text( parseFloat($(this).data('ffastfood')).toFixed(2));
				$("#r3c1").text('Average income per year');
				$("#r3c2").text(parseFloat($(this).data('incomefunc')*1000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + (" $"));
				$("#r4c1").text(('Number of citizens'));
				$("#r4c2").text(parseFloat($(this).data('total')).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '1,'));
				$("#r5c1").text((' '));
				$("#r5c2").text((' '));
				$("#r6c1").text((' '));
				$("#r6c2").text((' '));
				$("#r7c1").text((' '));
				$("#r7c2").text((' '));
				$("#r8c1").text((' '));
				$("#r8c2").text((' '));
			});

		}

		else if (paragraphID == 'income') {

			svg.selectAll("path")
			.data(datajson)
			.transition()
			.duration(500)
			.attr("fill", function(d) {
				return colorScaleIncome(income(d))
			});

			$('svg path').hover(function() {
				$("#r1c2").text($(this).data('name') + " (" + $(this).data('id') + ")");
				$("#r2c1").text(('Average income'));
				$("#r2c2").text(parseFloat($(this).data('incomefunc')*1000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + (" $"));
				$("#r3c1").text('$1 under $25,000');
				$("#r3c2").text(parseFloat($(this).data('incomeclass1')*100).toFixed(2) + (" %"));
				$("#r4c1").text('$25,000 under $50,000');
				$("#r4c2").text(parseFloat($(this).data('incomeclass2')*100).toFixed(2) + (" %"));
				$("#r5c1").text('$50,000 under $75,000');
				$("#r5c2").text(parseFloat($(this).data('incomeclass3')*100).toFixed(2) + (" %"));
				$("#r6c1").text('$75,000 under $100,000');
				$("#r6c2").text(parseFloat($(this).data('incomeclass4')*100).toFixed(2) + (" %"));
				$("#r7c1").text('$100,000 under $200,000');
				$("#r7c2").text(parseFloat($(this).data('incomeclass5')*100).toFixed(2) + (" %"));
				$("#r8c1").text('$200,000 or more');
				$("#r8c2").text(parseFloat($(this).data('incomeclass6')*100).toFixed(2) + (" %"));
			});

		}
		else if (paragraphID == 'health') {

			svg.selectAll("path")
			.data(datajson)
			.transition()
			.duration(500)
			.attr("fill", function(d) {
				return colorScaleHealth(heartfailure(d));
			});

			$('svg path').hover(function() {

				$("#r1c2").text($(this).data('name') + " (" + $(this).data('id') + ")");
				$("#r2c1").text('Fastfood restaurants per 100,000 capita');
				$("#r2c2").text(parseFloat($(this).data('ffastfood')).toFixed(2));
				$("#r3c1").text('Heart failures per 100,000 capita');
				$("#r3c2").text(parseFloat($(this).data('heartfailure')).toFixed(2));
				$("#r4c1").text('Hypertension per 100,000 capita');
				$("#r4c2").text(parseFloat($(this).data('hypertension')).toFixed(2));
				$("#r5c1").text('Long term diabetes per 100,000 capita');
				$("#r5c2").text(parseFloat($(this).data('diabeteslong')).toFixed(2));
				$("#r6c1").text('Short term diabetes per 100,000 capita');
				$("#r6c2").text(parseFloat($(this).data('diabetesshort')).toFixed(2));
				$("#r7c1").text(' " ');
				$("#r7c2").text((' " '));
				$("#r8c1").text(' " ');
				$("#r8c2").text((' " '));
			});

		}

	});
}); // end of json
