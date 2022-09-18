export const _VS = `
uniform sampler2D bumpTexture;
uniform float scale;

varying float height;

void main()
{
      vec4 bumpData = texture2D( bumpTexture, uv );
      
      height = bumpData.r+bumpData.g+bumpData.b;

      if (height>0.0) height=10.0;

      vec3 newPos = position + normal * height * scale;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0);
}
`;
