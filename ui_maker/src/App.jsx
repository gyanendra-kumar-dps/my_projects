import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {useDrag,useDrop,DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import './App.css'

function Box() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { name: 'My Box' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        width: 100,
        height: 100,
        background: 'blue',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      Drag me
    </div>
  )
}

function DropArea() {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: (item) => alert(`Dropped ${item.name}`),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      style={{
        width: 200,
        height: 200,
        background: isOver ? 'green' : 'gray',
      }}
    >
      Drop here
    </div>
  )
}
function Example() {
  return (
    <>
      <Box />
      <DropArea />
    </>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <DndProvider backend={HTML5Backend}>
      <Example />
   </DndProvider>
  )
}

export default App
