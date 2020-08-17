import React, { Component } from "react";
import Fondo from '../Images/fondo.jpg';
import { request } from "http";



interface Ustate{
  Code:string,
  Nip:string
}
export default class Login extends Component<{},Ustate> {
  
  constructor(props:{}){
    super(props);
    this.state={
      Code: "",
      Nip: ""
    }
  }

  async handleSubmit(event: any){
    event.preventDefault();
    this.setState({
      Code:"",
      Nip: ""
    })
    /*let request={
      User: this.state.Code,
      password: this.state.Nip
    }
    axios.post("http://localhost:3000/",request)
    .then(resp=>{
      alert(resp.data.message);
    })
    .catch(err=>{
      console.log(err);
    })*/
  }

  render() {
    console.log(request)
    return (
      <div
        style={{ backgroundImage: `url(${Fondo})`, backgroundSize: "cover" }}
      >
        <div className="container mx-auto h-full flex justify-center items-center">
            <div className="border-teal p-8 border-t-12 bg-white w-1/3 mb-6 mr-16 rounded-lg shadow-lg">
            <form action="" onSubmit={(event) => this.handleSubmit(event)}>
              <div className="text-center">
                <h1 className="font-sans font-light text-4xl">¡Bienvenido!</h1>
                <h1 className="font-light text-xl">
                  Inicia sesión utilizando tu
                </h1>
                <h1 className="font-light text-xl">cuenta de SIIAU</h1>
              </div>
              <div className="mb-4 text-center">
                <label
                  htmlFor="matricula"
                  className="font-sans font-ligth text-grey-darker block mb-2"
                >
                  Matricula
                </label>
                <input
                  type="text"
                  name="Code"
                  onChange={(event)=>this.setState({Code: event.target.value})}
                  value={this.state.Code}
                  id="matricula"
                  placeholder="INGRESA TU CODIGO"
                  className="appearance-none w-1/2 bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                />
              </div>
              <div className="mb-4 text-center">
                <label
                  htmlFor="nip"
                  className="font-sans font-ligth text-grey-darker block mb-2"
                >
                  NIP
                </label>
                <input
                  value={this.state.Nip}
                  onChange={(event)=>this.setState({Nip: event.target.value})}
                  type="password"
                  name="Nip"
                  id="nip"
                  placeholder="INGRESA TU NIP"
                  className="appearance-none w-1/2 bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                />
              </div>
              <div className="text-center">
                <button className="bg-teal-500 text-white hover:bg-teal-900 font-bold py-2 px-4 rounded">
                  Iniciar sesión
                </button>
              </div>
              </form>
            </div>
        </div>
      </div>
    );
  }
}
