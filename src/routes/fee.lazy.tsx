import { createLazyFileRoute } from '@tanstack/react-router';
import FeeHistorySearch from '../components/GasFeeDashboard';

export const Route = createLazyFileRoute('/fee')({
  component: () => {
    return <FeeHistorySearch />;
  },
});
