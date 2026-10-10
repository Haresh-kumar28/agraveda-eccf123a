import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export const roles = [
  "Hospital Administrator",
  "ED / Operations Lead",
  "Doctor / Clinician",
  "Data Analyst",
  "Nurse / Care Coordinator",
] as const;
export type Role = (typeof roles)[number];
export type Section =
  | "overview"
  | "forecast"
  | "patient-flow"
  | "resources"
  | "scenarios"
  | "what-if"
  | "decisions"
  | "data-quality";
export interface DemoSession {
  name: string;
  role: Role;
  mode: "demo";
}
export interface AuthService {
  getSession: () => DemoSession | null;
  enterDemo: (role: Role) => DemoSession;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<never>;
  signUp: (details: {
    name: string;
    email: string;
    password: string;
    organization: string;
    role: Role;
  }) => Promise<never>;
  resetPassword: (email: string) => Promise<never>;
}
const key = "agraveda-demo-session";
export const authService: AuthService = {
  getSession() {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const s = JSON.parse(raw);
      return s.mode === "demo" && roles.includes(s.role) ? s : null;
    } catch {
      return null;
    }
  },
  enterDemo(role) {
    const session: DemoSession = { name: "Demo visitor", role, mode: "demo" };
    sessionStorage.setItem(key, JSON.stringify(session));
    return session;
  },
  signOut() {
    sessionStorage.removeItem(key);
  },
  async signIn() {
    throw new Error(
      "Production sign-in is not connected. Please use the explicitly labelled demo below.",
    );
  },
  async signUp() {
    throw new Error(
      "Account creation is not connected. No account has been created and your details have not been saved.",
    );
  },
  async resetPassword() {
    throw new Error(
      "Password reset is unavailable until production authentication is connected. No email has been sent.",
    );
  },
};
export function canAccess(role: Role, section: Section) {
  if (role === "Hospital Administrator" || role === "ED / Operations Lead") return true;
  if (role === "Data Analyst") return section !== "resources" && section !== "decisions";
  return ["overview", "patient-flow", "decisions"].includes(section);
}
interface AuthContextValue {
  session: DemoSession | null;
  ready: boolean;
  enterDemo: (role: Role) => void;
  signOut: () => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setSession(authService.getSession());
    setReady(true);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        ready,
        enterDemo: (role) => setSession(authService.enterDemo(role)),
        signOut: () => {
          authService.signOut();
          setSession(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("AuthProvider is required");
  return value;
}
