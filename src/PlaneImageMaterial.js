import { ShaderMaterial } from 'three';
import { extend } from 'react-three-fiber';

class PlaneImageMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vec3 pos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D texture;
      uniform float scale;
      varying vec2 vUv;
      void main() {
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
        vec4 cr = texture2D(texture, p);
        gl_FragColor = cr;
      }`,
      uniforms: {
        texture: { value: null },
        scale: { value: 0 }
      }
    });
  }

  set scale(value) {
    this.uniforms.scale.value = value;
  }

  get scale() {
    return this.uniforms.scale.value;
  }

  set map(value) {
    this.uniforms.texture.value = value;
  }

  get map() {
    return this.uniforms.texture.value;
  }
}

extend({ PlaneImageMaterial });
