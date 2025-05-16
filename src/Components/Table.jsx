import React, { use, useEffect, useState } from 'react'
import { Pagination } from './Pagination'

export const Table = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const pageLimit = 5
  const [pagePeople, setPagePeople] = useState([]);
  const [filter, setFilter] = useState("");
  const [isSorted, setIsSorted] = useState(false)
  const [clickedUser, setClickedUser] = useState(null);
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=50').then(res => res.json().then(data => {
      setUsers(data.results);
      setLoading(false);
    }).catch(err => {
      console.log(err)
      console.error(err)
      setLoading(false);
    })
    )
  }, [])
  if (loading) {
    return <div> Загрузка </div>
  }
  let filteredUsers = users.filter(user =>
    user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
    user.name.last.toLowerCase().includes(filter.toLowerCase())
  )
  if (isSorted) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      const nameA = a.name.first.toLowerCase();
      const nameB = b.name.first.toLowerCase();
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      else {
        return 0
      }
    });
  }
  const handleUserId = (userId) => {
    setClickedUser((prev) => (prev === userId ? null : userId));
  };

  // пагинация фильтрация и подробная информация
  return (
    <div>
      <input
        type='text'
        placeholder='filter'
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <button onClick={() => { setIsSorted(!isSorted) }}>
        {isSorted ? "remove filter" : "A-Z"}
      </button>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {pagePeople.map((user, idx) => (
            <tr key={idx}>
              <td>
                <img src={user.picture.thumbnail} alt="avatar" onClick={() => { handleUserId(user.login.uuid) }}
                />
                {clickedUser === user.login.uuid && (
                  <div>
                    <ul>
                      <li>gender: {user.gender}</li>
                      <li>cell phone: {user.cell}</li>
                      <li>username: {user.login.username}</li>
                      <li>password: {user.login.password}</li>
                      <li>country: {user.location.country}</li>
                      <li>postcode: {user.location.postcode}</li>
                      <li>age: {user.dob.age}</li>
                    </ul>


                  </div>
                )}

              </td>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.location.city} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        items={filteredUsers}
        pageLimit={pageLimit}
        setPagePeople={setPagePeople}
      />
    </div>
  )
}





