import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Neighborhood from './Neighborhood'

function LoadingScreen() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '18px',
      letterSpacing: '2px',
      pointerEvents: 'none',
    }}>
      Loading...
    </div>
  )
}

export default function Scene({ hoveredUnit, onUnitClick, onUnitHover }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {!loaded && <LoadingScreen />}
      <Canvas
        camera={{ position: [0, 15, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={80}
        />
        <Suspense fallback={null}>
          <Neighborhood
            hoveredUnit={hoveredUnit}
            onUnitClick={onUnitClick}
            onUnitHover={onUnitHover}
            onLoaded={() => setLoaded(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}