import React from "react";

export default function PerformanceSelector({ performance, setPerformance }) {
  const options = ["عالی", "متوسط", "بد"];

  return (
    <div>
      <label className="block font-semibold text-purple-600 mb-2">عملکرد</label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name="performance"
              value={opt}
              checked={performance === opt}
              onChange={(e) => setPerformance(e.target.value)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
