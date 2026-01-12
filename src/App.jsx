import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Hero from './components/Hero/Hero'

function App() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <Menu />
      <Hero search={search} />
    </div>
  )
}

export default App
