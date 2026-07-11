import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // Primary SEO
      { title: "IS Club UMAT — Information Systems & Technology Club | University of Mines and Technology" },
      { name: "description", content: "IS Club UMAT is the official Information Systems & Technology Club at the University of Mines and Technology, Tarkwa, Ghana. Connecting student innovators through software development, AI, cybersecurity, data science, cloud computing, UI/UX design, and more." },
      { name: "keywords", content: "IS Club UMAT, Information Systems Club Ghana, UMaT Technology Club, Tarkwa tech club, student tech community Ghana, software development club, AI club Ghana, cybersecurity club UMaT, data science students Ghana, tech events UMaT, hackathon Ghana, coding club University of Mines and Technology" },
      { name: "author", content: "IS Club UMAT — Designed & built by Cyril Jerry Baah (Snr Dev Cyril)" },
      { name: "creator", content: "Cyril Jerry Baah — Snr Dev Cyril — https://snrdevcyril.vercel.app/" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#1e3a8a" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "IS Club UMAT" },
      { property: "og:title", content: "IS Club UMAT — Connecting Minds, Advancing Technology" },
      { property: "og:description", content: "The official Information Systems & Technology Club at the University of Mines and Technology, Tarkwa, Ghana. Join 500+ student innovators in software, AI, cybersecurity, cloud computing, and more." },
      { property: "og:url", content: "https://isclubumat.vercel.app/" },
      { property: "og:locale", content: "en_GH" },
      { property: "og:image", content: "https://isclubumat.vercel.app/is-club-logo.jpeg" },
      { property: "og:image:alt", content: "IS Club UMAT Logo" },

      // Twitter / X Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@isclub_umat" },
      { name: "twitter:title", content: "IS Club UMAT — Connecting Minds, Advancing Technology" },
      { name: "twitter:description", content: "The official Information Systems & Technology Club at UMaT, Ghana. 500+ members building real projects in software, AI, cybersecurity and more." },
      { name: "twitter:image", content: "https://isclubumat.vercel.app/is-club-logo.jpeg" },

      // Authorship & attribution
      { name: "generator", content: "Built by Cyril Jerry Baah — Snr Dev Cyril | https://snrdevcyril.vercel.app/" },
      { name: "designer", content: "Cyril Jerry Baah — Snr Dev Cyril" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/is-club-logo.jpeg", type: "image/jpeg" },
      { rel: "canonical", href: "https://isclubumat.vercel.app/" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
