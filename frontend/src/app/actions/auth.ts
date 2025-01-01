"use server";
import { redirect } from "next/navigation";
import { apiFetch } from "./fetch";
import { signIn, signOut } from "../auth";

// Define an error type
type ApiError = {
  message: string;
  statusCode?: number;
};

export const register = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await apiFetch("api/auth/register", {
      method: "POST",
      body: user,
    });
    console.log(response);
    return response;
  } catch (error: unknown) {
    console.log(error);
    return error as ApiError;
  }
};

export const login = async (user: {
  email: string;
  password: string;
}) => {
  try {
    console.log("login");
    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });
    redirect("/");
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      redirect("/");
    } else {
      return { statusCode: 401, message: "Wrong credentials! or You don't have access" };
    }
  }
};

export async function handleSignOut() {
  await signOut();
}

