import React, { useState, useContext, useRef, useEffect } from "react";
// Custom components
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import TaskBar from "../components/TaskBar";
import UserCard from "../components/cards/UserCard";
import UserForm, { roles } from "../components/forms/EditUserForm";
// Payloads and helpers
import { AuthContext, AuthProviderPayload } from "../components/AuthProvider";
import { User } from "../helpers/payloads";
import { getImage, indexUsers } from "../helpers/apiClient";
import { parseFullName, typeOf } from "../helpers/validationFunctions";

export default function Users() {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;

  const [users, setUsers] = useState<User[]>([]);
  const [shownUser, setShownUser] = useState<User>();
  const [shownImage, setShownImage] = useState("");

  const [showEditForm, setShowEditForm] = useState(false);

  const firstUpdate = useRef(true);

  const getUsers = async () => {
    const response = await indexUsers(apiClient);
    if (response.status === 204) setUsers([]);
    else if (response.body && typeOf<{ users: User[] }>("users", response.body))
      setUsers(response.body.users);
  };

  const fetchImage = async (id: string) => {
    const response = await getImage(apiClient, id);
    if (response.status === 200 && response.body)
      setShownImage(response.body.url);
    else setShownImage("");
  };

  const setUser = (u: User) => {
    setShownUser(u);
    if (u.person.image) fetchImage(u.person.image.id);
    else setShownImage("");
  };

  useEffect(() => {
    if (firstUpdate.current) {
      getUsers();
      firstUpdate.current = false;
    }
  });

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex-grow bg-indigo-500 bg-opacity-50 relative flex flex-col">
        <Header barTitle="Usuarios" />
        <TaskBar />
        <div className="xl:grid xl:grid-cols-12 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow xl:col-span-7 px-4 xl:border-r-2 pt-4 overflow-auto">
            {users.map((user) => (
              <UserCard user={user} setShownUser={setUser} />
            ))}
          </div>

          <div className="xl:static xl:col-span-5 overflow-auto">
            {/* User preview card */}
            {shownUser && (
              <div className="xl:m-8">
                {shownImage ? (
                  <img
                    className="hidden border-2 border-gray rounded-md xl:block object-cover w-48 h-48 mx-auto shadow-md"
                    src={shownImage}
                    alt="User"
                  />
                ) : null}
                <div
                  className={`p-4 text-center bg-white xl:p-8 ${
                    shownImage ? "xl:-mt-24 xl:pt-32" : ""
                  }`}
                >
                  <p className="text-lg xl:text-xl">
                    {parseFullName(shownUser.person)}
                  </p>
                  <p className="hidden xl:block xl:text-lg text-red-500 md:mt-2">
                    {shownUser.career.name}
                  </p>
                  <p className="hidden xl:block xl:text-lg">
                    {shownUser.campus.name}
                  </p>

                  <div className="md:py-4">
                    <p className="xl:text-lg">Rol de usuario</p>
                    <p className="xl:text-lg font-bold text-teal-500">
                      {roles.find((role) => role.value === shownUser.role.name)
                        ?.name || "Desconocido"}
                    </p>
                  </div>

                  <div className="flex xl:flex-col xl:mt-16 justify-center">
                    <button
                      onClick={() => setShowEditForm(true)}
                      className="xl:mx-auto xl:text-lg mt-4 block p-2 px-3 text-white bg-blue-500 rounded-md shadow-sm transition duration-500 ease-in-out transform hover:-translate-y-1"
                    >
                      Editar rol de usuario
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showEditForm && (
          <UserForm
            changeShowForm={() => setShowEditForm(false)}
            user={shownUser}
            setShownUser={setUser}
            getUsers={getUsers}
          />
        )}
      </div>
    </div>
  );
}
