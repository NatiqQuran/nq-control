"use client";

import React from "react";
import Result from "./result";

export default function Search({ children }: any) {
    const [state, setState] = React.useState(1);
    return (
        <>
            <h1>Search</h1>

            <input
                type="number"
                name="search"
                onChange={(e) => setState(parseInt(e.target.value, 10))}
            />

            <Result surahId={state} />
        </>
    );
}
