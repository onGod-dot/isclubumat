import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/is-club-logo.jpeg";

type BackLink =
  | { to: "/resources"; label: string }
  | {
      to: "/resources/$folderId";
      params: { folderId: string };
      search?: { title?: string };
      label: string;
    };

export function ResourcesPageHeader({ back }: { back: BackLink }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md px-5 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {"params" in back ? (
          <Link
            to={back.to}
            params={back.params}
            search={back.search}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[color:var(--club-blue-deep)] transition"
          >
            <ArrowLeft size={16} />
            {back.label}
          </Link>
        ) : (
          <Link
            to={back.to}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[color:var(--club-blue-deep)] transition"
          >
            <ArrowLeft size={16} />
            {back.label}
          </Link>
        )}
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="IS Club UMAT" className="h-7 w-7 rounded-full object-cover" />
          <span className="font-[Archivo_Black] text-sm text-gray-950 tracking-tight">IS CLUB</span>
        </div>
      </div>
    </header>
  );
}
