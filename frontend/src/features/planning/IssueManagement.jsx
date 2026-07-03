import { useEffect, useState } from "react";
import {
  AlertTriangle,
  MapPin,
  User,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";

import {
  getIssues,
  updateIssue,
  deleteIssue,
} from "../../services/issueService";

export default function IssueManagement() {
  const token = useAuthStore(
    (state) => state.token
  );

  const [issues, setIssues] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      location: "",
      status: "Pending",
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

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      location: "",
      status: "Pending",
    });

  };

  const handleEdit = (issue) => {

    setEditingId(issue._id);

    setFormData({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      priority:
        issue.priority || "Medium",
      location:
        issue.location || "",
      status:
        issue.status || "Pending",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateIssue(
        editingId,
        formData,
        token
      );

      await fetchIssues();

      resetForm();

    } catch (error) {

      console.error(error);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this issue?"
      );

    if (!confirmDelete) return;

    try {

      await deleteIssue(
        id,
        token
      );

      setIssues((prev) =>
        prev.filter(
          (issue) =>
            issue._id !== id
        )
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="space-y-8 p-8">

      {/* ================= HEADER ================= */}

      <div>

        <h1 className="text-4xl font-bold">
          Issue Management
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor, update and manage all reported city issues.
        </p>

      </div>

      {loading ? (

        <div className="text-slate-400">
          Loading issues...
        </div>

      ) : (

        <>
                  {/* ================= STATISTICS ================= */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="ai-card">

              <p className="text-slate-400">
                Total Issues
              </p>

              <h2 className="mt-3 text-4xl font-bold text-cyan-400">
                {issues.length}
              </h2>

            </div>

            <div className="ai-card">

              <p className="text-slate-400">
                Pending
              </p>

              <h2 className="mt-3 text-4xl font-bold text-yellow-400">
                {
                  issues.filter(
                    (issue) =>
                      issue.status ===
                      "Pending"
                  ).length
                }
              </h2>

            </div>

            <div className="ai-card">

              <p className="text-slate-400">
                In Progress
              </p>

              <h2 className="mt-3 text-4xl font-bold text-cyan-400">
                {
                  issues.filter(
                    (issue) =>
                      issue.status ===
                      "In Progress"
                  ).length
                }
              </h2>

            </div>

            <div className="ai-card">

              <p className="text-slate-400">
                Resolved
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-400">
                {
                  issues.filter(
                    (issue) =>
                      issue.status ===
                      "Resolved"
                  ).length
                }
              </h2>

            </div>

          </div>

          {/* ================= EDIT FORM ================= */}

          {editingId && (

            <section className="ai-card">

              <h2 className="mb-6 text-2xl font-bold">
                Update Issue
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 lg:grid-cols-2"
              >

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Issue Title"
                  className="rounded-xl bg-slate-900 p-3 outline-none"
                  required
                />

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="rounded-xl bg-slate-900 p-3 outline-none"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows={4}
                  className="rounded-xl bg-slate-900 p-3 outline-none lg:col-span-2"
                  required
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-xl bg-slate-900 p-3 outline-none"
                >

                  <option value="Road">Road</option>
                  <option value="Water">Water</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Traffic">Traffic</option>
                  <option value="Infrastructure">Infrastructure</option>

                </select>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="rounded-xl bg-slate-900 p-3 outline-none"
                >

                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>

                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-xl bg-slate-900 p-3 outline-none"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="
                      flex-1
                      rounded-xl
                      bg-cyan-500
                      py-3
                      font-semibold
                      text-slate-950
                      hover:bg-cyan-400
                    "
                  >
                    Update Issue
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="
                      rounded-xl
                      bg-slate-700
                      px-6
                      text-white
                    "
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </section>

          )}

          {/* ================= SEARCH & FILTERS ================= */}

          <div className="grid gap-4 lg:grid-cols-3">

            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                rounded-xl
                bg-slate-900
                p-3
                outline-none
              "
            />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="
                rounded-xl
                bg-slate-900
                p-3
                outline-none
              "
            >

              <option value="All">
                All Categories
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

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="
                rounded-xl
                bg-slate-900
                p-3
                outline-none
              "
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>

          {/* ================= ISSUE CARDS ================= */}

          <div className="grid gap-6 lg:grid-cols-3">
                        {issues
              .filter((issue) => {
                const query = searchTerm.toLowerCase();

                const matchesSearch =
                  issue.title
                    .toLowerCase()
                    .includes(query) ||
                  issue.description
                    .toLowerCase()
                    .includes(query) ||
                  (issue.location || "")
                    .toLowerCase()
                    .includes(query);

                const matchesCategory =
                  categoryFilter === "All" ||
                  issue.category === categoryFilter;

                const matchesStatus =
                  statusFilter === "All" ||
                  issue.status === statusFilter;

                return (
                  matchesSearch &&
                  matchesCategory &&
                  matchesStatus
                );
              })
              .map((issue) => (

                <div
                  key={issue._id}
                  className="ai-card"
                >

                  <AlertTriangle
                    size={32}
                    className="text-cyan-400"
                  />

                  <h2 className="mt-4 text-2xl font-bold">
                    {issue.title}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {issue.description}
                  </p>

                  {/* Category */}

                  <div className="mt-4">

                    <span
                      className="
                        rounded-full
                        bg-slate-800
                        px-3
                        py-1
                        text-sm
                      "
                    >
                      {issue.category}
                    </span>

                  </div>

                  {/* Priority */}

                  <div className="mt-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        issue.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : issue.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {issue.priority || "Medium"} Priority
                    </span>

                  </div>

                  {/* Status */}

                  <div className="mt-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        issue.status === "Resolved"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : issue.status === "In Progress"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {issue.status}
                    </span>

                  </div>

                  {/* Location */}

                  <div className="mt-5 flex items-center gap-2 text-slate-400">

                    <MapPin size={18} />

                    <span>
                      {issue.location || "N/A"}
                    </span>

                  </div>

                  {/* Reporter */}

                  <div className="mt-3 flex items-center gap-2 text-slate-400">

                    <User size={18} />

                    <span>
                      {issue.createdBy?.name || "Unknown"}
                    </span>

                  </div>

                  {/* Created Date */}

                  <p className="mt-4 text-sm text-slate-500">

                    {issue.createdAt
                      ? new Date(
                          issue.createdAt
                        ).toLocaleDateString()
                      : "-"}

                  </p>

                  {/* Buttons */}

                  <div className="mt-6 flex justify-end gap-3">

                    <button
                      onClick={() =>
                        handleEdit(issue)
                      }
                      className="
                        rounded-lg
                        bg-yellow-500
                        px-4
                        py-2
                        font-semibold
                        text-black
                        hover:bg-yellow-600
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(issue._id)
                      }
                      className="
                        rounded-lg
                        bg-red-600
                        px-4
                        py-2
                        text-white
                        hover:bg-red-700
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

          </div>

        </>

      )}

    </div>

  );

}