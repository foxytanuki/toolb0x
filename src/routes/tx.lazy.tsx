import { createLazyFileRoute } from "@tanstack/react-router";
import TxExplorer from "../components/TxExplorer";

export const Route = createLazyFileRoute("/tx")({
  component: TxExplorer,
});