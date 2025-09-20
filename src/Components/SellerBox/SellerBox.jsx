import React, { useState } from "react";

export default function SellerBox({ sellers, setSellers }) {
  const [newSeller, setNewSeller] = useState("");

  const handleAddSeller = () => {
    if (newSeller.trim() !== "") {
      setSellers([...sellers, newSeller]);
      setNewSeller("");
    }
  };

  const handleRemoveSeller = (index) => {
    setSellers(sellers.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block font-semibold text-purple-600 mb-2">فروشنده‌ها</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newSeller}
          onChange={(e) => setNewSeller(e.target.value)}
          placeholder="نام فروشنده..."
          className="flex-1 border rounded-lg p-2"
        />
        <button
          type="button"
          onClick={handleAddSeller}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          اضافه
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {sellers.map((seller, i) => (
          <span
            key={i}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {seller}
            <button
              type="button"
              onClick={() => handleRemoveSeller(i)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
