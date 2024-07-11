import { Link } from "react-router-dom"

const SidebarItem = ({ icon: Icon, title, urlTo }) => {
    return (
        <div className="cursor-pointer my-4 xl:my-0 hover:bg-black hover:bg-opacity-20 rounded-xl">
            <Link to={urlTo}>
                <h3 className="flex items-center gap-4 xl:my-12 text-base p-3">
                    <Icon size={24} />
                    <div className="hidden xl:block">
                        {title}
                    </div>
                </h3>
            </Link>
        </div>
    )
}

export default SidebarItem
