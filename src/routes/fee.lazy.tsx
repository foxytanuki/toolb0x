import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/fee")({
  component: () => <div>Hello /fee!</div>,
});
