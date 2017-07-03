// Create renderer
var renderer = PIXI.autoDetectRenderer(640, 480);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// Append canvas to HTML document
document.body.appendChild(renderer.view);

// Create stage (container)
var stage = new PIXI.Container();


// Create Pixometric world
var world = new Pixometric.World();

// Init Pixometric
var pixometric;



const loader = PIXI.loader;
loader
    .add("sheet.json")
    .load(function() {
        pixometric = new Pixometric(stage, world, PIXI.loader.resources["sheet.json"].textures, ["dirt"]);
        pixometric.world.generateSprites();
        render();
    })


var lastLoop = new Date;
function render() {
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    console.log(fps);
    requestAnimationFrame(render);
    renderer.render(stage);
}