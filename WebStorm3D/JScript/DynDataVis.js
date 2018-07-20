//动态数据表格展示
//静态数据源
var freqData=[
    {State:'一号',freq:{low:4786, mid:1319, high:249}}
    ,{State:'二号',freq:{low:1101, mid:412, high:674}}
    ,{State:'三号',freq:{low:932, mid:2149, high:418}}
    ,{State:'四号',freq:{low:832, mid:1152, high:1862}}
    ,{State:'五号',freq:{low:4481, mid:3304, high:948}}
    ,{State:'六号',freq:{low:1619, mid:167, high:1063}}
    ,{State:'七号',freq:{low:1819, mid:247, high:1203}}
    ,{State:'八号',freq:{low:4498, mid:3852, high:942}}
    ,{State:'九号',freq:{low:797, mid:1849, high:1534}}
    ,{State:'十号',freq:{low:162, mid:379, high:471}}
];
//1.绘制静态图表
var TWidth = 400,THeight = 400;
//在index.html中次脚本的引用晚于MyD3JS.js,因此可以获取到那个脚本中创建的div
var TabelCanvas = d3.select(document.body).select('div').append("svg")
    .attr("width",TWidth)
    .attr("height",THeight)
    .attr("class","TabelSVG");
//绘制坐标轴
var Axis = TabelCanvas.append('g').attr("transform","translate(10,360)");
//domain()坐标刻度数量，对应后面的像素点，即0-->8px,10-->378px,刻度间距为(378-8)/10
var xAxisScale = d3.scaleLinear().domain([0,10]).range([8,378]);

//
var xAxis = d3.axisBottom().scale(xAxisScale);

//
xAxis(Axis);

