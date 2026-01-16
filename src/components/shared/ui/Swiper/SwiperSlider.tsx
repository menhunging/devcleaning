import type { FC } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";

import "swiper/css";
import "yet-another-react-lightbox/styles.css";
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
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className={`image-carousel ${className ?? ""}`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          slidesPerView={slidesPerView}
          spaceBetween={16}
          navigation
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`Слайд ${idx + 1}`}
                className="image-carousel__img"
                onClick={() => {
                  setCurrentIndex(idx);
                  setOpen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={images.map((src) => ({ src }))}
        controller={{
          closeOnBackdropClick: true,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      />
    </>
  );
};

export default SwiperSlider;
