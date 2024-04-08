import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_PROD === "false" ? import.meta.env.VITE_SERVER_DEV_HOST : import.meta.env.VITE_SERVER_HOST}`,
});
