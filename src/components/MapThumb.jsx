import { LittleMap } from "./LittleMap.jsx";

export function MapThumbMany(titleP){
    /*
        eraDB schema:
            title
            parent // i.e. worldName
            children
    */
    function reloadShowcase(showcaseid){
    }
    const title = titleP.title,
        cEras = titleP.cEras;
    console.log(cEras);
    fetch('/?aIE:' + cEras[0] + ':w:' + title)
        .then(d=>d.text())
        .then(e=>{
            window.tempLoad
                ? document.getElementById('hellspawner').textContent = document.getElementById('hellspawner').textContent
                    .split('\n').filter(Boolean).filter(s=>s!=="\n")
                    .map(d=>d.trim.startWith('window.tempLoad') ? `window.tempLoad = ${e};` : d)
                : document.getElementById('hellspawner').textContent += "\nwindow.tempLoad = " + e;
            return e;
        })
        .then(() =>document.querySelector("#" + title + "-showcase .toRender").render(<>
                {window.tempLoad.children.map(m=><span class="worldMapMaps">
                    <NavLink to={"/map/" + m}>
                        <LittleMap title={m} />
                    </NavLink>
                </span>)}</>));
    return (<div class="worldShowcase" id={title + "-showcase"}>
        <div class="worldMapEra">
            <img src={"https://" + window.tempLoad.url} id={title + "-thumb"} />
            <caption>{title[0].toUpperCasse() + title.substring(1)}, in {cEras[0]}</caption>
            <div class="worldMapDesc">
                <p class="worldMapP">
                    <span>{cEras.map(e => <span onClick={reloadShowcase(title + "-showcase")}>e</span>)}</span>
                </p>
                <p class="worldMapP toRender"></p>
            </div>
        </div>
    </div>);
        /*
            mapDB schema:
                title
                body
                image
                mapdata {
                    parent // i.e. worldName
                    age
                    coordinatestyle
                    minXY
                    maxXY
                }
        */
}
export function SingleMapThumb (titleP) {
    const title = titleP.title;
    fetch('/?mapX:' + title)
        .then(d => d.text())
        .then(e => {
            window.tempLoad
            ? document.getElementById('hellspawner').textContent = document.getElementById('hellspawner').textContent
                .split('\n').filter(Boolean).filter(s => s !== "\n")
                .map(d => d.trim.startWith('window.tempLoad') ? `window.tempLoad = ${e};` : d)
            : document.getElementById('hellspawner').textContent += "\nwindow.tempLoad = " + e;
            return e;
        })
        .then(()=>document.querySelector("#" + title + "-smallthumb").render(<>
            <img src={"https://" + window.tempLoad[0].image} />
            <caption>{title[0].toUpperCasse() + title.substring(1)}</caption>
        </>));
    return (<div id={title + "-smallthumb"}>
    </div>);
}