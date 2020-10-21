import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Profile() {
 const user = useSelector(state => state.user);
const {name, id, comments, threads, debates, votedFor} = user;
  return (
    <div>
<h1>Hello {name}!</h1>
<br/>
<div>
{/* <h2>You created threads:</h2>
<div>
  { threads && threads.map((el) => {
    return (
      <Link to={`/GlobalThread/${el}`}><button>{el}</button></Link>
    )
  })}
</div>
<h2>Your comments:</h2>
<div>
  { comments && comments.map((el) => {
    return (
      <Link to="/Auth"><button>{el}</button></Link>
    )
  })}
</div>
<h2>You voted for:</h2>
<div>
  { votedFor && votedFor.map((el) => {
    return (
      <Link to="/Auth"><button>{el}</button></Link>
    )
  })}
</div> */}

</div> 
</div>



    
  )
}

export default Profile
