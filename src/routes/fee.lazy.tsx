import { createLazyFileRoute } from "@tanstack/react-router";
import FeeHistorySearch from "../components/FeeHistorySearch";

export const Route = createLazyFileRoute("/fee")({
  component: () => {
    return <FeeHistorySearch />;
  },
});
