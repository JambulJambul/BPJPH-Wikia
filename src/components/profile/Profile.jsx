/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import articles from '../../data/articles.json'
import { Link } from 'react-router-dom'

const Profile = ({ profile }) => {

  const { admin, bio, social, img } = profile

  const [activeTab, setActiveTab] = useState('create')

  return (
    <>
        <div className="container mx-auto my-60">
            <div>
                <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                    <div className="flex justify-center">
                            <img src={img} alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                    </div>
                    <div className="mt-16">
                        <h1 className="font-bold text-center text-3xl text-gray-900">
                            Welcome, {admin}
                        </h1>
                        <div className="my-7 px-6">
                            <h2  className="text-gray-200 block rounded-lg sm:text-2xl text-center font-medium leading-6 px-6 py-4 bg-gray-900 hover:bg-black hover:text-white">
                                {bio}
                            </h2>
                        </div>
                        <div className="flex justify-between items-center my-5 px-6">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`${
                                activeTab === 'create' ? 'bg-gray-100' : 'bg-transparent'
                                } text-gray-500 hover:text-gray-900 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                            >
                                CREATE
                            </button>
                            <button
                                onClick={() => setActiveTab('edit')}
                                className={`${
                                activeTab === 'edit' ? 'bg-gray-100' : 'bg-transparent'
                                } text-gray-500 hover:text-gray-900 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                            >
                                EDIT
                            </button>
                            <button
                                onClick={() => setActiveTab('logout')}
                                className={`${
                                activeTab === 'logout' ? 'bg-gray-100' : 'bg-transparent'
                                } text-gray-500 hover:text-gray-900 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                            >
                                LOGOUT
                            </button>
                        </div>
                        {activeTab === 'create' && (
                            <>
                                <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                                    <h1 className="text-3xl text-gray-700 text-center my-6">
                                        Create a post
                                    </h1>
                                    <form>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                        />
                                        <input
                                            type="text"
                                            name="content"
                                            placeholder="Content"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                        />
                                        <input
                                            type="text"
                                            name="reference"
                                            placeholder="Reference"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                        />
                                        <input
                                            type="text"
                                            name="img"
                                            placeholder="Image URL"
                                            className="w-full px-4 py-2 border rounded-md mb-8"
                                        />
                                        <div className="flex flex-row justify-center items-center">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white mt-4 px-6 py-2 rounded-md"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                        {activeTab === 'edit' && (
                            <>
                                <h1 className="text-3xl text-gray-700 text-center my-6">
                                    Manage your posts
                                </h1>
                                {articles.map((article) => (
                                    <div className="w-full" key={article.id}>
                                        <div className="flex flex-row w-full mt-5 pr-6 justify-between items-center overflow-hidden">
                                            <Link
                                                to={`/article/${article.id}`} // Replace :id with the actual article ID
                                                className="w-full border-t border-gray-100 text-left text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                                            >
                                                <img
                                                    src={article.img} // Use article.img to get the image URL
                                                    alt={`References ${article.reference}`}
                                                    className="rounded-full h-6 shadow-md inline-block mr-4"
                                                />
                                                {article.title} {/* Use article.title to get the title */}
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white mt-4 px-6 py-2 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {activeTab === 'logout' && (
                            <>
                                <div className="my-4 p-4 border border-gray-300 rounded-md bg-white">
                                    <h1 className="text-3xl text-gray-700 text-center my-6">
                                        Logout?
                                    </h1>
                                </div>
                                <div className="flex flex-row justify-center items-center space-x-6">
                                    <Link to="/login">
                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-orange-700 text-white mt-4 px-6 py-2 rounded-md"
                                        >
                                            Yes
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-300 text-white mt-4 px-6 py-2 rounded-md"
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="h-[50px]"></div>
                        <div className="w-full">
                            <h1 className="font-medium text-gray-900 text-center text-2xl px-6">
                                Connect with me
                            </h1>
                            <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                <Link to={social} className="w-full border-t border-gray-100  text-center text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                                    <img src={img} alt={admin} className="rounded-full h-6 shadow-md inline-block mr-4" />
                                        {social}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile