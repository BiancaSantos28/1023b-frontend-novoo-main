import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:8000"
})
//Nós vamos criar um middleware para adicionar o token na requisição

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token")
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

//Redirecionar para o login quando o usuario não tiver permissão 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status; 
        if(status === 401){
            localStorage.removeItem("token")
            window.location.href = "/login?mensage= Token inválido"
        }
        return Promise.reject(error)
    }
)
export default api