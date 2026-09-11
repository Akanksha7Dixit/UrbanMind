import {
    X,
    Sparkles,
    Send,
    Loader2,
    Trash2,
    Circle,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import ReactMarkdown from "react-markdown";

import { useAuthStore } from "../../store/authStore";
import {
    askAI,
    getAIHealth,
} from "../../services/recommendationService";

export default function AIAssistantDrawer({
    open,
    onClose,
}) {
    const token = useAuthStore(
        (state) => state.token
    );

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        messages,
        setMessages,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        aiOnline,
        setAiOnline,
    ] = useState(false);

    const [
        aiModel,
        setAiModel,
    ] = useState("");

    const [
        healthChecking,
        setHealthChecking,
    ] = useState(false);


    /*
     * Check the real AI service status.
     */
    const checkAIHealth = async () => {
        if (!token) {
            setAiOnline(false);
            return;
        }

        try {
            setHealthChecking(true);

            const result =
                await getAIHealth(token);

            console.log(
                "URBANMIND AI HEALTH:",
                result
            );

            setAiOnline(
                result?.success === true &&
                result?.ollama === true &&
                result?.modelAvailable === true
            );

            setAiModel(
                result?.model || ""
            );

        } catch (error) {
            console.error(
                "AI health check failed:",
                error
            );

            setAiOnline(false);
            setAiModel("");
        } finally {
            setHealthChecking(false);
        }
    };


    /*
     * Check AI health whenever the drawer opens.
     */
    useEffect(() => {
        if (open) {
            checkAIHealth();
        }
    }, [open, token]);


    /*
     * Send a message to the real AI service.
     */
    const sendMessage =
        async (text = message) => {

            const cleanMessage =
                typeof text === "string"
                    ? text.trim()
                    : "";


            if (
                !cleanMessage ||
                loading
            ) {
                return;
            }


            if (!token) {
                setMessages(
                    (previous) => [
                        ...previous,
                        {
                            role: "assistant",
                            content:
                                "Your session has expired. Please log in again.",
                        },
                    ]
                );

                return;
            }


            const userMessage = {
                role: "user",
                content: cleanMessage,
            };


            const updatedMessages = [
                ...messages,
                userMessage,
            ];


            setMessages(
                updatedMessages
            );

            setMessage("");
            setLoading(true);


            try {
                const result =
                    await askAI(
                        token,
                        cleanMessage,
                        messages
                    );


                if (
                    !result ||
                    result.success !== true
                ) {
                    throw new Error(
                        result?.message ||
                        result?.detail ||
                        "UrbanMind AI could not generate a response."
                    );
                }


                setMessages(
                    (previous) => [
                        ...previous,
                        {
                            role: "assistant",
                            content:
                                result.answer ||
                                "UrbanMind AI did not return an answer.",
                        },
                    ]
                );


            } catch (error) {

                console.error(
                    "UrbanMind AI chat error:",
                    error
                );


                setMessages(
                    (previous) => [
                        ...previous,
                        {
                            role: "assistant",
                            content:
                                error.response?.data?.message ||
                                error.response?.data?.detail ||
                                error.message ||
                                "Unable to connect to UrbanMind AI.",
                        },
                    ]
                );

            } finally {

                setLoading(false);

                /*
                 * Re-check status after the request.
                 */
                checkAIHealth();
            }
        };


    /*
     * Form submission.
     */
    const handleSubmit =
        async (event) => {

            event.preventDefault();

            await sendMessage();
        };


    /*
     * Clear the current conversation.
     */
    const clearConversation = () => {

        if (loading) {
            return;
        }

        setMessages([]);
        setMessage("");
    };


    if (!open) {
        return null;
    }


    return (

        <div
            className="
                fixed
                inset-y-0
                right-0
                z-[9999]
                flex
                w-full
                max-w-[500px]
                flex-col
                border-l
                border-white/10
                bg-slate-950
                shadow-2xl
            "
        >

            {/* HEADER */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    p-6
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <Sparkles
                        className="
                            text-cyan-400
                        "
                    />

                    <div>

                        <h2
                            className="
                                text-xl
                                font-semibold
                            "
                        >
                            UrbanMind AI
                        </h2>


                        <div
                            className="
                                mt-1
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <Circle
                                size={8}
                                fill="currentColor"
                                className={
                                    aiOnline
                                        ? "text-green-400"
                                        : "text-red-400"
                                }
                            />

                            <p
                                className="
                                    text-xs
                                    text-slate-500
                                "
                            >
                                {healthChecking
                                    ? "Checking AI..."
                                    : aiOnline
                                    ? aiModel
                                        ? `Local AI • ${aiModel}`
                                        : "Local AI • Online"
                                    : "Local AI • Offline"}
                            </p>

                        </div>

                    </div>

                </div>


                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {messages.length > 0 && (
                        <button
                            type="button"
                            onClick={
                                clearConversation
                            }
                            disabled={loading}
                            title="Clear conversation"
                            className="
                                rounded-xl
                                p-2
                                text-slate-400
                                transition
                                hover:bg-white/5
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >

                            <Trash2
                                size={18}
                            />

                        </button>
                    )}


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            p-2
                            text-slate-300
                            transition
                            hover:bg-white/5
                            hover:text-white
                        "
                    >

                        <X />

                    </button>

                </div>

            </div>


            {/* MESSAGES */}

            <div
                className="
                    flex-1
                    space-y-4
                    overflow-y-auto
                    p-6
                "
            >

                {messages.length === 0 && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Sparkles
                                className="
                                    text-cyan-400
                                "
                            />

                            <h3
                                className="
                                    font-semibold
                                "
                            >
                                Ask UrbanMind
                            </h3>

                        </div>


                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            Ask questions about the
                            current infrastructure
                            and citizen issues stored
                            in the UrbanMind database.
                        </p>

                    </div>

                )}


                {messages.map(
                    (item, index) => (

                        <div
                            key={index}
                            className={`
                                rounded-2xl
                                p-4
                                ${
                                    item.role === "user"
                                        ? "ml-8 bg-cyan-500/10"
                                        : "mr-4 bg-white/[0.04]"
                                }
                            `}
                        >

                            {item.role === "assistant" ? (

                                <div
                                    className="
                                        prose
                                        prose-invert
                                        prose-sm
                                        max-w-none
                                        text-slate-200
                                    "
                                >

                                    <ReactMarkdown>
                                        {item.content}
                                    </ReactMarkdown>

                                </div>

                            ) : (

                                <p
                                    className="
                                        whitespace-pre-wrap
                                        text-sm
                                        leading-6
                                        text-slate-200
                                    "
                                >
                                    {item.content}
                                </p>

                            )}

                        </div>

                    )
                )}


                {loading && (

                    <div
                        className="
                            mr-4
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            bg-white/[0.04]
                            p-4
                        "
                    >

                        <Loader2
                            className="
                                animate-spin
                                text-cyan-400
                            "
                            size={18}
                        />

                        <span
                            className="
                                text-sm
                                text-slate-400
                            "
                        >
                            UrbanMind is analyzing
                            the current data...
                        </span>

                    </div>

                )}

            </div>


            {/* SUGGESTIONS */}

            {messages.length === 0 && (

                <div
                    className="
                        space-y-2
                        px-6
                    "
                >

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            sendMessage(
                                "Which infrastructure requires the most attention right now?"
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            p-3
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-white/5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Which infrastructure
                        requires the most
                        attention?
                    </button>


                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            sendMessage(
                                "Analyze the current citizen issues and identify the most important problems."
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            p-3
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-white/5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Analyze citizen issues
                    </button>


                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            sendMessage(
                                "What should urban planners prioritize based on the current data?"
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            p-3
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-white/5
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        What should planners
                        prioritize?
                    </button>

                </div>

            )}


            {/* INPUT */}

            <form
                onSubmit={handleSubmit}
                className="
                    border-t
                    border-white/10
                    p-6
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-2
                    "
                >

                    <input
                        value={message}
                        onChange={(event) =>
                            setMessage(
                                event.target.value
                            )
                        }
                        placeholder="Ask UrbanMind..."
                        disabled={loading}
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            px-3
                            py-2
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-slate-600
                        "
                    />


                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !message.trim()
                        }
                        className="
                            rounded-xl
                            bg-cyan-500
                            p-3
                            text-slate-950
                            transition
                            hover:bg-cyan-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >

                        {loading ? (

                            <Loader2
                                size={18}
                                className="
                                    animate-spin
                                "
                            />

                        ) : (

                            <Send
                                size={18}
                            />

                        )}

                    </button>

                </div>

                <p
                    className="
                        mt-2
                        px-2
                        text-[11px]
                        text-slate-600
                    "
                >
                    AI responses are generated from
                    the current UrbanMind city data.
                </p>

            </form>

        </div>

    );
}