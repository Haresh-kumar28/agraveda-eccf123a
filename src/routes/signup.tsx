import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/components/agraveda/auth-screen";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/signup")({
  head: () =>
    pageHead(
      "Create an account",
      "Access the AgraVeda synthetic-data workspace. Production identity is not connected; demo access is explicitly labelled.",
    ),
  component: () => <AuthScreen signup={true} />,
});
