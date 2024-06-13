import SidebarItem from "./components/SidebarItem";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaScroll } from "react-icons/fa";

const Sidebar = () => {
    const sidebarItems = [
        { icon: FaHome, title: "Dashboard", urlTo: "/admin" },
        { icon: FaUser, title: "Users", urlTo: "/admin/users" },
        { icon: FaScroll, title: "Articles", urlTo: "/admin" },
    ];

    return (
        <aside>
            <div className="fixed z-10 h-screen left-0 top-0 w-64 pt-16 bg-gradient-to-b from-blue-900 to-blue-300 text-white overflow-hidden">
                <div className="pt-10 px-8">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} icon={item.icon} title={item.title} urlTo={item.urlTo} />
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
