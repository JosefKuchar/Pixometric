// Create renderer
var renderer = PIXI.autoDetectRenderer(640, 480);

// Remove blur on scaling pixel art
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// Append canvas to HTML document
document.body.appendChild(renderer.view);

// Create stage (container)
var stage = new PIXI.Container();

// Create Pixometric world
var world = new Pixometric.World();

// Init Pixometric
var pixometric;

// Load texture atlas
PIXI.loader
    .add("sheet.json")
    .load(function() {
        // Run Pixometric code
        pixometric = new Pixometric(stage, world, PIXI.loader.resources["sheet.json"].textures, ["dirt"]);

        for (var i = 0; i < 4096; i++) {
            pixometric.world.aoL[1][0].voxels[i] = 0;
        }
        pixometric.world.aoL[1][0].voxels[4095] = 1;

        pixometric.world.generateSprites();


        // Run game loop
        render();
    })

// Get current time for FPS calculations
var lastLoop = new Date;
function render() {
    // Calculate FPS
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    console.log(fps);

    // Request new game frame
    requestAnimationFrame(render);

    // Call PIXI rendering function
    renderer.render(stage);
}