import { DevicePhoneMobileIcon, SunIcon, } from "@heroicons/react/24/solid";
import { SearchCode } from 'lucide-react';

import benefitOneImg from "../assets/benefit-one.png";
import benefitTwoImg from "../assets/benefit-two.png";
import { BookOpenIcon, FolderOpenIcon } from "lucide-react";

const benefitOne = {
    title: "Discover the Power of Digital Reading",
    desc: "Our platform offers a seamless and enjoyable experience for reading PDFs. Explore our features designed to enhance your reading experience, all in one place.",
    image: benefitOneImg,
    bullets: [
        {
            title: "Seamless Access to Documents",
            desc: "Easily access a wide range of PDFs from various categories with just a few clicks.",
            icon: <SearchCode />,
        },
        {
            title: "Enhanced Reading Experience",
            desc: "Enjoy a user-friendly interface with features like zoom, search, and bookmarks to enhance your reading experience.",
            icon: <BookOpenIcon />,
        },
        {
            title: "Stay Organized",
            desc: "Organize your documents in personalized folders, making it easier to find and manage your reading materials.",
            icon: <FolderOpenIcon />,
        },
    ],
}

const benefitTwo = {
    title: "Enhance Your Digital Library Experience",
    desc: "Explore additional features that make our platform unique and user-friendly. Enjoy a personalized and efficient reading experience with these advanced functionalities.",
    image: benefitTwoImg,
    bullets: [
        {
            title: "Mobile-Friendly Design",
            desc: "Access and read your PDFs on any device with our responsive design.",
            icon: <DevicePhoneMobileIcon />,
        },
        {
            title: "Advanced Search and Filter",
            desc: "Quickly find the documents you need with our powerful search and filter tools.",
            icon: <SearchCode />,
        },
        {
            title: "Personalized Reading Settings",
            desc: "Switch between dark and light modes for a comfortable reading experience anytime.",
            icon: <SunIcon />,
        },
    ],
};


export { benefitOne, benefitTwo };