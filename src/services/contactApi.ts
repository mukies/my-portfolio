import axios from "axios"

const api = axios.create({baseURL:process.env.NEXT_PUBLIC_BASEURL})

interface ContactFormBody {
    name:string;
    email:string;
    subject?:string;
    message:string
}
export const sendContactMessage = async (body:ContactFormBody)=>{
    try {
        const res = await api.post('/submit',{...body,access_key:process.env.NEXT_PUBLIC_KEY})
        return res.data
    } catch (error) {
        throw error
    }
}