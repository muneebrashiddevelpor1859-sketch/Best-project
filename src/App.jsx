import React from 'react'
import Navbar from './Components/Shared/Navbar'
import Footer from './Components/Shared/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import Pricing from './Components/Pricing'
import Contact from './Components/Shared/Contact'
import Explore from './Components/Explore'
import CardCounter from './Components/CardCounter'
import Shopping from './Components/Shopping'

import { motion } from "framer-motion";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Watch from './Components/Watch'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Fade In
</motion.div>

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Services' element={<Services/>}/>
        <Route path='/Pricing' element={<Pricing/>}/>
        <Route path='/Explore' element={<Explore/>}/>
        <Route path='/CardCounter' element={<CardCounter/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Shopping' element={<Shopping/>}/>
        <Route path='/Watch' element={<Watch/>}/>


      </Routes>



      <Footer/>

      


    </BrowserRouter>
  )
}

export default App

