import {
  FileSearch,
  PlusCircle,
} from "lucide-react";

export default function EmptyReports({

  onCreate,

}) {

  return (

    <div
      className="
      flex
      min-h-[420px]
      flex-col
      items-center
      justify-center

      rounded-3xl

      border
      border-dashed
      border-cyan-500/20

      bg-slate-900/40

      px-8
      text-center
    "
    >

      <div
        className="
        flex
        h-24
        w-24
        items-center
        justify-center

        rounded-full

        bg-cyan-500/10
      "
      >

        <FileSearch
          size={42}
          className="text-cyan-400"
        />

      </div>

      <h2
        className="
        mt-8

        text-3xl
        font-bold
      "
      >
        No Reports Found
      </h2>

      <p
        className="
        mt-5

        max-w-xl

        leading-8

        text-slate-400
      "
      >
        No reports have been generated yet.

        Generate your first UrbanMind
        intelligence report to start
        monitoring infrastructure,
        analytics, AI insights and
        city planning decisions.
      </p>

      <button

        onClick={onCreate}

        className="
        mt-10

        inline-flex
        items-center
        gap-3

        rounded-2xl

        bg-cyan-500

        px-7
        py-4

        font-semibold

        text-slate-950

        transition-all
        duration-300

        hover:scale-105
        hover:bg-cyan-400
      "
      >

        <PlusCircle
          size={20}
        />

        Generate First Report

      </button>

    </div>

  );

}