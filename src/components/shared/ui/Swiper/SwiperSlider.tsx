import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "./SwiperSlider.scss";

type ImageCarouselProps = {
  images: string[];
  className?: string;
  slidesPerView: number;
};

const SwiperSlider: FC<ImageCarouselProps> = ({
  images,
  className,
  slidesPerView,
}) => {
  return (
    <div className={`image-carousel ${className ?? ""}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={slidesPerView}
        spaceBetween={16}
        navigation
        // loop
        // pagination={{ clickable: true }}
        // autoplay={{ delay: 3500, disableOnInteraction: false }}
        // a11y={{ enabled: true }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Слайд ${idx + 1}`}
              className="image-carousel__img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
