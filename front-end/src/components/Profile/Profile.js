import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { checkRegister } from '../../redux/actions';

function Profile() {
  const dispatch = useDispatch();

//   useEffect(() => 
// dispatch(checkRegister())
//   , [dispatch])


 const user = useSelector(state => state.user);
const {name, id, comments, threads, debates, votedFor} = user;
  return (
    <div>
<h1>Hello {name}!</h1>
<br/>
<div>

  <h2>You created { threads && threads.length} threads:</h2>
<div>
  { threads && threads.map((el) => {
    return (
      <Link to={`/GlobalThread/${el._id}`}><button>{el.theme}</button></Link>
    )
  })}
</div>
<h2>Your comments {comments && comments.length} times.</h2>

<h2>You voted {votedFor && votedFor.length} times.</h2>

<h2>You participate in {debates && debates.length} debates:</h2>
<div>
  { debates && debates.map((el) => {
    return (
      <Link to={`/Debate/${el._id}`}><button>{el.creator === user.id ? el.participant : el.creator}</button></Link>
    )
  })}
</div>

</div> 
</div>    
  )
}

export default Profile
