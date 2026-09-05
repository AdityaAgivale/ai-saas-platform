import { DocumentsList } from "@/components/dashboard/documents-list";

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold">Favorites</h1>
      <p className="mt-1 text-sm text-muted">Your starred documents, all in one place.</p>
      <div className="mt-6">
        <DocumentsList onlyFavorites />
      </div>
    </div>
  );
}
