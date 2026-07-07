import { X, FilePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateReportModal({
    open,
    onClose,
    onSubmit,
    initialCategory = "Health",
})  {

    const [form, setForm] = useState({
    title: "",
    category: initialCategory,
    description: "",
});
useEffect(() => {
    if (open) {
        setForm({
            title: "",
            category: initialCategory,
            description: "",
        });
    }
}, [open, initialCategory]);

    if (!open) return null;


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(form);

        setForm({
            title: "",
            category: "Health",
            description: "",
        });
    };

    return (
        <div
            className="
fixed inset-0 z-50
flex items-center justify-center
bg-black/60
backdrop-blur-sm
"
        >
            <div
                className="
w-full
max-w-2xl
rounded-3xl
border border-white/10
bg-slate-900
p-8
shadow-2xl
"
            >
                {/* Header */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div
                            className="
rounded-2xl
bg-cyan-500/10
p-3
"
                        >
                            <FilePlus
                                className="text-cyan-400"
                            />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">
                                Create Report
                            </h2>

                            <p className="text-slate-400">
                                Generate a new urban intelligence report.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="
rounded-xl
p-2
hover:bg-white/5
"
                    >
                        <X />
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Report Title
                        </label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="
w-full
rounded-xl
border border-white/10
bg-slate-950
p-4
outline-none
focus:border-cyan-500
"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="
w-full
rounded-xl
border border-white/10
bg-slate-950
p-4
outline-none
focus:border-cyan-500
"
                        >
                            <option>Health</option>
                            <option>Infrastructure</option>
                            <option>Environment</option>
                            <option>Simulation</option>
                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="
w-full
rounded-xl
border border-white/10
bg-slate-950
p-4
outline-none
focus:border-cyan-500
"
                        />

                    </div>

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
rounded-xl
border border-white/10
px-6
py-3
hover:bg-white/5
"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="
rounded-xl
bg-cyan-500
px-6
py-3
font-semibold
text-slate-950
hover:bg-cyan-400
"
                        >
                            Create Report
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}