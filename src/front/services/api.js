import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig;

class API {
    constructor(target, data) {
        this.result
    }
    static async post(target, data) {
        axios.defaults.baseURL = API_URL;
        axios.defaults.timeout = 360000
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlkIjoiNWNiMmUwZGE3ZDRjNTI0NDQ0YjY3OTY3IiwiYmFzZWRDb2xsZWN0aW9uIjoiVXNlciIsIl9pZCI6IjVjYjJlMGRhN2Q0YzUyNDQ0NGI2Nzk2NyIsImlhdCI6MTU1NjAxODM1NX0.zpn2-JxZ4IG63oB6dLH6ll7OGds21ln7sV-zuCwOmG8";
        const defaultOptions = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "x-access-token": token,
            }
        };
        await axios.post(target, data)
            .then(res => {
                this.result = res
            })
            .catch(error => this.result = error)
        return this.result
    }
}
export default API