import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [CompletedTodo, setCompletedTodo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTodoList = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleCompletedTodos = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let m = now.getMonth();
    let yyyy = now.getFullYear();
    let hh = now.getHours();
    let mm = now.getMinutes();
    let ss = now.getSeconds();
    let completedOn =
      dd + "-" + m + "-" + yyyy + "-" + hh + ":" + mm + ":" + ss;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...CompletedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...CompletedTodo];
    reducedTodo.splice(index,1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is your task ?"
              name=""
              id=""
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the description ?"
              name=""
              id=""
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodoList}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="searchBar">
          <label>Search: </label>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
          />
        </div>
        <div className="btn-area">
          <button
            className={`sBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`sBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos
              .filter(
                (item) =>
                  item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
              )
              .map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        title="Do you want to delete it ?"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <BsCheckLg
                        className="check-icon"
                        title="Do you want to complete it ?"
                        onClick={() => handleCompletedTodos(index)}
                      />
                    </div>
                  </div>
                );
              })}

          {isCompleteScreen === true &&
            CompletedTodo.filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
            ).map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <i>Completed On: {item.completedOn}</i>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Do you want to delete it ?"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
