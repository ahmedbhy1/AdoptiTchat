import { CatCard } from "../components/CatCard";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../models/user-role";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { CatsService } from "../services/cats.service";
import { Cat } from "../models/cat.model";
function CatsPage() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [catsList, setCatsList] = useState<Cat[]>([]);

  
  useEffect(() => {
    const fetchCats = async () => {
        try {
          if (!accessToken)
            return;
    
          const response = await CatsService.getAllCats(accessToken);
          setCatsList(response.data?.cats ?? [])
        }
        catch(error) {
          console.log(error);
        }
    };

    fetchCats();
  }, [accessToken]);
  
  const handleAddCatButtonClick = (catName?: string) => {
    console.log(catName);
    navigate("/cat");
  };
  return (
    <div className="flex flex-col items-center p-16">
       {
        user?.role === UserRole.Admin
        && <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={() => handleAddCatButtonClick()}
        >
          Add New Cat
        </button>
      }
      <div className="flex justify-center gap-10 flex-wrap">
          {catsList.map((cat, idx) => (
            <div
              className="w-1/4"
              key={idx}
              onClick={() => handleAddCatButtonClick(cat.name)}
            >
                <CatCard name={cat.name} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default CatsPage;
