import jwtDecode, { JwtPayload } from "jwt-decode";

export interface UserJwtPayload extends JwtPayload {
  sub: string,
  name: string,
  admin: boolean,
}

export const decodeToken = (token: string): UserJwtPayload | undefined => {
  const decoded = jwtDecode<UserJwtPayload>(token);
  return decoded;
};

export const isTokenValid = (exp: number): boolean => {
  const now = Date.now().valueOf() / 1000;
  if (exp < now) {
    return false;
  } else {
    return true;
  }
};