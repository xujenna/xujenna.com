d3.json("ig_to_clarifai.json", ready);
var margin = {top: 0, right: 300, bottom: 150, left: 300};


var conceptChart = d3.select(".concept-chart");
var colorChart = d3.select(".color-chart");

var width = conceptChart.node().clientWidth - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var colorChartHeight = 1300;

var conceptSVG = conceptChart.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colorSVG = colorChart.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", colorChartHeight + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// .attr("transform", "rotate(90," + width/2 + ","+ height*2 + ")");

  var dataByDate = d3.nest()
    .key(function(d) {return d.date})
    .entries(data);

  var colorData = [];

  dataByDate.forEach(function(d,i){
    var holder = {};
    var currentDate = new Date(String(d.key.slice(0,7)) + "-01 00:00:00");
    var currentColors = d.values[0].color_predictions;
    var topCurrentColors = currentColors
    .sort(function(a,b){return b.value - a.value;})
    .filter(function(d,i){
      if(d.w3c.name !== "White"){
        return d;
      }
    })
    .filter(function(d,i){return i < 2;})

    topCurrentColors.forEach(function(d){
      d["date"] = currentDate;
    })
    holder["date"] = currentDate;
    holder["colors"] =  topCurrentColors;
    colorData.push(holder);
    });
console.log(colorData)

  nestedColorData = d3.nest()
  .key(function (d) {return d.date;})
  .entries(colorData);

  nestedColorData.forEach(function(d){
    d.key = new Date(d.key)

  })

  // console.log(nestedColorData);

  // colorData.forEach(function(d){
  //   var dateTime = new Date(d.date);
  //   d.date = dateTime;
  // })

  var color_xMin = d3.min(nestedColorData,function(d){return d.key;});
  var color_xMax = d3.max(nestedColorData,function(d){return d.key;});

  // console.log(color_xMax)
  // console.log(color_xMin)

  var color_xScale = d3.time.scale()
    .range([0,width])
    .domain([color_xMin, color_xMax]);

  // var concept_yScale = d3.scale.linear()
  // .range([height, 0])
  // .domain([0, (concept_yMax)]);
  //

  var color_xAxis = d3.svg.axis()
    .scale(color_xScale)
    .orient("bottom")
    .tickPadding(10)
    .tickFormat(d3.time.format("%b %Y"));


  var color_xAxisGroup = colorSVG.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0, " + (colorChartHeight) + ")")
  .call(color_xAxis);

  // var concept_yAxisGroup = conceptSVG.append("g")
  // .attr("class", "yAxis")
  // .call(concept_yAxis);
  var colorBlockContainer = colorSVG.selectAll(".colorBlocks")
    .data(nestedColorData)
    .enter()
    .append("g")
  .selectAll(".blocks")
    .data(function(d){
      // console.log([].concat.apply([],d.values.map(function(x){return x.colors})));

      // d.values = [ {} , {} , {}  ]
      // d.values.map(function(x) { return x.colors }) = [ {}.colors, {}.colors, {}.colors ]
      //                                               = [ [a,b], [c,d], [e,f] ]

      return [].concat.apply([],d.values.map(function(x){return x.colors}))  ;})
    .enter()
  //   .append("g")
  // .selectAll(".colors")
    // .data(function(d){return d.colors;})
    // .enter()
    .append("rect")
    .style("fill", function(d){
      // for(var i=0; i < 2; i++)
        return d.raw_hex;
    })
    .attr("transform", function(d,i){
        return "translate(" + (color_xScale(d.date) - 13) + "," + (colorChartHeight - (i*26) - 26) + ")";
      })

    .attr("width", "26px")
    .attr("height", "26px")
