import {
    Brain,
    AlertTriangle,
    TrendingUp,
    Building2,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { getRecommendations } from "../../services/recommendationService";

export default function AIRecommendationCenter() {

    const [
        recommendations,
        setRecommendations,
    ] = useState([]);


    const [
        healthScore,
        setHealthScore,
    ] = useState(0);


    const [
        overview,
        setOverview,
    ] = useState("");


    const [
        totalInfrastructure,
        setTotalInfrastructure,
    ] = useState(0);


    const [
        totalIssues,
        setTotalIssues,
    ] = useState(0);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    const loadRecommendations =
        async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getRecommendations();


                setRecommendations(
                    Array.isArray(
                        data.recommendations
                    )
                        ? data.recommendations
                        : []
                );


                setHealthScore(
                    Number(
                        data.healthScore || 0
                    )
                );


                setOverview(
                    data.overview || ""
                );


                setTotalInfrastructure(
                    Number(
                        data.totalInfrastructure ||
                        0
                    )
                );


                setTotalIssues(
                    Number(
                        data.totalIssues ||
                        0
                    )
                );


            } catch (err) {

                console.error(
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load AI recommendations."
                );


            } finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        loadRecommendations();

    }, []);


    return (

        <div className="space-y-8 p-8">

            {/* HEADER */}

            <div>

                <h1 className="text-4xl font-bold">

                    AI Recommendation Center

                </h1>


                <p className="mt-2 text-slate-400">

                    Dynamic AI analysis of the
                    current urban data.

                </p>

            </div>


            {/* ERROR */}

            {error && (

                <div className="
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-5
                    text-red-400
                ">

                    {error}

                </div>

            )}


            {/* AI SUMMARY */}

            <section className="
                rounded-3xl
                border
                border-cyan-500/20
                bg-cyan-500/5
                p-8
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <Brain
                        className="text-cyan-400"
                    />

                    <p className="
                        text-cyan-400
                        font-medium
                    ">

                        UrbanMind AI Analysis

                    </p>

                </div>


                {loading ? (

                    <p className="
                        mt-6
                        text-slate-400
                    ">

                        AI is analyzing
                        current city data...

                    </p>

                ) : (

                    <>

                        <h2 className="
                            mt-4
                            text-5xl
                            font-bold
                            text-cyan-400
                        ">

                            {healthScore}%

                        </h2>


                        {overview && (

                            <p className="
                                mt-6
                                max-w-4xl
                                leading-7
                                text-slate-400
                            ">

                                {overview}

                            </p>

                        )}

                    </>

                )}

            </section>


            {/* CITY STATISTICS */}

            <section>

                <h2 className="
                    mb-6
                    text-2xl
                    font-semibold
                ">

                    Current City Data

                </h2>


                <div className="
                    grid
                    gap-6
                    lg:grid-cols-3
                ">

                    <div className="ai-card">

                        <Building2
                            className="text-cyan-400"
                        />

                        <p className="
                            mt-4
                            text-slate-400
                        ">

                            Infrastructure

                        </p>


                        <h2 className="
                            mt-3
                            text-5xl
                            font-bold
                        ">

                            {totalInfrastructure}

                        </h2>

                    </div>


                    <div className="ai-card">

                        <AlertTriangle
                            className="text-red-400"
                        />

                        <p className="
                            mt-4
                            text-slate-400
                        ">

                            Citizen Issues

                        </p>


                        <h2 className="
                            mt-3
                            text-5xl
                            font-bold
                        ">

                            {totalIssues}

                        </h2>

                    </div>


                    <div className="ai-card">

                        <TrendingUp
                            className="text-green-400"
                        />

                        <p className="
                            mt-4
                            text-slate-400
                        ">

                            AI Recommendations

                        </p>


                        <h2 className="
                            mt-3
                            text-5xl
                            font-bold
                        ">

                            {
                                recommendations.length
                            }

                        </h2>

                    </div>

                </div>

            </section>


            {/* RECOMMENDATIONS */}

            <section>

                <h2 className="
                    mb-6
                    text-2xl
                    font-semibold
                ">

                    AI Recommendations

                </h2>


                {loading ? (

                    <div className="ai-card">

                        <p className="
                            text-slate-400
                        ">

                            Generating
                            recommendations...

                        </p>

                    </div>

                ) : recommendations.length === 0 ? (

                    <div className="ai-card">

                        <Brain
                            className="
                                mb-4
                                text-cyan-400
                            "
                            size={40}
                        />


                        <h2 className="
                            text-2xl
                            font-bold
                        ">

                            No Recommendations

                        </h2>


                        <p className="
                            mt-3
                            text-slate-400
                        ">

                            The AI did not identify
                            a sufficiently supported
                            recommendation from
                            the current data.

                        </p>

                    </div>

                ) : (

                    <div className="
                        grid
                        gap-6
                        lg:grid-cols-2
                    ">

                        {recommendations.map(
                            (item, index) => (

                                <div
                                    key={
                                        item.id ||
                                        item._id ||
                                        index
                                    }
                                    className="ai-card"
                                >

                                    <AlertTriangle
                                        className="
                                            text-cyan-400
                                        "
                                    />


                                    <h3 className="
                                        mt-4
                                        text-xl
                                        font-semibold
                                    ">

                                        {item.title}

                                    </h3>


                                    <p className="
                                        mt-3
                                        text-slate-400
                                    ">

                                        {
                                            item.recommendation
                                        }

                                    </p>


                                    {item.reason && (

                                        <p className="
                                            mt-4
                                            text-sm
                                            text-slate-500
                                        ">

                                            Reason:
                                            {" "}
                                            {item.reason}

                                        </p>

                                    )}


                                    <div className="
                                        mt-5
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <span className="
                                            rounded-full
                                            bg-white/5
                                            px-3
                                            py-1
                                            text-sm
                                        ">

                                            {
                                                item.category
                                            }

                                        </span>


                                        <span className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm

                                            ${
                                                item.priority ===
                                                "Critical"

                                                    ? "bg-red-500/20 text-red-400"

                                                    : item.priority ===
                                                      "High"

                                                    ? "bg-orange-500/20 text-orange-400"

                                                    : item.priority ===
                                                      "Medium"

                                                    ? "bg-yellow-500/20 text-yellow-400"

                                                    : "bg-green-500/20 text-green-400"
                                            }
                                        `}>

                                            {
                                                item.priority
                                            }

                                        </span>


                                        {typeof item.confidence ===
                                            "number" && (

                                            <span className="
                                                text-xs
                                                text-slate-500
                                            ">

                                                {
                                                    item.confidence
                                                }%
                                                confidence

                                            </span>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>

        </div>

    );

}