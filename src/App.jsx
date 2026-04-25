import { useState } from 'react'
import Scene from './components/Scene'
import UnitPanel from './components/UnitPanel'

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [hoveredUnit, setHoveredUnit] = useState(null)

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#1a1a1a',
    }}>
      <Scene
        hoveredUnit={hoveredUnit}
        onUnitClick={setSelectedUnit}
        onUnitHover={setHoveredUnit}
      />
      <UnitPanel unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
    </div>
  )
}