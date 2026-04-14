"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false, loading: () => <div className="h-64 flex items-center justify-center bg-gray-50 border rounded-lg">جاري التحميل...</div> });
const modules = { toolbar: [[{ header: [2, 3, 4, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], [{ direction: "rtl" }, { align: [] }], ["link", "image"], ["clean"]] };
export default function RichEditor({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="bg-white ql-rtl-container font-arabic" dir="rtl">
      <QuillNoSSRWrapper modules={modules} theme="snow" value={value} onChange={onChange} className="h-96 mb-12" />
      <style jsx global>{`.ql-editor { text-align: right; direction: rtl; font-family: var(--font-cairo), sans-serif; font-size: 1.125rem; leading-loose; }`}</style>
    </div>
  );
}
