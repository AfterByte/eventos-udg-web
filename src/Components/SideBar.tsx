import React, { useContext } from "react";
import logo from "../Images/udgL.png";
import Menu from "./Menu";

import { AuthContext, AuthProviderPayload } from "./AuthProvider";

type SideBarProps = {
  signedIn: boolean;
};


const SideBar = (props: any) => {
  
  const {apiClient} = useContext(AuthContext) as AuthProviderPayload;

  return (
    <div className="w-full h-screen bg-indigo-500">
      {!apiClient.tokenLoaded ? (
        <div className="flex flex-col m-auto mt-48 w-3/5">
          <img src={logo} alt="" />
          <h1 className="text-center underline text-2xl font-bold text-white">
            Eventos UDG
          </h1>
        </div>
      ) : (
        <div className="flex flex-col m-auto ml-4 w-full h-full">
          <Menu changeHidden={props.changeHidden} />
        </div>
      )}
    </div>
  );
};
export default SideBar;
// export default class SideBar extends Component<{},{}> {

//   render() {
//     return (
//       <div className="bg-indigo-500">
//         {this.props.SideBar ?
//         <div className="flex flex-col m-auto mt-48 w-3/5">
//           <img src={logo} alt="" />
//           <h1 className="text-center underline text-2xl font-bold text-white">
//             Eventos UDG
//           </h1>
//         </div>
//         :
//         <div className="flex flex-col m-auto mt-48 w-3/5">
//             <Menu/>
//         </div>
//         }
//       </div>
//     );
//   }
// }
