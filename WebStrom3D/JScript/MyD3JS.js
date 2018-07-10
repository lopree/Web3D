//测试用D3.js文件
// d3 V5版本使用此xml的方式更改：
d3.xml("./Resources/rect01.svg")
    .then(xml => {
        this.document.body.appendChild(xml.documentElement);
    });

