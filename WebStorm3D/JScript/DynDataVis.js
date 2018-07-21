//动态数据表格展示
//静态数据源--直方图示例
//动态时由服务器提供
var dataset = [50, 32, 23, 6, 89, 123, 60];
//1.绘制静态图表
var TWidth = 400, THeight = 400;
//在index.html中次脚本的引用晚于MyD3JS.js,因此可以获取到那个脚本中创建的div
var TableCanvas = d3.select(document.body).select('div').append("svg")
    .attr("width", TWidth)
    .attr("height", THeight)
    .attr("id", "Table01").attr("class", "TableSVG");
//获得对应CSS文件中的class中的属性---并且该属性可修改（可读可写）
var table01 = document.getElementById("Table01");
var Table_padding = table01.style.padding;
//只读,返回字符串
//var Table_padding = getComputedStyle(table01,null).padding;
console.log(Table_padding);
//上一个直方图的左边距离下一个直方图左边的距离
const rectStep = 35;
//直方图宽度,即两个直方图之间的间隔为5
const rectWidth = 30;
TableCanvas.selectAll("rect").data(dataset).enter().append("rect")
    .attr("fill", "blue")
    .attr("x", (d, i) => {
        return Table_padding + (i * rectStep)
    })
    .attr("y", (d, i) => {
        return THeight - d - Table_padding
    })
    .attr("width", rectWidth)
    .attr("height", (d, i) => {
        return d
    });

var TableText = TableCanvas.selectAll("text").data(dataset).enter().append("text").attr("class","DataText")
    .attr("x",(d,i)=>{return Table_padding + (i * rectStep) })
    .attr("y",(d,i)=>{return THeight - d - Table_padding})
    .text((d,i)=>{return d})
    .attr("dx",rectWidth/2)
    .attr("dy","1em");
//绘制坐标轴
//var Axis = TableCanvas.append('g').attr("transform","translate(10,360)");
//设定比例尺
//domain()坐标刻度数量，对应后面的像素点，即0-->8px,10-->378px,刻度间距为(378-8)/10
//var xAxisScale = d3.scaleLinear().domain([0,10]).range([8,378]);

//
//var xAxis = d3.axisBottom().scale(xAxisScale);

//
//Axis.call(xAxis);

