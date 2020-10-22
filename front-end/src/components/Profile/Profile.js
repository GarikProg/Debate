import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { checkRegister } from '../../redux/actions';

function Profile() {
  const dispatch = useDispatch();
  const comment = () => {
    const colorArr = ['one', 'two', 'three','four','five','six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen', 'fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree']
      return colorArr[(Math.floor(Math.random() * 23))];
    }
//   useEffect(() => 
// dispatch(checkRegister())
//   , [dispatch])


 const user = useSelector(state => state.user);
const {name, id, comments, threads, debates, votedFor, likes, rating} = user;
  return (
    <div>
<h1  className={comment()}>Hello {name}!</h1>
  <h2 className={comment()}>Your rating is: {rating}</h2>
<br/>
<div>
<div className={comment()}><h1>You have already:</h1></div>
  <h2 className={comment()}>created { threads && threads.length} threads!</h2>
<div>
  { threads && threads.map((el) => {
    return (
      <Link to={`/GlobalThread/${el._id}`}><button className="themeButton">{el.theme}</button></Link>
    )
  })}
</div>
<h2 className={comment()}>liked { likes && likes.length} punches!</h2>
<h2 className={comment()}>commented {comments && comments.length} times!</h2>

{/* <h2 className={comment()}>voted {votedFor && votedFor.length} times!</h2> */}

  <div><h2 className={comment()}>participated in {debates && debates.length} debates!</h2>
    <div >
      { debates && debates.map((el) => {
        return (
          <Link to={`/Debate/${el._id}`}><button>{el.creator === user.id ? el.participant : el.creator}</button></Link>
        )
      })}
    </div>
  </div>
</div> 
</div>    
  )
}

export default Profile
