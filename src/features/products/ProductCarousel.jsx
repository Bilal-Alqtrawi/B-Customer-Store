import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HorizontalProductCard from "./HorizontalProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductCarousel({ products }) {
  return (
    <div className="product-carousel-container relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
        breakpoints={{
          // Display two product at the same time in 768px and more Screens
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="pb-12">
            <HorizontalProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCarousel;
