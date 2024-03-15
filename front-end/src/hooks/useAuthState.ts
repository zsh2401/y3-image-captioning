import { AuthInfo } from "../apis/auth";
import { usePXState } from "./usePXState";

export function useAuthState() {
    return usePXState<AuthInfo | null>("auth", null)
}