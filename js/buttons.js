// Update function
function updateChart2(data){
  chart2.selectAll('circle')
  .data(data)
  .transition()
  .duration(1000)
  .attr("r", rMap)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .attr('fill','Blue');
};

// Update functions
function updateChart3(data){
  chart3.selectAll('.bar')
  .data(data)
  .transition()
  .duration(1000)
  .attr("x", xMap3)
  .attr("y", yMap3)
  .attr("width", xScale3.rangeBand())
  .attr("height", yHeight)
  .attr('fill','steelblue');
};

// Update Axis
function updateAxis3(xAxis3,yAxis3){
  chart3.select(".y.axis")
  .transition()
  .duration(1000)
  .call(yAxis3);
};


var label = 0;

function updateColors(label){
  var colors = ['blue','black','yellow','green','red','pink']

  if (label == 0) {
    return colors[0]
  }
  else if(label == 1) {
    return colors[1]
  }
  else if(label == 2) {
    return colors[2]
  }
  else if(label == 3) {
    return colors[3]
  }
  else if(label == 4) {
    return colors[4]
  }
  else if(label == 5) {
    return colors[5]
  }
};

function updateChart4(data){
  chart4.selectAll("circle")
  .data(data)
  .attr("fill",updateColors(label));
};



d3.selectAll('Button')
.on('click',function(d){

  var paragraphID = d3.select(this).attr("id");

  if (paragraphID=='2015'){
    console.log("2015")
    var datafile = 'csv/SFPDmodified2015.csv'
    d3.csv(datafile,function(error,data){
      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.Prostitution = +d.Prostitution
        d.Theft = +d.Theft
        d.Total = +d.Total
      })
      updateChart2(data)
    })
  }
  else if (paragraphID == "2003") {
    console.log("2003")
    var datafile = 'csv/SFPDmodified2003.csv'
    d3.csv(datafile,function(error,data){
      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.Prostitution = +d.Prostitution
        d.Theft = +d.Theft
        d.Total = +d.Total
      })
      updateChart2(data)
    })
  }
  else if (paragraphID == 'Theft') {
    var datafile = 'csv/SFPDmodified2003.csv'
    d3.csv(datafile,function(error,data){
      if (error) {
        console.log(error)
      }
      //console.log('Theft')
      yValue3 = function(d){return d.Theft}
      yScale3.domain([0, d3.max(data, yValue3)+1])
      updateChart3(data)
      updateAxis3(xAxis3,yAxis3)
    })
  }
  else if (paragraphID == 'Prostitution') {
    var datafile = 'csv/SFPDmodified2003.csv'
    d3.csv(datafile,function(error,data){
      if (error) {
        console.log(error)
      }
      //console.log('Prostitution')
      yValue3 = function(d){return d.Prostitution}
      yScale3.domain([0, d3.max(data, yValue3)+1])
      updateChart3(data)
      updateAxis3(xAxis3,yAxis3)
    })
  }
  else if (paragraphID == 'K2' ) {
    d3.csv('csv/km_data.csv',function(error,data){

      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.lon = +d.lon
        d.lat = +d.lat
        d.labelK2 = +d.labelK2
        d.labelK3 = +d.labelK3
        d.labelK4 = +d.labelK4
        d.labelK5 = +d.labelK5
        d.labelK6 = +d.labelK6
      })
      label = function(d){return d.labelK2}
      console.log(paragraphID)
      updateChart4(data)
    })
  }
  else if (paragraphID == 'K3' ) {
    d3.csv('csv/km_data.csv',function(error,data){

      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.lon = +d.lon
        d.lat = +d.lat
        d.labelK2 = +d.labelK2
        d.labelK3 = +d.labelK3
        d.labelK4 = +d.labelK4
        d.labelK5 = +d.labelK5
        d.labelK6 = +d.labelK6
      })
      label = function(d){return d.labelK3}
      console.log(paragraphID)
      updateChart4(data)
    })
  }
  else if (paragraphID == 'K4' ) {
    d3.csv('csv/km_data.csv',function(error,data){

      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.lon = +d.lon
        d.lat = +d.lat
        d.labelK2 = +d.labelK2
        d.labelK3 = +d.labelK3
        d.labelK4 = +d.labelK4
        d.labelK5 = +d.labelK5
        d.labelK6 = +d.labelK6
      })
      label = function(d){return d.labelK4}
      console.log(paragraphID)
      updateChart4(data)
    })
  }
  else if (paragraphID == 'K5' ) {
    d3.csv('csv/km_data.csv',function(error,data){

      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.lon = +d.lon
        d.lat = +d.lat
        d.labelK2 = +d.labelK2
        d.labelK3 = +d.labelK3
        d.labelK4 = +d.labelK4
        d.labelK5 = +d.labelK5
        d.labelK6 = +d.labelK6
      })
      label = function(d){return d.labelK5}
      console.log(paragraphID)
      updateChart4(data)
    })
  }
  else if (paragraphID == 'K6' ) {
    d3.csv('csv/km_data.csv',function(error,data){

      if (error) {
        console.log(error)
      }
      data.forEach(function(d){
        d.lon = +d.lon
        d.lat = +d.lat
        d.labelK2 = +d.labelK2
        d.labelK3 = +d.labelK3
        d.labelK4 = +d.labelK4
        d.labelK5 = +d.labelK5
        d.labelK6 = +d.labelK6
      })
      label = function(d){return d.labelK6}
      console.log(paragraphID)
      updateChart4(data)
    })
  }



});
