import React from "react";

export default function FeaturesForm({ features, setFeatures }) {
  const handleChange = (field, value) => {
    setFeatures({ ...features, [field]: value });
  };

  const fields = [
    { key: "quality", label: "کیفیت" },
    { key: "color", label: "رنگ" },
    { key: "shape", label: "شکل" },
    { key: "yarn", label: "جنس نخ" },
    { key: "warp", label: "جنس نخ تار" },
    { key: "weft", label: "جنس نخ پود" },
  ];

  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-purple-600">ویژگی‌ها</h2>
      {fields.map((f) => (
        <input
          key={f.key}
          type="text"
          placeholder={f.label}
          value={features[f.key]}
          onChange={(e) => handleChange(f.key, e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      ))}
    </div>
  );
}
