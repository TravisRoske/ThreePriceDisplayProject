//This file will contain a class of display objects. With 3d meshes.
//Its contructor will initiate the spawn animation, rising from the floor..
//Somehow it will have to interact with the floor tile above it....



class ConsoleObject {
    constructor(name, value){
        this.name = name;
        

        //load the model in
        //add the model to scene???????????????????????????
        //play the animation
        //once the animation is finished, spawn the hologram object



        this.childHologram = new HologramObject(name, value)

    }
    
}