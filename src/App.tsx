import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFound } from './components/NotFound';

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
