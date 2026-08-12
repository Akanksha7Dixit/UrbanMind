import { useEffect, useState } from "react";

import {
  Building2,
  MapPin,
  Activity,
} from "lucide-react";

import toast from "react-hot-toast";

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

  // ==========================================
  // STATE
  // ==========================================

  const [infrastructure, setInfrastructure] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [formData, setFormData] =
    useState({
      name: "",
      type: "",
      status: "Operational",
      sector: "",
      utilization: "",
      latitude: "",
      longitude: "",
      capacity: "",
      description: "",
    });


  // ==========================================
  // FETCH INFRASTRUCTURE
  // ==========================================

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
        data.infrastructure || []
      );

    } catch (error) {
      console.error(
        "Fetch infrastructure error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load infrastructure"
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // HANDLE FORM CHANGE
  // ==========================================

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


  // ==========================================
  // RESET FORM
  // ==========================================

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
      capacity: "",
      description: "",
    });
  };


  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {

    if (!formData.name.trim()) {
      toast.error(
        "Infrastructure name is required"
      );
      return false;
    }

    if (!formData.type) {
      toast.error(
        "Please select infrastructure type"
      );
      return false;
    }

    if (!formData.sector.trim()) {
      toast.error(
        "Sector is required"
      );
      return false;
    }

    const utilization =
      Number(formData.utilization);

    if (
      formData.utilization === "" ||
      Number.isNaN(utilization) ||
      utilization < 0 ||
      utilization > 100
    ) {
      toast.error(
        "Utilization must be between 0 and 100"
      );
      return false;
    }

    const latitude =
      Number(formData.latitude);

    if (
      formData.latitude === "" ||
      Number.isNaN(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      toast.error(
        "Latitude must be between -90 and 90"
      );
      return false;
    }

    const longitude =
      Number(formData.longitude);

    if (
      formData.longitude === "" ||
      Number.isNaN(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      toast.error(
        "Longitude must be between -180 and 180"
      );
      return false;
    }

    if (
      formData.capacity !== "" &&
      Number(formData.capacity) < 0
    ) {
      toast.error(
        "Capacity cannot be negative"
      );
      return false;
    }

    return true;
  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,

        utilization:
          Number(formData.utilization),

        latitude:
          Number(formData.latitude),

        longitude:
          Number(formData.longitude),

        capacity:
          formData.capacity === ""
            ? 0
            : Number(formData.capacity),

        name:
          formData.name.trim(),

        sector:
          formData.sector.trim(),

        description:
          formData.description.trim(),
      };


      if (editingId) {

        await updateInfrastructure(
          editingId,
          payload,
          token
        );

        toast.success(
          "Infrastructure updated successfully"
        );

      } else {

        await createInfrastructure(
          payload,
          token
        );

        toast.success(
          "Infrastructure added successfully"
        );
      }


      await fetchInfrastructure();

      resetForm();

    } catch (error) {

      console.error(
        "Save infrastructure error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save infrastructure"
      );

    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this infrastructure?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      setDeletingId(id);

      await deleteInfrastructure(
        id,
        token
      );

      setInfrastructure((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      toast.success(
        "Infrastructure deleted successfully"
      );

    } catch (error) {

      console.error(
        "Delete infrastructure error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete infrastructure"
      );

    } finally {
      setDeletingId(null);
    }
  };


  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (item) => {

    setEditingId(item._id);

    setFormData({
      name: item.name || "",
      type: item.type || "",
      status:
        item.status || "Operational",
      sector: item.sector || "",
      utilization:
        item.utilization ?? "",
      latitude:
        item.latitude ?? "",
      longitude:
        item.longitude ?? "",
      capacity:
        item.capacity ?? "",
      description:
        item.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    toast(
      "Editing infrastructure",
      {
        icon: "✏️",
      }
    );
  };


  // ==========================================
  // STATISTICS
  // ==========================================

  const highestUtilization =
    infrastructure.length
      ? infrastructure.reduce(
          (max, item) =>
            Number(item.utilization) >
            Number(max.utilization)
              ? item
              : max
        )
      : null;


  const lowestUtilization =
    infrastructure.length
      ? infrastructure.reduce(
          (min, item) =>
            Number(item.utilization) <
            Number(min.utilization)
              ? item
              : min
        )
      : null;


  const averageUtilization =
    infrastructure.length
      ? (
          infrastructure.reduce(
            (sum, item) =>
              sum +
              Number(item.utilization || 0),
            0
          ) /
          infrastructure.length
        ).toFixed(1)
      : "0.0";


  // ==========================================
  // FILTERING
  // ==========================================

  const filteredInfrastructure =
    infrastructure.filter((item) => {

      const query =
        searchTerm
          .toLowerCase()
          .trim();

      const matchesSearch =
        !query ||
        item.name
          ?.toLowerCase()
          .includes(query) ||
        item.type
          ?.toLowerCase()
          .includes(query) ||
        item.sector
          ?.toLowerCase()
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
    });


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="p-8">

        <div className="ai-card">
          <p className="text-slate-400">
            Loading infrastructure...
          </p>
        </div>

      </div>
    );
  }


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-8 p-8">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div>

        <h1 className="text-4xl font-bold">
          Infrastructure Management
        </h1>

        <p className="mt-2 text-slate-400">
          Add, update and manage city
          infrastructure.
        </p>

      </div>


      {/* ===================================== */}
      {/* FORM */}
      {/* ===================================== */}

      <section className="ai-card">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            {editingId
              ? "Update Infrastructure"
              : "Add Infrastructure"}

          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {editingId
              ? "Update the selected infrastructure asset."
              : "Add a new city infrastructure asset to UrbanMind."
            }
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="grid gap-4 lg:grid-cols-2"
        >

          {/* NAME */}

          <input
            name="name"
            placeholder="Infrastructure Name"
            value={formData.name}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* TYPE */}

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
            "
          >

            <option value="">
              Select Infrastructure Type
            </option>

            <option value="Hospital">
              Hospital
            </option>

            <option value="School">
              School
            </option>

            <option value="Police">
              Police
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Emergency">
              Emergency
            </option>

            <option value="Park">
              Park
            </option>

            <option value="Road">
              Road
            </option>

            <option value="Metro">
              Metro
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          {/* SECTOR */}

          <input
            name="sector"
            placeholder="Sector / Zone"
            value={formData.sector}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* UTILIZATION */}

          <input
            name="utilization"
            type="number"
            min="0"
            max="100"
            placeholder="Utilization (%)"
            value={formData.utilization}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* LATITUDE */}

          <input
            name="latitude"
            type="number"
            step="any"
            min="-90"
            max="90"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* LONGITUDE */}

          <input
            name="longitude"
            type="number"
            step="any"
            min="-180"
            max="180"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* STATUS */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
            "
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


          {/* CAPACITY */}

          <input
            name="capacity"
            type="number"
            min="0"
            placeholder="Capacity (e.g. 500)"
            value={formData.capacity}
            onChange={handleChange}
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
            "
          />


          {/* DESCRIPTION */}

          <textarea
            name="description"
            placeholder="Infrastructure description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="
              rounded-xl
              bg-slate-900
              p-3
              outline-none
              border
              border-white/10
              focus:border-cyan-500
              lg:col-span-2
            "
          />


          {/* BUTTONS */}

          <div className="flex gap-3 lg:col-span-2">

            <button
              type="submit"
              disabled={saving}
              className="
                flex-1
                rounded-xl
                bg-cyan-500
                py-3
                font-semibold
                text-slate-950
                transition
                hover:bg-cyan-400
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {saving
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                  ? "Update Infrastructure"
                  : "Add Infrastructure"}

            </button>


            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
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

            )}

          </div>

        </form>

      </section>


      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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
                (item) =>
                  item.status ===
                  "Operational"
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
              infrastructure.filter(
                (item) =>
                  item.status ===
                  "Under Construction"
              ).length
            }
          </h2>

        </div>


        <div className="ai-card">

          <p className="text-slate-400">
            Maintenance
          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-400">
            {
              infrastructure.filter(
                (item) =>
                  item.status ===
                  "Maintenance"
              ).length
            }
          </h2>

        </div>

      </div>


      {/* ===================================== */}
      {/* INSIGHTS */}
      {/* ===================================== */}

      <section className="ai-card">

        <h2 className="mb-6 text-2xl font-bold">
          Infrastructure Insights
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <p className="text-slate-400">
              Highest Utilization
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {highestUtilization?.name ||
                "No data"}
            </h3>

            <p className="text-cyan-400">
              {highestUtilization
                ? `${highestUtilization.utilization}%`
                : "—"}
            </p>

          </div>


          <div>

            <p className="text-slate-400">
              Lowest Utilization
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {lowestUtilization?.name ||
                "No data"}
            </h3>

            <p className="text-yellow-400">
              {lowestUtilization
                ? `${lowestUtilization.utilization}%`
                : "—"}
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


      {/* ===================================== */}
      {/* SEARCH & FILTER */}
      {/* ===================================== */}

      <div className="grid gap-4 lg:grid-cols-3">

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
            border
            border-white/10
          "
        />


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
            border
            border-white/10
          "
        >

          <option>All</option>
          <option>Hospital</option>
          <option>School</option>
          <option>Police</option>
          <option>Transport</option>
          <option>Emergency</option>
          <option>Park</option>
          <option>Road</option>
          <option>Metro</option>
          <option>Other</option>

        </select>


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
            border
            border-white/10
          "
        >

          <option>All</option>

          <option>
            Operational
          </option>

          <option>
            Under Construction
          </option>

          <option>
            Maintenance
          </option>

        </select>

      </div>


      {/* ===================================== */}
      {/* RESULTS COUNT */}
      {/* ===================================== */}

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="text-white font-medium">
            {filteredInfrastructure.length}
          </span>{" "}
          of{" "}
          <span className="text-white font-medium">
            {infrastructure.length}
          </span>{" "}
          infrastructure assets
        </p>

      </div>


      {/* ===================================== */}
      {/* CARDS */}
      {/* ===================================== */}

      {filteredInfrastructure.length === 0 ? (

        <div className="ai-card text-center">

          <Building2
            size={40}
            className="mx-auto text-slate-500"
          />

          <h3 className="mt-4 text-xl font-semibold">
            No infrastructure found
          </h3>

          <p className="mt-2 text-slate-400">
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-3">

          {filteredInfrastructure.map(
            (item) => (

              <div
                key={item._id}
                className="
                  ai-card
                  transition
                  duration-300
                  hover:-translate-y-1
                "
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
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-sm

                      ${
                        item.status ===
                        "Operational"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : item.status ===
                            "Under Construction"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </div>


                {/* CAPACITY */}

                <div className="mt-5">

                  <p className="text-sm text-slate-400">
                    Capacity
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    {item.capacity
                      ? item.capacity.toLocaleString()
                      : "Not specified"}
                  </p>

                </div>


                {/* UTILIZATION */}

                <div className="mt-5">

                  <div className="flex justify-between">

                    <p className="text-slate-400">
                      Utilization
                    </p>

                    <p className="text-cyan-400">
                      {item.utilization}%
                    </p>

                  </div>


                  <div className="mt-2 h-3 rounded-full bg-slate-800">

                    <div
                      className={`
                        h-3
                        rounded-full
                        transition-all

                        ${
                          Number(
                            item.utilization
                          ) >= 90
                            ? "bg-red-400"
                            : Number(
                                item.utilization
                              ) >= 75
                              ? "bg-yellow-400"
                              : "bg-cyan-400"
                        }
                      `}
                      style={{
                        width: `${Math.min(
                          Number(
                            item.utilization
                          ),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>


                {/* DESCRIPTION */}

                {item.description && (

                  <p className="mt-5 text-sm leading-relaxed text-slate-400">

                    {item.description}

                  </p>

                )}


                {/* LOCATION */}

                <div className="mt-5 text-xs text-slate-500">

                  Coordinates:{" "}

                  {item.latitude},{" "}
                  {item.longitude}

                </div>


                {/* ACTIONS */}

                <div className="mt-6 flex justify-end gap-3">

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    disabled={
                      deletingId ===
                      item._id
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
                      disabled:opacity-50
                    "
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                    disabled={
                      deletingId ===
                      item._id
                    }
                    className="
                      rounded-lg
                      bg-red-600
                      px-4
                      py-2
                      text-white
                      transition
                      hover:bg-red-500
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    {deletingId === item._id
                      ? "Deleting..."
                      : "Delete"}

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