"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const gardenVideos = [
  {
    id: "cjgapUBrTvY",
    title: "【祝 100万回再生】新聞紙でつくるゴミ袋",
  },
  {
    id: "8o1QmciBP0k",
    title: "クリスマスローズの植え替え・株分けは秋がオススメ",
  },
  {
    id: "rnBFk4wqJV0",
    title: "毎年良く咲く宿根草 ガウラ",
  },
  {
    id: "vyfxMgb7BzI",
    title: "オススメ植物 ガイラルディア",
  },
  {
    id: "bvl5A8mzcZE",
    title: "パンジー・ビオラを長く楽しむコツ",
  },
];

export default function GardenVideoSlider() {
  return (
    <section className="w-full max-w-4xl mt-24 mb-10 px-2 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#537a3b] mb-6 text-center">
        🎥 こびとのにわ 動画ギャラリー
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
        {gardenVideos.map((v) => (
          <SwiperSlide key={v.id}>
            <Link
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              className="block"
            >
              <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition border border-[#7ea97b]/40 bg-white">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-auto"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-[#537a3b] text-center">
                {v.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
