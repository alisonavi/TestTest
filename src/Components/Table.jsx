import React, { useEffect, useState } from 'react'

export const Table = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5').then(res => res.json().then(data => {
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
  return (
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
        {users.map((user, idx) => (
          <tr key={idx}>
            <td>
              <img src={user.picture.thumbnail} alt="avatar" />
            </td>
            <td>{user.name.first} {user.name.last}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.location.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}