import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Slider = () => {
  const slides = [
    { id: 1, image: "/images/sliderImages/sliderImage1.jpg" },
    { id: 2, image: "/images/sliderImages/sliderImage2.jpg" },
    { id: 3, image: "/images/sliderImages/sliderImage3.jpg" },
    { id: 4, image: "/images/sliderImages/sliderImage4.jpg" },
    { id: 5, image: "/images/sliderImages/sliderImage5.jpg" },
  ];

  return (
    <Splide
      options={{
        type: "loop",
        pagination: false,
        lazyLoad: "nearby",
        breakpoints: {
          425: {
            arrows: false,
          },
          768: {
            arrows: true,
          },
        },
      }}
      aria-label="My Favorite Images"
    >
      {slides.map((slide) => (
        <SplideSlide key={slide.id}>
          <div
            className="w-full h-[400px] xl:h-[500px] bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
        </SplideSlide>
      ))}
    </Splide>
  );
};
export default Slider;
