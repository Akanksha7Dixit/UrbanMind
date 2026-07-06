import {
  Clock,
} from "lucide-react";

export default function ActivityItem({

  activity,

}) {

  return (

    <div
      className="
      flex
      items-center
      justify-between

      rounded-2xl

      border
      border-white/10

      p-5
    "
    >

      <div
        className="
        flex
        items-center
        gap-4
      "
      >

        <Clock
          className="text-cyan-400"
        />

        <div>

          <h3 className="font-semibold">

            {activity.title}

          </h3>

          <p className="mt-1 text-sm text-slate-400">

            {activity.time}

          </p>

        </div>

      </div>

      <span
        className="
        rounded-full
        bg-cyan-500/10
        px-3
        py-1
        text-sm
        text-cyan-400
      "
      >

        {activity.action}

      </span>

    </div>

  );

}