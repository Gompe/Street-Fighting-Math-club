

export const submitPOST = async (url, body) => {
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            ...body,
            },
    });

    response.json().then(data => {
        console.log(data);
    });
}