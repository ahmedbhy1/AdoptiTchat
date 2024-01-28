import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Dropdown } from "../components/Dropdown";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CatsService } from "../services/cats.service";
import { UsersService } from "../services/users.service";
import { AdoptionStatus, Sex } from "../models/cat.model";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../models/user-role";
import { defaultCatImg } from "../assets/variables";

function CatPage() {
  const [queryParameters] = useSearchParams();
  const [id] = useState(queryParameters.get("id"));
  const navigate = useNavigate();

  const addContext = id == null;
  const { accessToken, user } = useAuth();
  const [adoptionRequest, setAdoptionRequest] = useState(false);

  const [usersRequestingAdoption, setUsersRequestingAdoption] = useState([
    { _id: "", email: "" },
  ]);

  const [form, setForm] = useState({
    name: "",
    race: "",
    birthDate: "",
    city: "",
    sex: Sex.Other,
    description: "",
    adoptionStatus: AdoptionStatus.Available,
  });

  const [catImg, setCatImg] = useState(addContext ? defaultCatImg : "");
  const [isFavourite, setIsFavourite] = useState(false);
  const [reqForAdoption, setReqForAdoption] = useState(false);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSexChange = (value) => {
    setForm({
      ...form,
      ["sex"]: value,
    });
  };

  const handleDeleteCatButtonClick = async () => {
    if (id && accessToken) {
      await CatsService.deleteCat(id, accessToken);
      navigate(`/cats`);
    }
  };

  const handleAddRemoveToFavouritesButtonClick = async () => {
    if (id && accessToken) {
      if (isFavourite) {
        await UsersService.deleteCatFromFavourites(id, accessToken);
        setIsFavourite(false);
      } else {
        await UsersService.addCatToFavourites(id, accessToken);
        setIsFavourite(true);
      }
    }
  };

  const handleReqCalcelReqForAdoptionButtonClick = async () => {
    if (id && accessToken) {
      if (reqForAdoption) {
        await UsersService.cancelReqCatAdoption(id, accessToken);
        setReqForAdoption(false);
      } else {
        await UsersService.reqCatAdoption(id, accessToken);
        setReqForAdoption(true);
      }
    }
  };

  const handleSubmitCatButtonClick = async () => {
    if (accessToken) {
      if (id) {
        await CatsService.editCat(id, form, accessToken);
      } else {
        await CatsService.addCat(form, accessToken);
      }
      navigate(`/cats`);
    }
  };

  const handleApproveCatAdoptionButtonClick = async () => {
    if (id && accessToken) {
      const adoptionRequest = await CatsService.approveAdoptionRequest(
        id,
        accessToken
      );
      setAdoptionRequest(adoptionRequest.data ?? false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken || !id) return;

        // Fetch Request for Adoption
        const reqForAdoptionResponse =
          await UsersService.getcheckIfRequestedForAdoption(accessToken, id);
        setReqForAdoption(reqForAdoptionResponse.data?.requested || false);

        // Fetch Is Favourite
        const isFavouriteResponse = await UsersService.getcheckIfFavourite(
          accessToken,
          id
        );
        setIsFavourite(isFavouriteResponse.data?.favourite || false);

        // Fetch Cat
        const catResponse = await CatsService.getCatById(accessToken, id);
        const catData = catResponse.data?.cat;
        if (catData) {
          setForm(catData);
          setCatImg(catData.photoUrl || defaultCatImg);
        }

        if (user?.role == UserRole.Admin) {
          // fetch users that request cat adoption
          const usersResponse = await CatsService.getUsersRequestAdoptionCat(
            id,
            accessToken
          );
          setUsersRequestingAdoption(
            usersResponse.data?.usersRequestingAdoption ?? []
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken, id, adoptionRequest]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-3/5">
        <div>
          <Input
            disabled={user?.role == UserRole.Client}
            id="name"
            type="text"
            label="Name"
            value={form.name}
            onChange={handleFormChange}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="race"
            type="text"
            label="Race"
            value={form.race}
            onChange={handleFormChange}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="birthDate"
            type="date"
            value={form.birthDate}
            label="Birth day"
            onChange={handleFormChange}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="city"
            value={form.city}
            type="text"
            label="City"
            onChange={handleFormChange}
          ></Input>
          <Dropdown
            disabled={user?.role == UserRole.Client}
            label="Sex"
            name="sex"
            value={form.sex}
            options={["Male", "Female", "Other"]}
            onChange={handleSexChange}
          ></Dropdown>
          <Input
            id="adoptionStatus"
            value={form.adoptionStatus}
            type="text"
            label="Adoption Status"
            disabled
            onChange={(value: string) => {}}
          ></Input>
          <Input
            disabled={user?.role == UserRole.Client}
            id="description"
            value={form.description}
            type="text"
            label="Description"
            onChange={handleFormChange}
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
                onClick={handleAddRemoveToFavouritesButtonClick}
              >
                {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
            {user?.role == UserRole.Client &&
              form.adoptionStatus != AdoptionStatus.Adopted && (
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 mt-2 border border-gray-400 rounded shadow mr-2"
                  onClick={handleReqCalcelReqForAdoptionButtonClick}
                >
                  {reqForAdoption
                    ? "Calcel Adoption Request"
                    : "Request for Adoption"}
                </button>
              )}

            {!addContext && user?.role == UserRole.Admin && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mt-2 mb-3"
                onClick={handleDeleteCatButtonClick}
              >
                Delete
              </button>
            )}
            {!addContext &&
              user?.role == UserRole.Admin &&
              usersRequestingAdoption.length > 0 && (
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-3">
                    {"users that request adoption for this cat:"}
                  </label>{" "}
                  {usersRequestingAdoption.map((user, idx) => (
                    <div
                      className="rounded overflow-hidden shadow-lg mb-3 border-2 flex items-center justify-between"
                      key={idx}
                    >
                      <div className="ml-2">{user?.email}</div>
                      <button
                        className="btn btn-blue ml-2"
                        onClick={handleApproveCatAdoptionButtonClick}
                      >
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CatPage;
