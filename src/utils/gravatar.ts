import md5 from "md5";

export const gravatarUrl = (email: string, size: number = 50) => {
  const trimmedEmail = email?.trim().toLowerCase() || "JD";

  const hash = md5(trimmedEmail);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
