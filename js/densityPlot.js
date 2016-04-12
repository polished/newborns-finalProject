/**
 * Created by Maciej on 4/12/2016.
 */
d3.densityPlot = function(){

    var w = 800,
        h = 600,
        m = {t:15,r:20,b:25,l:20},
        //layout = d3.layout.histogram(),
        chartW = w - m.l - m.r,
        chartH = h - m.t - m.b;

    var scaleX = d3.scale.linear()
        .domain([0, 5000])
        .range([0, chartW]);

    var scaleY = d3.scale.linear()
        .domain([0, 0.001])
        .range([chartH, 0]);

    var area1 = d3.svg.line()
        .x(function(d) { return scaleX(d.x1); })
        .y(function(d) { return scaleY(d.y1); });

    var area0 = d3.svg.line()
        .x(function(d) { return scaleX(d.x0); })
        .y(function(d) { return scaleY(d.y0); });

    var line1 = d3.svg.line()
        .x(function(d) { return scaleX(d.x1); })
        .y(function(d) { return scaleY(d.y1); });

    var line0 = d3.svg.line()
        .x(function(d) { return scaleX(d.x0); })
        .y(function(d) { return scaleY(d.y0); });
        valueAccessor = function(d){ return d;};

    function exports(_selection){
        //recompute internal variables if updated

        chartW = w - m.l - m.r,
            chartH = h - m.t - m.b;
        //
        scaleX.range([0,chartW]).domain([0, 6000]);
        scaleY.range([chartH,0]).domain([0,0.001]);

        _selection.each(draw);
    }

    function draw(_data){
        //var plotReady = d3.select(this);
        var plot_main = d3.select(this);

        var nodes1 = plot_main.append("path").data([_data])
            .attr("class", "area1")
            .attr("d", area1);

        var nodes0 = plot_main.append("path").data([_data])
            .attr("class", "area0")
            .attr("d", area0);


        plot_main.append("line")
            .attr("class", "line0")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate0))
            .attr("x2", scaleX(estimate0));

        plot_main.append("line")
            .attr("class", "line1")
            .attr("y1", scaleY(0))
            .attr("y2", scaleY(h))
            .attr("x1", scaleX(estimate1))
            .attr("x2", scaleX(estimate1));

        var axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX);

        var axisY = d3.svg.axis()
            .orient('right')
            .scale(scaleY);

//Draw axes
        plot_main.append('g').attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + chartH + ')')
            .call(axisX);

        plot_main.append('g').attr('class', 'axis axis-y')
            .call(axisY);

    }

    //Getter and setter
    exports.width = function(_v){
        if(!arguments.length) return w;
        w = _v;
        return this;
    }
    exports.height = function(_v){
        if(!arguments.length) return h;
        h = _v;
        return this;
    }
    //exports.timeRange = function(_r){
    //    if(!arguments.length) return timeRange;
    //    timeRange = _r;
    //    return this;
    //}
    exports.value = function(_v){
        if(!arguments.length) return layout.value();
        valueAccessor = _v;
        layout.value(_v);
        return this;
    }
    //exports.maxY = function(_y){
    //    if(!arguments.length) return maxY;
    //    maxY = _y;
    //    return this;
    //}
    //exports.binSize = function(_b){
    //    //@param _b: d3.time.interval
    //    if(!arguments.length) return binSize;
    //    binSize = _b;
    //    return this;
    //}

    return exports;
}