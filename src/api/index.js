import axios from "axios";
export const  callServerApi = (url) =>{
    try{
        return axios.get(url);
    }
    catch {
        return false;
    }
}


