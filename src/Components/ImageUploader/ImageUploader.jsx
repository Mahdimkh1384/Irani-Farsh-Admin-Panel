import React from "react";

export default function ImageUploader({ images, setImages }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block font-semibold text-purple-600 mb-2">عکس محصول</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="w-full border rounded-lg p-2"
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
