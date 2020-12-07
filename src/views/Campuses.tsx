import React, { useState, useContext, useEffect, useRef } from "react";
// Custom components
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TaskBar from "../components/TaskBar";
import { ConfirmDialogue } from "../components/elements";
import { CampusForm } from "../components/forms";
import CampusCard from "../components/cards/CampusCard";
// Assets
import addIcon from "../assets/icons/add.svg";
import deleteImage from "../assets/images/Throw_away.svg";
// Payloads and helpers
import { Campus } from "../helpers/payloads";
import { AuthContext, AuthProviderPayload } from "../components/AuthProvider";
import { deleteCampus, getImage, indexCampuses } from "../helpers/apiClient";
import { typeOf } from "../helpers/validationFunctions";
/**ALERTS WITH SWEETALERT */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Campuses() {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [shownCampus, setShownCampus] = useState<Campus>();
  const [shownImage, setShownImage] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  /**CONST FOR USE SWEETALERT */
  const MySwal = withReactContent(Swal);
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", MySwal.stopTimer);
      toast.addEventListener("mouseleave", MySwal.resumeTimer);
    },
  });

  const firstUpdate = useRef(true);

  const getCampuses = async () => {
    const response = await indexCampuses(apiClient);
    if (response.status === 204) setCampuses([]);
    else if (
      response.body &&
      typeOf<{ campuses: Campus[] }>("campuses", response.body)
    )
      setCampuses(response.body.campuses);
  };

  const removeCampus = async () => {
    if (shownCampus) {
      const response = await deleteCampus(apiClient, shownCampus.id);
      if (response.status === 204) {
        setShownCampus(undefined);
        getCampuses();
        setShownImage("");
        Toast.fire({
          icon: "success",
          title: "Campus eliminado correctamente",
        });
      } else console.log(response);
    }
  };

  const fetchImage = async (id: string) => {
    const response = await getImage(apiClient, id);
    if (response.status === 200 && response.body)
      setShownImage(response.body.url);
    else setShownImage("");
  };

  const setCampus = (c: Campus) => {
    setShownCampus(c);
    if (c.attachment_id) fetchImage(c.attachment_id);
    else setShownImage("");
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getCampuses();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Cámpuses" />
        <TaskBar />
        <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
            <button
              onClick={() => setShowCreateForm(true)}
              className="fixed bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
              id="createCampus"
            >
              <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
            </button>

            {campuses.map((campus) => (
              <CampusCard setShownCampus={setCampus} campus={campus} />
            ))}
          </div>

          <div className="xl:static xl:col-span-5 overflow-auto">
            {/* campus description card */}
            {shownCampus && (
              <div className="xl:m-8">
                {shownImage ? (
                  <img
                    className="hidden border-2 border-gray rounded-md xl:block object-cover w-48 h-48 mx-auto shadow-md"
                    src={shownImage}
                    alt="Campus"
                  />
                ) : null}
                <div
                  className={`p-4 text-center bg-white xl:p-8 ${
                    shownImage ? "xl:-mt-24 xl:pt-32" : ""
                  }`}
                >
                  <p className="text-sm xl:text-xl">{shownCampus.name}</p>
                  <p className="text-sm xl:text-base text-red-500 md:mt-2">
                    {shownCampus.city}
                  </p>
                  <div className="flex xl:flex-col xl:mt-16 justify-center">
                    <button
                      onClick={() => setShowEditForm(true)}
                      className="xl:mx-auto xl:text-lg mr-4 mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Ver campus
                    </button>
                    <button
                      onClick={() => {
                        setShowMessage(true);
                      }}
                      className="xl:mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Eliminar campus
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showMessage && (
          <ConfirmDialogue
            confirmAction={removeCampus}
            hide={() => {
              setShowMessage(false);
            }}
            dialogue="¿Está seguro de querer eliminar el campus?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
        {showCreateForm && (
          <CampusForm
            setShownCampus={setCampus}
            getCampuses={getCampuses}
            changeShowForm={() => setShowCreateForm(false)}
          />
        )}

        {showEditForm && (
          <CampusForm
            setShownCampus={setCampus}
            getCampuses={getCampuses}
            changeShowForm={() => setShowEditForm(false)}
            campus={shownCampus}
          />
        )}
      </div>
    </div>
  );
}
