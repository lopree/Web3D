/*jshint esversion: 6 */
// 异步加载文件
// d3 V5版本使用xml的方式引入外部创建的SVG文件，以及可获取到其中的属性：

// 异步函数调用
// 通过 .then 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用

var aa = d3.select(document.body).select('div').nodes();
let url = "http://115.28.5.204:7004/SanD/svg/svg1.svg";
d3.xml(url).then(xml=>{
    this.aa[0].appendChild(xml.documentElement);
    //将查询等操作导入的SVG语句和创建svg的语句同时放入then()，就可以操作SVG；但是对动态数据的展示不太友好
    d3.select('#svg1').attr("class", "importSVG");
});

//下面的所有语句将和上面创建SVG的语句同时执行，因此下面的查询导入的svg时返回一个空的array，也就是所有对导入
//的SVG的操作聚在创建SVG之前，也就是会得到一个空的Array
var importSVG01 = d3.select("#svg1").nodes();
//console.log(importSVG01);

// 选取所有svg
var allnode = d3.select("body").selectAll('svg').nodes();
//选取所有id=node00的元素，返回一个list
var nodelist = d3.selectAll("#node00").nodes();
//查找列表中每个元素的直属上级
var direct_ParentNode = nodelist.map(function (d) {
    return d.parentNode;
});
//判断第二个参数中的元素是否是第一个元素的祖先
var Isparents = function (node, candidates) {
    var candidate,
        results,
        i,
        ilength;
    results = [];
    for (i = 0, ilength = candidates.length; i < ilength; i++) {
        candidate = candidates[i];
        if (candidate.contains(node[0])) {
            results.push(candidate);
        }
    }
    return results;
};

var is_parentsNode = Isparents(nodelist, allnode);

//console.log(is_parentsNode);

