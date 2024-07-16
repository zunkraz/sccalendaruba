interface UseHTTPType {
    method: string;
    endpoint: string;
    body?: any;
    query?: string;
}

const useHTTP = async ({ method, endpoint, body, query }: UseHTTPType) => {
    const API = localStorage.getItem('@BASE_URL');
    let token = localStorage.getItem('@Login');
    if (body && body.tokenBearer) {
        token = body.tokenBearer;
        delete body.tokenBearer;
    }

    const url = `${API}/${endpoint}/${query || ''}`;
    const entity =
        method === 'GET'
            ? {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    provider: 'web',
                },
            }
            : {
                method: method,
                body: JSON.stringify({
                    ...body,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    provider: 'web',
                },
            };
    try {
        const response = await fetch(url, entity);
        const data = await response.json();
        if (data.code !== 403) {
            return { code: response.status, data };
        }
    } catch (e) {
        return [false, e];
    }
};

export default useHTTP;
