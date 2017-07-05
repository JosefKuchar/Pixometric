import Pixometric from "./core/core";
import config from "./core/config";
import World from "./world/world";

// Add global config to Pixometric variable
Pixometric.config = config;
Pixometric.World = World;

global.Pixometric = Pixometric;