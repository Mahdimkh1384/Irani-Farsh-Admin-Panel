import React from "react";
const getAttributeValue = (product, key) => {
    let attributesArray = [];
    
    if (typeof product.attributes === 'string') {
        try {
            attributesArray = JSON.parse(product.attributes);
        } catch (e) {
            return "نامشخص";
        }
    } else if (Array.isArray(product.attributes)) {
        attributesArray = product.attributes;
    } else {
        return "نامشخص";
    }

    const attribute = attributesArray.find(attr => attr.key === key);
    return attribute ? attribute.value : "نامشخص";
};
const getImageUrl = (product) => {

  const BASE_IMAGE_URL = 'https://backend.sajlab.ir/uploads/products/'; 
  
  let imageArray = [];
  if (typeof product.images === 'string') {
      try {
          imageArray = JSON.parse(product.images);
      } catch (e) {
          return "https://via.placeholder.com/200";
      }
  } else if (Array.isArray(product.images)) {
      imageArray = product.images;
  }

  if (imageArray && imageArray.length > 0) {
      const firstImage = imageArray[0];
      if (typeof firstImage === 'string') {
          return BASE_IMAGE_URL + firstImage;
      } 
      if (firstImage instanceof File) {
          return URL.createObjectURL(firstImage);
      }
  }
  
  return "https://via.placeholder.com/200";
};


export default function ProductManagement({
  productList,
  search,
  setSearch,
  sortBy,
  setSortBy,
  handleDelete,
  handleEdit,
}) {
  
  const safeProductList = Array.isArray(productList) ? productList : [];

  const filteredProducts = safeProductList
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      
      if (sortBy === "priceHigh") return priceB - priceA;
      if (sortBy === "priceLow") return priceA - priceB;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col"
          >
            <img
              src={getImageUrl(p)}
              alt={p.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            
            <h2 className="font-bold text-base text-gray-800 truncate">
              {p.title}
            </h2>
            <p className="text-purple-600 font-semibold text-sm">
              {Number(p.price).toLocaleString()} تومان
            </p>
            <p className="text-black mt-1">
              کیفیت: {getAttributeValue(p, 'quality')}
            </p>
            <p className="text-black">
              رنگ: {getAttributeValue(p, 'color')}
            </p>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-lg"
              >
                ویرایش
              </button>
              <button
                onClick={() => p.id && handleDelete(p.id)}
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