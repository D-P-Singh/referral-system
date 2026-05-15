"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Plus,
    Trash2,
    Loader2,
    Lock,
    Gift,
    CheckCircle2,
} from "lucide-react";

export default function AdminTaskPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        reward: "",
        order: "",
    });

    // FETCH TASKS
    const fetchTasks = async () => {
        try {
            let res = await fetch("/api/admin/tasks");
            res = await res.json();
            setTasks(res.tasks || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // CREATE TASK
    const createTask = async () => {
        try {
            setLoading(true);

            await axios.post("/api/admin/tasks", {
                title: form.title,
                reward: Number(form.reward),
                order: Number(form.order),
            });

            setForm({
                title: "",
                reward: "",
                order: "",
            });

            fetchTasks();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // DELETE TASK
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/admin/tasks/${id}`);

            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Task Management
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Create & manage daily reward tasks
                    </p>
                </div>

                {/* CREATE CARD */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* TITLE */}
                        <div>
                            <label className="text-sm text-gray-400">
                                Task Title
                            </label>

                            <input
                                type="text"
                                placeholder="Watch Video"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-yellow-500"
                            />
                        </div>

                        {/* REWARD */}
                        <div>
                            <label className="text-sm text-gray-400">
                                Reward Amount
                            </label>

                            <input
                                type="number"
                                placeholder="5"
                                value={form.reward}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        reward: e.target.value,
                                    })
                                }
                                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        {/* STEPS */}
                        <div>
                            <label className="text-sm text-gray-400">
                                Unlock Step
                            </label>

                            <input
                                type="number"
                                placeholder="1"
                                value={form.totalSteps}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        order: e.target.value,
                                    })
                                }
                                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={createTask}
                        disabled={loading}
                        className="mt-6 w-full md:w-fit bg-yellow-500 hover:bg-yellow-400 transition-all px-6 py-3 rounded-2xl text-black font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                Create Task
                            </>
                        )}
                    </button>
                </div>

                {/* TASK LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
                    {tasks.map((task, index) => (
                        <div
                            key={task._id}
                            className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden"
                        >
                            {/* TOP */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                                        <Gift className="text-yellow-400" />
                                    </div>

                                    <h2 className="text-2xl font-bold mt-4">
                                        {task.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Task #{index + 1}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        deleteTask(task._id)
                                    }
                                    className="bg-red-500/10 hover:bg-red-500/20 transition-all p-3 rounded-xl"
                                >
                                    <Trash2
                                        size={18}
                                        className="text-red-400"
                                    />
                                </button>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-6 space-y-4">
                                {/* REWARD */}
                                <div className="bg-zinc-800/60 rounded-2xl p-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Reward
                                        </p>

                                        <h3 className="text-xl font-bold text-green-400">
                                            ₹{task.reward}
                                        </h3>
                                    </div>

                                    <CheckCircle2 className="text-green-400" />
                                </div>

                                {/* STEP */}
                                <div className="bg-zinc-800/60 rounded-2xl p-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Unlock After
                                        </p>

                                        <h3 className="text-xl font-bold text-blue-400">
                                            Step {task.totalSteps}
                                        </h3>
                                    </div>

                                    <Lock className="text-blue-400" />
                                </div>
                            </div>

                            {/* STATUS */}
                            <div className="mt-5">
                                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                                    Active Task
                                </span>
                            </div>

                            {/* GLOW */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
                        </div>
                    ))}
                </div>

                {/* EMPTY */}
                {tasks.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold">
                            No Tasks Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create your first task
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}