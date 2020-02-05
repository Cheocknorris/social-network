import React, { useState } from "react";

export function useStatefulFields() {

    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues( {
            ...values,
            /// we use first the spread operator to avoid previous values from being erased
            [e.target.name]: e.target.value
        });
    };

    return [values, handleChange];

}
