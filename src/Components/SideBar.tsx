import React, { Component } from "react";
import logo from "../Images/udgL.png";
import Menu from "./Menu"

type SideBarProps = {
  signedIn: boolean;
};
const SideBar = () => {
  return (<div className="bg-indigo-500">
        {true ? 
        <div className="flex flex-col m-auto mt-48 w-3/5">
          <img src={logo} alt="" />
          <h1 className="text-center underline text-2xl font-bold text-white">
            Eventos UDG
          </h1>
        </div>
        :
        <div className="flex flex-col m-auto mt-48 w-3/5">
            <Menu/>
        </div>
        }
      </div>);
}; export default SideBar;
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
