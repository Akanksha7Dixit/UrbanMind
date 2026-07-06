import {
  Download,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

export default function ExportCard({

  title,

  description,

  icon,

  color,

  onClick,

}) {

  const Icon =

    icon === "pdf"
      ? FileText
      : icon === "excel"
      ? FileSpreadsheet
      : Presentation;

  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:border-cyan-500/30
      hover:-translate-y-1
    "
    >

      <div
        className={`
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl

        ${color}
      `}
      >

        <Icon size={28} />

      </div>

      <h2 className="mt-6 text-xl font-bold">

        {title}

      </h2>

      <p className="mt-4 text-slate-400 leading-7">

        {description}

      </p>

      <button

        onClick={onClick}

        className="
        mt-8

        flex
        w-full
        items-center
        justify-center
        gap-3

        rounded-2xl

        bg-cyan-500

        py-3

        font-semibold

        text-slate-950

        transition

        hover:bg-cyan-400
      "
      >

        <Download size={18} />

        Export

      </button>

    </div>

  );

}