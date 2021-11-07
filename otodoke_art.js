/*
 * @name Shader Using Webcam
 * @description The webcam can be passed to shaders as a texture.
 * <br> To learn more about using shaders in p5.js: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js Shaders</a>
 */

let BASE_DISPLAY_WIDTH = 1920;
let BASE_DISPLAY_HEIGHT = 1080;
let canvas;
let theShader;
let img = [];
let num = 5;
let path = '5_1/1/';
let player;
let cg;

function getParam(name, url)
{
  if (!url)
  {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), 
    results = regex.exec(url);
  if (!results)
  {
    return null;
  }
  if (!results[2])
  {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function preload()
{
  let strClass = getParam('class');
  let strGroup = getParam('group');

  console.log( strClass, strGroup );

  theShader = loadShader( 'data/webcam.vert', 'data/webcam.frag' );
  for ( let i=0; i<num; i++ )
  {
    img[i] = loadImage( 'data/' + path + (i+1) + '.jpg' );
  }

  player = loadImage( 'data/kage.jpg' );
}

function setup()
{
  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  let x, y;
  if ( r1 < r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }
  x = ( windowWidth - w*float(BASE_DISPLAY_WIDTH) ) / 2;
  y = ( windowHeight - h*float(BASE_DISPLAY_HEIGHT) ) / 2;

  canvas = createCanvas( w*float(BASE_DISPLAY_WIDTH), h*float(BASE_DISPLAY_HEIGHT), WEBGL );
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('left', x);
  canvas.style('top', y);

  cg = createGraphics( width, height );

  frameRate( 30 );
}

function draw()
{
  resetShader();
  background( 0 );

  cg.background( 255 );
  cg.push();
  let s = 1.0 - float(mouseY)/float(height);
  cg.translate( mouseX-width, height/16 );
  cg.translate( player.width/2, player.height/2 );
  cg.scale( 0.5 + s*2.0 );
  cg.translate( -player.width/2, -player.height/2 );
  cg.image( player, 0, 0 );
  cg.pop();

  shader( theShader );
  theShader.setUniform('player', cg );
  {
    theShader.setUniform('tex0', img[0]);
    theShader.setUniform('tex1', img[1]);
    theShader.setUniform('tex2', img[2]);
    theShader.setUniform('tex3', img[3]);
    theShader.setUniform('tex4', img[4]);
  }
  theShader.setUniform( 'value', 1.0-float(mouseY)/float(height) );

  noStroke();
  rect( 0, 0 );
}