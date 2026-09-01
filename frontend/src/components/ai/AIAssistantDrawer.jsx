import {
    X,
    Sparkles,
    Send,
    Loader2,
} from "lucide-react";

import {
    useState,

} from "react";
import { askAI } from "../../services/recommendationService";

export default function AIAssistantDrawer({
    open,
    onClose,
}) {

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


    if (!open) return null;


    const sendMessage =
        async (text = message) => {

            const cleanMessage =
                text.trim();


            if (
                !cleanMessage ||
                loading
            ) {
                return;
            }


            const userMessage = {

                role: "user",

                content:
                    cleanMessage,

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
                    await askAI(token, {

                        message:
                            cleanMessage,

                        history:
                            messages,

                    });


                setMessages(
                    previous => [

                        ...previous,

                        {

                            role: "assistant",

                            content:
                                result.answer,

                        },

                    ]
                );


            } catch (error) {

                console.error(
                    error
                );


                setMessages(
                    previous => [

                        ...previous,

                        {

                            role: "assistant",

                            content:
                                error.response
                                    ?.data
                                    ?.message ||
                                "Unable to connect to UrbanMind AI.",

                        },

                    ]
                );

            } finally {

                setLoading(false);

            }

        };


    const handleSubmit =
        async (event) => {

            event.preventDefault();

            await sendMessage();

        };


    return (

        <div className="
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
        ">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                p-6
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <Sparkles
                        className="
                            text-cyan-400
                        "
                    />

                    <div>

                        <h2 className="
                            text-xl
                            font-semibold
                        ">

                            UrbanMind AI

                        </h2>


                        <p className="
                            text-xs
                            text-slate-500
                        ">

                            Local AI • Live city data

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


            {/* MESSAGES */}

            <div className="
                flex-1
                space-y-4
                overflow-y-auto
                p-6
            ">

                {messages.length === 0 && (

                    <div className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        p-5
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <Sparkles
                                className="
                                    text-cyan-400
                                "
                            />

                            <h3 className="
                                font-semibold
                            ">

                                Ask UrbanMind

                            </h3>

                        </div>


                        <p className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-400
                        ">

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
                                    item.role ===
                                    "user"

                                    ? "ml-8 bg-cyan-500/10"

                                    : "mr-4 bg-white/[0.04]"
                                }
                            `}
                        >

                            <p className="
                                whitespace-pre-wrap
                                text-sm
                                leading-6
                            ">

                                {item.content}

                            </p>

                        </div>

                    )
                )}


                {loading && (

                    <div className="
                        mr-4
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        bg-white/[0.04]
                        p-4
                    ">

                        <Loader2
                            className="
                                animate-spin
                                text-cyan-400
                            "
                            size={18}
                        />

                        <span className="
                            text-sm
                            text-slate-400
                        ">

                            UrbanMind is analyzing
                            the current data...

                        </span>

                    </div>

                )}

            </div>


            {/* SUGGESTIONS */}

            {messages.length === 0 && (

                <div className="
                    space-y-2
                    px-6
                ">

                    <button
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
                            hover:bg-white/5
                        "
                    >

                        Which infrastructure
                        requires the most
                        attention?

                    </button>


                    <button
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
                            hover:bg-white/5
                        "
                    >

                        Analyze citizen issues

                    </button>


                    <button
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
                            hover:bg-white/5
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

                <div className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-2
                ">

                    <input

                        value={message}

                        onChange={(event) =>
                            setMessage(
                                event.target.value
                            )
                        }

                        placeholder="
                            Ask UrbanMind...
                        "

                        disabled={loading}

                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            px-3
                            py-2
                            text-sm
                            outline-none
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

            </form>

        </div>

    );

}