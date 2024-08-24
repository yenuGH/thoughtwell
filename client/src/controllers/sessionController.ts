import {
    getAuth,
} from "firebase/auth";

import { Session } from "../interfaces/sessionInterface";

export const sessionController = {
    async saveSession(): Promise<void> {
        // save the session into local storage for infinite session until logout
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("User not found.");
        }

        const session: Session = {
            // as we check if a user is present above, we can safely assume that the email and uid are not null
            email: user.email!,
            userId: user.uid!,
        };

        // save the session into cookie storage
        localStorage.setItem("session", JSON.stringify(session));
    },

    async getSession(): Promise<boolean> {
        // get the session from local storage
        const session: Session | null = JSON.parse(localStorage.getItem("session")!);

        if (!session) {
            return false;
        }

        // if session is found, check if current user matches the session
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            return false;
        }

        if (session.email === user.email && session.userId === user.uid) {
            return true;
        } else {
            return false;
        }

        return false;
    },

    clearSession(): void {
        // clear the session from local storage
        localStorage.removeItem("session");
    },

    checkSession(): boolean {
        // check if the session is still valid
        const session: Session | null = JSON.parse(localStorage.getItem("session")!);

        if (!session) {
            return false;
        }

        return true;
    }
}