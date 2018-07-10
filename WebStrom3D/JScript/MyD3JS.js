//测试用D3.js文件
// d3 V5版本使用此xml的方式引入外部创建的SVG文件，以及可获取到其中的属性：
d3.xml("./Resources/rect01.svg")
    .then(xml => {
        this.document.body.appendChild(xml.documentElement);
    });

var nodelist = d3.select("#node00").nodes();
var allParentNode = nodelist.;
// var newG = d3.select(nodeParent[0]).attr("transform","translate(500,500)");
console.log(nodelist);
console.log(allParentNode);

var findidParent = d3.select("#test01").nodes().map(function(d){return d.parentNode;});
var newTestSVG = d3.select(findidParent[0]).attr("class","importSVG");

