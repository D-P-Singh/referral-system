"use client";

import { Suspense } from "react";
import Register from "./Register";

export default function ModernRegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Register />
        </Suspense>
    );
}