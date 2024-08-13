import { useEffect, useState } from "react";
export const LOGIN_TYPE = "__login_type";

export function useLoginStatue() {
  const status = sessionStorage.getItem(LOGIN_TYPE) || "0";
  const [loginStatus, setLoginStatus] = useState(status === "1" ? true : false);

  useEffect(() => {
    sessionStorage.setItem(LOGIN_TYPE, loginStatus ? "1" : "0");
  }, [loginStatus]);

  return [loginStatus, setLoginStatus] as const;
}
