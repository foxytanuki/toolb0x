import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/blocks")({
  component: () => <div>Hello /blocks!</div>,
});
