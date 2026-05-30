export default function PageHeader({
  title,
  description,
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  );
}