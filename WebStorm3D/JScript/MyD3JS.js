/*jshint esversion: 6 */
// 异步加载文件
// d3 V5版本使用xml的方式引入外部创建的SVG文件，以及可获取到其中的属性：
var aa = d3.select("body").select('div').nodes();
// 异步函数调用
// 通过 .then 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用
// d3.xml("http://115.28.5.204:7004/SanD/svg/svg1.svg");
// then(xml => {
//     this.aa[0].appendChild(xml.documentElement);
//     d3.select("body").select('#svg1').attr("class", "importSVG");
// });

let url = "http://115.28.5.204:7004/SanD/svg/svg1.svg";
d3.xml(url).then(xml=>{
    this.aa[0].appendChild(xml.documentElement);
    d3.select("body").select('#svg1').attr("class", "importSVG");
})


// 查找指定id节点的直属父节点
var allnode = d3.select("body").selectAll('svg').nodes();
console.log(allnode);
var node_id = d3.select("#node00");
console.log(node_id);
var nodelist = d3.selectAll("#node00").nodes();
console.log(nodelist);
var direct_ParentNode = nodelist.map(function (d) {
    return d.parentNode;
});
console.log(direct_ParentNode);
// 查找指定id节点的所有父节点
var all_parents = function (node, candidates) {
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

var all_parentsNode = all_parents(nodelist, allnode);

console.log(all_parentsNode);

