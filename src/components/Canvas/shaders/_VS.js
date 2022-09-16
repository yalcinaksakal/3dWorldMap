export const _VS = `
uniform float[4000] heights;

varying float height;

void main()
{
      vec3 newPos = position + normal * heights[int(gl_VertexID/5)]/50.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0);

}
`;
