//数据更新的例子（文字）
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let data02 = ["鱼香肉丝", "地三鲜", "龙井虾仁", "锅包肉", "糖醋里脊", "西湖醋鱼", "叫花鸡", "即墨老酒"];
const CreatedDiv = d3.select('body').append('div').attr('class', 'svg-rooter');
const svg = CreatedDiv.append('svg')
    .style("border", "green solid").attr("class", "svg-main")
    .attr("width", 300).attr("height", 100)
    .attr("viewBox", "0 0 300 100");
const width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");
const g2 = svg.append('g')
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
    .attr("id", "node00")
    .append("text");

function update(data, date) {

    // DATA JOIN
    // Join new data with old elements, if any.
    const text = g.selectAll("text")
        .data(data);

    const text02 = g2.data(date);

    // UPDATE
    // Update old elements as needed.
    text.attr("class", "update");
    text02.attr("class", "update");

    // ENTER
    // Create new elements as needed.
    //
    // ENTER + UPDATE
    // After merging the entered elements with the update selection,
    // apply operations to both.
    text.enter().append("text")
        .attr("class", "enter")
        .attr("x", function (d, i) {
            return i * 10;
        })//文本之间的缩进
        .attr("dy", ".5em")
        .merge(text)
        .text(function (d) {
            return d;
        });

    text02
        .text(function (d) {
            return d;
        });

    // EXIT
    // Remove old elements as needed.
    text.exit().remove();
    //清除多余的数据
    text02.exit();
}

// The initial display.
update(alphabet, data02);

// Grab a random sample of letters from the alphabet, in alphabetical order.
d3.interval(function () {
    update(d3.shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort(), d3.shuffle(data02)
        .slice(0, Math.floor(Math.random() * 26))
    );
}, 500);