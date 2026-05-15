"use client";

import { useEffect, useState }
    from "react";

export default function TaskPage() {

    const [loadingId,
        setLoadingId] =
        useState(null);
    const [timeLeft,
        setTimeLeft] =
        useState("");
    const [tasks,
        setTasks] =
        useState([]);

    // useEffect(() => {

    //     const interval =
    //         setInterval(() => {

    //             const now =
    //                 new Date();

    //             const midnight =
    //                 new Date();

    //             midnight.setHours(
    //                 24,
    //                 0,
    //                 0,
    //                 0
    //             );

    //             const diff =
    //                 midnight - now;

    //             const hours =
    //                 Math.floor(
    //                     diff /
    //                     (1000 * 60 * 60)
    //                 );

    //             const minutes =
    //                 Math.floor(
    //                     (diff %
    //                         (1000 * 60 * 60))
    //                     /
    //                     (1000 * 60)
    //                 );

    //             const seconds =
    //                 Math.floor(
    //                     (diff %
    //                         (1000 * 60))
    //                     / 1000
    //                 );

    //             setTimeLeft(
    //                 `${hours}h ${minutes}m ${seconds}s`
    //             );

    //         }, 1000);

    //     return () =>
    //         clearInterval(
    //             interval
    //         );

    // }, []);

    // FETCH TASKS
    const fetchTasks = async () => {

        try {

            let res =
                await fetch(
                    "/api/user/tasks"
                );

            const data =
                await res.json();
            console.log("data", data)
            setTasks(
                data.tasks || []
            );

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);
    //console.log(tasks);
    // CLAIM TASK
    const claimReward =
        async (taskId) => {

            try {

                setLoadingId(taskId);

                const res =
                    await fetch(
                        "/api/user/tasks/claim",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({
                                    taskId,
                                }),

                        }
                    );

                const data =
                    await res.json();

                alert(
                    data.message
                );

                if (res.ok) {

                    fetchTasks();

                }

            } catch (err) {

                console.log(err);

                alert(
                    "Something went wrong"
                );

            } finally {

                setLoadingId(null);

            }

        };
    const completedCount =
        tasks.filter(
            (t) => t.completed
        ).length;

    const progress =
        (tasks.length > 0)
            ? (completedCount /
                tasks.length) * 100
            : 0;

    return (

        <div className="min-h-screen bg-gray-100 p-5">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="mt-5">
                    <h1 className="text-3xl font-bold text-black">
                        Daily Tasks
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Next reset in:
                        {timeLeft}
                    </p>
                    <p className="text-gray-500 mt-1">
                        Complete tasks &
                        earn rewards
                    </p>

                    <div className="flex justify-between mb-2">

                        <span className="text-sm font-medium">
                            Progress
                        </span>

                        <span className="text-sm">
                            {completedCount}/
                            {tasks.length}
                        </span>

                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            style={{
                                width: `${progress}%`
                            }}
                            className="h-full bg-green-500 transition-all"
                        />

                    </div>

                </div>


                {/* TASK GRID */}
                <div className="grid md:grid-cols-2 gap-5 mt-8">

                    {tasks.map((task) => (

                        <div
                            key={task._id}
                            className="bg-white border border-gray-200 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all"
                        >

                            {/* TOP */}
                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-xl font-semibold text-black">
                                        {task.title}
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Earn ₹{task.reward}
                                    </p>

                                </div>

                                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">

                                    ₹{task.reward}

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button

                                disabled={
                                    task.completed ||
                                    loadingId === task._id ||
                                    !task.unlocked
                                }

                                onClick={() =>
                                    claimReward(task._id)
                                }

                                className={`w-full mt-5 py-3 rounded-2xl font-semibold transition-all duration-300

            ${task.completed
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"

                                        : !task.unlocked
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"

                                            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.02]"
                                    }
        `}
                            >

                                {
                                    loadingId === task._id

                                        ? "Processing..."

                                        : task.completed

                                            ? "Claimed"

                                            : !task.unlocked

                                                ? "Locked"

                                                : `Claim ₹${task.reward}`
                                }

                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}