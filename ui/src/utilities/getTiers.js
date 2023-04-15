import axios from "axios"
import api from "./api"

const getTiers = async () => {
  const response = await axios.get(`${api}/credits`);
  return response.data;
}

export default getTiers;