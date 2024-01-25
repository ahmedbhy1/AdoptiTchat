import { Cat } from "../models/cat.model";

interface CatCardProps {
  cat: Cat;
  isFavourite: boolean;
}

export function CatCard({ cat, isFavourite }: CatCardProps) {
  return (
    <div className="rounded overflow-hidden shadow-lg h-96">
      {isFavourite && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Favourite
        </span>
      )}
      <div className="w-full h-1/2 overflow-hidden">
        <img className="w-full" src={cat?.photoUrl} alt="Cat image" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cat?.name}</div>
        <p className="text-gray-700 text-base">{cat?.description}</p>
      </div>
    </div>
  );
}
