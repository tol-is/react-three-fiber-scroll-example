import React from 'react';

export const PlaneFlat = ({ args, color, ...props }) => {
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={args} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
};

export default PlaneFlat;
