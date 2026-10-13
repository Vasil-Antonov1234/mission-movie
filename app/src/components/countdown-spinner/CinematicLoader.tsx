import { useState, useEffect, Activity } from "react";
import styles from "./CinematicLoader.module.css";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CinematicLoaderProps = {
  startFrom?: number,  // countdown start in seconds (default: 60)
  pending: boolean, // State which indicates whether the component to appears or not
  onTimeout?: () => void // optional callback when countdown reaches 0
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const radius = 96;
const Circumference = 2 * Math.PI * radius;

// Sprocket hole positions around the ring (in degrees)
const sprocketAngles = [0, 45, 90, 135, 180, 225, 270, 315];

// Film strip cells — doubled for seamless loop
const filmCells = Array.from({ length: 20 }, (_, i) => i);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getMessages(seconds: number): { main: string; sub: string } {
  if (seconds > 45) return { main: "Warming up the projector", sub: "The server is waking up — won't be long." };
  if (seconds > 30) return { main: "Loading the reel", sub: "Almost there — grabbing the first frame." };
  if (seconds > 15) return { main: "Adjusting the focus", sub: "Just a few more seconds…" };
  return { main: "Any moment now", sub: "The show is about to start." };
}

function getSprocketPosition(angle: number, radius: number): { top: string; left: string } {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + (radius / 2.2) * Math.sin(rad);
  const y = 50 - (radius / 2.2) * Math.cos(rad);
  return { top: `${y}%`, left: `${x}%` };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function CinematicLoader({ startFrom = 60, pending, onTimeout }: CinematicLoaderProps) {
  const [seconds, setSeconds] = useState(startFrom);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeout?.();
      return;
    }

    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  // Progress ring — goes from full to empty as countdown decreases
  const progress = seconds / startFrom;
  const dashOffset = Circumference * (1 - progress);
  const { main, sub } = getMessages(seconds);

  return (
    <Activity mode={pending ? "visible" : "hidden"}>
      <div className={styles.overlay}>

        {/* ─── Circular countdown ─── */}
        <div className={styles.frame}>

          {/* SVG ring */}
          <svg className={styles.ring} viewBox="0 0 220 220">
            {/* Track */}
            <circle
              className={styles.ringTrack}
              cx="110"
              cy="110"
              r={radius}
            />
            {/* Progress */}
            <circle
              className={styles.ringProgress}
              cx="110"
              cy="110"
              r={radius}
              strokeDasharray={Circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>

          {/* Sprocket holes rotating around the ring */}
          <div className={styles.sprockets}>
            {sprocketAngles.map((angle) => {
              const pos = getSprocketPosition(angle, radius);
              return (
                <div
                  key={angle}
                  className={styles.sprocketHole}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>

          {/* Countdown number */}
          <div className={styles.countdown}>
            <span
              className={styles.countdownNumber}
              style={{ opacity: flash ? 0.4 : 1 }}
            >
              {seconds}
            </span>
            <span className={styles.countdownLabel}>seconds</span>
          </div>

        </div>

        {/* ─── Logo ─── */}
        <div className={styles.logo}>
          mission<span className={styles.logoAccent}>movie</span>
        </div>

        {/* ─── Message ─── */}
        <p className={styles.message}>
          {main} —{" "}
          <span className={styles.messageAccent}>{sub}</span>
        </p>
        <Activity mode={seconds <= 0 ? "visible" : "hidden"}>
          <p className={styles.endMessage}>Server took too long to respond.</p>
        </Activity>

        {/* ─── Film strip ─── */}
        <div className={styles.filmStrip}>
          <div className={styles.filmStripInner}>
            {[...filmCells, ...filmCells].map((_, i) => (
              <div key={i} className={styles.filmCell}>
                <div className={styles.filmCellHole} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </Activity>
  );
}
