import { AuthError } from "next-auth";

export class UserNotFoundError extends AuthError {
  code = "user_not_found";
    message: string = "No user found with the provided credentials.";
}