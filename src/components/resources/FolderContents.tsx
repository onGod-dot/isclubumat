import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FolderOpen,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { listDriveFolder, type DriveFile } from "@/lib/drive.functions";

const DRIVE_OPEN = (id: string) => `https://drive.google.com/drive/folders/${id}`;
const DRIVE_FILE_VIEW = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const DRIVE_DOWNLOAD = (id: string) => `/api/public/drive-file/${id}`;

export type FolderSearch = {
  title?: string;
  parent?: string;
  parentTitle?: string;
};

function fileIcon(file: DriveFile) {
  if (file.isFolder) return FolderOpen;
  if (file.mimeType.includes("pdf")) return FileText;
  return FileText;
}

type FolderContentsProps = {
  folderId: string;
  currentTitle: string;
};

export function FolderContents({ folderId, currentTitle }: FolderContentsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drive-folder", folderId],
    queryFn: () => listDriveFolder({ data: { folderId } }),
  });

  const files = data?.files ?? [];
  const listError = data?.error;
  const subfolders = files.filter((f) => f.isFolder);
  const documents = files.filter((f) => !f.isFolder);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 size={32} className="animate-spin" />
        <p className="text-sm">Loading files…</p>
      </div>
    );
  }

  if (isError || listError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400 px-6 text-center">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm">{listError ?? "Could not load this folder."}</p>
        <a
          href={DRIVE_OPEN(folderId)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[color:var(--club-blue-deep)] hover:underline"
        >
          Open in Google Drive instead
        </a>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2 text-gray-400 px-6 text-center">
        <FolderOpen size={32} />
        <p className="text-sm">This folder is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {subfolders.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-[Archivo_Black] text-sm uppercase tracking-tight text-gray-500">
              Folders
            </h2>
            <span className="text-xs text-gray-400">{subfolders.length} folder{subfolders.length === 1 ? "" : "s"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subfolders.map((folder) => (
              <Link
                key={folder.id}
                to="/resources/$folderId"
                params={{ folderId: folder.id }}
                search={{
                  title: folder.name,
                  parent: folderId,
                  parentTitle: currentTitle,
                }}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-5 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--club-blue-deep) 8%, transparent)",
                    color: "var(--club-blue-deep)",
                  }}
                >
                  <FolderOpen size={22} strokeWidth={1.8} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[color:var(--club-blue-deep)] transition">
                    {folder.name}
                  </p>
                  {folder.modifiedTime && (
                    <p className="text-xs text-gray-400 mt-1">Updated {folder.modifiedTime}</p>
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-[color:var(--club-blue-deep)] flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {documents.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-[Archivo_Black] text-sm uppercase tracking-tight text-gray-500">
              Files
            </h2>
            <span className="text-xs text-gray-400">{documents.length} file{documents.length === 1 ? "" : "s"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((file) => {
              const Icon = fileIcon(file);
              return (
                <div
                  key={file.id}
                  className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 hover:border-[color:var(--club-blue-deep)]/20 hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.12)] transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0"
                      style={{
                        backgroundColor: "color-mix(in oklab, var(--club-lime) 18%, transparent)",
                        color: "var(--club-blue-deep)",
                      }}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                        {file.name}
                      </p>
                      {file.modifiedTime && (
                        <p className="text-xs text-gray-400 mt-1">Updated {file.modifiedTime}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                    <a
                      href={DRIVE_DOWNLOAD(file.id)}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: "var(--club-blue-deep)" }}
                    >
                      <Download size={14} />
                      Download
                    </a>
                    <a
                      href={DRIVE_FILE_VIEW(file.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Preview in Drive"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-400 hover:text-[color:var(--club-blue-deep)] hover:border-[color:var(--club-blue-deep)]/30 transition"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
