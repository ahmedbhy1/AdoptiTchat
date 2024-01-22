interface CatCardProps {
  name: string;
}

export function CatCard({ name }: CatCardProps) {
  return (
<div className="rounded overflow-hidden shadow-lg h-96">
  <div className="w-full h-1/2 overflow-hidden">
    <img className="w-full" src="https://cataas.com/cat" alt="Cat image" />
  </div>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>

</div>
  );

}