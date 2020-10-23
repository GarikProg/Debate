import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './profile.scss'

function Profile() {
  const comment = () => {
    const colorArr = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
      "twentyone",
      "twentytwo",
      "twentythree",
    ];
    return colorArr[Math.floor(Math.random() * 23)];
  };

  const user = useSelector((state) => state.user);

  return (
    <>
    { user &&
    <div>
      <h1 className={comment()}>Hello {user.name}!</h1>
      <h2 className={comment()}>Your rating is: {user.rating}</h2>
      <br />
      <div>
        <div className={comment()}>
          <h1>You have already:</h1>
        </div>
        <h2 className={comment()}>
          created {user.threads && user.threads.length} threads!
        </h2>
        <div>
          {user.threads &&
            user.threads.map((el) => {
              return (
                <Link to={`/GlobalThread/${el._id}`}>
                  <button className="themeButton">{el.theme}</button>
                </Link>
              );
            })}
        </div>
        <h2 className={comment()}>liked {user.likes && user.likes.length} punches!</h2>
        <h2 className={comment()}>
          commented {user.comments && user.comments.length} times!
        </h2>
        <div>
          <h2 className={comment()}>
            participated in {user.debates && user.debates.length} debates!
          </h2>
          <div>
            {/* {user.debates &&
              user.debates.map((el) => {
                return (
                  <Link to={`/Debate/${el._id}`}>
                    <button>
                      {el.creator === user.id ? el.participant : el.creator}
                    </button>
                  </Link>
                );
              })} */}
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
}

export default Profile;
