import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Activity,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";

import {
  getInfrastructure,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
} from "../../services/infrastructureService";

export default function InfrastructureManagement() {
  const token = useAuthStore(
    (state) => state.token
  );

  const [infrastructure, setInfrastructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] =
    useState({
      name: "",
      type: "",
      status: "Operational",
      sector: "",
      utilization: "",
      latitude: "",
      longitude: "",
    });

  useEffect(() => {
    if (token) {
      fetchInfrastructure();
    }
  }, [token]);

  const fetchInfrastructure = async () => {
    try {
      setLoading(true);

      const data =
        await getInfrastructure(token);

      setInfrastructure(
        data.infrastructure
      );
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
      name: "",
      type: "",
      status: "Operational",
      sector: "",
      utilization: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await updateInfrastructure(
          editingId,
          formData,
          token
        );

      } else {

        await createInfrastructure(
          formData,
          token
        );

      }

      await fetchInfrastructure();

      resetForm();

    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this infrastructure?"
      );

    if (!confirmDelete) return;

    try {

      await deleteInfrastructure(
        id,
        token
      );

      setInfrastructure((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {

    setEditingId(item._id);

    setFormData({
      name: item.name,
      type: item.type,
      status: item.status,
      sector: item.sector,
      utilization: item.utilization,
      latitude: item.latitude,
      longitude: item.longitude,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const highestUtilization =
    infrastructure.reduce(
      (max, item) =>
        item.utilization > max.utilization
          ? item
          : max,
      infrastructure[0]
    );

  const lowestUtilization =
    infrastructure.reduce(
      (min, item) =>
        item.utilization < min.utilization
          ? item
          : min,
      infrastructure[0]
    );

  const averageUtilization =
    infrastructure.length
      ? (
        infrastructure.reduce(
          (sum, item) =>
            sum + Number(item.utilization),
          0
        ) / infrastructure.length
      ).toFixed(1)
      : 0;
  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Infrastructure Management
        </h1>

        <p className="mt-2 text-slate-400">
          Add, update and manage city infrastructure.
        </p>

      </div>

      {loading ? (

        <div className="text-slate-400">
          Loading infrastructure...
        </div>

      ) : (

        <>

          {/* Form */}

          <section className="ai-card mb-8">

            <h2 className="mb-6 text-2xl font-bold">

              {editingId
                ? "Update Infrastructure"
                : "Add Infrastructure"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 lg:grid-cols-2"
            >

              <input
                name="name"
                placeholder="Infrastructure Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <input
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <input
                name="sector"
                placeholder="Sector"
                value={formData.sector}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <input
                name="utilization"
                type="number"
                placeholder="Utilization (%)"
                value={formData.utilization}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <input
                name="latitude"
                type="number"
                step="any"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <input
                name="longitude"
                type="number"
                step="any"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-xl bg-slate-900 p-3 outline-none"
              >
                <option value="Operational">
                  Operational
                </option>

                <option value="Under Construction">
                  Under Construction
                </option>

                <option value="Maintenance">
                  Maintenance
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
                    transition
                    hover:bg-cyan-400
                  "
                >
                  {editingId
                    ? "Update Infrastructure"
                    : "Add Infrastructure"}
                </button>

                {editingId && (

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

                )}

              </div>

            </form>

          </section>

          {/* Statistics */}

          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

            <div className="ai-card">
              <p className="text-slate-400">
                Total Infrastructure
              </p>

              <h2 className="mt-3 text-4xl font-bold text-cyan-400">
                {infrastructure.length}
              </h2>
            </div>

            <div className="ai-card">
              <p className="text-slate-400">
                Operational
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-400">
                {
                  infrastructure.filter(
                    item => item.status === "Operational"
                  ).length
                }
              </h2>
            </div>

            <div className="ai-card">
              <p className="text-slate-400">
                Under Construction
              </p>

              <h2 className="mt-3 text-4xl font-bold text-yellow-400">
                {
                  infrastructure.filter((item) => {
                    return item.status === "Under Construction";
                  }).length
                }
              </h2>
            </div>

            <div className="ai-card">
              <p className="text-slate-400">
                Maintenance
              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-400">
                {
                  infrastructure.filter((item) => {
                    return item.status === "Maintenance";
                  }).length
                }
              </h2>
            </div>

          </div>

          {/* Infrastructure Insights */}
          
          <section className="ai-card mb-8">

            <h2 className="mb-6 text-2xl font-bold">
              Infrastructure Insights
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <p className="text-slate-400">
                  Highest Utilization
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {highestUtilization?.name}
                </h3>

                <p className="text-cyan-400">
                  {highestUtilization?.utilization}%
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Lowest Utilization
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {lowestUtilization?.name}
                </h3>

                <p className="text-yellow-400">
                  {lowestUtilization?.utilization}%
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Average Utilization
                </p>

                <h3 className="mt-2 text-3xl font-bold text-emerald-400">
                  {averageUtilization}%
                </h3>

                <p className="text-slate-400">
                  City Infrastructure Health
                </p>
              </div>

            </div>

          </section>

          {/*Search Input */}
          <div className="mb-6 grid gap-4 lg:grid-cols-3">

            {/* Search */}

            <input
              type="text"
              placeholder="Search infrastructure..."
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

            {/* Type Filter */}

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="
      rounded-xl
      bg-slate-900
      p-3
      outline-none
    "
            >
              <option>All</option>
              <option>Hospital</option>
              <option>Police</option>
              <option>Transport</option>
              <option>Emergency</option>
              <option>School</option>
              <option>Park</option>
            </select>

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
      rounded-xl
      bg-slate-900
      p-3
      outline-none
    "
            >
              <option>All</option>
              <option>Operational</option>
              <option>Under Construction</option>
              <option>Maintenance</option>
            </select>

          </div>

          {/* Infrastructure Cards */}

          <div className="grid gap-6 lg:grid-cols-3">

            {infrastructure
              .filter((item) => {

                const query =
                  searchTerm.toLowerCase();

                const matchesSearch =
                  item.name
                    .toLowerCase()
                    .includes(query) ||

                  item.type
                    .toLowerCase()
                    .includes(query) ||

                  item.sector
                    .toLowerCase()
                    .includes(query);

                const matchesType =
                  typeFilter === "All" ||
                  item.type === typeFilter;

                const matchesStatus =
                  statusFilter === "All" ||
                  item.status === statusFilter;

                return (
                  matchesSearch &&
                  matchesType &&
                  matchesStatus
                );

              })
              .map((item) => (

                <div
                  key={item._id}
                  className="ai-card"
                >

                  <Building2
                    size={32}
                    className="text-cyan-400"
                  />

                  <h2 className="mt-4 text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {item.type}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-slate-400">
                    <MapPin size={18} />
                    {item.sector}
                  </div>

                  <div className="mt-4 flex items-center gap-2">

                    <Activity
                      size={18}
                      className="text-cyan-400"
                    />

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${item.status === "Operational"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : item.status === "Under Construction"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="mt-6">

                    <p className="text-slate-400">
                      Utilization
                    </p>

                    <div className="mt-2 h-3 rounded-full bg-slate-800">

                      <div
                        className="h-3 rounded-full bg-cyan-400"
                        style={{
                          width: `${item.utilization}%`,
                        }}
                      />

                    </div>

                    <p className="mt-2 text-cyan-400">
                      {item.utilization}%
                    </p>

                  </div>

                  <div className="mt-6 flex justify-end gap-3">

                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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