import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Error, ", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, [auth, refresh])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading ... </p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin