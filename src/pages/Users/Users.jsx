import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import userIcon from "/images/userIcon.jpg";
export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const API_URL = 'https://api.iranifarsh.ir/users';
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_URL, {
                    withCredentials: true
                })
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers()
    }, []);
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
    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.phone.includes(search)
    );

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-purple-50 p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                کاربران ثبت‌نام‌شده
            </h1>
            <div className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="جستجو بر اساس نام، ایمیل یا شماره..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-right"
                />
            </div>
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between bg-white border border-purple-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={user.profileImage ?"https://api.iranifarsh.ir/uploads/user/"+user.profileImage : userIcon}
                                alt={user.firstName}
                                className="w-14 h-14 rounded-full object-cover border border-purple-300"
                            />
                            <div className="text-right">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    هیچ کاربری یافت نشد
                </p>
            )}
        </div>
    );
}
