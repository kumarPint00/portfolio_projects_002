import { useEffect, useState } from "react";


const useFetch =(url)=>{
    const [data, setdata] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError]= useState(null)
      
    useEffect(() => {
        const abortCont = new AbortController();
      setTimeout(() => {
        fetch(url, {signal:abortCont.signal})
          .then((res) => {
              if(!res.ok){
                  throw new Error('Could not fetch the data for that resourse');
              }
            return res.json();
          })
          .then((data) => {
            setdata(data);
            setIsPending(false);
            setError(null)
          })
          .catch((err)=>{
            if (err.name === 'AbortError'){
                console.log('Fetch abouted')
            }else{
                setIsPending(false);
                setError(err.message)
            }
          })
      }, 1000);
      return ()=> abortCont.abort();
    }, [url]);

    return{
        data,
        isPending,
        error
    }
}

export default useFetch;