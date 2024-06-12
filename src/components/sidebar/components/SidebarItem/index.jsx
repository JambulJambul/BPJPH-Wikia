const SidebarItem = ({ icon: Icon, title }) => {
    return (
        <>
            <h3 className="flex items-center gap-4 my-12 text-base">
                <Icon size={24} />
                {title}
            </h3>
        </>
    )
}

export default SidebarItem
