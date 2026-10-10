import { createFileRoute } from "@tanstack/react-router";
import { WhatIfView } from "@/components/agraveda/app-views";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/app/what-if")({
  head: () =>
    pageHead(
      "What-if simulator",
      "What-if simulator in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.",
    ),
  component: WhatIfView,
});
