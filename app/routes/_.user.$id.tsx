import type { Route } from './+types/_.user.$id';

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (id !== '1') {
    throw new Response('Not Found', { status: 404 });
  }
  return {
    id: 1,
    name: 'Remix',
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <h1>Hello {loaderData.name}</h1>;
}
