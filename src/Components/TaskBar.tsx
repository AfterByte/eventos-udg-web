import React, { Component } from "react";
import Sort from "../assets/icons/sort-black.svg";
import Search from "../assets/icons/search-black.svg";
import Clear from "../assets/icons/clear-black.svg";

interface state {
  isOpen: boolean;
  tags: string[];
  showTag: boolean;
}

export default class TaskBar extends Component<{}, state> {
  state: state = {
    isOpen: false,
    tags: [""],
    showTag: false,
  };

  handleClick() {
    this.setState((state) => ({
      isOpen: !this.state.isOpen,
    }));
  }

  collectSearchData = (e: any) => {
    e.preventDefault();
    const target: string = e.target.value;
    const tagValue: string[] = target.split(",");
    // Check the value of the Input string to decide if tags elements must be shown
    target !== ""
      ? this.setState((state) => ({
          tags: tagValue,
          showTag: true,
        }))
      : this.setState((state) => ({
          tags: tagValue,
          showTag: false,
        }));
  };

  deleteTag = (e: any, tag: string) => {
    e.preventDefault();
    const stringID = this.state.tags.indexOf(tag);
    this.setState((state) => ({
      tags: [
        ...this.state.tags.filter(
          (tagS) => stringID !== this.state.tags.indexOf(tagS)
        ),
      ],
    }));
  };

  render() {
    return (
      <div className="col-start-2 col-end-7 w-full">
        <div className="grid xl:grid-cols-4 grid-cols-4 shadow-md text-center w-full md:w-full h-auto items-center py-2 sm:py-5 bg-white mt-0 sm:mt-2">
          <div className="col-span-1 grid grid-cols-1 sm:grid-cols-5 md:text-left ml-2 sm:ml-4 relative">
            <button
              onClick={() => this.handleClick()}
              className="px-2 py-2 col-span-2 text-left font-normal text-white bg-blue-500 rounded-md items-center flex justify-between"
            >
              <p className="hidden sm:grid sm:text-md md:text-sm lg:text-sm xl:text-lg">
                Ordenar por
              </p>
              <img
                className="h-6"
                style={{ filter: "invert(100%)" }}
                src={Sort}
                alt={"SortIcon"}
              />
            </button>
            {this.state.isOpen ? (
              <div className="grid grid-cols-5 absolute w-auto text-center mt-10 xl:mt-16 z-10">
                <div className="col-span-5 sm:col-span-2 bg-white border">
                  <a className="border block px-2 py-2 hover:bg-blue-500 hover:text-white text-xs font-semibold sm:text-base sm:font-normal">
                    Fecha (Cercanos)
                  </a>
                  <a className="border block px-2 py-2 hover:bg-blue-500 hover:text-white text-xs font-semibold sm:text-base sm:font-normal">
                    Fecha (Lejanos)
                  </a>
                  <a className="border block px-2 py-2 hover:bg-blue-500 hover:text-white text-xs font-semibold sm:text-base sm:font-normal">
                    Cupo (Mas llenos)
                  </a>
                  <a className="border block px-2 py-2 hover:bg-blue-500 hover:text-white text-xs font-semibold sm:text-base sm:font-normal">
                    Cupo (Menos llenos)
                  </a>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="col-span-3 sm:col-span-3 grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-6">
            <div className="hidden col-span-1 py-1 ml-2 sm:ml-0 sm:pb-0 sm:col-span-4  lg:flex justify-end">
              {this.state.tags.map((tag) => (
                <span
                  className={
                    this.state.showTag
                      ? "grid grid-cols-6 bg-gray-200 my-1 sm:my-0 rounded-full border border-gray-500 border-dashed px-2 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 items-center"
                      : "hidden"
                  }
                >
                  <p className="col-span-5">{tag}</p>
                  <button onClick={(e) => this.deleteTag(e, tag)}>
                    <img
                      className="h-4 ml-1"
                      src={Clear}
                      alt={"ClearTagIcon"}
                    />
                  </button>
                </span>
              ))}
            </div>
            <div className="col-span-1 sm:col-span-2 flex ml-2 sm:ml-0 justify-center sm:justify-end">
              <form
                className="flex w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="flex w-full h-full mr-2 sm:mr-0 border border-gray-500 border-opacity-50">
                  <img
                    className="h-full sm:py-0 py-2 px-2 bg-gray-500 bg-opacity-50"
                    style={{ opacity: "0.5" }}
                    src={Search}
                    alt={"SearchIcon"}
                  />
                  <input
                    onChange={(e) => this.collectSearchData(e)}
                    value={this.state.tags.toString()}
                    className="searchInput putsm:mr-0 px-1 bg-gray-500 bg-opacity-25 w-full"
                    type="text"
                    name="buscar"
                  />
                </label>
                <div className="hidden sm:grid mr-2 px-6 py-2 text-md font-normal text-white bg-blue-500 items-center">
                  Buscar
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
