import { createFileRoute } from "@tanstack/react-router";
import { ResourcesView } from "@/components/agraveda/app-views";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/app/resources")({
  head: () =>
    pageHead(
      "Resources and capacity",
      "Resources and capacity in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.",
    ),
  component: ResourcesView,
});
