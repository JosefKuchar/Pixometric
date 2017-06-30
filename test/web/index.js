// Create renderer
var renderer = PIXI.autoDetectRenderer(640, 480);

// Append canvas to HTML document
document.body.appendChild(renderer.view);

// Create stage (container)
var stage = new PIXI.Container();

// Init Pixometric
var pixometric = new Pixometric(stage);