import React from 'react'

const UserCard = ({user}) => {
  return (
    <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img style={{ width: '200px', height: '150px' }} 
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstname} {user.lastname}</h2>
    <p>{user.age}</p>
    <p>{user.gender}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard