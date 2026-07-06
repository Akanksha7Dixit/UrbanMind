import {
  Search,
  Filter,
  Plus,
  RefreshCw,
} from "lucide-react";

export default function ReportsToolbar({
  search,
  setSearch,
  category,
  setCategory,
  refresh,
  onCreate,
}) {
  return (
    <div
      className="
      rounded-3xl
      border border-white/10
      bg-slate-900/40
      backdrop-blur-xl
      p-6
      flex
      flex-col
      gap-5
      lg:flex-row
      lg:items-center
      lg:justify-between
    "
    >
      <div className="flex flex-1 gap-4">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reports..."
            className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-950/60
            py-3
            pl-11
            pr-4
            outline-none
            focus:border-cyan-500
            "
          />

        </div>

        <div className="relative">

          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={category}
            onChange={(e)=>
              setCategory(e.target.value)
            }
            className="
            rounded-xl
            border
            border-white/10
            bg-slate-950
            py-3
            pl-10
            pr-10
            outline-none
            "
          >
            <option>All</option>
            <option>Health</option>
            <option>Infrastructure</option>
            <option>Environment</option>
            <option>Simulation</option>
          </select>

        </div>

      </div>

      <div className="flex gap-3">

        <button
          onClick={refresh}
          className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          px-5 py-3
          hover:bg-white/5
          "
        >
          <RefreshCw size={18}/>
          Refresh
        </button>

        <button
          onClick={onCreate}
          className="
          flex items-center gap-2
          rounded-xl
          bg-cyan-500
          px-5 py-3
          font-medium
          text-slate-950
          hover:bg-cyan-400
          "
        >
          <Plus size={18}/>
          New Report
        </button>

      </div>

    </div>
  );
}