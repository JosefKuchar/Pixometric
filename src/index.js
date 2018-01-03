import Pixometric from "./core/core";
import config from "./core/config";
import World from "./world/world";
import Chunk from "./world/chunk";

// Add global config to Pixometric variable
Pixometric.config = config;

Pixometric.World = World;
Pixometric.Chunk = Chunk;

global.Pixometric = Pixometric;