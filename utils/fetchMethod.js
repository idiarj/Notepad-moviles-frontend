class FetchWrapper{
    constructor(baseUrl){
        this.baseUrl = baseUrl ? baseUrl : 'http://localhost:3000';
    }

    async post(url, data){
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        return response;
    }

    async get(url){
        const response = await fetch(this.baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        return response;
    }

    async put(url, data){
        const response = await fetch(this.baseUrl + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        return response;
    }   

    async delete(url){
        const response = await fetch(this.baseUrl + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        return response;
    }
}


export const fetchsito1 = new FetchWrapper('https://notepad-moviles-backend.onrender.com');
export const fetchsito2 = new FetchWrapper('http://192.168.0.103:3000')