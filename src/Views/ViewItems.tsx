import React, { useState, useContext, useEffect, useRef } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import CampusCard from "../Components/campusCard";
import DeleteMessage from "../Components/DeleteMessage";
import CampusForm from "../Components/CampusForm";

import { itemsObject } from "../helpers/mockData";
//import imgs/svgs
import addIcon from "../assets/icons/add.svg";

import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { Campus, Item } from "../helpers/payloads";
import { AuthContext, AuthProviderPayload } from "../Components/AuthProvider";
import { deleteCampus, getImage, indexCampuses } from "../helpers/apiClient";
import { typeOf } from "../helpers/validationFunctions";
import ItemCard from "../Components/ItemCard";
import ItemForm from "../Components/ItemForm";

export default function CampusesMenu() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [items, setItems] = useState<Item[]>(itemsObject);

  const [shownItem, setShownItems] = useState<Item>();

  const [showMessage, setShowMessage] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const firstUpdate = useRef(true);

  const getItems = async () => {
    const response = await indexCampuses(apiClient);
    if (response.status === 204) setItems([]);
    else if (
      response.body &&
      typeOf<{ items: Item[] }>("Objetos", response.body)
    )
      setItems(response.body.items);
  };

  const removeLocation = async () => {
    if (shownItem) {
      const response = await deleteCampus(apiClient, shownItem.id);
      if (response.status === 204) {
        setShownItems(undefined);
        getItems();
      } else console.log(response);
    }
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-6 h-screen">
        <div
          className={
            !sidebarHidden
              ? "hidden sm:grid sm:col-span-1 sm:fixed sm:h-full sm:z-20 sm:w-1/6"
              : "col-span-6 sm:grid sm:col-span-1 z-20 sm:fixed h-full"
          }
        >
          <SideBar />
        </div>
        {!sidebarHidden ? (
          <div className="fixed z-10 w-full">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-start-2 sm:col-end-7">
                <Header barTitle={"Objetos"} />
                <Taskbar />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        {!sidebarHidden ? (
          <div className="col-span-6 sm:col-start-2 sm:col-end-7 w-full h-full pt-64 sm:pt-24 z-0 pb-24 sm:pb-12 bg-indigo-500 bg-opacity-50">
            <div className="grid grid-cols-12 mt-6 sm:mt-24 mb-4 sm:mb-8">
              <div className="col-span-12 sm:col-start-1 sm:col-end-8 gap-4 grid sm:grid-cols-1 grid-cols-1 xl:mt-8 pb-1">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="fixed z-10 bg-white rounded-full shadow-lg bottom-0 right-0 mr-4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                  id="createCampus"
                >
                  <img className="w-12 h-12" src={addIcon} alt="AddIcon" />
                </button>

                {items.map((itemObject) => (
                  <ItemCard setShownItem={setShownItems} items={itemObject} />
                ))}
              </div>

              <div className="col-span-12 xl:col-start-8 xl:col-end-13 grid grid-cols-12 fixed xl:static w-full -mt-40 xl:mt-0 xl:ml-0">
                {/*div for the separator line*/}
                <div className="hidden ml-8 border-r border-white xl:grid fixed h-full overflow-hidden"></div>
                {/* location description card */}
                <div className="col-span-12 xl:col-start-2 xl:col-end-13 xl:pt-8">
                  <div className="xl:mt-10 px-6 xl:px-12 xl:mx-12 xl:w-1/4 bg-white shadow-xl xl:shadow-md xl:fixed">
                    {shownItem && (
                      <div className="xl:mt-8">
                        <div className="hidden xl:grid grid-cols-1"></div>
                        <div className="text-center pt-1 pb-1 xl:pt-8 xl:pb-12">
                          <p className="text-sm xl:text-xl font-bold">
                            {shownItem.name}
                          </p>
                          <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                            {shownItem.countable}
                          </p>

                          <div className="flex justify-between pt-2 xl:pt-0 xl:grid xl:justify-center">
                            <div>
                              <button
                                onClick={() => setShowEditForm(true)}
                                className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                              >
                                Editar
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => setShowMessage(true)}
                                className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                              >
                                Eliminar Item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/*to show add campus forms*/}
              {showCreateForm ? (
                <ItemForm
                  setShownItems={setShownItems}
                  getItems={getItems}
                  changeShowForm={() => setShowCreateForm(false)}
                />
              ) : (
                <div className="hidden"></div>
              )}

              {/*to show delete campus message*/}
              {showMessage ? (
                <DeleteMessage
                  deleteAction={removeLocation}
                  hide={() => {
                    setShowMessage(false);
                  }}
                  thing="Item"
                />
              ) : (
                <div className="hidden"></div>
              )}

              {/*to show edit campus forms*/}
              {showEditForm ? (
                <ItemForm
                  setShownItems={setShownItems}
                  getItems={getItems}
                  changeShowForm={() => setShowEditForm(false)}
                  items={shownItem}
                />
              ) : (
                <div className="hidden"></div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
    </div>
  );
}
