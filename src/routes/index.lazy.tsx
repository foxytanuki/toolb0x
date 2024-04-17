import { createLazyFileRoute } from "@tanstack/react-router";
import FeeHistorySearch from "../components/GasFeeDashboard";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <FeeHistorySearch />
    // <div className="p-2">
    //   <h3>Welcome Home!</h3>
    // </div>
  );
}
