export default function MetricCard({ value, max, label, color }) {

    const fill = Math.min(value / max * 100, 100);

    return (
        <div className="totals-card" style={{ border: `2px solid ${color}` }}>
            <div style={{ position: "absolute", inset: 0, backgroundColor: `${color}37` }} />
            <div style={{ position: "absolute", inset: 0, backgroundColor: color, width: `${fill}%`, transition: "width 0.3s ease-out" }} />
            <span className="number" style={{ position: "relative", zIndex: 1 }}>
                {(label == "Added sugar" || label == "Calories") && value > max && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>}
                {label == "Added sugar" && value <= max * 0.5 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>}
                {value}
            </span>
            <span className="metric" style={{ position: "relative", zIndex: 1 }}>
                {label}
            </span>
        </div>
    );
}
