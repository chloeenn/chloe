import { motion, useScroll, useTransform } from "framer-motion";
import "./HeroArt.css";

export default function HeroArt() {
  const { scrollYProgress } = useScroll();

  // transform scroll into motion
  const moveX = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div className="hero-art">
      {/* Gradient blob */}
      <motion.div
        className="hero-blob"
        style={{
          x: moveX,
          rotate: rotate,
        }}
      />

      {/* Floating dots */}
      <div className="hero-dots">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="dot"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.8,
              opacity: 1,
            }}
          />
        ))}
      </div>

      {/* Name appears softly */}
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Hi, I'm Chloe 🌙
      </motion.h1>

      <motion.p
        className="hero-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Building clean, intentional things.
      </motion.p>
    </div>
  );
}
