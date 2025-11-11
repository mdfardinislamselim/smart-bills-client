import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useAxios from "../hook/useAxios";

const Banner = () => {
  const instance = useAxios();
  const [bills, setBills] = useState([]);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  // Listen for live theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Fetch latest bills
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get("/bills/latest3");
        setBills(data);
      } catch (err) {
        console.error("Error fetching latest bills:", err);
      }
    };
    fetchData();
  }, [instance]);


  const bgGradient =
    theme === "dark"
      ? "from-neutral/80 via-base-300 to-base-200"
      : "from-base-100 via-base-200 to-base-100";

  const overlayGradient =
    theme === "dark"
      ? "from-base-300/70 via-transparent to-transparent"
      : "from-base-100/60 via-transparent to-transparent";

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-r ${bgGradient} transition-colors duration-500`}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-fit"
      >
        {bills.map((bill) => (
          <SwiperSlide key={bill._id}>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 gap-10">
              {/* LEFT SECTION */}
              <div className="flex-1 text-center md:text-left space-y-5">
                <h1 className="text-3xl md:text-5xl font-extrabold text-primary drop-shadow-sm leading-tight">
                  {bill.title}
                </h1>

                <p className="text-base md:text-lg text-base-content/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                  {bill.description?.length > 180
                    ? bill.description.slice(0, 180) + "..."
                    : bill.description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm font-medium text-base-content/70">
                  <span className="badge badge-primary capitalize">
                    {bill.category}
                  </span>
                  <span>📅 {bill.date}</span>
                  <span>💰 {bill.amount} BDT</span>
                  <span>📍 {bill.location}</span>
                </div>

                <button className="btn btn-primary mt-6 px-6 py-2 text-base rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                  View Details
                </button>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex-1 relative flex justify-center items-center">
                {/* Glow Circle */}
                <div
                  className={`absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full blur-3xl opacity-40 ${
                    theme === "dark" ? "bg-primary/20" : "bg-secondary/30"
                  }`}
                ></div>

                {/* Image */}
                <img
                  src={bill.image}
                  alt={bill.title}
                  className={`relative z-10 w-60 h-60 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] object-cover rounded-2xl shadow-xl border-4 border-base-200 dark:border-base-300 hover:scale-105 transition-transform duration-500`}
                />

                {/* Floating Tag */}
                <div className="absolute bottom-4 right-5 sm:right-8 backdrop-blur-md bg-base-100/70 dark:bg-base-300/70 text-primary font-semibold px-4 py-2 rounded-lg shadow-md text-sm">
                  {bill.category}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none transition-colors duration-500`}
      ></div>
    </div>
  );
};

export default Banner;
