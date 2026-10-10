import { createFileRoute } from "@tanstack/react-router";
import { DecisionsView } from "@/components/agraveda/app-views";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/app/decisions")({
  head: () =>
    pageHead(
      "Decisions and recommendations",
      "Decisions and recommendations in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.",
    ),
  component: DecisionsView,
});
