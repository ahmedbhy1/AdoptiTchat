import { CatCard } from "../components/CatCard";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../models/user-role";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { CatsService } from "../services/cats.service";
import { UsersService } from "../services/users.service";
import { Cat } from "../models/cat.model";
import SearchBar from "../components/SearchBar";
interface CatsPageProps {
  favourites: boolean;
}

export function CatsPage({ favourites }: CatsPageProps) {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [catsList, setCatsList] = useState<Cat[]>([]);
  const [favouriteCatsIds, setFavouriteCatsIds] = useState<string[]>([]);
  const [searchNameParam, setSearchNameParam] = useState("");
  useEffect(() => {
    const fetchCats = async () => {
      try {
        if (!accessToken) return;
        if (!favourites) {
          const response = await CatsService.getAllCats(
            accessToken,
            searchNameParam
          );
          setCatsList(response.data?.cats ?? []);
        } else {
          if (user?.role == UserRole.Client) {
            const response = await UsersService.getFavouriteCats(accessToken);
            setCatsList(response.data?.cats ?? []);
          }
        }
        if (user?.role == UserRole.Client) {
          const response = await UsersService.getFavouriteCatsIds(accessToken);
          setFavouriteCatsIds(response.data?.cats ? response.data?.cats : []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();
  }, [accessToken, favourites, searchNameParam]);

  const handleAddCatButtonClick = (catId?: string) => {
    if (catId == undefined) {
      navigate(`/cat`);
    } else {
      navigate(`/cat?id=${catId}`);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center p-16">
        {user?.role === UserRole.Admin && (
          <button
            type="button"
            className="btn btn-primary mb-4"
            onClick={() => handleAddCatButtonClick()}
          >
            Add New Cat
          </button>
        )}
        {!favourites && (
          <SearchBar
            onChange={(value) => setSearchNameParam(value)}
          ></SearchBar>
        )}
        <div className="flex justify-center gap-10 flex-wrap">
          {catsList.map((cat, idx) => (
            <div
              className="w-1/4"
              key={idx}
              onClick={() => handleAddCatButtonClick(cat._id)}
            >
              <CatCard
                cat={cat}
                isFavourite={favouriteCatsIds.includes(cat?._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default CatsPage;
