import { isRouteErrorResponse, Outlet } from 'react-router';
import type { Route } from './+types/_';
import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto my-4 flex flex-col gap-4">
      <menu className="flex flex-row divide-x [&>li:not(:first-of-type)]:pl-4 [&>li]:pr-4 ">
        <li className="text-blue-500 underline">
          <a href="/">Home</a>
        </li>
        <li className="text-blue-500 underline">
          <a href="/user/1">Works</a>
        </li>
        <li className="text-blue-500 underline">
          <a href="/user/2">Not Found</a>
        </li>
        <li className="text-blue-500 underline">
          <a href="/blah-blah">Non-existant</a>
        </li>
      </menu>
      {children}
    </div>
  );
}

export default function () {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Layout>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </Layout>
  );
}
