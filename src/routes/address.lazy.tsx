import { createLazyFileRoute } from "@tanstack/react-router";
import AddressGenerator from "../components/AddressGenerator";

export const Route = createLazyFileRoute("/address")({
  component: () => <AddressGenerator />,
});
