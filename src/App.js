import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react';
import { InView } from 'react-intersection-observer';
import { useSpring, a } from 'react-spring/three';
import { Canvas, Dom, useThree } from 'react-three-fiber';

import AppContext from './AppContext';
import { PlaneImage } from './PlaneImage';
import { PlaneFlat } from './PlaneFlat';
import { Box } from './Box';

function Text({
  children,
  position,
  rotation,
  opacity,
  color = 'white',
  fontSize = 120
}) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext('2d');
    context.font = `bold ${fontSize}px "Mark OT"`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(children, 1024, 1024 - 120 / 2);
    return canvas;
  }, [children, width, height]);
  return (
    <mesh position={[0, 0, 0]}>
      <a.sprite scale={[scale, scale, 1]}>
        <a.spriteMaterial attach="material" transparent opacity={opacity}>
          <canvasTexture attach="map" image={canvas} premultiplyAlpha />
        </a.spriteMaterial>
      </a.sprite>
    </mesh>
  );
}

const Scene = () => {
  return (
    <>
      <Box offset={-1} factor={-0.1}>
        <PlaneFlat
          args={[14, 12]}
          rotation={[0, 0, Math.PI / 8]}
          color={'#000'}
        />
      </Box>

      <Box offset={0.2} factor={0.2}>
        <Dom>
          <h1 style={{ textAlign: 'center', color: 'white' }}>Potato</h1>
        </Dom>
      </Box>
      <Box offset={1} factor={1}>
        <PlaneImage
          src="/images/yingchih-jbdu2eByy1s-unsplash.jpg"
          args={[10, 6, 32, 32]}
          shift={75}
          frustumCulled={false}
          aspect={1.51}
        />
      </Box>
      <Box offset={2.5} factor={1}>
        <PlaneFlat args={[3, 2]} color={'#240072'} />
      </Box>
      <Box offset={2} factor={1}>
        <PlaneFlat args={[3, 2]} color={'#00FFD1'} />
      </Box>
      <Box offset={3} factor={1}>
        <PlaneFlat args={[3, 2]} color={'#00EEFF'} />
      </Box>
      <Box offset={4} factor={1}>
        <PlaneFlat args={[3, 2]} color={'#72006B'} />
      </Box>
      <Box offset={5} factor={1}>
        <PlaneFlat args={[3, 2]} color={'#AEFF00'} />
      </Box>
    </>
  );
};

const App = () => {
  const scrollArea = useRef();

  const [events, setEvents] = useState();

  const zoom = 75;

  const [{ section }, setSection] = useSpring(() => ({
    section: 0,
    immediate: true
  }));

  const [{ top, mouse }, set] = useSpring(() => ({
    top: 0,
    mouse: [0, 0],
    config: { mass: 1, tension: 260, friction: 26 }
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
        camera={{ zoom: zoom, position: [0, 0, 500] }}
        onCreated={state => setEvents(state.events)}
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
        {...events}
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
