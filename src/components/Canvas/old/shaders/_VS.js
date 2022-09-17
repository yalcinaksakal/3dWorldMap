export const _VS = `
uniform float[5000] heights;

varying float height;

void main()
{
      height= heights[gl_VertexID];
      vec3 newPos = position + normal * height / 20.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0);
}
`;
