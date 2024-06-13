import { Link } from "react-router-dom"

const SidebarItem = ({ icon: Icon, title, urlTo }) => {
    return (
        <div className="cursor-pointer hover:bg-black hover:bg-opacity-20 rounded-xl">
            <Link to={urlTo}>
                <h3 className="flex items-center gap-4 my-12 text-base p-3">
                    <Icon size={24} />
                    {title}
                </h3>
            </Link>
        </div>
    )
}

export default SidebarItem
