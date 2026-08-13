import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertTriangle,
  MapPin,
  User,
  Plus,
  X,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";

import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../../services/issueService";


export default function IssueManagement() {

  // ======================================================
  // AUTH
  // ======================================================

  const token = useAuthStore(
    (state) => state.token
  );


  // ======================================================
  // STATE
  // ======================================================

  const [issues, setIssues] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");


  // ======================================================
  // FORM REF
  // ======================================================

  const formRef = useRef(null);


  // ======================================================
  // FORM DATA
  // ======================================================

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "Infrastructure",
      priority: "Medium",
      location: "",
      status: "Pending",
    });


  // ======================================================
  // FETCH ISSUES
  // ======================================================

  useEffect(() => {

    if (token) {
      fetchIssues();
    }

  }, [token]);


  const fetchIssues = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getIssues(token);

      setIssues(
        Array.isArray(data?.issues)
          ? data.issues
          : []
      );

    } catch (err) {

      console.error(
        "Failed to fetch issues:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load issues."
      );

    } finally {

      setLoading(false);

    }

  };


  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ======================================================
  // RESET FORM
  // ======================================================

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      category: "Infrastructure",
      priority: "Medium",
      location: "",
      status: "Pending",
    });

  };


  // ======================================================
  // OPEN CREATE FORM
  // ======================================================

  const handleOpenCreate = () => {

    resetForm();

    setShowForm(true);

    setTimeout(() => {

      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  };


  // ======================================================
  // EDIT ISSUE
  // ======================================================

  const handleEdit = (issue) => {

    setEditingId(issue._id);

    setFormData({
      title: issue.title || "",

      description:
        issue.description || "",

      category:
        issue.category ||
        "Infrastructure",

      priority:
        issue.priority ||
        "Medium",

      location:
        issue.location || "",

      status:
        issue.status ||
        "Pending",
    });

    setShowForm(true);


    // Scroll directly to form
    setTimeout(() => {

      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  };


  // ======================================================
  // CREATE ISSUE
  // ======================================================

  const handleCreate = async (e) => {

    e.preventDefault();

    try {

      setError("");

      await createIssue(
        formData,
        token
      );

      await fetchIssues();

      resetForm();

      setShowForm(false);

    } catch (err) {

      console.error(
        "Create issue error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to create issue."
      );

    }

  };


  // ======================================================
  // UPDATE ISSUE
  // ======================================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!editingId) return;

    try {

      setError("");

      await updateIssue(
        editingId,
        formData,
        token
      );

      await fetchIssues();

      resetForm();

      setShowForm(false);

    } catch (err) {

      console.error(
        "Update issue error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to update issue."
      );

    }

  };


  // ======================================================
  // CLOSE FORM
  // ======================================================

  const handleCloseForm = () => {

    resetForm();

    setShowForm(false);

  };


  // ======================================================
  // DELETE ISSUE
  // ======================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this issue?"
      );

    if (!confirmed) return;

    try {

      setError("");

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

    } catch (err) {

      console.error(
        "Delete issue error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to delete issue."
      );

    }

  };


  // ======================================================
  // FILTER ISSUES
  // ======================================================

  const filteredIssues =
    issues.filter((issue) => {

      const query =
        searchTerm
          .toLowerCase()
          .trim();


      const title =
        issue.title
          ?.toLowerCase() || "";

      const description =
        issue.description
          ?.toLowerCase() || "";

      const location =
        issue.location
          ?.toLowerCase() || "";


      const matchesSearch =
        title.includes(query) ||
        description.includes(query) ||
        location.includes(query);


      const matchesCategory =
        categoryFilter === "All" ||
        issue.category ===
          categoryFilter;


      const matchesStatus =
        statusFilter === "All" ||
        issue.status ===
          statusFilter;


      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );

    });


  // ======================================================
  // STATISTICS
  // ======================================================

  const totalIssues =
    issues.length;

  const pendingIssues =
    issues.filter(
      (issue) =>
        issue.status === "Pending"
    ).length;

  const inProgressIssues =
    issues.filter(
      (issue) =>
        issue.status ===
        "In Progress"
    ).length;

  const resolvedIssues =
    issues.filter(
      (issue) =>
        issue.status ===
        "Resolved"
    ).length;


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (

      <div className="p-8">

        <div className="ai-card">

          <p className="text-slate-400">
            Loading issues...
          </p>

        </div>

      </div>

    );

  }


  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="space-y-8 p-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

        <div>

          <h1 className="text-4xl font-bold">
            Issue Management
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor, update and manage all reported
            city issues.
          </p>

        </div>


        <button
          onClick={handleOpenCreate}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
          "
        >

          <Plus size={18} />

          Report Issue

        </button>

      </div>


      {/* ==================================================
          ERROR MESSAGE
      ================================================== */}

      {error && (

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-4
            text-red-400
          "
        >

          <span>
            {error}
          </span>

          <button
            onClick={() =>
              setError("")
            }
            className="text-red-300"
          >

            <X size={18} />

          </button>

        </div>

      )}


      {/* ==================================================
          STATISTICS
      ================================================== */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* TOTAL */}

        <div className="ai-card">

          <p className="text-slate-400">
            Total Issues
          </p>

          <h2
            className="
              mt-3
              text-4xl
              font-bold
              text-cyan-400
            "
          >
            {totalIssues}
          </h2>

        </div>


        {/* PENDING */}

        <div className="ai-card">

          <p className="text-slate-400">
            Pending
          </p>

          <h2
            className="
              mt-3
              text-4xl
              font-bold
              text-yellow-400
            "
          >
            {pendingIssues}
          </h2>

        </div>


        {/* IN PROGRESS */}

        <div className="ai-card">

          <p className="text-slate-400">
            In Progress
          </p>

          <h2
            className="
              mt-3
              text-4xl
              font-bold
              text-cyan-400
            "
          >
            {inProgressIssues}
          </h2>

        </div>


        {/* RESOLVED */}

        <div className="ai-card">

          <p className="text-slate-400">
            Resolved
          </p>

          <h2
            className="
              mt-3
              text-4xl
              font-bold
              text-emerald-400
            "
          >
            {resolvedIssues}
          </h2>

        </div>

      </div>


      {/* ==================================================
          CREATE / UPDATE FORM
      ================================================== */}

      {showForm && (

        <section
          ref={formRef}
          className="
            ai-card
            scroll-mt-24
          "
        >

          {/* FORM HEADER */}

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <h2 className="text-2xl font-bold">

                {editingId
                  ? "Update Issue"
                  : "Report New Issue"}

              </h2>

              <p className="mt-1 text-sm text-slate-400">

                {editingId
                  ? "Modify the issue details and save your changes."
                  : "Enter the details of the city issue."}

              </p>

            </div>


            <button
              type="button"
              onClick={handleCloseForm}
              className="
                rounded-lg
                p-2
                text-slate-400
                transition
                hover:bg-white/5
                hover:text-white
              "
            >

              <X size={20} />

            </button>

          </div>


          {/* FORM */}

          <form
            onSubmit={
              editingId
                ? handleUpdate
                : handleCreate
            }
            className="
              grid
              gap-4
              lg:grid-cols-2
            "
          >

            {/* TITLE */}

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Issue Title"
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                transition
                focus:border-cyan-500
              "
              required
            />


            {/* LOCATION */}

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                transition
                focus:border-cyan-500
              "
            />


            {/* DESCRIPTION */}

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Issue Description"
              rows={4}
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                transition
                focus:border-cyan-500
                lg:col-span-2
              "
              required
            />


            {/* CATEGORY */}

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                focus:border-cyan-500
              "
            >

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

              <option value="Sanitation">
                Sanitation
              </option>

              <option value="Traffic">
                Traffic
              </option>

              <option value="Infrastructure">
                Infrastructure
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            {/* PRIORITY */}

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                focus:border-cyan-500
              "
            >

              <option value="Low">
                Low Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="High">
                High Priority
              </option>

              <option value="Critical">
                Critical Priority
              </option>

            </select>


            {/* STATUS */}

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                rounded-xl
                border
                border-white/10
                bg-slate-900
                p-3
                outline-none
                focus:border-cyan-500
              "
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


            {/* BUTTONS */}

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
                  transition
                  hover:bg-cyan-400
                "
              >

                {editingId
                  ? "Update Issue"
                  : "Create Issue"}

              </button>


              <button
                type="button"
                onClick={handleCloseForm}
                className="
                  rounded-xl
                  bg-slate-700
                  px-6
                  text-white
                  transition
                  hover:bg-slate-600
                "
              >

                Cancel

              </button>

            </div>

          </form>

        </section>

      )}


      {/* ==================================================
          SEARCH & FILTERS
      ================================================== */}

      <div
        className="
          grid
          gap-4
          lg:grid-cols-3
        "
      >

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-900
            p-3
            outline-none
            focus:border-cyan-500
          "
        />


        {/* CATEGORY FILTER */}

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-900
            p-3
            outline-none
            focus:border-cyan-500
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

          <option value="Sanitation">
            Sanitation
          </option>

          <option value="Traffic">
            Traffic
          </option>

          <option value="Infrastructure">
            Infrastructure
          </option>

          <option value="Other">
            Other
          </option>

        </select>


        {/* STATUS FILTER */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-900
            p-3
            outline-none
            focus:border-cyan-500
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


      {/* ==================================================
          RESULT COUNT
      ================================================== */}

      <div className="text-sm text-slate-400">

        Showing{" "}
        <span className="font-semibold text-white">
          {filteredIssues.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {issues.length}
        </span>{" "}
        issues

      </div>


      {/* ==================================================
          ISSUE CARDS
      ================================================== */}

      {filteredIssues.length === 0 ? (

        <div className="ai-card text-center">

          <AlertTriangle
            size={40}
            className="
              mx-auto
              text-slate-500
            "
          />

          <h3 className="mt-4 text-xl font-semibold">
            No issues found
          </h3>

          <p className="mt-2 text-slate-400">

            Try changing your search or
            filter criteria.

          </p>

        </div>

      ) : (

        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >

          {filteredIssues.map(
            (issue) => (

              <div
                key={issue._id}
                className="
                  ai-card
                  flex
                  flex-col
                "
              >

                {/* ICON */}

                <AlertTriangle
                  size={32}
                  className="text-cyan-400"
                />


                {/* TITLE */}

                <h2
                  className="
                    mt-4
                    text-2xl
                    font-bold
                  "
                >
                  {issue.title}
                </h2>


                {/* DESCRIPTION */}

                <p
                  className="
                    mt-2
                    text-slate-400
                  "
                >
                  {issue.description}
                </p>


                {/* CATEGORY */}

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
                    {issue.category ||
                      "Infrastructure"}
                  </span>

                </div>


                {/* PRIORITY */}

                <div className="mt-4">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-sm

                      ${
                        issue.priority ===
                        "Critical"

                          ? "bg-red-500/20 text-red-400"

                          : issue.priority ===
                            "High"

                          ? "bg-orange-500/20 text-orange-400"

                          : issue.priority ===
                            "Medium"

                          ? "bg-yellow-500/20 text-yellow-400"

                          : "bg-emerald-500/20 text-emerald-400"
                      }
                    `}
                  >

                    {issue.priority ||
                      "Medium"}{" "}
                    Priority

                  </span>

                </div>


                {/* STATUS */}

                <div className="mt-4">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-sm

                      ${
                        issue.status ===
                        "Resolved"

                          ? "bg-emerald-500/20 text-emerald-400"

                          : issue.status ===
                            "In Progress"

                          ? "bg-cyan-500/20 text-cyan-400"

                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    `}
                  >

                    {issue.status ||
                      "Pending"}

                  </span>

                </div>


                {/* LOCATION */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-slate-400
                  "
                >

                  <MapPin size={18} />

                  <span>
                    {issue.location ||
                      "N/A"}
                  </span>

                </div>


                {/* REPORTER */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-slate-400
                  "
                >

                  <User size={18} />

                  <span>
                    {issue.createdBy?.name ||
                      "Unknown"}
                  </span>

                </div>


                {/* DATE */}

                <p
                  className="
                    mt-4
                    text-sm
                    text-slate-500
                  "
                >

                  {issue.createdAt
                    ? new Date(
                        issue.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </p>


                {/* BUTTONS */}

                <div
                  className="
                    mt-auto
                    flex
                    justify-end
                    gap-3
                    pt-6
                  "
                >

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
                      transition
                      hover:bg-yellow-400
                    "
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        issue._id
                      )
                    }
                    className="
                      rounded-lg
                      bg-red-600
                      px-4
                      py-2
                      text-white
                      transition
                      hover:bg-red-500
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}