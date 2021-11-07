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

function preload()
{
  theShader = loadShader( 'data/webcam.vert', 'data/webcam.frag' );
  for ( let i=0; i<num; i++ )
  {
    img[i] = loadImage( 'data/' + path + (i+1) + '.jpg' );
  }
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

  frameRate( 30 );
}

function draw()
{
  resetShader();
  background( 0 );
  shader( theShader );

  {
    theShader.setUniform('tex0', img[0]);
    theShader.setUniform('tex1', img[1]);
    theShader.setUniform('tex2', img[2]);
    theShader.setUniform('tex3', img[3]);
    theShader.setUniform('tex4', img[4]);
  }
  theShader.setUniform( 'value', float(mouseY)/float(height) );

  noStroke();
  rect( 0, 0 );
}