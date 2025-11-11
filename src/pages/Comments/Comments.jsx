import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const COMMENT_API_ENDPOINT = "https://backend.sajlab.ir/api/comments";
const DEBUG = true;

export default function CommentsPanel() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCommentId = (comment) => {
    if (!comment || typeof comment !== "object") return null;
    return (
      comment.id ??
      comment.pk ??
      comment._id ??
      comment.comment_id ??
      comment.commentId ??
      comment.id_comment ??
      null
    );
  };

  const getToken = () => {
    const direct = localStorage.getItem("token") || localStorage.getItem("access") || localStorage.getItem("access_token") || localStorage.getItem("authToken");
    if (direct) return direct;
    try {
      const userRaw = localStorage.getItem("user");
      if (userRaw) {
        const user = JSON.parse(userRaw);
        return user?.token || user?.access || user?.access_token || null;
      }
    } catch (e) {
    }
    return null;
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(COMMENT_API_ENDPOINT, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data?.data) {
        const pending = data.data.filter(
          (comment) => comment.result === null || comment.result === undefined
        );
        setComments(pending);
      } else {
        if (Array.isArray(data)) {
          const pending = data.filter(
            (comment) => comment.result === null || comment.result === undefined
          );
          setComments(pending);
        }
      }
    } catch (err) {
      console.error("❌ خطا در دریافت کامنت‌ها:", err);
      Swal.fire("خطا", "دریافت کامنت‌ها با خطا مواجه شد", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const updateCommentResult = async (id, resultValue, actionTitle) => {
    if (!id) {
      console.error("❌ آی‌دی نامعتبر:", id);
      Swal.fire("خطا", "آی‌دی کامنت معتبر نیست.", "error");
      return;
    }

    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "نیاز به ورود",
        text: "توکن یافت نشد. لطفاً وارد شوید.",
      });
      return;
    }

    const url = `${COMMENT_API_ENDPOINT}/${id}/`;
    console.log("📤 ارسال PUT به:", url, "result:", resultValue);

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ result: String(resultValue) }),
      });

      const responseText = await res.text();
      console.log("📥 پاسخ سرور:", res.status, responseText);

      if (!res.ok) {
        throw new Error(`خطا در ${actionTitle} کامنت (${res.status})`);
      }
      setComments((prev) => prev.filter((c) => getCommentId(c) !== id));
      Swal.fire({
        icon: "success",
        title: `کامنت ${resultValue === 1 ? "تایید" : "رد"} شد`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("❌ خطا در PUT:", err);
      Swal.fire("خطا", `در ${actionTitle} کامنت مشکلی پیش آمد!`, "error");
    }
  };
  const handleApprove = async (comment) => {
    const id = getCommentId(comment);
    const confirm = await Swal.fire({
      title: "تایید کامنت",
      text: "آیا از تایید این کامنت اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، تایید شود",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#9333ea",
    });
    if (confirm.isConfirmed) await updateCommentResult(id, 1, "تایید");
  };
  const handleReject = async (comment) => {
    const id = getCommentId(comment);
    const confirm = await Swal.fire({
      title: "رد کامنت",
      text: "آیا از رد این کامنت اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، رد شود",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#e11d48",
    });

    if (confirm.isConfirmed) {
      await updateCommentResult(id, 0, "رد");
    }
  };
  console.log(comments);



  if (loading)
    return <p className="text-center py-10 text-gray-500">در حال بارگذاری...</p>;

  return (
    <div className="mt-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">مدیریت کامنت‌ها</h1>

      <div className="grid gap-4">
        {comments.length === 0 && (
          <p className="text-center text-gray-500">کامنتی برای بررسی وجود ندارد.</p>
        )}

        {comments.map((comment) => {
          const id = getCommentId(comment);
          const disableActions = !id;

          return (
            <div
              key={id ?? Math.random()}
              className="shadow-md rounded-2xl border border-purple-200 bg-white p-4 flex items-start gap-4"
            >
              <Link to={`/product/${comment.product?.id}`}>
                <img
                  src={comment.product?.image}
                  alt={comment.product?.name}
                  className="w-20 h-20 rounded-xl border cursor-pointer hover:scale-105 transition"
                />
              </Link>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={comment.user?.avatar || "/src/image/defult1.jpg"}
                    alt={comment.user?.firstName || "کاربر"}
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="font-semibold text-gray-700">
                    {comment.user
                      ? `${comment.user.firstName || ""} ${comment.user.lastName || ""}`
                        .trim() || "کاربر"
                      : "کاربر مهمان"}
                  </span>
                </div>
                <div className="flex gap-5">
                  <p className="text-gray-600">{comment.content || "بدون متن"}</p>
                  <div className="flex items-center bg-[#F3F5F6] gap-2 px-3 py-1 rounded-lg w-fit text-amber-500">
                    {comment.rating}
                  </div>
                </div>
                {!id && (
                  <p className="text-sm text-red-500 mt-2">شناسهٔ کامنت پیدا نشد — ساختار داده را بررسی کنید</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleApprove(comment)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50"
                  disabled={disableActions}
                >
                  تایید
                </button>
                <button
                  onClick={() => handleReject(comment)}
                  className="border border-purple-400 text-purple-500 hover:bg-purple-50 px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50"
                  disabled={disableActions}
                >
                  رد
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
