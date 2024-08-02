import { manageError } from "../tools";

const backendUrl = process.env.BACKEND_URL || "";
const backendAuthPath = process.env.BACKEND_AUTH_PATH || "/api/v1/users/auth";
const backendUserPath = process.env.BACKEND_AUTH_PATH || "/api/v1/users";
// const tokenStorageName = process.env.TOKEN_STORAGE_NAME || "";

// const userDataStorageName = "garriga-app";

// function getTokenFromURL(): string | null {
//   try {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get(tokenUrlName || "token");
//     if (token) return token;
//     return null;
//   } catch (e) {
//     manageError({ error: e });
//     return null;
//   }
// }

// function getField({ fieldName }: { fieldName: string }): Object | null {
//   try {
//     const userData = localStorage.getItem(fieldName);
//     if (userData) {
//       const paredUserData = JSON.parse(userData);
//       return paredUserData;
//     }
//     return null;
//   } catch (e) {
//     manageError({ error: e });
//     return null;
//   }
// }

// function setField({
//   fieldName,
//   value,
// }: {
//   fieldName: string;
//   value: Object;
// }): boolean {
//   try {
//     localStorage.setItem(fieldName, JSON.stringify(value));
//     return true;
//   } catch (e) {
//     manageError({ error: e });
//     return false;
//   }
// }

// export function setToken({ token }: { token: string }) {
//   return setField({ fieldName: tokenStorageName, value: token });
// }

// export function setUser({ user }: { user: Object }) {
//   return setField({ fieldName: userDataStorageName, value: user });
// }

// export function getToken() {
//   return getField({ fieldName: tokenStorageName });
// }

// export function getUser() {
//   return getField({ fieldName: userDataStorageName });
// }

export async function fetchToken({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ token: string } | null> {
  try {
    const response = await fetch(backendUrl + backendAuthPath, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (e) {
    manageError({ error: e });
    return null;
  }
}

export async function fetchUser({
  token,
}: {
  token: string;
}): Promise<Object | null> {
  try {
    const response = await fetch(backendUrl + backendUserPath, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (e) {
    manageError({ error: e });
    return null;
  }
}

// export const authentication = async (): Promise<Object | null> => {
//   try {
//     /* checking is the user is correctly logged in */
//     const userData = getUser();
//     if (userData) return userData;

//     /* and if not, the user is not logged */
//     return null;
//   } catch (e) {
//     manageError({ error: e });
//     return null;
//   }
// };
