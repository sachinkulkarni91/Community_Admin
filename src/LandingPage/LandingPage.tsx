import FeatureTile from './components/FeatureTile'
import Footer from './components/Footer'
import PartnerTile from './components/PartnerTile'
import Navbar from './components/Navbar'
import ImageTile from './components/ImageTile'
import ScreenTile from './components/ScreenTile'
import TestimonialTile from './components/TestimonialTile'

const LandingPage = () => {
  return (
  <div className='w-full h-full pt-[72px] flex-col justify-center gap-20'>
      <Navbar></Navbar>
      <ImageTile></ImageTile>
      <FeatureTile></FeatureTile>
      <PartnerTile></PartnerTile>
      <ScreenTile></ScreenTile>
      <TestimonialTile></TestimonialTile>
      <Footer></Footer>
    </div>
  )
}

export default LandingPage