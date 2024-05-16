import { ModeToggle } from '@/components/ModeToggle';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <ModeToggle />
        </div>
      </div>
      <hr />
      <div className="mx-auto max-w-screen-lg">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
