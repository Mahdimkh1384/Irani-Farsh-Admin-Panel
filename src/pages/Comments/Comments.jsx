import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const sampleComments = [
  {
    id: 1,
    user: { name: "سجاد ایزدی", avatar: "https://i.pravatar.cc/100?img=1" },
    product: {
      id: 101,
      name: "فرش",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/17-9_3-1964-Saltingtaeppe_Photo-Pernille-Klemp-f.jpg/330px-17-9_3-1964-Saltingtaeppe_Photo-Pernille-Klemp-f.jpg",
    },
    text: "خیلی محصول عالی بود، راضی‌ام 👌",
  },
  {
    id: 2,
    user: { name: "سارا", avatar: "https://i.pravatar.cc/100?img=2" },
    product: {
      id: 102,
      name: "فرش",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/17-9_3-1964-Saltingtaeppe_Photo-Pernille-Klemp-f.jpg/330px-17-9_3-1964-Saltingtaeppe_Photo-Pernille-Klemp-f.jpg",
    },
    text: "فرش خیلی نرمی بود 👌",
  },
];

export default function CommentsPanel() {
  const [comments, setComments] = useState(sampleComments);

  const handleApprove = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    toast.success("کامنت تایید شد ✅");
  };

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    toast.error("کامنت حذف شد ❌");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-purple-600 mb-6">
        مدیریت کامنت‌ها
      </h1>
      <div className="grid gap-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="shadow-md rounded-2xl border border-purple-200 bg-white p-4 flex items-start gap-4"
          >
            <Link to={`/product/${comment.product.id}`}>
              <img
                src={comment.product.image}
                alt={comment.product.name}
                className="w-20 h-20 rounded-xl border cursor-pointer hover:scale-105 transition"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-semibold text-gray-700">
                  {comment.user.name}
                </span>
              </div>
              <p className="text-gray-600">{comment.text}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleApprove(comment.id)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl"
              >
                تایید
              </button>
              <button
                onClick={() => handleDelete(comment.id)}
                className="border border-purple-400 text-purple-500 hover:bg-purple-50 px-4 py-2 rounded-xl"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
