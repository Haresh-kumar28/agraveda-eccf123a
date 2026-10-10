import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/components/agraveda/app-views";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/app/")({
  head: () =>
    pageHead(
      "Emergency department overview",
      "Emergency department overview in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.",
    ),
  component: Overview,
});
