/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Profile = ({ profile }) => {
  
  const { admin, bio, social, img } = profile;

  const [activeTab, setActiveTab] = useState('create');

  const [articles, setArticles] = useState([]);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(4);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/entries/');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const toggleShowMore = () => {
    setShowAllArticles(!showAllArticles);

    if (showAllArticles) {
      setDisplayedArticlesCount(4);
    } else {
      setDisplayedArticlesCount(articles.length);
    }
  };

  return (
    <>
        <div className="container mx-auto my-32">
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
                            <h2  className="text-gray-200 block rounded-lg sm:text-xl text-center font-medium leading-6 px-6 py-4 bg-gray-900 hover:bg-black hover:text-white">
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
                                    <h1 className="text-xl text-gray-700 text-center my-6">
                                        Create a post
                                    </h1>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            createArticle(formData)
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                            value={formData.title}
                                            onChange={(e) =>
                                              setFormData({ ...formData, title: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            name="content"
                                            placeholder="Content"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                            value={formData.content}
                                            onChange={(e) =>
                                              setFormData({ ...formData, content: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            name="reference"
                                            placeholder="Reference"
                                            className="w-full px-4 py-2 border rounded-md mb-4"
                                            value={formData.references}
                                            onChange={(e) =>
                                              setFormData({ ...formData, references: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            name="img"
                                            placeholder="Image URL"
                                            className="w-full px-4 py-2 border rounded-md mb-8"
                                            value={formData.img}
                                            onChange={(e) =>
                                              setFormData({ ...formData, img: e.target.value })
                                            }
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
                                <h1 className="text-xl text-gray-700 text-center my-6">
                                    Manage your posts
                                </h1>
                                {articles.slice(0, displayedArticlesCount).map((article) => (
                                    <div className="w-full" key={article.id}>
                                        <div className="flex flex-row w-full mt-5 pr-6 justify-between items-center overflow-hidden">
                                            <Link
                                                to={`/article/${article.id}`}
                                                className="w-full border-t border-gray-100 text-left text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                                            >
                                                <img
                                                    src={article.img}
                                                    alt={`References ${article.references}`}
                                                    className="rounded-full h-6 shadow-md inline-block mr-4"
                                                />
                                                <span className="font-bold text-lg">
                                                  {article.title}
                                                </span>
                                                <div className="flex flex-col mt-4">
                                                  <span className="text-gray-500 text-xs">
                                                    {article.content.substring(0, 50)} . . .
                                                  </span>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => editArticle(article)}
                                                className="text-blue-500 hover:text-blue-700 mt-4 px-6 py-2 rounded-md z-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteArticle(article.id)}
                                                className="text-red-500 hover:text-red-700 mt-4 px-6 py-2 rounded-md z-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="flex w-full justify-center items-center">
                                    <button
                                        onClick={toggleShowMore}
                                        className="bg-none hover:bg-blue-700 text-gray-400 hover:text-white mt-4 px-6 py-2 rounded-md border border-gray-600 transition-colors duration-300 ease-in-out"
                                    >
                                        {showAllArticles ? 'Show Less' : 'See More'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 inline ml-1 transform ${
                                                showAllArticles ? '-rotate-180' : 'rotate-0'
                                            } transition-transform duration-300 ease-in-out`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6.293 6.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {/* Render the edit form when editMode is true */}
                                {editMode && editedArticle && (
                                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                                    <h1 className="text-xl text-gray-700 text-center my-6">
                                      Edit Article
                                    </h1>
                                    <form onSubmit={updateArticle}>
                                      <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        className="w-full px-4 py-2 border rounded-md mb-4"
                                        value={editedArticle.title}
                                        onChange={(e) =>
                                          setEditedArticle({
                                            ...editedArticle,
                                            title: e.target.value,
                                          })
                                        }
                                      />
                                      <input
                                        type="text"
                                        name="content"
                                        placeholder="Content"
                                        className="w-full px-4 py-2 border rounded-md mb-4"
                                        value={editedArticle.content}
                                        onChange={(e) =>
                                          setEditedArticle({
                                            ...editedArticle,
                                            content: e.target.value,
                                          })
                                        }
                                      />
                                      <input
                                        type="text"
                                        name="reference"
                                        placeholder="Reference"
                                        className="w-full px-4 py-2 border rounded-md mb-4"
                                        value={editedArticle.references}
                                        onChange={(e) =>
                                          setEditedArticle({
                                            ...editedArticle,
                                            references: e.target.value,
                                          })
                                        }
                                      />
                                      <input
                                        type="text"
                                        name="img"
                                        placeholder="Image URL"
                                        className="w-full px-4 py-2 border rounded-md mb-8"
                                        value={editedArticle.img}
                                        onChange={(e) =>
                                          setEditedArticle({
                                            ...editedArticle,
                                            img: e.target.value,
                                          })
                                        }
                                      />
                                      <div className="flex flex-row justify-center items-center space-x-7">
                                        <button
                                          type="submit"
                                          className="bg-blue-500 hover:bg-blue-700 text-white mt-4 px-6 py-2 rounded-md"
                                        >
                                          Update
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-red-600 hover:bg-red-700 text-white mt-4 px-6 py-2 rounded-md"
                                          onClick={() => {
                                            setEditMode(false);
                                            setEditedArticle(null);
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                )}
                            </>
                        )}
                        {activeTab === 'logout' && (
                            <>
                                <div className="my-4 p-4 border border-gray-300 rounded-md bg-white">
                                    <h1 className="text-xl text-gray-700 text-center my-6">
                                        Logout?
                                    </h1>
                                </div>
                                <div className="flex flex-row justify-center items-center space-x-6">
                                    <Link to="/">
                                        <button
                                            onClick={handleLogout}
                                            type="submit"
                                            className="bg-red-600 hover:bg-orange-700 text-white mt-4 px-6 py-2 rounded-md"
                                        >
                                            Yes
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        onClick={logoutMSG}
                                        className="text-gray-600 hover:text-gray-900 hover:underline mt-4 px-6 py-2 block text-center transition-colors duration-300 ease-in-out"
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
