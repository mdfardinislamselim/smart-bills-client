import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

const instance = axios.create({
  baseURL: "https://smart-bills-server-nine.vercel.app",
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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getAuth();

    if (error.response && [401, 403].includes(error.response.status)) {
      await signOut(auth);
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
