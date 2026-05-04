uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv; // UV coordinates from the geometry, to later pass it to the fragment shader as a varying

// attribute float aRandom; // custom attribute from the geometry, to later pass it to the fragment shader as a varying
// varying float vRandom;
varying vec2 vUv; // varying to pass the UV coordinates to the fragment shader
varying float vElevation; // varying to pass the elevation value to the fragment shader


void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

  // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1; // Wave effect
  // modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1; // Wave effect
  modelPosition.z += elevation; // Combined wave effect


  // modelPosition.z += aRandom * 0.1; // Spikes

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // vRandom = aRandom; // pass the custom attribute to the fragment shader as a varying
  
  gl_Position = projectedPosition;

  vUv = uv; // pass the UV coordinates to the fragment shader as a varying
  vElevation = elevation; // pass the elevation value to the fragment shader as a varying

}