//动态数据表格展示
//静态数据源--直方图示例
//动态时由服务器提供
var dataset = [50, 32, 23, 6, 89, 123, 60];
var newDataArr = [50, 20, 30, 40, 50, 60, 70, 80];
//1.绘制静态图表
var TWidth = 400, THeight = 400;
//在index.html中次脚本的引用晚于MyD3JS.js,因此可以获取到那个脚本中创建的div
var TableCanvas = d3.select(document.body).select('div').append("svg")
    .attr("width", TWidth)
    .attr("height", THeight)
    .attr("id", "Table01").attr("class", "TableSVG");
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
var xScale = d3.scaleBand().domain(newDataArr.map((d, i) => i)).range([0, xAxisWidth]).padding(0.1);
var yScale = d3.scaleLinear().domain([0, d3.max(newDataArr)]).rangeRound([yAxisWidth, 0]);


//生成坐标轴
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
//
GXAxis.call(xAxis);
GYAxis.call(yAxis);

//数据初始化及更新(伪)
const RectStyle = obj => {
    obj.attr("fill", "blue")
        .attr("x", (d, i) => {
            return Table_padding + xScale(i)
        })
        .attr("y", (d, i) => {
            return THeight - Table_padding - (yScale(0)-yScale(d))
        })
        .attr("width", xScale.bandwidth())
        .attr("height", (d, i) => {
            return yScale(0)-yScale(d)
        });
};
const TextStyle = obj => {
    obj.attr("class", "DataText")
        .attr("x", (d, i) => {
            return Table_padding + xScale(i)
        })
        .attr("y", (d, i) => {
            return THeight - Table_padding - (yScale(0)-yScale(d))
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

init_Table(dataset);

update_Table(newDataArr);


