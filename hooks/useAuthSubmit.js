import React, { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = () => {
        axios.post(url, values).then(({data}) => {
            if (!data.succes) {
                setError(true);
                // this depends on how the code is set in the backend
            } else {
                location.replace('/');
            }
        })
            .catch(err => {
                console.log("err", err);
                setError(true);
            });
    };
    return [error, handleSubmit];
}
