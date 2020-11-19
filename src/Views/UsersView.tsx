import React, { useState, useContext } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import Taskbar from "../Components/TaskBar";
import UserCard from "../Components/UserCard";
import DeleteMessage from "../Components/DeleteMessage";
import UserForm from "../Components/EditUserForm";
//import imgs/svgs
import addIcon from "../assets/icons/add.svg";

import { ResponsiveContext, RespContextPayload } from "../Components/Routes";
import { campuses, users } from "../helpers/mockData";

export default function UsersView() {
  const { sidebarHidden } = useContext(ResponsiveContext) as RespContextPayload;
  const [idUser, setIdUser] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const onClick = (id: string) => {
    setIdUser(id);
  };

  const changeDeleteMessage = () => {
    setShowMessage(!showMessage);
  };

  const changeShowEditForm = () => {
    setShowEditForm(!showEditForm);
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
                <Header barTitle={"Usuarios"} />
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

                {users.map((user) => (
                  <UserCard
                    user={user}
                    onClick={onClick}
                  />
                ))}
              </div>

              <div className="col-span-12 xl:col-start-8 xl:col-end-13 grid grid-cols-12 fixed xl:static w-full -mt-40 xl:mt-0 xl:ml-0">
                {/*div for the separator line*/}
                <div className="hidden ml-8 border-r border-white xl:grid fixed h-full overflow-hidden"></div>
                {/* location description card */}
                <div className="col-span-12 xl:col-start-2 xl:col-end-13 xl:pt-8">
                  <div className="xl:mt-10 px-6 xl:px-12 xl:mx-12 xl:w-1/4 bg-white shadow-xl xl:shadow-md xl:fixed">
                    {users.map(
                      (userInfo) =>
                        userInfo.id === idUser && (
                          <div className="xl:mt-8">
                            <div className="hidden xl:grid grid-cols-1">
                              <div className="col-span-1 px-5">
                                <img
                                  className="w-full h-56 -mt-16 shadow-md"
                                  src={userInfo.person.image}
                                  alt="campus image"
                                />
                              </div>
                            </div>
                            <div className="text-center pt-1 pb-1 xl:pt-8 xl:pb-12">
                              <p className="hidden sm:block sm:text-lg">Usuario</p>
                              <p className="text-sm xl:text-xl font-bold">
                                {userInfo.person.name} {userInfo.person.lastname} {userInfo.person.second_lastname}
                              </p>
                              <p className="hidden sm:block text-sm xl:text-base font-bold text-red-500 pt-2">
                                {userInfo.career.name}
                              </p>
                              <p className="hidden sm:block text-sm xl:text-lg">
                                {userInfo.campus.name}
                              </p>

                              <div className="py-4">
                                <p>Tipo de cuenta</p>
                                <p className="text-lg font-bold text-teal-500">{userInfo.role.name}</p>
                              </div>

                              <div className="flex justify-between pt-2 xl:pt-0 xl:grid xl:justify-center">
                                <div>
                                  <button
                                    onClick={() => changeShowEditForm()}
                                    className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-8 xl:py-2 bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                                  >
                                    Editar tipo de cuenta
                                  </button>
                                </div>
                                <div>
                                  <button
                                    onClick={() => changeDeleteMessage()}
                                    className="font-small px-1 py-1 xl:font-medium text-white xl:mt-4 xl:px-4 xl:py-2 bg-red-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                                  >
                                    Eliminar cuenta
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>

              {/*to show delete campus message*/}
              {showMessage ? (
                <DeleteMessage
                  deleteAction={() => {}}
                  hide={() => {
                    setShowMessage(false);
                  }}
                  thing="Cuenta"
                />
              ) : (
                <div className="hidden"></div>
              )}

              {/*to show edit user forms*/}
              {showEditForm ? (
                <UserForm
                  changeShowForm={changeShowEditForm}
                  role={users[parseInt(idUser)].role}
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
