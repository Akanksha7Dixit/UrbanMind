import { useEffect, useState } from "react";
import { FileText, Loader2, X } from "lucide-react";

export default function CreateReportModal({
    open,
    onClose,
    onSubmit,
    initialCategory = "Health",
    isSubmitting = false,
}) {
    const [formData, setFormData] = useState({
        title: "",
        category: initialCategory,
        description: "",
    });

    useEffect(() => {
        if (open) {
            setFormData((previous) => ({
                ...previous,
                category: initialCategory || "Health",
            }));
        }
    }, [open, initialCategory]);

    if (!open) {
        return null;
    }

    const handleChange = (event) => {
        if (isSubmitting) {
            return;
        }

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        if (!formData.title.trim()) {
            return;
        }

        if (!formData.description.trim()) {
            return;
        }

        await onSubmit({
            title: formData.title.trim(),
            category: formData.category,
            description: formData.description.trim(),
        });
    };

    const handleClose = () => {
        if (isSubmitting) {
            return;
        }

        onClose();
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/70
                p-4
                backdrop-blur-sm
            "
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isSubmitting
                ) {
                    handleClose();
                }
            }}
        >
            <div
                className="
                    relative
                    w-full
                    max-w-2xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-slate-950
                    shadow-2xl
                "
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div
                    className="
                        flex
                        items-start
                        justify-between
                        border-b
                        border-white/10
                        p-6
                    "
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-cyan-500/10
                                    text-cyan-400
                                "
                            >
                                <FileText size={21} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Create Report
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    Generate a new urban intelligence report.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        aria-label="Close"
                        className="
                            rounded-xl
                            p-2
                            text-slate-400
                            transition
                            hover:bg-white/5
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                        "
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >
                    <div>
                        <label
                            htmlFor="report-title"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Report Title
                        </label>

                        <input
                            id="report-title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter report title"
                            disabled={isSubmitting}
                            required
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-900
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-500
                                focus:border-cyan-500/50
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="report-category"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Category
                        </label>

                        <select
                            id="report-category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-900
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                focus:border-cyan-500/50
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            <option value="Health">
                                Health
                            </option>

                            <option value="Infrastructure">
                                Infrastructure
                            </option>

                            <option value="Environment">
                                Environment
                            </option>

                            <option value="Simulation">
                                Simulation
                            </option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="report-description"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Description
                        </label>

                        <textarea
                            id="report-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe what this report should analyze..."
                            rows={6}
                            disabled={isSubmitting}
                            required
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-white/10
                                bg-slate-900
                                px-4
                                py-3
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-500
                                focus:border-cyan-500/50
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        />
                    </div>

                    {isSubmitting && (
                        <div
                            className="
                                rounded-2xl
                                border
                                border-cyan-500/20
                                bg-cyan-500/5
                                p-4
                            "
                        >
                            <div className="flex items-start gap-3">
                                <Loader2
                                    size={20}
                                    className="
                                        mt-0.5
                                        shrink-0
                                        animate-spin
                                        text-cyan-400
                                    "
                                />

                                <div>
                                    <p className="font-semibold text-cyan-400">
                                        Generating AI Report
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-400">
                                        UrbanMind is analyzing the current
                                        infrastructure and citizen issues.
                                        This may take a little while because
                                        the report uses the local AI model.
                                    </p>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Please keep this window open. You can
                                        continue once generation is complete.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="
                                flex-1
                                rounded-xl
                                border
                                border-white/10
                                px-5
                                py-3
                                font-medium
                                text-white
                                transition
                                hover:bg-white/5
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                !formData.title.trim() ||
                                !formData.description.trim()
                            }
                            className="
                                flex
                                flex-1
                                items-center
                                justify-center
                                gap-3
                                rounded-xl
                                bg-cyan-500
                                px-5
                                py-3
                                font-semibold
                                text-slate-950
                                transition
                                hover:bg-cyan-400
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Generating Report...
                                </>
                            ) : (
                                <>
                                    <FileText size={18} />
                                    Create Report
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
