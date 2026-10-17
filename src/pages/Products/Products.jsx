import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"
import axios from "axios";
import { ThreeDot } from 'react-loading-indicators';
import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import InputField from "../../Components/InputField/InputField";
import FeaturesForm from "../../Components/FeaturesForm/FeaturesForm";
import SellerBox from "../../Components/SellerBox/SellerBox";
import PerformanceSelector from "../../Components/PerformanceSelector/PerformanceSelector";
import ProductManagement from "../../Components/Product management/Product management";

export default function AddProduct() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = 'https://api-iranifarsh.gawyhub.online/categories';
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL);
        const rawData = response.data;
        const categoriesArray = rawData.data || rawData;
        console.log("Categories Array to Set:", categoriesArray);
        if (Array.isArray(categoriesArray) && categoriesArray.length > 0) {
          setCategories(categoriesArray);
          setCategory(categoriesArray[0].id || categoriesArray[0].name);
        } else {
          setCategories([]);
          setCategory('');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Axios fetch error:", err);
      }
    };
    fetchCategories();
  }, []);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
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
  const [isProductAdd, setIsProductAdd] = useState(false)


  const API_URL = "https://api-iranifarsh.gawyhub.online/products";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);

      if (response.data && Array.isArray(response.data.data)) {
        setProductList(response.data.data);
        console.log("Products ready for display:", response.data.data);
      } else {
        console.error("API response structure error or empty data:", response.data);
        setProductList([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setImages([]);
    setTitle("");
    setSize("");
    if (categories.length > 0) {
      setCategory(categories[0].id || categories[0].name);
    } else {
      setCategory("");
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "آیا مطمئنی؟",
      text: "می‌خوای این محصول اضافه بشه؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "بله، اضافه کن ✅",
      cancelButtonText: "انصراف ❌",
      confirmButtonColor: "#9333ea",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsProductAdd(true)
          const attributes = Object.entries(features).map(([key, value]) => ({
            key,
            value,
          }));

          const formData = new FormData();
          formData.append("title", title);
          formData.append("size", size);
          formData.append("price", price);
          formData.append("rating", performance);
          formData.append("categoryId", category);
          formData.append("attributes", JSON.stringify(attributes));
          images.forEach((img) => {
            formData.append("images", img);
          });

          await axios.post(API_URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          Swal.fire("موفقیت 🎉", "محصول با موفقیت اضافه شد", "success");
          setIsProductAdd(false)
          fetchProducts();
          resetForm();
        } catch (error) {
          console.error("Axios Error Object:", error);
          let errorMessage = "مشکل ناشناخته در ارسال محصول پیش اومد";

          if (error.response) {
            console.error("Server Status:", error.response.status);
            console.error("Server Data:", error.response.data);

            if (error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data && error.response.data.error) {
              errorMessage = JSON.stringify(error.response.data.error);
            } else {
              errorMessage = `خطای سرور با کد ${error.response.status}`;
            }
          } else if (error.request) {
            errorMessage = "ارتباط با سرور برقرار نشد.";
          }

          Swal.fire("خطا ❌", errorMessage, "error");
        }
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "حذف محصول",
      text: "آیا مطمئنی می‌خوای این محصول حذف بشه؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن ❌",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#e11d48",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`, {
            withCredentials: true,
          });
          setProductList(productList.filter((p) => p.id !== id));
          Swal.fire("حذف شد", "محصول با موفقیت حذف شد", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("خطا", "مشکلی در حذف محصول پیش آمد", "error");
        }
      }
    });
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setSize(product.size);
    setCategory(product.category_id || product.category || categories[0]?.id || categories[0]?.name || "");
    setImages(product.images);
    const newFeatures = {};
    if (product.attributes) {
      product.attributes.forEach(attr => {
        newFeatures[attr.key] = attr.value;
      });
    }
    setFeatures({ ...features, ...newFeatures });
    setSellers(product.sellers || []);
    setPerformance(product.rating || "");
    setPrice(product.price);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="bg-bg-primary min-h-screen">
      <h1 className="text-2xl font-bold text-accent mb-6">افزودن محصول جدید</h1>

      <form onSubmit={handleSubmit} className="grid gap-6 max-w-2xl mx-auto shadow-lg rounded-2xl border border-border-brand bg-bg-surface p-6 mb-10">
        <ImageUploader images={images} setImages={setImages} />
        <div>
          <label className="block font-semibold text-accent mb-2">دسته‌بندی</label>
          {loading && <p className="text-blue-500">در حال بارگذاری دسته‌بندی‌ها...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-border-main bg-bg-surface text-text-main rounded-lg p-2">
              {categories.length === 0 && <option value="">بدون دسته‌بندی</option>}
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          )}
        </div>
        <InputField label="تیتر محصول" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً فرش ۶ متری ابریشمی" />
        <InputField label="اندازه فرش" value={size} onChange={(e) => setSize(e.target.value)} placeholder="مثلاً ۳x۲ متر" />
        <FeaturesForm features={features} setFeatures={setFeatures} />
        <PerformanceSelector performance={performance} setPerformance={setPerformance} />
        <InputField label="قیمت (تومان)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثلاً ۲۵۰۰۰۰۰" />
        <button type="submit" disabled={isProductAdd}
          className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl cursor-pointer disabled:bg-accent-muted">
          {isProductAdd ? <ThreeDot color="#ffffff" size="small" text="" textColor="" /> : "افزودن محصول"}
        </button>
      </form>

      <ProductManagement productList={productList} search={search} setSearch={setSearch}
        sortBy={sortBy} setSortBy={setSortBy} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}
