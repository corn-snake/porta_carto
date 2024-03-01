export async function LittleMap(title){
    return await fetch('/?mapX:' + title)
        .then(e=>e.text())
        .then(t=>{
            window.tempLoadRevenge
                ? document.getElementById('hellspawner').textContent = document.getElementById('hellspawner').textContent
                    .split('\n').filter(Boolean).filter(s => s !== "\n")
                    .map(d => d.trim.startWith('window.tempLoadRevenge') ? `window.tempLoadRevenge = ${e};` : d)
                    .join('\n')
                : document.getElementById('hellspawner').textContent += "\nwindow.tempLoadRevenge = " + t;
            return t;
        }).then(()=><>
            <img src={`https://${window.tempLoadRevenge[image]}`} />
            <caption>{window.tempLoadRevenge[body]}</caption>
        </>);
}