"use client";
import Link from "next/link";
import { Divider } from "primereact/divider";
import { routes } from "../utils/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
export default function Navbar(){
return (<nav className="h-[4rem] bg-wowPrimary w-full flex-wrap justify-between flex flex-row items-center px-5 fixed z-10 ">
    <div className="flex items-center flex-row gap-5">
    <Link href='/' className="relative">
        <span className="font-bold text-xl select-none text-white">WowShop</span>
    </Link>
    <Divider layout="vertical" />
    <ul className="list-none flex flex-row gap-4 text-white text-lg">
       {
             routes.map(e=>(<li key={e.key} className="text-white text-md font-bold">
                <Link  href={e.route}>{e.title}</Link>
            </li>))
        }
    </ul>
    </div>
    <div className="flex items-center justify-center mx-5">
        <Link href='/cart'>
        <div className="relative text-white">
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
            <div className="absolute bg-red-600 shadow-md -top-2 -right-3 flex justify-center items-center text-white text-[.6rem] rounded-full h-6 w-6">
                10
            </div>
        </div>
        </Link>
    </div>
</nav>)
}