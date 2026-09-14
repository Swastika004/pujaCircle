import React, { useRef, useState, useEffect, useCallback } from "react";
import { useAnimationFrame } from "framer-motion";

export interface VisualItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  objectPosition?: string;
}

const DEFAULT_ITEMS: VisualItem[] = [
  {
    id: "havan-ceremony",
    image: "/images/havan_fire_ceremony.jpg",
    title: "Vedic Havan & Agnihotra",
    subtitle: "Sacred Agni Ritual & Purifying Mantras",
    objectPosition: "center center",
  },
  {
    id: "griha-pravesh",
    image: "/images/hero_vedic_puja.jpg",
    title: "Griha Pravesh Vastu",
    subtitle: "Auspicious Home Sanctification",
    objectPosition: "center 40%",
  },
  {
    id: "samagri-thali",
    image: "/images/samagri_ritual_thali.jpg",
    title: "Pure Samagri Vidhi",
    subtitle: "Scriptural Herbal Offerings & Preparation",
    objectPosition: "center center",
  },
  {
    id: "devotee-blessing",
    image: "/images/devotee_family_blessing.jpg",
    title: "Devotee Family Ashirwad",
    subtitle: "Direct In-Person Vedic Purohit Blessings",
    objectPosition: "center 35%",
  },
  {
    id: "vedic-purohit",
    image: "/images/verified_purohit_portrait.jpg",
    title: "Gurukul Scholar Purohits",
    subtitle: "Verified Lineage & Scriptural Chanting",
    objectPosition: "center 12%",
  },
];

interface HeroVisualCarouselProps {
  items?: VisualItem[];
  holdDuration?: number; // Time in ms card stays in center (e.g. 2400ms)
  transitionDuration?: number; // Time in ms for transition glide (e.g. 700ms)
}

