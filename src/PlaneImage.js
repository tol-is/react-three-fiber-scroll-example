import React, { useCallback, useState, useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { useSpring } from 'react-spring/three';
import { TextureLoader } from 'three';

import './PlaneImageMaterial';

export const PlaneImage = ({ src, args, ...props }) => {
  const texture = useLoader(TextureLoader, src);
  const material = useRef();

  const [hovered, setHover] = useState(false);
  const hover = useCallback(() => {
    console.log('hover');
    setHover(true);
  }, []);
  const unhover = useCallback(() => {
    console.log('unhover');
    setHover(false);
  }, []);

  const { materialScale } = useSpring({ materialScale: hovered ? 0.15 : 0.0 });

  useFrame(() => {
    material.current.scale = materialScale.value;
  });

  return (
    <mesh {...props} onPointerOver={hover} onPointerOut={unhover}>
      <planeBufferGeometry attach="geometry" args={args} />
      <planeImageMaterial
        ref={material}
        attach="material"
        map={texture}
        transparent
      />
    </mesh>
  );
};

export default PlaneImage;
