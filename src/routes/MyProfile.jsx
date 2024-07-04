import React, { useEffect, useState } from 'react'
import useAuth from './utils/useAuth';
import SuccessModal from '../components/successModal';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [modalActionType, setModalActionType] = useState(null);
  const [articles, setArticles] = useState([]);

  const [showAllArticles, setShowAllArticles] = useState(false);
  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(4);

  const [error, setError] = useState(null);
  const [articleIdDelete, setArticleIdDelete] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    references: '',
    img: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [editedArticle, setEditedArticle] = useState(null);

  const token = localStorage.getItem('token');
  const AuthStr = 'Bearer '.concat(token);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '.concat(token);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/entries/entry/personal`, { headers: { Authorization: AuthStr } });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const createArticle = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/entries/`, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: AuthStr } });
      setModalActionType('create')
      setSuccessModalOpen(true)
      setFormData({
        title: '',
        content: '',
        references: '',
        img: null,
      });
      setError(null)
      fetchArticles();
    } catch (error) {
      setError(error.response?.data?.message || 'File upload failed. Please try again.');
    }
  };

  const editArticle = (article) => {
    setImagePreview(null)
    setEditMode(true);
    setEditedArticle(article);
  };

  const updateArticle = async () => {
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '.concat(token);
    try {
      let toUpload
      let headers = {
        Authorization: AuthStr
      };
      if (editedArticle.img instanceof File) {
        toUpload = editedArticle
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        const { img, ...articleWithoutImg } = editedArticle;
        toUpload = articleWithoutImg;
      }
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/entries/${editedArticle.id}`,
        editedArticle, { headers }
      );
      if (response) {
        setModalActionType('edit')
        setSuccessModalOpen(true)
        setEditMode(false);
        setEditedArticle(null);
        setError(null)
        fetchArticles()
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Update article failed. Please try again.');
    }
  };

  const deleteArticle = async (articleId) => {
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '.concat(token);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/entries/${articleId}`, { headers: { Authorization: AuthStr } });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const openDeleteModal = (articleId) => {
    setArticleIdDelete(articleId)
    setModalActionType('delete')
    setSuccessModalOpen(true)
  }

  const toggleShowMore = () => {
    setShowAllArticles(!showAllArticles);
    if (showAllArticles) {
      setDisplayedArticlesCount(4);
    } else {
      setDisplayedArticlesCount(articles.length);
    }
  };

  const openCreateTab = () => {
    setActiveTab('create')
    setImagePreview(null)
    setEditedArticle(null)
  }

  const openEditTab = () => {
    setFormData({
      title: '',
      content: '',
      references: '',
      img: '',
    });
    setActiveTab('edit')
    setError(null)
  }

  const closeSuccessModal = (isDelete) => {
    if(isDelete)
      {
        deleteArticle(articleIdDelete)
      }
    setModalActionType(null)
    setArticleIdDelete(null)
    setSuccessModalOpen(false)
  }

  const handleFileChange = (e, actionType) => {
    const file = e.target.files[0];
    if (actionType == "edit") {
      setEditedArticle({ ...editedArticle, img: file });
    } else if (actionType == "create") {
      setFormData({ ...formData, img: file });
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="container mx-auto pt-48 pb-32">
        <div>
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center">
              <FaUserCircle size={128} className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>
            <div className="mt-16">
              <h1 className="font-bold text-center text-3xl text-gray-900">
                Welcome, {userData?.username}
              </h1>
              <div className="flex justify-between items-center my-5 px-6">
                <button
                  onClick={openCreateTab}
                  className={`${activeTab === 'create' ? 'bg-gray-100' : 'bg-transparent'
                    } text-gray-500 hover:text-gray-900 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                >
                  CREATE
                </button>
                <button
                  onClick={openEditTab}
                  className={`${activeTab === 'edit' ? 'bg-gray-100' : 'bg-transparent'
                    } text-gray-500 hover:text-gray-900 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                >
                  EDIT
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
                        name="references"
                        placeholder="Reference"
                        className="w-full px-4 py-2 border rounded-md mb-4"
                        value={formData.references}
                        onChange={(e) =>
                          setFormData({ ...formData, references: e.target.value })
                        }
                      />
                      <div className='flex justify-center'>
                        {imagePreview && <img src={imagePreview} alt="" />}
                      </div>
                      <input
                        type="file"
                        name="img"
                        className="w-full px-4 py-2 border rounded-md mb-8"
                        onChange={(e) => handleFileChange(e, "create")}
                      />
                      {error && (
                        <p className="text-red-500 text-sm">
                          {error}
                        </p>
                      )}
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
                          className="text-blue-500 hover:text-blue-700 mt-4 px-6 py-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(article.id)}
                          className="text-red-500 hover:text-red-700 mt-4 px-6 py-2"
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
                        className={`h-5 w-5 inline ml-1 transform ${showAllArticles ? '-rotate-180' : 'rotate-0'
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
                  {editMode && editedArticle && (
                    <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                      <h1 className="text-xl text-gray-700 text-center my-6">
                        Edit Article
                      </h1>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        updateArticle()
                      }}>
                        <div className='flex flex-col items-center justify-center py-4'>
                          {imagePreview && <img src={imagePreview} alt="" />}
                          <img src={editedArticle.img} alt="" />
                          <div className='px-4 py-2 mt-4 mb-8 relative'>
                            <input
                              type="file"
                              name="img"
                              className="absolute inset-0 opacity-0"
                              onChange={(e) => handleFileChange(e, "edit")}
                            />
                            <label
                              htmlFor="img"
                              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                            >
                              Change Image
                            </label>
                          </div>
                        </div>
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
                          name="references"
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
                        {error && (
                          <p className="text-red-500 text-sm">
                            {error}
                          </p>
                        )}
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
                              setError(null)
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
            </div>
          </div>
        </div>
      </div>
      <SuccessModal isOpen={successModalOpen} onClose={closeSuccessModal} eventType={modalActionType} />
    </>
  )
}

export default MyProfile