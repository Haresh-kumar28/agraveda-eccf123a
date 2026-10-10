import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/agraveda/content-page";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead(
      "How AgraVeda works",
      "How AgraVeda works: transparent emergency-department operational decision support from AgraVeda.",
    ),
  component: () => <ContentPage kind="how-it-works" />,
});
