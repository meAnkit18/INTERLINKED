export default function Footer() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col mt-10 md:flex-row gap-3 items-center justify-around w-full py-4 text-sm bg-slate-800 text-white/70">
                <p>Copyright © 2025 INTERLINKED. All rights reservered.</p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-white transition-all">
                        Contact Us
                    </a>
                    <div className="h-8 w-px bg-white/20"></div>
                    <a href="#" className="hover:text-white transition-all">
                        Privacy Policy
                    </a>
                    <div className="h-8 w-px bg-white/20"></div>
                    <a href="#" className="hover:text-white transition-all">
                        Trademark Policy
                    </a>
                </div>
            </footer>
        </>
    );
};