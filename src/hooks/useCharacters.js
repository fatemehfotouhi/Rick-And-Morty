import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useCharacters(query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`, { signal });
                setCharacters(res.data.results);
            } catch (err) {
                if (!axios.isCancel()) {
                    setCharacters([]);
                    toast.error(err.response.data.error)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { isLoading, characters }

}