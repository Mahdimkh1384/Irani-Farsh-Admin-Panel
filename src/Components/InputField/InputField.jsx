import React from "react";

export default function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="block font-semibold text-purple-600 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}
