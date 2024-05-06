export const appAuthName = process.env.AUTH_NAME as string;
export const appSessionName=process.env.SECRET_NAME as string;

export const siteDescription = "Unlock the power of coding with our expert insights and tutorials! Dive into a world of innovation and mastery with our comprehensive coding blog. From beginner tips to advanced techniques, elevate your skills and stay ahead in the tech game. Start your coding journey today!";

export const SessionStatus = {
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
  loading: "loading"
} as const;