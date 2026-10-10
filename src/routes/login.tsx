import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/components/agraveda/auth-screen";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/login")({
  head: () =>
    pageHead(
      "Sign in or explore the demo",
      "Access the AgraVeda synthetic-data workspace. Production identity is not connected; demo access is explicitly labelled.",
    ),
  component: () => <AuthScreen signup={false} />,
});
