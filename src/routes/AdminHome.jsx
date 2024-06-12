import { Sidebar } from "../components"
import HelloImage from "../../public/undraw_hello.svg"

const AdminHome = () => {
    return (
        <>
            <div className="flex pt-24">
                <div className="w-48">
                    <Sidebar />
                </div>
                <div className="max-w-[1440px] mx-auto py-16 px-24 flex-1">
                    <div className="w-full rounded-lg px-10 py-6 shadow-xl flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl pb-4">
                                Hi Admin,
                            </h1>
                            <h1 className="text-md text-gray-600">
                                Welcome to Kamus Halal admin dashboard
                            </h1>
                        </div>
                        <img className="h-64" src={HelloImage} alt="" />
                    </div>
                    <div className="py-12">
                        <section>
                            <h2 className="text-xl mb-4">Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">Users</h3>
                                    <p className="text-gray-700">Total: 4</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">Articles</h3>
                                    <p className="text-gray-700">Total: 4</p>
                                    <p className="text-red-600">To Review: 3</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">Notifications</h3>
                                    <ul className="text-gray-700 list-disc list-inside">
                                        <li>No new notifications</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome