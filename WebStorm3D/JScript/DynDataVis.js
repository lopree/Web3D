//动态数据表格展示
//静态数据源--直方图示例
//动态时由服务器提供
//饼图的数据
const pData = [12, 13, 17];
var freqData = [
    {State: 'AL', freq: {low: 4786, mid: 1319, high: 249}}
    , {State: 'AZ', freq: {low: 1101, mid: 412, high: 674}}
    , {State: 'CT', freq: {low: 932, mid: 2149, high: 418}}
    , {State: 'DE', freq: {low: 832, mid: 1152, high: 1862}}
    , {State: 'FL', freq: {low: 4481, mid: 3304, high: 948}}
    , {State: 'GA', freq: {low: 1619, mid: 167, high: 1063}}
    , {State: 'IA', freq: {low: 1819, mid: 247, high: 1203}}
    , {State: 'IL', freq: {low: 4498, mid: 3852, high: 942}}
    , {State: 'IN', freq: {low: 797, mid: 1849, high: 1534}}
    , {State: 'KS', freq: {low: 162, mid: 379, high: 471}}
];
console.log(freqData);
freqData.forEach(function (d) {
    d.total = d.freq.high + d.freq.low + d.freq.mid;
});
console.log(freqData);
const pDATAArray = [];
for (i = 0; i < freqData.length; i++) {
    pDATAArray.push(freqData[i].total);
}
//1.绘制静态直方图图表
const Width = 800, Height = 400;
const TWidth = 400, THeight = 400;
//在index.html中次脚本的引用晚于MyD3JS.js,因此可以获取到那个脚本中创建的div
var TableCanvas = d3.select(document.body).select("div")
    .append("svg").attr("id", "Table01").attr("class", "TableSVG")
    .attr("width", Width).attr("height", Height);

//获得对应CSS文件中的class中的属性---并且该属性可修改（可读可写）
const table01 = document.getElementById("Table01");
//返回字符串,转换成float
const readPadding = getComputedStyle(table01, null).padding;
const Table_padding = parseFloat(readPadding);

//定义X轴和Y轴
const xAxisWidth = TWidth - 2 * Table_padding;
const yAxisWidth = THeight - 2 * Table_padding;

//console.log(readPadding);//20px
//console.log(xAxisWidth);//360
//上一个直方图的左边距离下一个直方图左边的距离
const rectStep = 35;
//直方图宽度,即两个直方图之间的间隔为5
const rectWidth = 30;
//绘制坐标轴容器
var GXAxis = TableCanvas.append('g')
    .attr("transform", "translate(" + (Table_padding) + "," + (THeight - Table_padding) + ")");
var GYAxis = TableCanvas.append('g')
    .attr('id', 'yaxis')
    .attr("transform", "translate(" + (Table_padding) + "," + (THeight - Table_padding - yAxisWidth) + ")");

//生成比例尺
//domain()坐标刻度数量，对应后面的像素点，即0-->8px,10-->378px,刻度间距为(378-8)/10
var xScale = d3.scaleBand().domain(pDATAArray.map((d, i) => i + 1)).range([0, xAxisWidth]).padding(0.1);
var yScale = d3.scaleLinear().domain([0, d3.max(pDATAArray)]).rangeRound([yAxisWidth, 0]);


//生成坐标轴,以及改变里面元素的属性
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
GXAxis.call(xAxis);
GYAxis.call(yAxis).selectAll('text').attr('class', 'yAxisText');

const RectStyle = obj => {
    obj.attr("fill", "steelblue")
        .attr('id','TableRect')
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
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);
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

//绘制圆形比例图SVG以及里面的弦
const pie = d3.pie().value(d => d);
//获得数据源中的low数据()
const pielow = d3.pie().value(d => d.freq.low);
console.log(pielow(freqData).map(d => d.value));
//获得数据源中freq的value值，返回一个多重数组
const fre = freqData.map(d => Object.values(d.freq));
console.log(fre);
//然后在从多重数组里面分别取出对应的值
const lowValue = fre.map(d => d[0]);
const midValue = fre.map((d, i) => d[1]);
const highValue = fre.map(d => d[2]);

const arcPath = d3.arc().innerRadius(0).outerRadius(100);
//饼图颜色
var pColor = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#ab2013", "#76ccc9", "#68cc83"]);

//饼图
const pStyle = obj => {
    obj.attr('stroke', '#000')
        .attr('stroke-width', '1px')
        .attr("transform", "translate(" + 500 + "," + (Height / 2) + ")")
        .attr('d', d => arcPath(d)).attr('fill', (d, i) => pColor(i)).attr('class', 'pTableStyle')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);
}

function init_pTable(dataSource) {
    const pieData = pie(dataSource);
    pStyle(TableCanvas.selectAll(".pTableStyle").data(pieData).enter().append('path'));
}

function updata_pTable(newdataSource) {
    const newPie = pie(newdataSource);
    const allPTable = TableCanvas.selectAll(".pTableStyle").nodes();
    const newpTable = TableCanvas.selectAll(".pTableStyle").data(newPie);
    if (newPie.length < allPTable.length) {
        pStyle(newpTable);
        newpTable.exit().remove();
    } else {
        pStyle(newpTable.enter().append('path'));
    }
}

//鼠标移入移出直方图时触发的事件
function mouseover(d,i) {
    if (this.id == 'TableRect') {
        d3.select(this).attr('fill', 'blue');
        //更新饼状图数据
        const newpData = fre[i];
        console.log(newpData);
        updata_pTable(newpData);
    }
    if (this.nodeName == 'path'){
        if (i == 0){
            update_Table(highValue);
            d3.selectAll('.TableRect').attr('fill',pColor(i));
        }else if( i == 1){
            update_Table(midValue);
            d3.selectAll('.TableRect').attr('fill',pColor(i));
        }else{
            update_Table(lowValue);
            d3.selectAll('.TableRect').attr('fill',pColor(i));
        }
    }
}

function mouseout() {
    if (this.nodeName == 'rect'){
        d3.select(this).attr('fill', 'steelblue');
    }
    if (this.nodeName == 'path'){
        console.log(11111);
        //重置所有数据
        updata_pTable(pData);
        update_Table(pDATAArray);
    }

}

//鼠标移入移出饼图时触发的事件
init_Table(pDATAArray);
//update_Table(newDataArr);
init_pTable(pData);



