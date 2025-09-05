export default function PostCard({prop}) {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
           
     

               <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300 mb-10">
                <div className="h-80 w-80 overflow-hidden">
                    <img
                    className="h-full w-full object-cover rounded-xl"
                    src={prop.imageUrl}
                    alt={prop.title}
                    />
                </div>
                <h3 className="text-base text-slate-900 font-medium ">{prop.title}</h3>
                <h3 className="text-blue-500 ">{prop.category}</h3>
                <div className="flex items-center gap-4 mt-3">
                <img src={prop.user.profilePicture} className="h-7" alt="" />
                <div>
                <h3 className="text-base text-slate-900 font-medium ">{prop.user.username}</h3>
                </div>
                </div>
               
                </div>

            
        
        </>
    );
};