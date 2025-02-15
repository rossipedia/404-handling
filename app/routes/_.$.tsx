import { data } from 'react-router';
import type { Route } from './+types/_.$';

export async function loader(_: Route.LoaderArgs) {
  throw data(null, { status: 404 });
}

export default () => null;
