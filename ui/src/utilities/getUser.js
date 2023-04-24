import axios from "axios"
import api from "./api"

const getUser = async () => {
  const response = await axios.get(`${api}/user`);
  return response.data;
}

export default getUser;