import React, { useState, useContext, useRef, useEffect } from "react";
// Custom components
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TaskBar from "../components/TaskBar";
import ItemCard from "../components/cards/ItemCard";
import { ItemForm } from "../components/forms";
import { ConfirmDialogue } from "../components/elements";
// Assets
import addIcon from "../assets/icons/add.svg";
import deleteImage from "../assets/images/Throw_away.svg";
// Helpers and payloads
import { Item } from "../helpers/payloads";
import { AuthContext, AuthProviderPayload } from "../components/AuthProvider";
import { deleteItem, getItem, indexItems } from "../helpers/apiClient";
import { typeOf } from "../helpers/validationFunctions";

export default function Items() {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [items, setItems] = useState<Item[]>([]);
  const [shownItem, setShownItem] = useState<Item>();

  const [showMessage, setShowMessage] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const firstUpdate = useRef(true);

  const getItems = async () => {
    const response = await indexItems(apiClient);
    if (response.status === 204) setItems([]);
    else if (response.body && typeOf<{ items: Item[] }>("items", response.body))
      setItems(response.body.items);
  };

  const removeLocation = async () => {
    if (shownItem) {
      const response = await deleteItem(apiClient, shownItem.id);
      if (response.status === 204) {
        setShownItem(undefined);
        getItems();
      } else console.log(response);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getItems();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Material y objetos" />
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

            {items.map((item) => (
              <ItemCard setShownItem={setShownItem} item={item} />
            ))}
          </div>

          <div className="xl:static xl:col-span-5 overflow-auto">
            {shownItem && (
              <div className="p-4 bg-white text-center xl:m-8 xl:p-8 xl:pt-16">
                <p className="text-lg md:text-xl font-bold">{shownItem.name}</p>
                <p className="text-sm xl:text-base font-bold text-red-500 pt-2">
                  {shownItem.countable
                    ? "Objeto contable"
                    : "Objeto no contable"}
                </p>

                <div className="flex xl:flex-col xl:mt-16 justify-center">
                  <button
                    onClick={() => setShowEditForm(true)}
                    className="xl:mx-auto xl:text-lg mr-4 mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                  >
                    Ver objeto
                  </button>
                  <button
                    onClick={() => {
                      setShowMessage(true);
                    }}
                    className="xl:mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                  >
                    Eliminar objeto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showMessage && (
          <ConfirmDialogue
            confirmAction={removeLocation}
            hide={() => {
              setShowMessage(false);
            }}
            dialogue="¿Está seguro de querer eliminar el objeto?"
            image={deleteImage}
            buttonColor="#bd4455"
          />
        )}
        {showCreateForm && (
          <ItemForm
            setShownItem={setShownItem}
            getItems={getItems}
            changeShowForm={() => setShowCreateForm(false)}
          />
        )}

        {showEditForm && (
          <ItemForm
            setShownItem={setShownItem}
            getItems={getItems}
            changeShowForm={() => setShowEditForm(false)}
            item={shownItem}
          />
        )}
      </div>
    </div>
  );
}
