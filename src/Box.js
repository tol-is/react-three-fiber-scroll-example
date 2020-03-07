import React, { createContext, useRef, useContext } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

import { useAppContext } from './AppContext';

const boxContext = createContext(0);

function Box({ children, offset = 0, factor = 1, ...props }) {
  const ref = useRef();
  const { offset: parentOffset, sectionHeight } = useBoxContext();
  const { top } = useAppContext();

  offset = offset !== undefined ? offset : parentOffset;

  useFrame(() => {
    ref.current.position.y = top.value * factor;
  });

  return (
    <boxContext.Provider value={{ offset }}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </boxContext.Provider>
  );
}

function useBoxContext() {
  const { zoom } = useAppContext();
  const { viewport } = useThree();
  const { offset } = useContext(boxContext);
  //
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  //
  const canvasWidth = viewportWidth / zoom;
  const canvasHeight = viewportHeight / zoom;
  //
  const sectionWidth = canvasWidth;
  const sectionHeight = canvasHeight;

  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    sectionWidth,
    sectionHeight
  };
}

export { Box };
