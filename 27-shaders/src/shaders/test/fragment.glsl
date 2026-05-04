precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

// varying float vRandom; // receive from the vertex shader
varying vec2 vUv; // receive the UV coordinates from the vertex shader
varying float vElevation; // receive the elevation value from the vertex shader

void main() {
  // gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
  vec4 textureColor = texture2D(uTexture, vUv); // Sample the texture using the fragment's screen coordinates
  textureColor.rgb += vElevation; // Add the elevation value to the texture color for a wave effect
  gl_FragColor = textureColor;
}