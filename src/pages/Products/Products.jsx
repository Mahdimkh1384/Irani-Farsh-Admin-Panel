import React, { useState } from "react";
import Swal from "sweetalert2";

import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import InputField from "../../Components/InputField/InputField";
import FeaturesForm from "../../Components/FeaturesForm/FeaturesForm";
import SellerBox from "../../Components/SellerBox/SellerBox";
import PerformanceSelector from "../../Components/PerformanceSelector/PerformanceSelector";
import ProductManagement from "../../Components/Product management/Product management";

export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("فرش دستباف");
  const [features, setFeatures] = useState({
    quality: "",
    color: "",
    shape: "",
    yarn: "",
    warp: "",
    weft: "",
  });
  const [sellers, setSellers] = useState([]);
  const [performance, setPerformance] = useState("");
  const [price, setPrice] = useState("");
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "حذف محصول",
      text: "آیا مطمئنی می‌خوای این محصول حذف بشه؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن ❌",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        setProductList(productList.filter((p) => p.id !== id));
        Swal.fire("حذف شد", "محصول با موفقیت حذف شد", "success");
      }
    });
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setSize(product.size);
    setCategory(product.category);
    setImages(product.images);
    setFeatures(product.features);
    setSellers(product.sellers);
    setPerformance(product.performance);
    setPrice(product.price);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "آیا مطمئنی؟",
      text: editingProduct
        ? "می‌خوای این محصول ویرایش بشه؟"
        : "می‌خوای این محصول اضافه بشه؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: editingProduct
        ? "بله، ویرایش کن ✏️"
        : "بله، اضافه کن ✅",
      cancelButtonText: "انصراف ❌",
      confirmButtonColor: "#9333ea",
    }).then((result) => {
      if (result.isConfirmed) {
        const newProduct = {
          id: editingProduct ? editingProduct.id : Date.now(),
          title,
          size,
          category,
          images,
          features,
          sellers,
          performance,
          price: Number(price),
        };

        if (editingProduct) {
          setProductList(
            productList.map((p) =>
              p.id === editingProduct.id ? newProduct : p
            )
          );
          setEditingProduct(null);
          Swal.fire("ویرایش شد ✏️", "محصول با موفقیت ویرایش شد", "success");
        } else {
          setProductList([...productList, newProduct]);
          Swal.fire("موفقیت 🎉", "محصول با موفقیت اضافه شد", "success");
        }
        resetForm();
      }
    });
  };

  const resetForm = () => {
    setImages([]);
    setTitle("");
    setSize("");
    setCategory("فرش دستباف");
    setFeatures({
      quality: "",
      color: "",
      shape: "",
      yarn: "",
      warp: "",
      weft: "",
    });
    setSellers([]);
    setPerformance("");
    setPrice("");
  };

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">
        {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 max-w-2xl mx-auto shadow-lg rounded-2xl border border-purple-200 p-6 mb-10"
      >
        <ImageUploader images={images} setImages={setImages} />

        <div>
          <label className="block font-semibold text-purple-600 mb-2">
            دسته‌بندی
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option>فرش دستباف</option>
            <option>فرش ماشینی</option>
            <option>گلیم</option>
            <option>موکت</option>
          </select>
        </div>

        <InputField
          label="تیتر محصول"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثلاً فرش ۶ متری ابریشمی"
        />
        <InputField
          label="اندازه فرش"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="مثلاً ۳x۲ متر"
        />
        <FeaturesForm features={features} setFeatures={setFeatures} />
        <SellerBox sellers={sellers} setSellers={setSellers} />
        <PerformanceSelector
          performance={performance}
          setPerformance={setPerformance}
        />
        <InputField
          label="قیمت (تومان)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="مثلاً ۲۵۰۰۰۰۰"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl"
        >
          {editingProduct ? "ثبت ویرایش" : "افزودن محصول"}
        </button>
      </form>
      <ProductManagement
        productList={productList}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
