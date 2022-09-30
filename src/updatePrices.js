import * as consoleObject from 'consoleObject.js'


//maybe make a new singleton class, with something like a map with name, call symbol, and the consoleObject, and maybe the hologram
//for now though...
let consoleMap = new Map()





fetchPrice("ethereum")

function fetchPrice(name){
    console.log("fetchPrice of, ", name)
    
    let url = `https://api.coincap.io/v2/assets/${name}`

    fetch(url,
    {method: 'GET',
    redirect: 'follow'})
    .then(function(responce) {

        return responce.json()
        
    })
    .then(result => {

        let price = result.data.priceUsd

        console.log(price)
        

        updatePrice(name, price)


    })
    .catch(error => {
        console.log('Error', error)
    })
}



function updatePrice(name, value){
    //if not already spawned, or it despawned...i.e. if it's not in the map of objects
    if(!consoleMap[name]){
        let console = new consoleObject(name, price);

        //Add the new object to the map!!!!
    }
    else {   //if the console display already exists in memory, just change the text of its hologram object
        let hologram = consoleMap[name].getChildHologram

        hologram.updateText(value)
    }
}

