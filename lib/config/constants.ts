export const appAuthName = process.env.AUTH_NAME as string;
export const appSessionName=process.env.SECRET_NAME as string;

export const SessionStatus = {
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
  loading: "loading"
} as const;