import { useState } from "react";
import API from "../services/api";
const useApi = (urlObject) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const call = async (payload, type='') => {
        setResponse(null);
        setIsLoading(true);

        try{
            let response = await API(urlObject, payload, type);
            setResponse(response.data)
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {call, response, error, setIsLoading}
}

export default useApi;