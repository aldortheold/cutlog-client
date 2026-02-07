export default function MetricCard({ value, max, label, color }) {

    const fill = Math.min(value / max * 100, 100);
    const over = value > max;

    return (
        <div className="totals-card" style={{ border: `2px solid ${color}` }}>
            <div style={{ position: "absolute", inset: 0, backgroundColor: `${color}37` }} />
            <div style={{ position: "absolute", inset: 0, backgroundColor: color, width: `${fill}%`, transition: "width 0.3s ease-out" }} />
            <span className="number" style={{ position: "relative", zIndex: 1 }}>
                {(label == "Added sugar" || label == "Calories") && over && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>}
                {value}
            </span>
            <span className="metric" style={{ position: "relative", zIndex: 1 }}>
                {label}
            </span>
        </div>
    );
}
