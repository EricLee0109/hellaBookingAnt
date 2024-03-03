import axios from "axios";
const BASE_URL = 'https://hella-booking.onrender.com/api/v1';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
});