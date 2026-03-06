import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"),  600);
    const t2 = setTimeout(() => setPhase("exit"),  2400);
    const t3 = setTimeout(() => onFinish(),         3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div className={`splash-root splash-${phase}`}>
      {/* Particle ring */}
      <div className="splash-ring splash-ring-1" />
      <div className="splash-ring splash-ring-2" />
      <div className="splash-ring splash-ring-3" />

      <div className="splash-content">
        {/* Logo icon */}
        <div className="splash-icon-wrap">
          <div className="splash-icon">🍽</div>
        </div>

        {/* Brand */}
        <div className="splash-brand">FoodHub</div>
        <div className="splash-tagline">PREMIUM DINING EXPERIENCE</div>

        {/* Progress bar */}
        <div className="splash-progress-track">
          <div className={`splash-progress-bar splash-progress-${phase}`} />
        </div>

        <div className="splash-loading-text">Loading your experience…</div>
      </div>
    </div>
  );
}

export default SplashScreen;
