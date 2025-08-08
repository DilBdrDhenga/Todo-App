import React, { useEffect, useState } from "react";
import "./App.css";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState(() => {
    // getting list's from local storage when refreshing/reloading page
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [editIdx, setEditIdx] = useState(-1);

  const handleAdd = () => {
    // to prevent any empty input
    if (text.trim() === "") return;

    // creating object instead of an array
    const newText = { text: text, completed: false };

    // adding new value to the existing array "list"
    setList([...list, newText]);
    // setting input box to empty after adding
    setText("");
  };

  const handleEdit = (index) => {
    // setting the "editIdx" to the index being edited
    setEditIdx(index);
    // loading current item text to the input
    setText(list[index].text);
  };

  const handleDelete = (index) => {
    const deleteList = list.filter((item, i) => {
      // keeping all the items except the one at the index we want to delete
      return i != index;
    });
    // updating our "list"
    setList(deleteList);
  };

  const handleUpdate = () => {
    if (text.trim() === "") return;
    // copying "list" to "updatedList"
    const updatedList = [...list];
    // item at "editIdx" is updated with current "text"
    updatedList[editIdx].text = text.trim();
    // updating array "list"
    setList(updatedList);
    // exiting edit mode
    setEditIdx(-1);
    // clearing input
    setText("");
  };

  const handleToggle = (index) => {
    // creating copy of list
    const newList = [...list];
    // toggle to completed status
    newList[index].completed = !newList[index].completed;
    // updating the list
    setList(newList);
  };

  const handleDeleteAll = () => {
    setList([]);
    setEditIdx(-1);
    setText("");
  };

  // setting "list" data to local storage
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 border border-gray-200 rounded-xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Todo App
        </h1>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Add Button */}
          <button
            onClick={editIdx === -1 ? handleAdd : handleUpdate}
            className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
          >
            {editIdx === -1 ? "Add" : "Update"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {list.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md text-gray-800 shadow-sm"
            >
              <span
                className={`flex-1 ${
                  item.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {item.text}
              </span>

              <div className="flex items-center gap-14 text-xl text-gray-600 ">
                <input
                  type="checkbox"
                  className=""
                  checked={item.completed}
                  onChange={() => {
                    handleToggle(i);
                  }}
                />

                {/* Edit Button */}
                <BiSolidEditAlt
                  onClick={() => {
                    handleEdit(i);
                  }}
                  className="cursor-pointer hover:text-blue-500 transition"
                />
                {/* Delete Button */}
                <MdDeleteForever
                  onClick={() => {
                    handleDelete(i);
                  }}
                  className="cursor-pointer hover:text-red-500 transition"
                />
              </div>
            </li>
          ))}
        </ul>
        {/* Styled Delete All Button */}
        {list.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition"
          >
            Delete All
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
