import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../../features/users/userSlice";
import { usersAPI } from "../../features/users/usersAPI";
import { User, LogOut, Home, Info, Contact, UserPlus, LogIn, Grid, Menu, ChevronDown, Settings, HelpCircle } from 'lucide-react'; // Lucide icons

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const username = user.user?.full_name;
    const user_id = Number(user.user?.user_id);
    const userRole = user.user?.role;

    const { data: userData } = usersAPI.useGetUserByIdQuery(user_id);
    const profile_picture = userData?.profile_picture;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-menu') && !target.closest('.profile-button')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-[#006400]">
                    Wakili App
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Link to="/" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                        <Home className="w-4 h-4 mr-1" /> Home
                    </Link>
                    <Link to="/HowItWorks" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                        <Info className="w-4 h-4 mr-1" />HowItWorks
                    </Link>
                    <a href="#about" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                        <Info className="w-4 h-4 mr-1" /> About
                    </a>
                    {userRole !== 'disabled' && (
                        <Link to="/dashboard/profile" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                            <Grid className="w-4 h-4 mr-1" /> Dashboard
                        </Link>
                    )}
                    <Link to="/Contactus" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                        <Contact className="w-4 h-4 mr-1" /> Contact
                    </Link>
                    {!username ? (
                        <>
                            <Link to="/register" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                                <UserPlus className="w-4 h-4 mr-1" /> Register
                            </Link>
                            <Link to="/login" className="flex items-center font-bold text-[#006400] hover:text-green-700 transition">
                                <LogIn className="w-4 h-4 mr-1" /> Login
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="flex items-center profile-button"
                            >
                                <img 
                                    src={profile_picture || `https://ui-avatars.com/api/?name=${username}`} 
                                    alt="User Avatar" 
                                    className="w-8 h-8 rounded-full border-2 border-[#006400]"
                                />
                                <ChevronDown className="w-4 h-4 ml-1 text-[#006400]" />
                            </button>
                            {isDropdownOpen && (
                                <ul 
                                    className="absolute right-0 mt-2 w-48 bg-[#006400] text-white border border-[#006400] rounded-lg shadow-md dropdown-menu"
                                >
                                    <li className="p-2 hover:bg-green-700">
                                        <Link to="/dashboard/profile" className="flex items-center">
                                            <User className="w-4 h-4 mr-2" /> Profile
                                        </Link>
                                    </li>
                                    <li className="p-2 hover:bg-green-700">
                                        <Link to="/dashboard/settings" className="flex items-center">
                                            <Settings className="w-4 h-4 mr-2" /> Settings
                                        </Link>
                                    </li>
                                    <li className="p-2 hover:bg-green-700">
                                        <Link to="/help" className="flex items-center">
                                            <HelpCircle className="w-4 h-4 mr-2" /> Help
                                        </Link>
                                    </li>
                                    <li 
                                        className="p-2 hover:bg-red-600 cursor-pointer flex items-center" 
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button 
                    onClick={toggleMobileMenu} 
                    className="lg:hidden flex items-center space-x-2 hamburger-button"
                >
                    <Menu className="w-5 h-5 text-[#006400]" />
                    <span className="text-[#006400]">Menu</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
    <div 
    className="lg:hidden fixed top-14 right-0 w-34 bg-green-800 shadow-md z-40"
>
    <ul className="p-4 text-white">
        <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
            <Home className="w-4 h-4 mr-2" />
            <Link to="/" onClick={toggleMobileMenu} className="font-bold">
                Home
            </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
            <Info className="w-4 h-4 mr-2" />
            <a href="#about" onClick={toggleMobileMenu} className="font-bold">
                About
            </a>
        </li>
        <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
            <Info className="w-4 h-4 mr-2" />
            <Link to="/HowItWorks" onClick={toggleMobileMenu} className="font-bold">
            HowItWorks
            </Link>
        </li>
        {userRole !== 'disabled' && (
            <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
                <Grid className="w-4 h-4 mr-2" />
                <Link to="/dashboard/profile" onClick={toggleMobileMenu} className="font-bold">
                    Dashboard
                </Link>
            </li>
        )}
        <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
            <Contact className="w-4 h-4 mr-2" />
            <Link to="/Contactus" onClick={toggleMobileMenu} className="font-bold">
                Contact
            </Link>
        </li>
        
        {!username ? (
            <>
                <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    <Link to="/register" onClick={toggleMobileMenu} className="font-bold">
                        Register
                    </Link>
                </li>
                <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
                    <LogIn className="w-4 h-4 mr-2" />
                    <Link to="/login" onClick={toggleMobileMenu} className="font-bold">
                        Login
                    </Link>
                </li>
            </>
        ) : (
            <>
                <li className="flex items-center p-2 hover:bg-green-700 rounded-md">
                    <User className="w-4 h-4 mr-2" />
                    <Link to="/profile" onClick={toggleMobileMenu} className="font-bold">
                        Profile
                    </Link>
                </li>
                <li 
                    onClick={handleLogout} 
                    className="flex items-center p-2 hover:bg-green-700 rounded-md cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="font-bold">Logout</span>
                </li>
            </>
        )}
    </ul>
</div>
            )}
        </div>
    );
};

export default Navbar;
