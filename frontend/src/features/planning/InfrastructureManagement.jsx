// import { useEffect, useState } from "react";
// import {
//   Building2,
//   MapPin,
//   Activity,
// } from "lucide-react";

// import { useAuthStore } from "../../store/authStore";

// import {
//   getInfrastructure,
//   createInfrastructure,
//   updateInfrastructure,
//   deleteInfrastructure,
// } from "../../services/infrastructureService";

// export default function InfrastructureManagement() {
//   const token = useAuthStore(
//     (state) => state.token
//   );

//   const [infrastructure, setInfrastructure] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     status: "Operational",
//     sector: "",
//     utilization: "",
//     latitude: "",
//     longitude: "",
//   });

//   useEffect(() => {
//     fetchInfrastructure();
//   }, [token]);

//   const [editingId, setEditingId] = useState(null);

//   const fetchInfrastructure = async () => {
//     try {
//       const data = await getInfrastructure(token);

//       setInfrastructure(data.infrastructure);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         await updateInfrastructure(
//           editingId,
//           formData,
//           token
//         );
//       } else {
//         await createInfrastructure(
//           formData,
//           token
//         );
//       }

//       await fetchInfrastructure();

//       setFormData({
//         name: "",
//         type: "",
//         status: "Operational",
//         sector: "",
//         utilization: "",
//         latitude: "",
//         longitude: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this infrastructure?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteInfrastructure(id, token);

//       await fetchInfrastructure();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="space-y-8 p-8">

//       {/* Header */}

//       <div>
//         <h1 className="text-4xl font-bold">
//           Infrastructure Management
//         </h1>

//         <p className="mt-2 text-slate-400">
//           Add, update and manage city infrastructure.
//         </p>
//       </div>

//       {loading ? (

//         <div className="text-slate-400">
//           Loading infrastructure...
//         </div>

//       ) : (

//         <>

//           {/* Add Infrastructure */}

//           <section className="ai-card mb-8">

//             <h2 className="mb-6 text-2xl font-bold">
//               {editingId
//                 ? "Update Infrastructure"
//                 : "Add Infrastructure"}
//             </h2>

//             <form
//               onSubmit={handleSubmit}
//               className="grid gap-4 lg:grid-cols-2"
//             >

//               <input
//                 name="name"
//                 placeholder="Infrastructure Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <input
//                 name="type"
//                 placeholder="Type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <input
//                 name="sector"
//                 placeholder="Sector"
//                 value={formData.sector}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <input
//                 name="utilization"
//                 type="number"
//                 placeholder="Utilization (%)"
//                 value={formData.utilization}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <input
//                 name="latitude"
//                 type="number"
//                 step="any"
//                 placeholder="Latitude"
//                 value={formData.latitude}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <input
//                 name="longitude"
//                 type="number"
//                 step="any"
//                 placeholder="Longitude"
//                 value={formData.longitude}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//                 required
//               />

//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="rounded-xl bg-slate-900 p-3 outline-none"
//               >
//                 <option value="Operational">
//                   Operational
//                 </option>

//                 <option value="Under Construction">
//                   Under Construction
//                 </option>

//                 <option value="Maintenance">
//                   Maintenance
//                 </option>
//               </select>

//               <button
//                 type="submit"
//                 className="
//                   rounded-xl
//                   bg-cyan-500
//                   py-3
//                   font-semibold
//                   text-slate-950
//                   transition
//                   hover:bg-cyan-400
//                 "
//               >
//                 Add Infrastructure
//               </button>

//             </form>

//           </section>

//           {/* Infrastructure Cards */}

//           <div className="grid gap-6 lg:grid-cols-3">

//             {infrastructure.map((item) => (

//               <div
//                 key={item._id}
//                 className="ai-card"
//               >

//                 <Building2
//                   size={32}
//                   className="text-cyan-400"
//                 />

//                 <h2 className="mt-4 text-2xl font-bold">
//                   {item.name}
//                 </h2>

//                 <p className="mt-2 text-slate-400">
//                   {item.type}
//                 </p>

//                 <div className="mt-4 flex items-center gap-2 text-slate-400">
//                   <MapPin size={18} />
//                   {item.sector}
//                 </div>

//                 <div className="mt-4 flex items-center gap-2">

//                   <Activity
//                     size={18}
//                     className="text-cyan-400"
//                   />

//                   <span
//                     className={`rounded-full px-3 py-1 text-sm ${item.status === "Operational"
//                       ? "bg-emerald-500/20 text-emerald-400"
//                       : item.status === "Under Construction"
//                         ? "bg-yellow-500/20 text-yellow-400"
//                         : "bg-red-500/20 text-red-400"
//                       }`}
//                   >
//                     {item.status}
//                   </span>

//                 </div>

//                 <div className="mt-6">

//                   <p className="text-slate-400">
//                     Utilization
//                   </p>

//                   <div className="mt-2 h-3 rounded-full bg-slate-800">

//                     <div
//                       className="h-3 rounded-full bg-cyan-400"
//                       style={{
//                         width: `${item.utilization}%`,
//                       }}
//                     />

//                   </div>

//                   <p className="mt-2 text-cyan-400">
//                     {item.utilization}%
//                   </p>

//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">

//                   <button
//                     onClick={() => {
//                       setEditingId(item._id);

//                       setFormData({
//                         name: item.name,
//                         type: item.type,
//                         status: item.status,
//                         sector: item.sector,
//                         utilization: item.utilization,
//                         latitude: item.latitude,
//                         longitude: item.longitude,
//                       });

//                       window.scrollTo({
//                         top: 0,
//                         behavior: "smooth",
//                       });
//                     }}
//                     className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </>

//       )}

//     </div>
//   );
// }


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

  const [infrastructure, setInfrastructure] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

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

          {/* Infrastructure Cards */}

          <div className="grid gap-6 lg:grid-cols-3">

            {infrastructure.map((item) => (
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

                  <span>
                    {item.sector}
                  </span>

                </div>

                <div className="mt-4 flex items-center gap-2">

                  <Activity
                    size={18}
                    className="text-cyan-400"
                  />

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      item.status === "Operational"
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
                    onClick={() =>
                      handleEdit(item)
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
                      handleDelete(item._id)
                    }
                    className="
                      rounded-lg
                      bg-red-600
                      px-4
                      py-2
                      font-semibold
                      text-white
                      transition
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