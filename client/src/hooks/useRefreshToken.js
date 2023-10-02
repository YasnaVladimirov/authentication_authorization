import axios from "axios"
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await axios.get("http://localhost:5000/refresh", {
        withCredentials: true
      });
      
      setAuth((prev) => { 
        return {
          ...prev,
          roles: response.data?.roleCodesArray,
          accessToken: response.data?.newAccessToken
        }
      });
      
      return { roles: response.data.roleCodesArray, accessToken: response.data.newAccessToken };
    } catch (error) {
      console.error("Error at useresfreshhook, " + error);
    }
  }
  return refresh;
}

export default useRefreshToken;