import React, { Suspense, useCallback, useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';
import { useSpring, a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';

import AppContext from './AppContext';
import { PlaneImage } from './PlaneImage';
import { Box } from './Box';

const Scene = () => {
  return (
    <>
      <Box offset={0} factor={1}>
        <PlaneImage
          src="/images/yingchih-jbdu2eByy1s-unsplash.jpg"
          args={[500, 300]}
        />
      </Box>
      <Box offset={1} factor={1}>
        <mesh>
          <planeGeometry attach="geometry" args={[500, 300]} />
          <a.meshBasicMaterial attach="material" color={'#240072'} />
        </mesh>
      </Box>
      <Box offset={2} factor={1}>
        <mesh>
          <planeGeometry attach="geometry" args={[500, 300]} />
          <a.meshBasicMaterial attach="material" color={'#00FFD1'} />
        </mesh>
      </Box>
      <Box offset={3} factor={1}>
        <mesh>
          <planeGeometry attach="geometry" args={[500, 300]} />
          <a.meshBasicMaterial attach="material" color={'#00EEFF'} />
        </mesh>
      </Box>
      <Box offset={4} factor={1}>
        <mesh>
          <planeGeometry attach="geometry" args={[500, 300]} />
          <a.meshBasicMaterial attach="material" color={'#72006B'} />
        </mesh>
      </Box>
      <Box offset={5} factor={1}>
        <mesh>
          <planeGeometry attach="geometry" args={[500, 300]} />
          <a.meshBasicMaterial attach="material" color={'#AEFF00'} />
        </mesh>
      </Box>
    </>
  );
};

const App = () => {
  const scrollArea = useRef();

  const zoom = 1;

  const [{ section }, setSection] = useSpring(() => ({
    section: 0,
    immediate: true
  }));

  const [{ top, mouse }, set] = useSpring(() => ({
    top: 0,
    mouse: [0, 0],
    config: { mass: 1, tension: 500, friction: 21 }
  }));

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    [set]
  );
  const onScroll = useCallback(
    e => {
      set({ top: e.target.scrollTop });
    },
    [set]
  );

  const onSectionInview = useCallback(
    idx => {
      setSection({ section: idx });
    },
    [setSection]
  );

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Canvas
        className="canvas"
        concurrent
        pixelRatio={1}
        orthographic
        camera={{ zoom: zoom, position: [0, 0, 250] }}
      >
        <AppContext.Provider
          value={{
            section,
            zoom,
            top,
            mouse
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </AppContext.Provider>
      </Canvas>
      <div
        ref={scrollArea}
        className="scroll-area"
        onScroll={onScroll}
        onMouseMove={onMouseMove}
      >
        {new Array(6).fill().map((_, index) => (
          <InView
            threshold={0.8}
            onChange={inView => inView && onSectionInview(index)}
            className="scroll-page"
            key={index}
            id={'0' + index}
            style={{ height: `100vh` }}
          />
        ))}
      </div>
    </>
  );
};

export default App;
