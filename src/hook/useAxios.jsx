import axios from "axios";
import { getAuth } from "firebase/auth";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// export default () => instance;
export default instance
