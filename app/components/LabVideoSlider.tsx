"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const videos = [
  {
    id: "WxXephcOnjE",
    title: "Ikedo Mini Sumo Robot V2 ①試走",
  },
  {
    id: "XBuifDWe3XU",
    title: "Ikedo Mini Sumo Robot V2 ②稽古",
  },
  {
    id: "iRTPwwN2jh4",
    title: "Ikedo Mini Sumo Robot V2 ③Start&Stop Test",
  },
  {
    id: "1IkFBIiDPOo",
    title: "i（2025）",
  },
];

export default function LabVideoSlider() {
  return (
    <section className="w-full max-w-5xl mt-24 mb-10 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-[#4a6b34] mb-6 text-center">
        🎥 KOBITO LAB 動画ギャラリー
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {videos.map((v) => (
          <SwiperSlide key={v.id}>
            <Link
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              className="block"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-[#4a6b34]/40">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-auto"
                />
              </div>

              <p className="mt-3 text-sm text-[#4a6b34] font-semibold text-center">
                {v.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
