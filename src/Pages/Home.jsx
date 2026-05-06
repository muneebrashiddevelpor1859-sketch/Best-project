import React from 'react'
import Hero from '../Components/Hero'
import Blogs from '../Components/Blogs'
import Counter from '../Components/Counter'
import Small_cards from '../Components/Small_cards'
import Pricing from '../Components/Pricing'
import Contact from '../Components/Shared/Contact'
import Testominiels from '../Components/Testominiels'
import Static from '../Components/Static'

function Home() {
  return (
    <div>
        <Hero/>
        <Blogs/>
        <Counter/>
        <Small_cards/>
        <Pricing/>
        <Static/>
        <Testominiels/>
        <Contact/>
    
      
    </div>
  )
}

export default Home
