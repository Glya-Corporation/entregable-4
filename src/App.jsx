import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ListUser from './component/ListUser'
import UsersForm from './component/UsersForm'

function App() {
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [changeText, setChangeText] = useState('person_add')
  const [info, setInfo] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
  }, [])

  const getUser = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
      .then(() => {
        setShowForm(false)
        setChangeText('person_add')
        setUserSelected(null)
      })
  }

  const userSelect = user => {
    setUserSelected(user)
    changeButton()
  }


  const userDelte = id => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUser())
    timer('Usuario eliminado con exito')
  }

  const changeButton = () => {
    if (changeText === 'person_add') {
      setChangeText('close')
    } else {
      setChangeText('person_add')
      setUserSelected(null)
    }
    setShowForm(!showForm)
  }

  const timer = data => {
    setInfo(data)
    setShowInfo(true)
    setTimeout(() => {
      setShowInfo(false)
    }, 3000);
  }

  return (
    <div className="App">
      {
        showInfo && <div className="alert"><p>{info}</p></div>
      }
      <button onClick={() => changeButton()} className="material-symbols-outlined btn-add-user">{changeText}</button>
      {
        showForm && <UsersForm userSelected={userSelected} getUser={getUser} timer={timer} />
      }
      <ListUser users={users} userSelect={userSelect} userDelte={userDelte} />
    </div>
  )
}

export default App