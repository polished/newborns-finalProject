/*Start by setting up the canvas */
var margin = {t: 20, r: 20, b: 20, l: 20};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height + margin.t + margin.b)
    .append('g')
    .attr('class', 'plot')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

//var circle = plot.append("circle")
//    .attr("cx", 30)
//    .attr("cy", 30)
//    .attr("r", 20);

var plot_main = plot.append('g');

queue()
    .defer(d3.csv, 'data.csv', parse)
    .await(dataLoaded);

function parse(d) {

    return {

        number: d.number - 1,
        visible: +d.visible
    }
}
function dataLoaded(error, data) {

    console.log(data);
    draw(data);
}

function draw(_data) {


    var nodes = plot_main.selectAll('.circles-data-point').data(_data);

    //enter
    var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
        .style('fill-opacity', '0.5')
        .attr('cx', function (d) {
            return 25 + Math.random() * 50
        })
        .attr('cy', -50);
    // transitions
    nodes
        .attr('fill', "black")
        .attr('cx', function (d) {
            return (d.number % 10) * 10
        })
        .transition()
        .delay(function (d) {
            return d.number * 75
        })
        .duration(function (d) {
            return (200 - d.number * 0.5)
        })
        .attr('cy', function (d) {
            return 200 - 10 * Math.floor(d.number / 10)
        })

        .attr('r', 5)
        .style('fill-opacity', function (d) {
            if (d.visible == 1) {
                customOpacity = 1
            } else {
                customOpacity = 0.5
            }
            return customOpacity
        });
    //exit
    var node_exit = nodes.exit().remove();
}


//Scales

// Set up scales

//var scaleX = d3.scale.linear().domain([0, 1000]).range([0, width]),
//    scaleY = d3.scale.linear().range([height, 0]).domain([0, 1000]);
//
//
////Axis
//var axisX = d3.svg.axis()
//    .orient('bottom')
//    .scale(scaleX);
//
//
//var axisY = d3.svg.axis()
//    .orient('right')
//    .tickSize(width);
//
//axisY.scale(scaleY);

//Draw axes
//plot.append('g').attr('class', 'axis axis-x')
//    .attr('transform', 'translate(0,' + height + ')')
//    .call(axisX);
//
//plot.append('g').attr('class', 'axis axis-y')
//    .call(axisY);


