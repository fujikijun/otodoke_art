precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform float value;

void main() 
{
  int num = 5;
  float rate = 0.4;
  float rate2 = 0.8;

  vec2 st = vTexCoord;
  st.t = 1.0 - st.t;

  float d = value;

  d *= float(num-1);
  d -= 0.001;

  if ( d < 0.0 )
  {
    d = 0.0;
  }

  int d1 = int( floor(d) );
  int d2 = int( floor(d) ) + 1;
  float r1, g1, b1, r2, g2, b2;
  if( d1 == 0 )
  {
    r1 = texture2D( tex0, st ).r;
    g1 = texture2D( tex0, st ).g;
    b1 = texture2D( tex0, st ).b;
    r2 = texture2D( tex1, st ).r;
    g2 = texture2D( tex1, st ).g;
    b2 = texture2D( tex1, st ).b;
  }
  else if( d1 == 1 )
  {
    r1 = texture2D( tex1, st ).r;
    g1 = texture2D( tex1, st ).g;
    b1 = texture2D( tex1, st ).b;
    r2 = texture2D( tex2, st ).r;
    g2 = texture2D( tex2, st ).g;
    b2 = texture2D( tex2, st ).b;
  }
  else if( d1 == 2 )
  {
    r1 = texture2D( tex2, st ).r;
    g1 = texture2D( tex2, st ).g;
    b1 = texture2D( tex2, st ).b;
    r2 = texture2D( tex3, st ).r;
    g2 = texture2D( tex3, st ).g;
    b2 = texture2D( tex3, st ).b;
  }
  else
  {
    r1 = texture2D( tex3, st ).r;
    g1 = texture2D( tex3, st ).g;
    b1 = texture2D( tex3, st ).b;
    r2 = texture2D( tex4, st ).r;
    g2 = texture2D( tex4, st ).g;
    b2 = texture2D( tex4, st ).b;
  }

    float t = d - float( d1 );
    gl_FragColor  = vec4( 
      r1*(1.0-t)+r2*t, 
      g1*(1.0-t)+g2*t,
      b1*(1.0-t)+b2*t,
      1.0 );
}