const FetchApi = (url, method, bearer) => {

    fetch(url, {
        method: method,
        headers: { 
            "Content-Type": "application/json",
            "authorization": bearer 
        }
    })
    .then((res) => res.json())
    .then((json) => console.log(json))
    console.log(json)
}

export default FetchApi;