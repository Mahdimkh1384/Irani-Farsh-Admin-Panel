import React from "react";

export default function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="block font-semibold text-accent mb-2">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border border-border-main bg-bg-surface text-text-main rounded-lg p-2" />
    </div>
  );
}
