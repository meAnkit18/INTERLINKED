import { Link } from "react-router-dom";

export default function PostCard({ prop }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <Link to={`/post/${prop._id}`}>
        <div className="w-full max-w-sm hover:-translate-y-0.5 transition duration-300 mb-6 sm:mb-10">
          <div className="w-full h-78 sm:h-64 md:h-80 overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl"
              src={prop.imageUrl}
              alt={prop.title}
            />
          </div>

          <h3 className="text-sm sm:text-base text-slate-900 font-medium mt-2">
            {prop.title}
          </h3>
          <h3 className="text-xs sm:text-sm md:text-base text-teal-500">
            {prop.category}
          </h3>

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
      </Link>
    </>
  );
}
