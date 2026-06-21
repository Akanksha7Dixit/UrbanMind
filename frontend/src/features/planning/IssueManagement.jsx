import {
    useEffect,
    useState,
} from "react";

import {
    getIssues,
    updateIssueStatus,
} from "../../services/issueService";

import {
    useAuthStore,
} from "../../store/authStore";

export default function IssueManagement() {
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

    const handleStatusChange =
        async (
            issueId,
            status
        ) => {

            try {

                await updateIssueStatus(
                    issueId,
                    status,
                    token
                );

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


    return (
        <div className="p-8">

            <h1 className="mb-8 text-4xl font-bold">
                Issue Management
            </h1>

            <div className="space-y-4">

                {issues.map(
                    (issue) => (

                        <div
                            key={issue._id}
                            className="
                rounded-2xl
                border border-white/10
                p-6
              "
                        >
                            <h3 className="font-semibold">
                                {issue.title}
                            </h3>

                            <p className="mt-2 text-slate-400">
                                {issue.description}
                            </p>

                            <div className="mt-4">

                                <select
                                    value={issue.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            issue._id,
                                            e.target.value
                                        )
                                    }
                                    className="
      rounded-lg
      bg-slate-900
      border
      border-white/10
      px-4
      py-2
    "
                                >

                                    <option>
                                        Pending
                                    </option>

                                    <option>
                                        In Progress
                                    </option>

                                    <option>
                                        Resolved
                                    </option>

                                </select>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>
    );
}