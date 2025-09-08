'use client';
import React, { useState, useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

// Animations
const sliderAnimation = `
@keyframes slideZoomOut {
  0% { opacity: 1; transform: scale(1);}
  100% { opacity: 0; transform: scale(1.08);}
}
@keyframes slideZoomIn {
  0% { opacity: 0; transform: scale(0.96);}
  100% { opacity: 1; transform: scale(1);}
}
@keyframes logoDropZoom {
  0% {
    opacity: 0;
    transform: translate(-50%, -120px) scale(0.92);
  }
  60% {
    opacity: 1;
    transform: translate(-50%, 20px) scale(1.08);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, 0px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0px) scale(1);
  }
}
@keyframes logoUpZoom {
  0% {
    opacity: 1;
    transform: translate(-50%, 0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -120px) scale(0.92);
  }
}
`;

// Default sliderData for >=500px
const defaultSliderData = [
  { id: 1, image: assets.hero, bgColor: "#eaeaea" },
  { id: 2, image: assets.hero00, bgColor: "#f7e7d9" },
  { id: 3, image: assets.hero3, bgColor: "#e3eafc" },
];

const mobileSliderData = [
  { id: 1, image: assets.header_headphone_image, bgColor: "#eaeaea" },
  { id: 2, image: assets.blue1, bgColor: "#f7e7d9" },
  { id: 3, image: assets.girl_with_headphone_image, bgColor: "#e3eafc" },
];

const HeaderSlider = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const sliderRef = useRef();
  const intervalRef = useRef();

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use mobileSliderData for <500px, else defaultSliderData
  const sliderData = windowWidth < 500 ? mobileSliderData : defaultSliderData;

  // Auto slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    }, 4000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [currentSlide, sliderData.length]);

  // Logo drop on scroll in/out
  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2) {
        setLogoVisible(true);
      } else {
        setLogoVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSlideChange = (index) => {
    if (index === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Responsive height: full screen on large, auto on md and below, iPad Pro max-height
  const sliderHeight = "h-auto lg:h-screen";
  const ipadProStyle = `
    @media (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
      .header-slider-section { height: 600px !important; min-height: 0 !important; }
    }
    @media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait) {
      .header-slider-section { height: 500px !important; min-height: 0 !important; }
    }
  `;

  // Only reduce height for devices below 500px
  const customSectionStyle =
    windowWidth < 500
      ? {
          height: `${window.innerHeight / 2}px`,
          minHeight: 0,
        }
      : {};

  return (
    <>
      <style>{sliderAnimation}</style>
      <style>{ipadProStyle}</style>
      <div
        ref={sliderRef}
        className={`overflow-hidden relative w-full ${sliderHeight} header-slider-section`}
        style={{ zIndex: 10, position: "relative", ...customSectionStyle }}
      >
        <div className="relative w-full h-full min-h-[320px]">
          {/* Previous Slide (zoom out effect) */}
          {isAnimating && prevSlide !== null && (
            <div
              className="absolute inset-0 w-full h-full z-0"
              style={{
                background: sliderData[prevSlide].bgColor,
                animation: "slideZoomOut 0.7s linear forwards",
              }}
            >
              <Image
                src={sliderData[prevSlide].image}
                alt={`Slide ${prevSlide + 1}`}
                fill
                sizes="100vw"
                className="object-cover w-full h-full"
                style={{
                  objectPosition: "center 70%",
                }}
                priority={false}
                loading="eager"
              />
            </div>
          )}
          {/* Current Slide (zoom in effect) */}
          <div
            className="absolute inset-0 w-full h-full z-10"
            style={{
              background: sliderData[currentSlide].bgColor,
              animation: isAnimating ? "slideZoomIn 0.7s linear" : "none",
            }}
          >
            <Image
              src={sliderData[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              fill
              sizes="100vw"
              className="object-cover w-full h-full"
              priority
              style={{
                objectPosition: "center 70%",
              }}
              loading="eager"
            />

            {/* Centered drop logo with drop/up animation */}
            <div className="absolute inset-0 flex flex-col items-center justify-start z-20 pointer-events-none">
              <div
                className="flex flex-col items-center w-full"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  left: "50%",
                  position: "absolute",
                  // Responsive top for dropped logo
                  top: windowWidth < 500 ? "10px" : "-80px",
                  transform: "translateX(-50%)",
                  width: "100%",
                  pointerEvents: "none",
                  animation: logoVisible
                    ? "logoDropZoom 1.2s cubic-bezier(.39,.575,.565,1) both"
                    : "logoUpZoom 0.7s cubic-bezier(.39,.575,.565,1) both",
                  transition: "animation 0.2s",
                }}
              >
                <Image
                  src={assets.heropng}
                  alt="logo"
                  width={2000}
                  height={800}
                  className="mx-auto sm:mt-4"
                  priority
                  style={{
                    background: "transparent",
                    maxWidth: "90vw",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            {/* Tagline and button at the bottom */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center z-30 pointer-events-none"
              style={{
                bottom: 24,
                width: "100%",
              }}
            >
              {/* Always show slider-bottom-content, including at 500px */}
              <div
                className="slider-bottom-content flex flex-col items-center gap-4 slider-logo-spacing"
                style={{
                  pointerEvents: "auto",
                  textAlign: "center",
                  color: "white",
                  marginBottom: "24px",
                }}
              >
                <h2
                  className="text-sm sm:text-xl md:text-xl font-medium max-w-xl px-6"
                >
                  Pure Fashion Redefined. Experience Elegance with Every Stitch.
                </h2>
                <button
                  className="bg-white text-black px-8 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-black hover:text-white transition"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Shop Our New Collections
                </button>
              </div>
              {/* Responsive adjustments for small screens */}
              <style>{`
                @media (max-width: 480px) {
                  .slider-bottom-content {
                    gap: 10px !important;
                    margin-bottom: 10px !important;
                  }
                  .slider-bottom-content h2 {
                    font-size: 0.95rem !important;
                  }
                  .slider-bottom-content button {
                    font-size: 0.85rem !important;
                    padding: 6px 16px !important;
                  }
                }
                @media (max-width: 480px) {
                  .slider-logo-spacing {
                    margin-bottom: 18px !important;
                  }
                }
              `}</style>
            </div>

            {/* Slider dots */}
            <div className="flex items-center justify-center gap-3 mt-8 absolute bottom-6 left-0 right-0 z-40">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`h-3 w-3 rounded-full border-2 border-black transition-all duration-300 ${
                    currentSlide === index ? "bg-grey-500 scale-110 shadow-lg" : "bg-gray-400/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  tabIndex={0}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to prevent overlap with next section */}
      <div
        aria-hidden="true"
        style={{
          height: "0",
          marginBottom: "0",
        }}
        className="
          block
          lg:h-0
          xl:h-0
          2xl:h-0
          md:h-0
          sm:h-0
        "
      ></div>
      {/* Responsive spacer for HeaderSlider height */}
      <style>{`
        .header-slider-spacer {
          display: block;
          width: 100%;
        }
        @media (min-width: 1536px) {
          .header-slider-spacer { height: 100vh; }
        }
        @media (min-width: 1024px) and (max-width: 1535px) {
          .header-slider-spacer { height: 100vh; }
        }
        @media (min-width: 820px) and (max-width: 1366px) and (orientation: landscape) {
          .header-slider-spacer { height: 600px; }
        }
        @media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait) {
          .header-slider-spacer { height: 500px; }
        }
        @media (max-width: 1023px) {
          .header-slider-spacer { height: auto; min-height: 320px; }
        }
      `}</style>
      <div className="header-slider-spacer" />
    </>
  );
});



export default HeaderSlider;
