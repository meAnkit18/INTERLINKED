import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PostCard({ prop }) {
  const [upvotes, setUpvotes] = useState(prop.upvotes?.length || 0);
  const [downvotes, setDownvotes] = useState(prop.downvotes?.length || 0);
    const backendURL = import.meta.env.VITE_BACKEND_PORT;

  const handleVote = async (type) => {
    try {
    const res = await axios.post(
  `${backendURL}/api/posts/${prop._id}/${type}`,
  {},
  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);
      setUpvotes(res.data.upvotes.length);
      setDownvotes(res.data.downvotes.length);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="w-full max-w-sm hover:-translate-y-0.5 transition duration-300 mb-6 sm:mb-10">
        <Link to={`/post/${prop._id}`}>
          <div className="w-full h-78 sm:h-64 md:h-80 overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl"
              src={prop.imageUrl}
              alt={prop.title}
            />
            
          </div>
          <div className="flex justify-between">
          <div className="flex gap-4 mt-3">
          <button onClick={() => handleVote("upvote")} className="text-green-600">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1Y8Vjnx7XQlIfqXS7agDinx34EnBqlAz0WrBuEGm8EZWRaFeymQtSDrJRVubZruaPqqxAaMxy2TyB7PydOOHoQj-jUzppN16JE2JEyniTYCm_dp5ETh_WGYUespojefdVlQlOpR8HyuaNgJS_Hl42VvZwMX5cvucgDUEmOTwB78JM45JRDJs-Xf4Co90/s512/arrow.png" alt=""
            className="h-5"
            />
            {upvotes}
          </button>
          <button onClick={() => handleVote("downvote")} className="text-red-600">
             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1Y8Vjnx7XQlIfqXS7agDinx34EnBqlAz0WrBuEGm8EZWRaFeymQtSDrJRVubZruaPqqxAaMxy2TyB7PydOOHoQj-jUzppN16JE2JEyniTYCm_dp5ETh_WGYUespojefdVlQlOpR8HyuaNgJS_Hl42VvZwMX5cvucgDUEmOTwB78JM45JRDJs-Xf4Co90/s512/arrow.png" alt=""
            className="h-5 rotate-180"
            />
            {downvotes}
          </button>
        </div>
         <div className="flex items-center gap-3 mt-3">
            <img
              src={prop.user.profilePicture}
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"
              alt={prop.user.username}
            />
            <h3 className="text-sm sm:text-base text-slate-900 font-medium">
              {prop.user.username}
            </h3>
        
          </div>
          </div>

          <h3 className="text-sm sm:text-base text-slate-900 font-medium mt-2">
            {prop.title}
          </h3>
          <h3 className="text-xs sm:text-sm md:text-base text-blue-500">
            {prop.category}
          </h3>

         
        </Link>

        {/* Voting Buttons */}
      </div>
    </>
  );
}
