import { useEffect, useState } from "react";

// ── Inline Bar Chart ──────────────────────────────────────────────────
function BarChart({ data, color1 = "#FF6B35", color2 = "#FFE66D" }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t); }, []);
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bchart-wrap">
      {data.map((d, i) => (
        <div key={i} className="bchart-col">
          <div className="bchart-bar-track">
            <div
              className="bchart-bar"
              style={{
                height: animated ? `${(d.value / max) * 100}%` : "0%",
                background: `linear-gradient(180deg, ${color1}, ${color2})`,
                transitionDelay: `${i * 60}ms`,
              }}
            />
          </div>
          <div className="bchart-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Inline Line Sparkline (SVG) ───────────────────────────────────────
function LineChart({ data }) {
  const w = 560, h = 140;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (w - 40) + 20;
    const y = h - 20 - ((d.value - min) / (max - min || 1)) * (h - 40);
    return [x, y];
  });
  const polyline = pts.map(p => p.join(",")).join(" ");
  const area = `M${pts[0][0]},${h - 20} ${pts.map(p => `L${p[0]},${p[1]}`).join(" ")} L${pts[pts.length-1][0]},${h-20} Z`;

  return (
    <div className="linechart-wrap">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FF6B35" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.0"  />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaGrad)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#FF6B35" stroke="#08080F" strokeWidth="2" />
        ))}
      </svg>
      <div className="linechart-x-labels">
        {data.map((d, i) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  );
}

// ── Donut Chart (SVG) ─────────────────────────────────────────────────
function DonutChart({ slices }) {
  const r = 60, cx = 80, cy = 80, stroke = 28;
  const circumference = 2 * Math.PI * r;
  const total = slices.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
        {slices.map((s, i) => {
          const dash = (s.value / total) * circumference;
          const gap  = circumference - dash;
          const el = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", opacity: 0.9 }}
            />
          );
          offset += dash;
          return el;
        })}
        <text x={cx} y={cy + 6} textAnchor="middle" fill="#F2F2F8" fontSize="18" fontWeight="800" fontFamily="Space Grotesk,sans-serif">
          {total}
        </text>
      </svg>
      <div className="donut-legend">
        {slices.map((s, i) => (
          <div key={i} className="donut-legend-item">
            <span className="donut-dot" style={{ background: s.color }} />
            <span>{s.label}</span>
            <span className="donut-val">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Analytics ────────────────────────────────────────────────────
function Analytics() {
  const stats = [
    { label: "Total Orders",    value: "1,284", trend: "+12.5%", icon: "📦" },
    { label: "Revenue",         value: "₹84K",  trend: "+8.2%",  icon: "💰" },
    { label: "Menu Items",      value: "48",    trend: "+3",     icon: "🍽" },
    { label: "Avg Order Value", value: "₹650",  trend: "+5.1%",  icon: "⭐" },
    { label: "Tables Occupied", value: "22/30", trend: "+4",     icon: "🨑" },
    { label: "New Customers",   value: "341",   trend: "+18%",   icon: "👥" },
  ];

  const revenueData = [
    { label: "Mon", value: 12400 },
    { label: "Tue", value: 9800  },
    { label: "Wed", value: 15200 },
    { label: "Thu", value: 18100 },
    { label: "Fri", value: 22400 },
    { label: "Sat", value: 31000 },
    { label: "Sun", value: 26700 },
  ];

  const ordersData = [
    { label: "Jan", value: 280 },
    { label: "Feb", value: 340 },
    { label: "Mar", value: 310 },
    { label: "Apr", value: 450 },
    { label: "May", value: 520 },
    { label: "Jun", value: 480 },
    { label: "Jul", value: 610 },
  ];

  const categoryData = [
    { label: "Main Course" , value: 480,  color: "#FF6B35" },
    { label: "Starter"     , value: 310,  color: "#FFE66D" },
    { label: "Dessert"     , value: 180,  color: "#A78BFA" },
    { label: "Beverage"    , value: 220,  color: "#00D97E" },
    { label: "Special"     , value: 94,   color: "#FF4D6D" },
  ];

  const topItems = [
    { name: "Butter Chicken Masala", orders: 284, revenue: 124960 },
    { name: "Saffron Biryani",       orders: 231, revenue: 110880 },
    { name: "Truffle Mushroom Pizza",orders: 198, revenue: 114840 },
    { name: "Dal Makhani Black",     orders: 176, revenue: 51040  },
    { name: "Paneer Tikka Royale",   orders: 159, revenue: 50880  },
  ];
  const maxOrders = Math.max(...topItems.map(t => t.orders));

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-subtitle">Real-time insights into your restaurant performance</p>
      </div>

      {/* KPI stat cards */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div className="stat-label">{s.label}</div>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-trend">↑ {s.trend} this week</div>
          </div>
        ))}
      </div>

      {/* Revenue line chart */}
      <div className="chart-card" style={{ marginBottom: 22 }}>
        <div className="chart-card-header">
          <span className="chart-card-title">Daily Revenue</span>
          <span className="chart-card-period">This week</span>
        </div>
        <div style={{ padding: "24px 28px 12px" }}>
          <LineChart data={revenueData} />
        </div>
      </div>

      {/* Orders bar + Category donut — side by side */}
      <div className="analytics-row">
        <div className="chart-card analytics-col">
          <div className="chart-card-header">
            <span className="chart-card-title">Monthly Orders</span>
            <span className="chart-card-period">Jan – Jul 2025</span>
          </div>
          <div style={{ padding: "20px 24px 24px" }}>
            <BarChart data={ordersData} color1="#A78BFA" color2="#FF6B35" />
          </div>
        </div>

        <div className="chart-card analytics-col">
          <div className="chart-card-header">
            <span className="chart-card-title">Orders by Category</span>
            <span className="chart-card-period">All time</span>
          </div>
          <div style={{ padding: "20px 24px 24px", display: "flex", justifyContent: "center" }}>
            <DonutChart slices={categoryData} />
          </div>
        </div>
      </div>

      {/* Top dishes table */}
      <div className="chart-card" style={{ marginTop: 22 }}>
        <div className="chart-card-header">
          <span className="chart-card-title">Top Performing Dishes</span>
          <span className="chart-card-period">All time</span>
        </div>
        <div style={{ padding: "0 4px 4px" }}>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Dish Name</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item, i) => (
                <tr key={i}>
                  <td className="rank-cell">{i + 1}</td>
                  <td className="dish-name-cell">{item.name}</td>
                  <td>{item.orders}</td>
                  <td style={{ color: "var(--success)", fontWeight: 700 }}>₹{item.revenue.toLocaleString()}</td>
                  <td>
                    <div className="pop-bar-track">
                      <div
                        className="pop-bar-fill"
                        style={{ width: `${(item.orders / maxOrders) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;