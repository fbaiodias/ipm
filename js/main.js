// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 300);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame( animate );

// create a texture from an image path
var texture = PIXI.Texture.fromImage("img/bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

setEventHandlers();

function animate() {

  requestAnimFrame( animate );

  // just for fun, lets rotate mr rabbit a little
  bunny.rotation += 0.1;

  // render the stage
  renderer.render(stage);
}

// Event handlers!!
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);
};

// Keyboard key down
function onKeydown(e) {
	keys.onKeyDown(e);
};

// Keyboard key up
function onKeyup(e) {
	keys.onKeyUp(e);
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	renderer.resize(window.innerWidth, window.innerHeight);
};
