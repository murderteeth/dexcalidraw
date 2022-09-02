import React from 'react'
import { useDrawings } from '../../hooks/useDrawings'
import Tile from './Tile'

export default function Drawings() {
  const {drawings} = useDrawings()
  return <div className={`
    p-8 grid grid-flow-row grid-cols-1 gap-0
    sm:grid-cols-2 sm:gap-8
    lg:grid-cols-3
    2xl:grid-cols-6`}>
    {drawings.map(drawing => <Tile key={drawing} drawingId={drawing} />)}
  </div>
}