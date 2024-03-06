import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "./authSlice";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useAppSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        try {
          await refresh({});
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;
  if (!persist) {
    // persist: no
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    // persist: yes, token: no
    content = (
      <p className="errmsg">
        {`${(error as any)?.data?.message} - `}
        <Link to="/login">Please login again.</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
