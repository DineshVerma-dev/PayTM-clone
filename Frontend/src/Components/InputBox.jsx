
export function InputBox({ label, placeholder, onChange }) {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4"
      />
    </div>
  );
}