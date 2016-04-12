/*Start by setting up the canvas */
var margin = {t: 20, r: 20, b: 20, l: 20};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas').select('.chart1')
//var plot = d3.select('.canvas')
    .append('svg')
    .attr('class', 'svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height/5 + margin.t + margin.b)
    .append('g')
    .attr('class', 'plot')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

var plot2 = d3.select('.canvas').select('.chart2')
    //var plot = d3.select('.canvas')
    .append('svg')
    .attr('class', 'svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height/5 + margin.t + margin.b)
    .append('g')
    .attr('class', 'plot2')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');


var plot3 = d3.select('.canvas').select('.chart3')
    //var plot = d3.select('.canvas')
    .append('svg')
    .attr('class', 'svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height/5 + margin.t + margin.b)
    .append('g')
    .attr('class', 'plot3')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

//var plot2 = d3.select('.svg')
//    .append('g')
//    .attr('class', 'plot2')
//    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

//var plotReady = plot;

queue()
    .defer(d3.csv, 'densitySingle.csv', parse, dataLoaded)
    .defer(d3.csv, 'densityBlack.csv', parse, dataLoaded1)
    .defer(d3.csv, 'densityNoCollege.csv', parse, dataLoaded2);
    //.defer(d3.csv, 'densityMedicaid.csv', parse)
    //.defer(d3.csv, 'densityNoPrecare.csv', parse)
    //.defer(d3.csv, 'densityTeen.csv', parse)
    //.defer(d3.csv, 'densityWic.csv', parse)
    //.defer(d3.csv, 'densitySingle.csv', parse)
    //.defer(d3.csv, 'densityMarried.csv', parse)

    //.await(dataLoaded);
//.await(draw);

function dataLoaded(err,data) {

    var densityPlotModule = d3.densityPlot()
        .width(width/2).height(height/5);
    //    .value(data);

    //plotReady = plot
    plotReady = d3.select('.plot')
        .datum(data)
        .call(densityPlotModule);

    //plotReady2 = d3.select('.plot2')
    //    .datum(data)
    //    .call(densityPlotModule);
    //
    //plotReady3 = d3.select('.plot3')
    //    .datum(data)
    //    .call(densityPlotModule);
 }

function dataLoaded1(err,data) {

    var densityPlotModule = d3.densityPlot()
        .width(width/2).height(height/5);
    //    .value(data);

    //plotReady = plot
    //plotReady = d3.select('.plot')
    //    .datum(data)
    //    .call(densityPlotModule);

    plotReady2 = d3.select('.plot2')
        .datum(data)
        .call(densityPlotModule);

    //plotReady3 = d3.select('.plot3')
    //    .datum(data)
    //    .call(densityPlotModule);
 }

function dataLoaded2(err,data) {

    var densityPlotModule = d3.densityPlot()
        .width(width/2).height(height/5);
    //    .value(data);

    //plotReady = plot
    //plotReady = d3.select('.plot')
    //    .datum(data)
    //    .call(densityPlotModule);

    //plotReady2 = d3.select('.plot2')
    //    .datum(data)
    //    .call(densityPlotModule);

    plotReady3 = d3.select('.plot3')
        .datum(data)
        .call(densityPlotModule);
}

function parse(d) {
    estimate0 = +d.estimate0;
    estimate1 = +d.estimate1;

    return {
        x0: +d.x0,
        y0: +d.y0,
        x1: +d.x1,
        y1: +d.y1
    }
}