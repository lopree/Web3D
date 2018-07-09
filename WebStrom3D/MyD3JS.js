// var svg = d3.select('body').append("svg").attr('class',"svg-main");
//
// var myimage = svg.append('image')
//     .attr('xlink:href', 'http://lorempixel.com/200/200/').attr("x",0).attr("y",0)
//     .attr('width', 200)
//     .attr('height', 200);

d3.xml("rect01.svg")
    .then(xml => {
        this.document.body.appendChild(xml.documentElement);
    });

