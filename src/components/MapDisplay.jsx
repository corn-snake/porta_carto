import { useParams, ReactDOM } from "./../deps.js";
import { SingleMapThumb } from "./MapThumb.jsx";

export function MapDisplay(){
    const {id} = useParams();
    return (<div>here would be the Things: Map{id}</div>
    )
}

export function GalleryDisplay(){
    let result = [];
    fetch('/?worlds')
        .then(d => d.text())
        .then(d => document.getElementById("hellspawner").textContent = `window.worlds = ${d};`)
        .then(() => {
            for (const world in window.worlds)
                result.push(<SingleMapThumb title={window.worlds[world].title} cEras={window.worlds[world].eras} />);
            return result;
        }).then(r => ReactDOM.render(r, document.getElementById('galDisp')));
    return (<div id="galDisp"></div>)
        /*you really REALLY shouldn't do willy-nilly injections like this. but my antivirus seems to think it's ok so anything goes*/
}