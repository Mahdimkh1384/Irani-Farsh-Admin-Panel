import React from "react";

export default function ProductManagement({
  productList,
  search,
  setSearch,
  sortBy,
  setSortBy,
  handleDelete,
  handleEdit,
}) {
  const filteredProducts = productList
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="جستجو بر اساس عنوان..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex w-[30%] border rounded-lg p-2 placeholder:text-purple-600 border-purple-600"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">مرتب‌سازی</option>
          <option value="priceHigh">بیشترین قیمت</option>
          <option value="priceLow">کمترین قیمت</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col"
          >
            <img
              src={
                p.images[0]
                  ? URL.createObjectURL(p.images[0])
                  : "https://via.placeholder.com/200"
              }
              alt={p.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="font-bold text-base text-gray-800 truncate">
              {p.title}
            </h2>
            <p className="text-purple-600 font-semibold text-sm">
              {p.price.toLocaleString()} تومان
            </p>
            <p className="text-black mt-1">
              کیفیت: {p.features.quality || "نامشخص"}
            </p>
            <p className="text-black">
              رنگ: {p.features.color || "نامشخص"}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-lg"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 text-center col-span-4">
            هیچ محصولی یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}
