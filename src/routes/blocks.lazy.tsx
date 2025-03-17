import { createLazyFileRoute } from '@tanstack/react-router';
import BlockSearch from '../components/BlockSearch';

export const Route = createLazyFileRoute('/blocks')({
  component: () => <BlockSearch />,
});
