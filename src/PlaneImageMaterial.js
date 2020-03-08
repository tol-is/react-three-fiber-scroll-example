import { ShaderMaterial, Color } from 'three';
import { extend } from 'react-three-fiber';

class PlaneImageMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `uniform float scale;
      uniform float shift;
      varying vec2 vUv;
      void main() {
        vec3 pos = position;
        pos.y = pos.y + ((sin(uv.x * 3.1415926535897932384626433832795) * shift * 12.0) * 0.125);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `uniform sampler2D texture;
      uniform float hasTexture;
      uniform float shift;
      uniform float scale;
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;
      void main() {
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale) + vec2(0.5, 0.5);
        vec4 cr = texture2D(texture, p);
        gl_FragColor = vec4(cr.r, cr.g, cr.b, opacity);
      }`,
      uniforms: {
        texture: { value: null },
        hasTexture: { value: 0 },
        scale: { value: 0 },
        shift: { value: 0 },
        opacity: { value: 1 },
        color: { value: new Color('white') }
      }
    });
  }

  set scale(value) {
    this.uniforms.scale.value = value;
  }

  get scale() {
    return this.uniforms.scale.value;
  }

  set shift(value) {
    this.uniforms.shift.value = value;
  }

  get shift() {
    return this.uniforms.shift.value;
  }

  set map(value) {
    this.uniforms.hasTexture.value = !!value;
    this.uniforms.texture.value = value;
  }

  get map() {
    return this.uniforms.texture.value;
  }

  get color() {
    return this.uniforms.color.value;
  }

  get opacity() {
    return this.uniforms.opacity.value;
  }

  set opacity(value) {
    if (this.uniforms) this.uniforms.opacity.value = value;
  }
}

extend({ PlaneImageMaterial });
