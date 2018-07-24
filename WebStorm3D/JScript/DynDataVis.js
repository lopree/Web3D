//动态数据表格展示
//静态数据源--直方图示例
//动态时由服务器提供
var dataset = [50, 32, 23, 6, 89, 123, 60];
var newDataArr = [50, 20, 30, 40, 50, 60, 70, 80];
//饼图的数据
const pData = [12,13,17];
var freqData=[
    {State:'AL',freq:{low:4786, mid:1319, high:249}}
    ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
    ,{State:'CT',freq:{low:932, mid:2149, high:418}}
    ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
    ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
    ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
    ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
    ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
    ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
    ,{State:'KS',freq:{low:162, mid:379, high:471}}
];
//绘制圆形比例图SVG以及里面的弦
const PTableCanvas = d3.select('div').append('svg').attr('id','pTableSVG')
    .attr("width",200).attr('height',200);
const arcPath =d3.arc().innerRadius(0).outerRadius(100);
//根据鼠标的位置，动态更新饼图的数据源

//颜色
var pColor = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//1.绘制静态直方图图表
const Width = 800,Height = 400;
const TWidth = 400, THeight = 400;
//在index.html中次脚本的引用晚于MyD3JS.js,因此可以获取到那个脚本中创建的div
var TableCanvas = d3.select(document.body).select("div")
    .append("svg").attr("id","Table01").attr("class","TableSVG")
    .attr("width", Width).attr("height",Height);
//获得对应CSS文件中的class中的属性---并且该属性可修改（可读可写）
const table01 = document.getElementById("Table01");
//返回字符串,转换成float
const readPadding = getComputedStyle(table01, null).padding;
const Table_padding = parseFloat(readPadding);

//定义X轴和Y轴
const xAxisWidth = TWidth - 2 * Table_padding;
const yAxisWidth = THeight - 2 * Table_padding;

console.log(readPadding);
console.log(xAxisWidth);
//上一个直方图的左边距离下一个直方图左边的距离
const rectStep = 35;
//直方图宽度,即两个直方图之间的间隔为5
const rectWidth = 30;
//绘制坐标轴容器
var GXAxis = TableCanvas.append('g').attr("transform", "translate(" + Table_padding + "," + (THeight - Table_padding) + ")");
var GYAxis = TableCanvas.append('g').attr("transform", "translate(" + Table_padding + "," + (THeight - Table_padding - yAxisWidth) + ")");
//生成比例尺
//domain()坐标刻度数量，对应后面的像素点，即0-->8px,10-->378px,刻度间距为(378-8)/10
var xScale = d3.scaleBand().domain(newDataArr.map((d, i) => i + 1)).range([0, xAxisWidth]).padding(0.1);
var yScale = d3.scaleLinear().domain([0, d3.max(newDataArr)]).rangeRound([yAxisWidth, 0]);


//生成坐标轴
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
//
GXAxis.call(xAxis);
GYAxis.call(yAxis);

//数据初始化及更新(伪)
const RectStyle = obj => {
    obj.attr("fill", "steelblue")
        .attr("x", (d, i) => {
            return Table_padding + xScale(i + 1)
        })
        .attr("y", (d, i) => {
            return THeight - Table_padding - (yScale(0) - yScale(d))
        })
        .attr("width", xScale.bandwidth())
        .attr("height", (d, i) => {
            return yScale(0) - yScale(d)
        })
        .on('mouseover',mouseover)
        .on('mouseout',mouseout);
};
const TextStyle = obj => {
    obj.attr("class", "DataText")
        .attr("x", (d, i) => {
            return Table_padding + xScale(i + 1)
        })
        .attr("y", (d, i) => {
            return THeight - Table_padding - (yScale(0) - yScale(d))
        })
        .text((d, i) => {
            return d
        })
        .attr("dx", xScale.bandwidth() / 2)
        .attr("dy", "1em");
};

//初始化生成函数
function init_Table(dataSource) {
    RectStyle(TableCanvas.selectAll("rect").data(dataSource).enter().append("rect"));

    TextStyle(TableCanvas.selectAll(".DataText").data(dataSource).enter().append("text"));
}

//更新方法
function update_Table(newDataSource) {
    var dataArray = d3.selectAll('rect').nodes();
    console.log(dataArray.length);
    var newTable = TableCanvas.selectAll("rect").data(newDataSource);
    RectStyle(newTable);
    TextStyle(TableCanvas.selectAll(".DataText").data(newDataSource));
    //当新的数据长度小于原来数据长度，则删除多余的直方；新数据长度多余元数据时，将新的数据添加进去
    if (newDataSource.length < dataArray.length) {
        newTable.exit().remove();
    } else {
        RectStyle(newTable.enter().append('rect'));
        TextStyle(newTable.enter().append("text"));
    }

}
//饼图
const pStyle = obj=>{
    obj.attr("transform","translate("+Width*3/4+","+Height/2+")").attr('stroke','#000')
        .attr('stroke-width','3px');
}
function init_pTable(dataSource){
pStyle(PTableCanvas.selectAll('path').data(dataSource).enter().append('path')
    .attr('d',d=>arcPath(d)).attr('fill','green')
)
}
//鼠标移入移出时触发的事件
function mouseover(){
    d3.select(this).attr('fill','blue')
}
function mouseout(){
    d3.select(this).attr('fill','steelblue')
}

init_Table(dataset);

update_Table(newDataArr);
init_pTable(pData);



