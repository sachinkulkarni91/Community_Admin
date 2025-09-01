import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel'
import RotatingCard from './RotatingCard'

const CarouselComponent = () => {
  return (
    <div className="relative">
      <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      autoPlay
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3200,
            min: 0
          },
          items: 6,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#F75E6A' link=''></RotatingCard>
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#00257A' link=''></RotatingCard>
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#9E3039' link=''></RotatingCard>
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#6677E9' link=''></RotatingCard>
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#F75E6A' link=''></RotatingCard>
      <RotatingCard title='Knowledge & Resources' description='Grab curated playbooks & templates in a click ✦' color='#009FDA' link=''></RotatingCard>
    </Carousel>

    {/* Left fade */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white/60 to-transparent
 z-10" />

    {/* Right fade */}
    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/60 to-transparent
 z-10" />
  </div>

    
  )
}

export default CarouselComponent