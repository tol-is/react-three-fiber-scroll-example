import React, { useCallback, useMemo, useState, useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { useSpring } from 'react-spring/three';
import { TextureLoader, LinearFilter } from 'three';

import { useAppContext } from './AppContext';

import './PlaneImageMaterial';

export const PlaneImage = ({ src, args, ...props }) => {
  const texture = useLoader(TextureLoader, src);

  const { top } = useAppContext();

  useMemo(() => (texture.minFilter = LinearFilter), [texture]);

  const material = useRef();

  const [hovered, setHover] = useState(false);

  const hover = useCallback(() => {
    setHover(true);
  }, []);
  const unhover = useCallback(() => {
    setHover(false);
  }, []);

  const { materialScale } = useSpring({ materialScale: hovered ? 0 : 0.2 });

  let last = top.value;
  useFrame(() => {
    material.current.opacity = 1.0;
    material.current.shift = (top.value - last) / 75;
    material.current.scale = materialScale.value;
    last = top.value;
  });

  return (
    <mesh {...props} onPointerOver={hover} onPointerOut={unhover}>
      <planeBufferGeometry attach="geometry" args={args} />
      <planeImageMaterial
        ref={material}
        attach="material"
        map={texture}
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default PlaneImage;
