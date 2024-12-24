export function Heading({ label }) {
  return (
    <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-6">
      {label}
    </div>
  );
}