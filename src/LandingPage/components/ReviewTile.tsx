import ReviewCard from './ReviewCard'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';

const ReviewTile = () => {
  return (
    <div className='flex-col gap-4 my-16'>
      <div className='text-4xl my-4'>Built for businesses. Rated by experts</div>
      <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay
      autoPlaySpeed={2000}
      centerMode={true}
      className="my-8"
      containerClass="container-with-dots"
      customTransition="all 8s linear"
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
            max: 3000,
            min: 1024
          },
          items: 3,
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
      slidesToSlide={2}
      swipeable
      transitionDuration={6000}
    >
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
    </Carousel>
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay
      autoPlaySpeed={2000}
      centerMode={false}
      className="my-8"
      containerClass="container-with-dots"
      customTransition="all 8s linear"
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
            max: 3000,
            min: 1024
          },
          items: 4,
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
      slidesToSlide={2}
      swipeable
      transitionDuration={6000}
    >
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      <ReviewCard icon='icon1.png' name='Dazzle Healer' title='Front End Developer' review='I’ve used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.' stars={5} ></ReviewCard>
      
    </Carousel>
    </div>
  )
}

export default ReviewTile