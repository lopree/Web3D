//Promise案例，如何使用async/await在同步加载的过程中解决问题
//选择SVG插入的DOM
var WhereSVG = d3.select("body").select('div').nodes();
let url = "http://115.28.5.204:7004/SanD/svg/svg1.svg";

function CreatXML(xmlAdd) {
    return new Promise((resolve) => {
        //d3.xml(xmlAdd).then（）本身是一个待解决(pending状态)的Promise,是一个异步
        const importSVG02 = d3.xml(xmlAdd).then(xml=>{
            this.WhereSVG[0].appendChild(xml.documentElement);
            console.log("Create SVG Done");
        })
        console.log("Start Create SVG");
        resolve(importSVG02);
    });

}

async function CreatSVG(svgAdd) {
    console.log("所有的开始之前");
    //在async中遇到await，先执行完Promise，然后继续执行后面的语句
    const newSVG = await CreatXML(svgAdd);
    var thisSvg = d3.select("#svg1").nodes();
    console.log("创建SVG完成，并且可获取到SVG元素");


    var allnode = d3.select("body").nodes();

    var nodelist = d3.select("#t1").nodes();
    console.log((nodelist[0]));

    var direct_ParentNode = nodelist.map(function (d) {
        return d.parentNode;
    });
    console.log(direct_ParentNode);


    all_Parents(nodelist[0]);

    console.log(all_Parents(nodelist[0]));
    return newSVG;

}
CreatSVG(url);


function all_Parents(dom){

    if(dom){
        all_Parents(dom.parentNode);
        console.log(dom.parentNode);
    }else {
        console.log("end")
    }
}





