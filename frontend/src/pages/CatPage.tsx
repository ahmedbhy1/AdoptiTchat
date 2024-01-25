import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Dropdown } from "../components/Dropdown";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CatsService } from "../services/cats.service";
import { AdoptionStatus, Cat, Sex } from "../models/cat.model";
import { useNavigate } from "react-router-dom";
import { CatTOAdd } from "../dtos/cats.responses.interfaces";
import { UserRole } from "../models/user-role";

function CatPage() {
  const [queryParameters] = useSearchParams();
  const [id, setId] = useState(queryParameters.get("id"));
  const navigate = useNavigate();

  const addContext = id == null;
  const { accessToken, isLoading, user } = useAuth();
  const defaultCatImg =
    "https://creativecardiff.org.uk/sites/default/files/pictures/ccg_social_icon_02.png";

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [city, setCity] = useState("");
  const [sex, setSex] = useState(Sex.Other);
  const [adoptionStatus, setAdoptionStatus] = useState(
    AdoptionStatus.Available
  );
  const [description, setDescription] = useState("");
  const [catImg, setCatImg] = useState(addContext ? defaultCatImg : "");
  const [isFavourite, setIsFavourite] = useState(false);
  const [reqForAdoption, setReqForAdoption] = useState(false);

  const handleDeleteCatButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.deleteCat(id, accessToken);
      navigate(`/cats`);
    }
  };

  const handleRemoveFromFavouritesButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.deleteCatFromFavourites(id, accessToken);
      setIsFavourite(false);
    }
  };

  const handleAddToFavouritesButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.addCatToFavourites(id, accessToken);
      setIsFavourite(true);
    }
  };

  const handleReqForAdoptionButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.reqCatAdoption(id, accessToken);
      setReqForAdoption(true);
    }
  };

  const handleCancelReqForAdoptionButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.cancelReqCatAdoption(id, accessToken);
      setReqForAdoption(false);
    }
  };

  const handleSubmitCatButtonClick = async () => {
    const myCat: CatTOAdd = {
      birthDate: birthDay,
      name: name,
      race: race,
      sex: sex,
      city: city,
      description: description,
    };
    if (accessToken) {
      if (id) {
        await CatsService.editCat(id, myCat, accessToken);
      } else {
        await CatsService.addCat(myCat, accessToken);
      }
      navigate(`/cats`);
    }
  };

  useEffect(() => {
    const fetchRequestForAdoption = async () => {
      try {
        if (!accessToken) return;
        if (id) {
          const response = await CatsService.getcheckIfRequestedForAdoption(
            accessToken,
            id
          );
          setReqForAdoption(
            response.data?.requested ? response.data?.requested : false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestForAdoption();
  }, [accessToken, id]);

  useEffect(() => {
    const fetchIsFavourite = async () => {
      try {
        if (!accessToken) return;
        if (id) {
          const response = await CatsService.getcheckIfFavourite(
            accessToken,
            id
          );
          setIsFavourite(
            response.data?.favourite ? response.data?.favourite : false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchIsFavourite();
  }, [accessToken, id]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        if (!accessToken) return;
        if (id != null) {
          const response = await CatsService.getCatById(accessToken, id);
          if (response.data?.cat) {
            setName(response.data?.cat?.name ? response.data.cat.name : "");
            setRace(response.data?.cat?.race ? response.data.cat.race : "");
            setBirthDay(
              response.data?.cat?.birthDate ? response.data.cat.birthDate : ""
            );
            setCity(response.data?.cat?.city ? response.data.cat.city : "");
            setDescription(
              response.data?.cat?.description
                ? response.data.cat.description
                : ""
            );
            setSex(response.data?.cat?.sex ? response.data.cat.sex : Sex.Male);
            setCatImg(
              response.data?.cat?.photoUrl
                ? response.data.cat.photoUrl
                : defaultCatImg
            );
            setAdoptionStatus(
              response.data?.cat?.adoptionStatus
                ? response.data.cat.adoptionStatus
                : AdoptionStatus.Available
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCat();
  }, [accessToken, id]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-3/5">
        <div>
          <Input
            disabled={user?.role == UserRole.Client}
            id="name"
            type="text"
            label="Name"
            value={name}
            onChange={(value: string) => setName(value)}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="race"
            type="text"
            label="Race"
            value={race}
            onChange={(value: string) => setRace(value)}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="birthDay"
            type="date"
            value={birthDay}
            label="Birth day"
            onChange={(value: string) => setBirthDay(value)}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="city"
            value={city}
            type="text"
            label="City"
            onChange={(value: string) => setCity(value)}
          ></Input>
          <Dropdown
            disabled={user?.role == UserRole.Client}
            label="Sex"
            value={sex}
            options={["Male", "Female", "Other"]}
            onChange={(value: string) => {
              setSex(value);
            }}
          ></Dropdown>
          <Input
            id="adoptionStatus"
            value={adoptionStatus}
            type="text"
            label="Adoption Status"
            disabled
            onChange={(value: string) => {}}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="description"
            value={description}
            type="text"
            label="Description"
            onChange={(value: string) => setDescription(value)}
          ></Input>
          <div>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2"
              onClick={() => navigate(`/cats`)}
            >
              Cancel
            </button>
            {user?.role == UserRole.Admin && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={handleSubmitCatButtonClick}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div>
          {isFavourite && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Favourite
            </span>
          )}
          <img className="" src={catImg} alt="Cat image"></img>
          <div className="flex flex-col">
            {user?.role == UserRole.Client && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded mt-2"
                onClick={
                  isFavourite
                    ? handleRemoveFromFavouritesButtonClick
                    : handleAddToFavouritesButtonClick
                }
              >
                {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
            {user?.role == UserRole.Client &&
              adoptionStatus != AdoptionStatus.Adopted && (
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 mt-2 border border-gray-400 rounded shadow mr-2"
                  onClick={
                    reqForAdoption
                      ? handleCancelReqForAdoptionButtonClick
                      : handleReqForAdoptionButtonClick
                  }
                >
                  {reqForAdoption
                    ? "Calcel Adoption Request"
                    : "Request for Adoption"}
                </button>
              )}

            {!addContext && user?.role == UserRole.Admin && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mt-2"
                onClick={handleDeleteCatButtonClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CatPage;
