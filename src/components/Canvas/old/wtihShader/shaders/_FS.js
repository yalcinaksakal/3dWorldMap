export const _FS = `

varying float height;

void main() {
      vec3 water = (smoothstep(0.01, 0.35, height) - smoothstep(0.34, 0.35, height)) * vec3(0.0, 0.0, 1.0);
      vec3 sand = (smoothstep(0.3, 0.33, height) - smoothstep(0.3, 0.4, height)) * vec3(0.76, 0.7, 0.5);
      vec3 grass = (smoothstep(0.3, 0.46, height) - smoothstep(0.33, 0.6, height)) * vec3(0.0, 0.6, 0.01);
      vec3 rock = (smoothstep(0.43, 0.75, height) - smoothstep(0.5, 0.85, height)) * vec3(0.28, 0.25, 0.23);
      vec3 snow = smoothstep(0.7, 0.8, height) * vec3(1.0, 1.0, 1.0);

      gl_FragColor = vec4 (water + sand + grass + rock + snow , 1.0);
}
`;
