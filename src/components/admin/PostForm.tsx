"use client";
import { useState } from "react";
import RichEditor from "./RichEditor";
import { savePost } from "@/app/(admin)/admin/posts/actions";

export default function PostForm({ initialData, categories }: { initialData?: any, categories: any[] }) {
  const [content, setContent] = useState(initialData?.content || "");
  const [imageUrl, setImageUrl] = useState(initialData?.featuredImage || "");
  const [uploading, setUploading] = useState(false);

  const formAction = async (formData: FormData) => {
    formData.append("content", content);
    formData.set("featuredImage", imageUrl);
    await savePost(formData, initialData?.id);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <label className="block mb-2">عنوان المقال</label>
          <input type="text" name="title" defaultValue={initialData?.title} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:bg-gray-950 outline-none mb-6" />
          <label className="block mb-2">المحتوى</label>
          <RichEditor value={content} onChange={setContent} />
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <label className="block mb-2">مقتطف</label>
          <textarea name="excerpt" defaultValue={initialData?.excerpt} rows={3} className="w-full px-4 py-3 rounded-lg border dark:bg-gray-950 outline-none" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <button type="submit" className="w-full bg-gold-600 text-white font-bold py-3 rounded-lg">
            {initialData ? "تحديث المقال" : "حفظ المقال"}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <label className="block mb-2">القسم</label>
          <select name="categoryId" defaultValue={initialData?.categoryId} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-950 outline-none">
            <option value="">-- اختر القسم --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <label className="block mb-2">صورة المقال</label>
          <div className="flex gap-2">
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-950" dir="ltr" />
            <label className="cursor-pointer bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
              {uploading ? "جاري الرفع..." : "رفع"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 w-full h-32 object-cover rounded-lg" />}
        </div>
      </div>
    </form>
  );
}
