import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useAxios from "../hook/useAxios";

const Baner = () => {
  const instance = useAxios();
  const [bills, setBills] = useState([]);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  // Detect theme change instantly
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

  // Fetch bills
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get("/bills/latest3");
        setBills(data);
      } catch (error) {
        console.error("Error fetching latest bills:", error);
      }
    };
    fetchData();
  }, [instance]);

  // Dynamic background classes
  const bgGradient =
    theme === "dark"
      ? "from-gray-900 via-gray-800 to-gray-900"
      : "from-blue-50 via-indigo-100 to-blue-50";

  const overlayGradient =
    theme === "dark"
      ? "from-gray-900/40 via-transparent to-transparent"
      : "from-white/40 via-transparent to-transparent";

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-r ${bgGradient} transition-colors duration-500`}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-[500px]"
      >
        {bills.map((bill) => (
          <SwiperSlide key={bill._id}>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-16 gap-10">
              {/* LEFT SECTION */}
              <div className="flex-1 space-y-6">
                <h1
                  className={`text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md ${
                    theme === "dark" ? "text-white" : "text-blue-900"
                  }`}
                >
                  {bill.title}
                </h1>

                <p
                  className={`text-base md:text-lg max-w-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {bill.description?.length > 180
                    ? bill.description.slice(0, 180) + "..."
                    : bill.description}
                </p>

                <div
                  className={`flex flex-wrap items-center gap-4 text-sm font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="badge badge-primary capitalize">
                    {bill.category}
                  </span>
                  <span>📅 {bill.date}</span>
                  <span>💰 {bill.amount} BDT</span>
                  <span>📍 {bill.location}</span>
                </div>

                <button
                  className={`btn mt-6 px-8 py-2 text-lg rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
                    theme === "dark" ? "btn-accent" : "btn-primary"
                  }`}
                >
                  View Details
                </button>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex-1 relative flex justify-center items-center">
                <div
                  className={`absolute w-80 h-80 md:w-[450px] md:h-[450px] rounded-full blur-3xl opacity-60 ${
                    theme === "dark" ? "bg-blue-500/10" : "bg-blue-300/30"
                  }`}
                ></div>

                <img
                  src={bill.image}
                  alt={bill.title}
                  className={`relative z-10 w-72 h-72 md:w-[400px] md:h-[400px] object-cover rounded-2xl shadow-2xl border-4 transition-transform duration-500 hover:scale-105 ${
                    theme === "dark" ? "border-gray-700" : "border-white"
                  }`}
                />

                <div
                  className={`absolute z-10 bottom-3 right-8 backdrop-blur-md px-4 py-2 rounded-xl shadow-md font-semibold ${
                    theme === "dark"
                      ? "bg-gray-800/80 text-blue-300"
                      : "bg-white/70 text-blue-700"
                  }`}
                >
                  {bill.category}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none transition-colors duration-500`}
      ></div>
    </div>
  );
};

export default Baner;
