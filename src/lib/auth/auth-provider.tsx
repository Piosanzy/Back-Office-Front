import Spinner from "@/components/shared/spinner";
import { useRouter } from "next/router";
import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import {useCookies} from "react-cookie";
import { useJwt } from "react-jwt";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface IAuthProviderProps {}

interface IAuthContext {
  initialized: boolean;
  jwt: any;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error("Auth context must be used within a AuthProvider!");
  }
  return result;
}

const publicPageList = ["/login"];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
  const { decodedToken, isExpired } = useJwt<{name: string, email: string}>(cookies.authorization);

  useEffect(() => {
    if (cookies.authorization && !isExpired && isPublicPage(router.pathname)) {
      router.push("/");
    } else if (!cookies.authorization && !isPublicPage(router.pathname)) {
      removeCookie('authorization');
      router.push("/login");
    }
  }, [router, cookies.authorization, isExpired]);

  if (cookies.authorization && !isExpired && isPublicPage(router.pathname)) {
    return <Spinner />;
  }

  if (isPublicPage(router.pathname)) {
    return <>{children}</>;
  }

  if (!cookies?.authorization) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={{ initialized: true, jwt: decodedToken }}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthProvider);
