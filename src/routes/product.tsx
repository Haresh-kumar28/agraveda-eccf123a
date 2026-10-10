import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/agraveda/content-page";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/product")({
  head: () =>
    pageHead(
      "The operational platform",
      "The operational platform: transparent emergency-department operational decision support from AgraVeda.",
    ),
  component: () => <ContentPage kind="product" />,
});
