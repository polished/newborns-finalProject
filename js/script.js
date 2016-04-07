/*Start by setting up the canvas */
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
    height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//var circle = plot.append("circle")
//    .attr("cx", 30)
//    .attr("cy", 30)
//    .attr("r", 20);

var plot_main = plot;
//var plot_main = plot.append('g');

queue()
    .defer(d3.csv,'data.csv',parse)
    .await(dataLoaded);

function parse(d) {

    return {

        number: d.number-1,
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
        .attr('cx', function(d) {return 25 + Math.random()*50})
        //.attr('cx', function(d) {return Math.random()*100})
        .attr('cy', -50);

    //exit
    var node_exit = nodes.exit().remove();


    // transitions
    nodes
        .attr('fill', "black")

        //.transition().duration(200).attr('cx', function (d) {
        //    return scaleX(d.date);
        //})
        .attr('cx', function(d){ return (d.number % 10)*10})
        .transition()
        .delay(function(d){return d.number*75})
        .duration(function(d){return (200-d.number*0.5)})
        .attr('cy', function(d){

            return 200 - 10*Math.floor(d.number/10)})


        .attr('r', 5)
        .style('fill-opacity', function(d){
            if (d.visible == 1){
                customOpacity = 1
            } else {
                customOpacity = 0.5
            }
            return customOpacity} );


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



//Import data with queue
//function queueData() {
//
//    queue()
//    //.defer(d3.csv, 'data/merged7daysSinglePoints.csv', parse)
//        .defer(d3.csv, 'data/merged7days.csv', parse)
//        //.defer(d3.csv,'data/Merge3.csv',parse)
//        .await(dataLoaded);
//}

//queueData();
//
//function dataLoaded(error, heartRate) {
//
//    dataset = heartRate; // do not remove
//    draw(heartRate);
//    drawBrush(heartRate);
//}

//function draw(_data) {
//
//     plot.select('.axis-x')
//        .call(axisX);
//
//    plot.select('.axis-y')
//        .call(axisY);
//
//
//    var nodes = plot_main.selectAll('.circles-data-point').data(_data, function (d) {
//        return d.date;
//    });
//
//    //enter
//    var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
//        .style('fill-opacity', '0.5');
//
//    //exit
//    var node_exit = nodes.exit().remove();
//
//    // transitions
//    nodes
//        .attr('fill', function (d) {
//            return colorScale(d[ColorVar]);
//        })
//        .attr('location', function (d) {
//            return d.location;
//        })
//        .transition().duration(200).attr('cx', function (d) {
//            return scaleX(d.date);
//        })
//
//        .attr('cy', function (d) {
//            return scaleY(d[yVar]);
//        })
//
//        .attr('r', function (d) {
//            return radiusScale(d[RadiusVar]);
//        });
//
//    node_enter
//        .on('mouseover', function (d, i) {
//            //console.log("over");
//            d3.select(this)
//                .style('stroke', "black")
//                .style('stroke-width', 1);
//        })
//
//
//}



//function parse(d) {
//    var _date = [d.Form_start_date.split('/')];
//    var _time = [d.Form_start_time.split(':')];
//    var forDate = _date.concat(_time);
//    var finalDate = new Date(forDate[0][2], (forDate[0][0] - 1), forDate[0][1], forDate[1][0], forDate[1][1]);
//
//
//    return {
//
//        date: finalDate,
//        hr: +d.heart_rate,
//        activation: +d.general_emotion,
//        valence: +d.emotion_valence,
//        gsr: +d.gsr * 10,
//        temp: +d.skin_temp,
//        calories: +d.calories * 10,
//        steps: +d.steps,
//        anxiety_2: +d.anxiety_2,
//        fear: +d.fear,
//        envy: +d.Envy,
//        trust: +d.Trust,
//        disgust: +d.Disgust,
//        anticipation: +d.Anticipation,
//        joy: +d.Joy,
//        love: +d.Love,
//        hope: +d.Hope,
//        anger: +d.Anger,
//        sadness: +d.Sadness,
//        excitement: +d.Excitement,
//        frustration: +d.Frustration,
//        activity: d.what_are_you_doing,
//        location: d.location_selfreport,
//        energy: +d.energy,
//        stimulants: d.Stimulants,
//        sugar: d.Sugar,
//        pain: d.Pain,
//        hunger: +d.hunger
//
//    }
//}
