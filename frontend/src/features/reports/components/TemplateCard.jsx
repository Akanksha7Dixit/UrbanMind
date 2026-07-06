import {
  ClipboardList,
} from "lucide-react";

export default function TemplateCard({

  title,

  description,

  onUse,

}) {

  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/40
      p-6
      transition
      hover:border-cyan-500/20
    "
    >

      <ClipboardList
        className="text-cyan-400"
        size={30}
      />

      <h2 className="mt-6 text-xl font-bold">

        {title}

      </h2>

      <p className="mt-4 leading-7 text-slate-400">

        {description}

      </p>

      <button

        onClick={onUse}

        className="
        mt-8
        rounded-xl
        bg-cyan-500
        px-5
        py-3
        font-semibold
        text-slate-950
      "
      >

        Use Template

      </button>

    </div>

  );

}