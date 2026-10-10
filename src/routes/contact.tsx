import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/agraveda/content-page";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact and pilot planning",
      "Contact and pilot planning: transparent emergency-department operational decision support from AgraVeda.",
    ),
  component: () => <ContentPage kind="contact" />,
});
