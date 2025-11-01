import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // داده‌های نمونه (می‌تونی بعداً از API بیاری)
    setUsers([
      {
        id: 1,
        name: "علی رضایی",
        email: "ali@example.com",
        phone: "09123456789",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        id: 2,
        name: "مریم احمدی",
        email: "maryam@example.com",
        phone: "09381234567",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        id: 3,
        name: "محمد نادری",
        email: "mohammad@example.com",
        phone: "09201234567",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
    ]);
  }, []);

  // حذف کاربر با SweetAlert
  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id);

    Swal.fire({
      title: "حذف کاربر",
      text: `آیا از حذف ${user.name} مطمئن هستی؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        Swal.fire({
          title: "حذف شد!",
          text: "کاربر با موفقیت حذف شد.",
          icon: "success",
          confirmButtonColor: "#9333ea",
        });
      }
    });
  };

  // فیلتر جستجو
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        کاربران ثبت‌نام‌شده
      </h1>

      {/* باکس جستجو */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="جستجو بر اساس نام، ایمیل یا شماره..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-right"
        />
      </div>

      {/* کارت کاربران */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white border border-purple-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-4"
          >
            {/* اطلاعات کاربر */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border border-purple-300"
              />
              <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </div>

            {/* دکمه حذف */}
            <button
              onClick={() => handleDelete(user.id)}
              className="border border-purple-400 text-purple-600 hover:bg-red-600 hover:border-red-600 hover:text-white text-sm px-4 py-2 rounded-lg transition"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          هیچ کاربری یافت نشد 😢
        </p>
      )}
    </div>
  );
}
