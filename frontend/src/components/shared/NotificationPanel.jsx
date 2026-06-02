export default function NotificationPanel() {
    const notifications = [
        {
            type: "alert",
            title: "Infrastructure Alert",
            message: "Sector 12 coverage below threshold",
        },
        {
            type: "warning",
            title: "Traffic Congestion",
            message: "Peak traffic expected in Zone 5",
        },
        {
            type: "success",
            title: "Simulation Complete",
            message: "Metro Expansion completed",
        },
        {
            type: "info",
            title: "Citizen Feedback",
            message: "42 new submissions received",
        },
    ];

    return (
        <div
            className="
absolute
right-0
top-16
z-[9999]
w-96
max-h-[500px]
overflow-y-auto
rounded-3xl
border border-white/10
bg-slate-950
p-4
shadow-2xl
"
        >
            <h3 className="mb-4 text-lg font-semibold">
                Notifications
            </h3>

            <div className="space-y-3">

                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
                    >
                        <h4 className="font-medium">
                            {notification.title}
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                            {notification.message}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}