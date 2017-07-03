import World from "../world/world";

export default class Pixometric {
    constructor(stage, world, textures, textureLookup) {
        
        this.world = world;

        // Make this global for easy access 
        Pixometric.stage = stage;
        Pixometric.textures = textures;
        Pixometric.textureLookup = textureLookup;
    }
}