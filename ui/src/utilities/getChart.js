import axios from "axios"
import api from "./api"

const getChart = async ({ params }) => {
  const response = await axios.get(`${api}/chart/preview?type=${params.chart}`);
  return response.data;
}

export default getChart;