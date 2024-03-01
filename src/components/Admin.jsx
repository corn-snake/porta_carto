import {MapSelection} from "./MapSelection.jsx";
import {WorldSelection} from "./WorldSelection.jsx";

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function doThing(formData){
    /*
    ideally: formData {
        title
        body
        image
        mapdata {
            parent
            coordinatestyle
            minXY
            maxXY
        }
    }
    */
}

export function Admin(){
    return (<>
        <form action="" method="post">
            <input type="text" name="mapTitle" id="mapTitle" />
            <input type="text" name="mapMap" id="mapMap" />
            <WorldSelection/>
            <MapSelection />
        </form>
    </>)
}