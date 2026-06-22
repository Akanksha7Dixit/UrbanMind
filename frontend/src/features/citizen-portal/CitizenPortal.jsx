import {
  Users,
  MessageSquare,
  AlertTriangle,
  Smile,
  Wrench,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getIssues,
  createIssue,
} from "../../services/issueService";

import {
  useAuthStore,
} from "../../store/authStore";

export default function CitizenPortal() {
  const token =
    useAuthStore(
      (state) => state.token
    );

  const [issues, setIssues] =
    useState([]);

  useEffect(() => {
    const fetchIssues =
      async () => {
        try {
          const data =
            await getIssues(
              token
            );

          setIssues(
            data.issues
          );
        } catch (error) {
          console.error(error);
        }
      };
    if (token) {
      fetchIssues();
    }
  }, [token]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      location: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createIssue(
          formData,
          token
        );

        const data =
          await getIssues(
            token
          );

        setIssues(
          data.issues
        );

        setFormData({
          title: "",
          description: "",
          category: "",
          location: "",
        });

      } catch (error) {
        console.error(error);
      }
    };

  return (


    <div className="space-y-8 p-8">

      {/* HEADER */}

      {/* HERO */}

<section
  className="
    rounded-3xl
    border border-white/10
    bg-gradient-to-r
    from-cyan-950/20
    via-slate-950
    to-indigo-950/20
    p-8
  "
>
  <p className="text-cyan-400">
    Community Overview
  </p>

  <h2 className="mt-4 text-5xl font-bold">
    125,000 Active Citizens
  </h2>

  <p className="mt-4 max-w-3xl text-slate-400">
    Monitor community feedback,
    service requests,
    satisfaction scores and
    engagement trends.
  </p>

  <Link
    to="/report-issue"
    className="
      mt-6 inline-block
      rounded-xl
      bg-cyan-500
      px-6 py-3
      font-semibold
      text-slate-950
    "
  >
    Report New Issue
  </Link>

</section>

      {/* HERO */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-cyan-950/20
          via-slate-950
          to-indigo-950/20
          p-8
        "
      >
        <p className="text-cyan-400">
          Community Overview
        </p>

        <h2 className="mt-4 text-5xl font-bold">
          125,000 Active Citizens
        </h2>

        <p className="mt-4 max-w-3xl text-slate-400">
          Monitor community feedback, service requests,
          satisfaction scores and engagement trends.
        </p>

        <section
          className="
    rounded-3xl
    border border-white/10
    bg-gradient-to-r
    from-cyan-950/20
    via-slate-950
    to-indigo-950/20
    p-8
  "
        >
          <p className="text-cyan-400">
            Community Overview
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            125,000 Active Citizens
          </h2>

          <p className="mt-4 max-w-3xl text-slate-400">
            Monitor community feedback, service requests,
            satisfaction scores and engagement trends.
          </p>

          <Link
            to="/report-issue"
            className="
      mt-6 inline-block
      rounded-xl
      bg-cyan-500
      px-6 py-3
      font-semibold
      text-slate-950
    "
          >
            Report New Issue
          </Link>

        </section>
      </section>



      {/* KPI */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="ai-card">
          <Users />
          <h3 className="mt-4 text-4xl font-bold">
            125K
          </h3>
          <p className="text-slate-400">
            Registered Citizens
          </p>
        </div>

        <div className="ai-card">
          <MessageSquare />
          <h3 className="mt-4 text-4xl font-bold">
            4,820
          </h3>
          <p className="text-slate-400">
            Feedback Entries
          </p>
        </div>

        <div className="ai-card">
          <Wrench />
          <h3 className="mt-4 text-4xl font-bold">
            312
          </h3>
          <p className="text-slate-400">
            Active Requests
          </p>
        </div>

        <div className="ai-card">
          <Smile />
          <h3 className="mt-4 text-4xl font-bold">
            87%
          </h3>
          <p className="text-slate-400">
            Satisfaction
          </p>
        </div>

      </div>

      {/* ISSUE REPORTING */}

      <section className="ai-card">

        <h2 className="mb-6 text-2xl font-semibold">
          Report New Issue
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            value={formData.title}
            onChange={handleChange}
            className="
        w-full rounded-xl
        bg-slate-900
        p-3
      "
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="
        w-full rounded-xl
        bg-slate-900
        p-3
      "
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="
        w-full rounded-xl
        bg-slate-900
        p-3
      "
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="
        w-full rounded-xl
        bg-slate-900
        p-3
      "
          />

          <button
            type="submit"
            className="
        rounded-xl
        bg-cyan-500
        px-6
        py-3
        font-semibold
      "
          >
            Submit Issue
          </button>

        </form>

      </section>

      {/* ACTIVE ISSUES */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Active Issues
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          {issues.map((issue) => (

            <div
              key={issue._id}
              className="ai-card"
            >
              <AlertTriangle
                className="text-cyan-400"
              />

              <h3 className="mt-4 font-semibold">
                {issue.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {issue.description}
              </p>

              <span
                className={`
    inline-block mt-4 px-3 py-1
    rounded-full text-sm font-medium

    ${issue.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"

                    : issue.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"

                      : "bg-cyan-500/20 text-cyan-400"
                  }
  `}
              >
                {issue.status}
              </span>

            </div>

          ))}

        </div>
      </section>

      {/* FEEDBACK */}

      <section
        className="
          rounded-3xl
          border border-white/10
          p-8
        "
      >
        <h2 className="text-2xl font-semibold">
          Public Feedback
        </h2>

        <div className="mt-6 space-y-4">

          <div className="rounded-2xl bg-white/[0.03] p-4">
            Healthcare services improved significantly.
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-4">
            Public transport frequency should increase.
          </div>

          <div className="rounded-2xl bg-white/[0.03] p-4">
            New green corridors are highly appreciated.
          </div>

        </div>
      </section>

      {/* ENGAGEMENT */}

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Engagement Analytics
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +24%
            </h3>

            <p className="text-slate-400">
              Citizen Participation
            </p>
          </div>

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +16%
            </h3>

            <p className="text-slate-400">
              Issue Resolution
            </p>
          </div>

          <div className="ai-card">
            <TrendingUp />

            <h3 className="mt-4 text-4xl font-bold">
              +12%
            </h3>

            <p className="text-slate-400">
              Satisfaction Growth
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}