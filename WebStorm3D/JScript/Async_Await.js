var aa = d3.select("body").select('div').nodes();
let url = "http://115.28.5.204:7004/SanD/svg/svg1.svg";

function CreatXML(xmlAdd) {
    const promise01 = new Promise((resolve) => {
        resolve(d3.xml(xmlAdd));
    });
    console.log(promise01);
    const promise02 = promise01.then(xml => {
        this.document.body.appendChild(xml.documentElement)
    });
    console.log(promise02);
    const promise03 = new Promise((resolve)=>{
        resolve(promise02);
    })
    console.log(promise03);
}

async function CreatSVG(svgAdd) {
    const newSVG = await CreatXML(svgAdd);
    console.log(CreatSVG(svgAdd));
    console.log(newSVG);
    return newSVG;
}

CreatSVG(url);