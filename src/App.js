import { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css'
function App() {
  const [isCompleteScreen, setisCompleteScreen] = useState(false)
  const [AllTodos, setAllTodos] = useState([])
  const [newTitre, setnewTitre] = useState("")
  const [newdescription, setnewdescription] = useState("")
  const [completedTodos, setcompletedTodos] = useState([])
  const handlleAddtod = () => {
    let newTodoItem = {
      titre: newTitre,
      description: newdescription
    }
    let updatedTodoarr = [...AllTodos]
    updatedTodoarr.push(newTodoItem)
    setAllTodos(updatedTodoarr)
    localStorage.setItem('todolist', JSON.stringify(updatedTodoarr))
  }
  const handleCompleted = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth()
    let yyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()

    let completedOn = dd + '-' + mm + '-' + yyy + ' at ' + h + ':' + m + ':' + s
    let filteredItem = {
      ...AllTodos[index],
      completedOn: completedOn
    }
    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setcompletedTodos(updatedCompletedArr)
    handleDeletetodo(index)
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
  }
  const handleDeletetodo = (index) => {
    let reducedTodo = [...AllTodos]
    reducedTodo.splice(index)
    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setAllTodos(reducedTodo)
  }
  const handleCompletedDeletetodo = (index) => {
    let reducedtodo = [...completedTodos]
    reducedtodo.splice(index)

    localStorage.setItem('completedTodos', JSON.stringify(reducedtodo))
    setcompletedTodos(reducedtodo)
  }
  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem('todolist'))
    let saveComplatedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if (saveTodo) {
      setAllTodos(saveTodo)
    }
    if (saveComplatedTodo) {
      setcompletedTodos(saveComplatedTodo)
    }
  }, [])

  return (
    <div className="App">
      <h1>my todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Titre</label>
            <input type="text" placeholder="What's the task title?" value={newTitre} onChange={(e => setnewTitre(e.target.value))} />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="What's the task description?" value={newdescription} onChange={(e) => setnewdescription(e.target.value)} />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handlleAddtod}>Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setisCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setisCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false && AllTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.titre}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <MdDelete className="icon" onClick={() => handleDeletetodo(index)} title='Delete' />
                  <FaCheck className="check-icon" titre="complete?" onClick={() => handleCompleted(index)} />
                </div>
              </div>
            )
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.titre}</h3>
                  <p>{item.description}</p>
                  <p><small>completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <MdDelete className="icon" onClick={() => handleCompletedDeletetodo(index)} title='Delete' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
