import { FontLoader } from '../myFontLoader.js'  //only exists locally in src file, not to be found elsewhere
import { TextGeometry } from '../TextGeometry.js'





const loader = new FontLoader();
const font = loader.load(
    'font.json', //somehow this resolves to the static folder, with or without the ./

	// onLoad callback
	function ( font ) {
		// do something with the font
        const geometry = new TextGeometry( 'Fonts and static files have to be in the static folder...The path automatically resolves there...', {
            font: font,
            size: 250,
            height: 70,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        const material2 = new THREE.MeshStandardMaterial()
        material2.color = new THREE.Color(0x00ff00)

        // Mesh
        const text = new THREE.Mesh(geometry,material2)
        scene.add(text)

        text.scale.set(.0025,.0025,.0025)
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);
        




// let bitcoin = new THREE.Mesh()
// scene.add(bitcoin)
// bitcoin.scale.set(.0045,.0045,.0045)
// bitcoin.position.set(0,1,0)

// function getBitcoin(){
    
// }

