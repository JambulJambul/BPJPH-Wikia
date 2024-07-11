import SidebarItem from "./components/SidebarItem";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaScroll } from "react-icons/fa";

const Sidebar = () => {
    const sidebarItems = [
        { icon: FaHome, title: "Dashboard", urlTo: "/admin" },
        { icon: FaUser, title: "Users", urlTo: "/admin/users" },
        { icon: FaScroll, title: "Articles", urlTo: "/admin/articles" },
    ];

    return (
        <aside>
            <div className="fixed z-10 bottom-0 xl:h-screen xl:left-0 xl:top-0 w-full xl:w-64 xl:pt-16 bg-gradient-to-r xl:bg-gradient-to-b from-blue-900 xl:to-blue-300 to-blue-500 text-white overflow-hidden">
                <div className="flex justify-around xl:block xl:pt-10 xl:px-8">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} icon={item.icon} title={item.title} urlTo={item.urlTo} />
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
