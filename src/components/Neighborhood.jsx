import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { units } from '../data/units'

const getUnitColor = (name) => {
  const unit = units[name]
  if (!unit) return null

  switch (unit.status) {
    case 'available': return '#4caf50'
    case 'reserved':  return '#ff9800'
    case 'sold':      return '#f44336'
    default:          return null
  }
}

export default function Neighborhood({ hoveredUnit, onUnitClick, onUnitHover, onLoaded }) {
  const { scene } = useGLTF('/3D/scene.gltf')
  const originalColors = useRef({})
  const previousHovered = useRef(null)

  // center model + apply status colors once on load
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)

    // store original colors and apply status colors
    scene.traverse((child) => {
      if (child.isMesh) {
        originalColors.current[child.name] = child.material.color.clone()
        const color = getUnitColor(child.name)
        if (color) {
          child.material = child.material.clone()
          child.material.color.set(color)
          originalColors.current[child.name] = child.material.color.clone()
        }
      }
    })

    onLoaded()
  }, [scene])

  // only update the specific mesh that changed on hover
  useEffect(() => {
    if (previousHovered.current) {
      const prev = scene.getObjectByName(previousHovered.current)
      if (prev && prev.isMesh && originalColors.current[prev.name]) {
        prev.material.color.copy(originalColors.current[prev.name])
      }
    }

    if (hoveredUnit) {
      const obj = scene.getObjectByName(hoveredUnit)
      if (obj && obj.isMesh) {
        obj.material.color.set('#f0a500')
      }
    }

    previousHovered.current = hoveredUnit
  }, [hoveredUnit, scene])

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation()
        const name = e.object.name
        if (units[name]) {
          onUnitClick(units[name])
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        const name = e.object.name
        if (units[name]) {
          document.body.style.cursor = 'pointer'
          onUnitHover(name)
        }
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        onUnitHover(null)
      }}
    />
  )
}

useGLTF.preload('/3D/scene.gltf')