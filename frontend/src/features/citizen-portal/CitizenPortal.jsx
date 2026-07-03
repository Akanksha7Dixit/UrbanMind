import {
  Users,
  MessageSquare,
  AlertTriangle,
  Smile,
  Wrench,
  TrendingUp,
} from "lucide-react";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  getIssues,
  createIssue,
} from "../../services/issueService";

import {
  useAuthStore,
} from "../../store/authStore";

export default function CitizenPortal() {

  const token = useAuthStore(
    (state) => state.token
  );

  const formRef = useRef(null);

  const [issues, setIssues] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      location: "",
    });

  useEffect(() => {
    if (token) {
      fetchIssues();
    }
  }, [token]);

  const fetchIssues = async () => {
    try {

      setLoading(true);

      const data =
        await getIssues(token);

      setIssues(data.issues);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

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

      if (
        !formData.title ||
        !formData.description
      ) {
        alert(
          "Please fill all required fields."
        );
        return;
      }

      try {

        setSubmitting(true);

        await createIssue(
          formData,
          token
        );

        await fetchIssues();

        alert(
          "Issue reported successfully."
        );

        setFormData({
          title: "",
          description: "",
          category: "",
          location: "",
        });

      } catch (error) {

        console.error(error);

      } finally {

        setSubmitting(false);

      }

    };

  return (

    <div className="space-y-8 p-8">

      {/* ================= HERO ================= */}

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

        <h1 className="mt-4 text-5xl font-bold">
          125,000 Active Citizens
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">
          Monitor community feedback,
          issue reporting,
          satisfaction scores,
          and citizen engagement.
        </p>

        <button
          onClick={() =>
            formRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="
            mt-6
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-slate-950
          "
        >
          Report New Issue
        </button>

      </section>

      {/* ================= KPI CARDS ================= */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-4
        "
      >

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
            {issues.length}
          </h3>

          <p className="text-slate-400">
            Total Issues
          </p>
        </div>

        <div className="ai-card">
          <Wrench />

          <h3 className="mt-4 text-4xl font-bold">
            {
              issues.filter(
                (issue) =>
                  issue.status !==
                  "Resolved"
              ).length
            }
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

      {/* ================= ISSUE FORM ================= */}

      <section
        ref={formRef}
        className="ai-card"
      >

        <h2
          className="
            mb-6
            text-2xl
            font-semibold
          "
        >
          Report New Issue
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            value={formData.title}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              bg-slate-900
              p-3
              outline-none
            "
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="
              w-full
              rounded-xl
              bg-slate-900
              p-3
              outline-none
            "
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              bg-slate-900
              p-3
              outline-none
            "
          >
            <option value="">
              Select Category
            </option>

            <option value="Road">
              Road
            </option>

            <option value="Water">
              Water
            </option>

            <option value="Electricity">
              Electricity
            </option>

            <option value="Garbage">
              Garbage
            </option>

            <option value="Traffic">
              Traffic
            </option>

            <option value="Infrastructure">
              Infrastructure
            </option>

          </select>

          <input
            type="text"
            name="location"
            placeholder="Location / Sector"
            value={formData.location}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              bg-slate-900
              p-3
              outline-none
            "
          />

          <button
            type="submit"
            disabled={submitting}
            className="
              rounded-xl
              bg-cyan-500
              px-6
              py-3
              font-semibold
              text-slate-950
              transition
              hover:bg-cyan-400
              disabled:opacity-60
            "
          >
            {submitting
              ? "Submitting..."
              : "Submit Issue"}
          </button>

        </form>

      </section>

      {/* ================= ACTIVE ISSUES ================= */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            Active Issues
          </h2>

          <span className="text-slate-400">
            {issues.length} Issues
          </span>

        </div>

        {loading ? (

          <div className="ai-card text-center py-12">
            Loading issues...
          </div>

        ) : issues.length === 0 ? (

          <div className="ai-card text-center py-12">

            <AlertTriangle
              size={50}
              className="mx-auto text-yellow-400"
            />

            <h3 className="mt-4 text-2xl font-bold">
              No Issues Reported
            </h3>

            <p className="mt-2 text-slate-400">
              Be the first citizen to report an issue.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 lg:grid-cols-3">

            {issues.map((issue) => (

              <div
                key={issue._id}
                className="ai-card"
              >

                <AlertTriangle
                  className="text-cyan-400"
                />

                <h3 className="mt-4 text-xl font-bold">
                  {issue.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {issue.description}
                </p>

                <p className="mt-3 text-sm text-cyan-400">
                  Category:
                  {" "}
                  {issue.category}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Location:
                  {" "}
                  {issue.location || "N/A"}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Reported by:
                  {" "}
                  {issue.createdBy?.name}
                </p>

                <p className="text-xs text-slate-500">
                  {new Date(
                    issue.createdAt
                  ).toLocaleDateString()}
                </p>

                <span
                  className={`
                    inline-block
                    mt-5
                    rounded-full
                    px-3
                    py-1
                    text-sm

                    ${
                      issue.status === "Pending"
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

        )}

      </section>      {/* ================= PUBLIC FEEDBACK ================= */}

      <section
        className="
          rounded-3xl
          border
          border-white/10
          p-8
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold">
              Public Feedback
            </h2>

            <p className="mt-2 text-slate-400">
              Latest citizen opinions and suggestions.
            </p>

          </div>

          <MessageSquare
            size={36}
            className="text-cyan-400"
          />

        </div>

        <div className="mt-8 space-y-4">

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <p className="text-slate-300">
              Healthcare services have improved
              significantly over the last few
              months.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Citizen Feedback
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <p className="text-slate-300">
              Public transport frequency should
              increase during office hours.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Citizen Suggestion
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5 "
            >
            <p className="text-slate-300">
              New green corridors are highly
              appreciated by local residents.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Community Survey
            </p>
          </div>

        </div>

      </section>

      {/* ================= ENGAGEMENT ANALYTICS ================= */}

      <section>

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">
            Engagement Analytics
          </h2>

          <p className="mt-2 text-slate-400">
            Community participation metrics.
          </p>

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >

          <div className="ai-card">

            <TrendingUp
              className="text-cyan-400"
            />

            <h3 className="mt-4 text-4xl font-bold">
              +24%
            </h3>

            <p className="text-slate-400">
              Citizen Participation
            </p>

          </div>

          <div className="ai-card">

            <TrendingUp
              className="text-emerald-400"
            />

            <h3 className="mt-4 text-4xl font-bold">
              +16%
            </h3>

            <p className="text-slate-400">
              Issue Resolution
            </p>

          </div>

          <div className="ai-card">

            <TrendingUp
              className="text-yellow-400"
            />

            <h3 className="mt-4 text-4xl font-bold">
              +12%
            </h3>

            <p className="text-slate-400">
              Satisfaction Growth
            </p>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer
        className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-r
          from-slate-950
          to-slate-900
          p-8
          text-center
        "
      >

        <h2 className="text-3xl font-bold">
          Building Smarter Cities Together
        </h2>

        <p className="mt-3 text-slate-400">
          Every issue reported by citizens
          contributes to a safer, cleaner,
          and more sustainable city.
        </p>

      </footer>

    </div>

  );

}