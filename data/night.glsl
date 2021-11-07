#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXTURE_SHADER

uniform sampler2D texture;
uniform sampler2D tex[5];

uniform vec2 texOffset;
varying vec4 vertColor;
varying vec4 vertTexCoord;

void main() 
{
  int num = 5;
  float rate = 0.4f;
  float rate2 = 0.8f;

  vec2 st = vertTexCoord.st;
  st.t = 1.0f - st.t;

  vec4 texColor = texture2D(texture, st.st).rgba;
  float d = 1.0f - texColor.r;
  if ( d < 0 )
  {
    d = 0;
  }
  if ( d > 1.0f )
  {
    d = 1.0f;
  }


  if( d > rate2 )
  {
    d = 1;
  }
  else
  if( d >= rate )
  {
    d = ( d - rate ) / (rate2-rate);
  }
  else
  {
    d = 0;
  }


  d *= float(num-1);
  d -= 0.001f;

  if ( d < 0.0f )
  {
    d = 0;
  }

  int d1 = int(floor(d));
  int d2 = int(floor(d))+1;

    float r1 = texture2D( tex[d1], st ).r;
    float g1 = texture2D( tex[d1], st ).g;
    float b1 = texture2D( tex[d1], st ).b;
    float r2 = texture2D( tex[d2], st ).r;
    float g2 = texture2D( tex[d2], st ).g;
    float b2 = texture2D( tex[d2], st ).b;
    float t = d - d1;
    gl_FragColor  = vec4( 
      r1*(1.0-t)+r2*t, 
      g1*(1.0-t)+g2*t,
      b1*(1.0-t)+b2*t,
      1.0 );

}