// Snappy easeOutQuart curve for modern responsive feel
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export const HeroVisualCarousel: React.FC<HeroVisualCarouselProps> = ({
  items = DEFAULT_ITEMS,
  holdDuration = 2500,
  transitionDuration = 700,
}) => {
  const totalReps = 3;
  const carouselItems = Array.from({ length: totalReps }, () => items).flat();
  const totalCards = carouselItems.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive dimensions: Large landscape cards with tight spacing
  const [dimensions, setDimensions] = useState({
    cardWidth: 720,
    cardHeight: 450,
    cardGap: 24,
  });

  const updateDimensions = useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 640) {
      setDimensions({
        cardWidth: Math.min(w * 0.88, 380),
        cardHeight: 240,
        cardGap: 14,
      });
    } else if (w < 1024) {
      setDimensions({
        cardWidth: Math.min(w * 0.75, 540),
        cardHeight: 340,
        cardGap: 18,
      });
    } else if (w < 1440) {
      setDimensions({ cardWidth: 680, cardHeight: 425, cardGap: 22 });
    } else {
      setDimensions({ cardWidth: 800, cardHeight: 500, cardGap: 26 });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const { cardWidth, cardHeight, cardGap } = dimensions;
  const step = cardWidth + cardGap;
  const totalTrackWidth = totalCards * step;

  // Staggered stepped transition state
  const currentScrollRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);
  const animStartTimeRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);
  const dwellTimerRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartScrollRef = useRef<number>(0);

  // Trigger a smooth transition to next or previous slide
  const goToOffset = useCallback(
    (deltaSteps: number, now: number) => {
      startScrollRef.current = currentScrollRef.current;
      targetScrollRef.current = currentScrollRef.current + deltaSteps * step;
      animStartTimeRef.current = now;
      isTransitioningRef.current = true;
      dwellTimerRef.current = 0;
    },
    [step],
  );

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    isTransitioningRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = currentScrollRef.current;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    let nextScroll = dragStartScrollRef.current - deltaX;
    nextScroll =
      ((nextScroll % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
    currentScrollRef.current = nextScroll;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    // Snap to nearest slide with fast spring
    const deltaX = e.clientX - dragStartXRef.current;
    const nearestIndex = Math.round(currentScrollRef.current / step);
    const snapTarget = nearestIndex * step;

    startScrollRef.current = currentScrollRef.current;
    targetScrollRef.current =
      Math.abs(deltaX) > 40
        ? deltaX < 0
          ? (Math.floor(dragStartScrollRef.current / step) + 1) * step
          : (Math.ceil(dragStartScrollRef.current / step) - 1) * step
        : snapTarget;

    animStartTimeRef.current = performance.now();
    isTransitioningRef.current = true;
    dwellTimerRef.current = 0;
  };

  // Card click to center
  const handleCardClick = (distFromCenter: number) => {
    if (Math.abs(distFromCenter) > cardWidth * 0.4) {
      const direction = distFromCenter > 0 ? 1 : -1;
      goToOffset(direction, performance.now());
    }
  };

  // 60/120fps hardware-accelerated animation frame loop
  useAnimationFrame((time, delta) => {
    if (!containerRef.current) return;

    if (!isDraggingRef.current) {
      // 1. If currently transitioning between slides
      if (isTransitioningRef.current) {
        const elapsed = time - animStartTimeRef.current;
        const progress = Math.min(elapsed / transitionDuration, 1);
        const eased = easeOutQuart(progress);

        currentScrollRef.current =
          startScrollRef.current +
          (targetScrollRef.current - startScrollRef.current) * eased;

        if (progress >= 1) {
          currentScrollRef.current = targetScrollRef.current;
          isTransitioningRef.current = false;
          dwellTimerRef.current = 0;
        }
      }
      // 2. If resting at center (dwell timer)
      else if (!isHoveredRef.current) {
        dwellTimerRef.current += delta;
        if (dwellTimerRef.current >= holdDuration) {
          goToOffset(1, time);
        }
      }
    }

    // Wrap scroll position continuously within track bounds
    const scroll =
      ((currentScrollRef.current % totalTrackWidth) + totalTrackWidth) %
      totalTrackWidth;
    const containerWidth = containerRef.current.clientWidth;
    const containerCenter = containerWidth / 2;
    const halfTrack = totalTrackWidth / 2;

    // Apply 3D Coverflow transformation to each card
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;

      const rawX = idx * step - scroll;
      const mod =
        ((rawX % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
      const distFromCenter = mod > halfTrack ? mod - totalTrackWidth : mod;

      // Cull cards far outside viewport
      const screenX = containerCenter + distFromCenter - cardWidth / 2;
      const isVisible =
        screenX + cardWidth > -cardWidth &&
        screenX < containerWidth + cardWidth;

      if (!isVisible) {
        card.style.visibility = "hidden";
        return;
      }
      card.style.visibility = "visible";

      const normalized = distFromCenter / cardWidth;
      const clampedNorm = Math.max(-1.5, Math.min(1.5, normalized));

      // 3D Coverflow angles: center card is straight and prominent; side cards angled inward
      const rotateY = -clampedNorm * 22; // Inward angle facing center
      const translateZ = -Math.abs(clampedNorm) * 80; // Recessed depth
      const scale = 1 - Math.min(Math.abs(clampedNorm) * 0.08, 0.15);
      const zIndex = Math.round(50 - Math.abs(clampedNorm) * 10);
      const brightness = 1 - Math.min(Math.abs(clampedNorm) * 0.22, 0.35);

      card.style.zIndex = `${zIndex}`;
      card.style.filter = `brightness(${brightness})`;
      card.style.transform = `translate3d(${distFromCenter}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.dataset.dist = `${distFromCenter}`;
    });
  });

  return (
    <div
      ref={containerRef}
      className="w-full relative py-2 sm:py-4 select-none overflow-hidden perspective-[1400px] active:cursor-grabbing touch-pan-y"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Background Soft Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 max-w-full h-100 rounded-full bg-linear-to-r from-amber-400/8 via-[#991B1B]/10 to-amber-400/8 blur-3xl pointer-events-none -z-10" />

      {/* 3D Perspective Stage */}
      <div
        style={{
          height: `${cardHeight + 40}px`,
        }}
        className="relative w-full transform-3d flex items-center justify-center overflow-visible"
      >
        {carouselItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onClick={(e) => {
              const el = e.currentTarget;
              const dist = parseFloat(el.dataset.dist || "0");
              handleCardClick(dist);
            }}
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              left: "50%",
              marginLeft: `-${cardWidth / 2}px`,
              top: "50%",
              marginTop: `-${cardHeight / 2}px`,
              transformOrigin: "center center",
              willChange: "transform, filter",
            }}
            className="absolute rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(197,154,63,0.25)] border-2 border-[#C59A3F]/50 bg-stone-950 transition-[border-color,box-shadow] duration-300 hover:border-amber-400 group cursor-pointer"
          >
            {/* Cinematic Landscape Photo */}
            <img
              src={item.image}
              alt={item.title}
              style={{
                objectPosition: item.objectPosition || "center center",
              }}
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
              draggable={false}
            />

            {/* Very Light Black Overlay to Highlight Text */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/15 to-transparent pointer-events-none" />

            {/* Cylindrical Highlight Sheen */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

            {/* Clean Minimal Typography (Crisp with Drop Shadow) */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-left pointer-events-none flex flex-col justify-end">
              <span className="text-xs sm:text-sm font-bold font-sans uppercase tracking-widest text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {item.subtitle}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-1 mt-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroVisualCarousel;
