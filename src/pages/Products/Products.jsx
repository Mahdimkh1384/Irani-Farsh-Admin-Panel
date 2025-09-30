import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// این ایمپورت‌ها رو اگه واقعاً لازم نیستند، پاک کنید. (مثل use که یک Hook نیست)
// import { use } from "react"; 

import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import InputField from "../../Components/InputField/InputField";
import FeaturesForm from "../../Components/FeaturesForm/FeaturesForm";
import SellerBox from "../../Components/SellerBox/SellerBox";
import PerformanceSelector from "../../Components/PerformanceSelector/PerformanceSelector";
import ProductManagement from "../../Components/Product management/Product management";

export default function AddProduct() {
  // **********************************************
  // 1. منطق CategorySelectorAxios باید با بقیه AddProduct ادغام شود
  // **********************************************

  // State های مربوط به دسته‌بندی
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // خطای املایی: 'eroor' به 'error' اصلاح شد
  const [error, setError] = useState(null); 
  
  // Effect برای واکشی دسته‌بندی‌ها
  useEffect(() => {
    const API_URL = 'https://backend.sajlab.ir/api/categories';
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
            setCategory(data[0].id || data[0].name); 
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
  
  const API_URL = "https://backend.sajlab.ir/api/products";
  
  const fetchProducts = async () => {
    // ... (منطق fetchProducts مثل قبل)
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
    
    // نکته: بهتر است از آیدی یا name اولین آیتم categories استفاده شود، نه مقدار ثابت
    // اگر categories پر شده باشد، می‌توان از آن استفاده کرد.
    if (categories.length > 0) {
        setCategory(categories[0].id || categories[0].name);
    } else {
        setCategory(""); // یا مقدار پیش‌فرض دلخواه
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
  
  // ... (منطق handleSubmit، handleDelete، handleEdit مثل قبل)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (ادامه منطق handleSubmit)
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
            // ... (بقیه منطق)
            const attributes = Object.entries(features).map(([key, value]) => ({
              key,
              value,
            }));

            const formData = new FormData();

            formData.append("title", title);
            formData.append("size", size);
            formData.append("price", price);
            formData.append("rating", performance);
            formData.append("category_id", category); // *نکته مهم: اضافه کردن category_id*
            formData.append("attributes", JSON.stringify(attributes));

            images.forEach((img) => {
              formData.append("images", img);
            });
            
            await axios.post(API_URL, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            Swal.fire("موفقیت 🎉", "محصول با موفقیت اضافه شد", "success");
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
                // اگر خطای سرور به صورت شیء است، بهتر است آن را رشته کنیم
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
    // ... (منطق handleDelete مثل قبل)
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
          await axios.delete(`${API_URL}/${id}`);
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
    // ... (منطق handleEdit مثل قبل)
    setTitle(product.title);
    setSize(product.size);
    // اصلاح: مطمئن شوید که مقدار category از بین categories واکشی شده انتخاب شود
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


  // **********************************************
  // 3. JSX نهایی (شامل Select Box)
  // **********************************************
  
  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">
        افزودن محصول جدید
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

          {/* نمایش وضعیت بارگذاری */}
          {loading && <p className="text-blue-500">در حال بارگذاری دسته‌بندی‌ها...</p>}

          {/* نمایش وضعیت خطا */}
          {error && <p className="text-red-500">خطا در دریافت داده: {error}</p>}

          {/* نمایش Select */}
          {!loading && !error && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              {categories.length === 0 && <option value="">بدون دسته‌بندی</option>}

              {categories.map((cat) => (
                <option
                  key={cat.id || cat.name} // کلید یکتا برای React
                  value={cat.id || cat.name} // مقداری که در State ذخیره می‌شود (آیدی یا نام)
                >
                  {cat.name} {/* متنی که نمایش داده می‌شود */}
                </option>
              ))}
            </select>
          )}

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
        {/* <SellerBox sellers={sellers} setSellers={setSellers} /> */}
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
          افزودن محصول
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