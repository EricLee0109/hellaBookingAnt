import axios from "axios";

export async function verifyTokenGoogle(tokenId) {
    try{
        const {data} = await axios.post("http://localhost:5000/api/v1/Firebase/verifyGoogle", {authToken: tokenId}); return Promise.resolve(data);
    } catch(err) {
        return Promise.reject({err});
    }
}