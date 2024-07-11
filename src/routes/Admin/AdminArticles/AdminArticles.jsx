import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { Sidebar } from '../../../components';
import ReviewModal from './components/ReviewModal';

const AdminArticles = () => {
    const [publishedArticles, setPublishedArticles] = useState([]);
    const [toBeReviewedArticles, setToBeReviewedArticles] = useState([]);
    const [pendingArticles, setPendingArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [activeTab, setActiveTab] = useState('published');
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [articleActionType, setArticleActionType] = useState(null);

    const articlesPerPage = 6;

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entries/`)
            const allArticles = response?.data;
            const pending = allArticles.filter(article => article.status === '2');
            const published = allArticles.filter(article => article.status === '1');
            const toBeReviewed = allArticles.filter(article => article.status === '0');
            setPendingArticles(pending);
            setPublishedArticles(published);
            setToBeReviewedArticles(toBeReviewed);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    let currentArticles = [];
    if (activeTab === 'published') {
        currentArticles = publishedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    } else if (activeTab === 'toBeReviewed') {
        currentArticles = toBeReviewedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    } else if (activeTab === 'pending') {
        currentArticles = pendingArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    }

    const totalPages = Math.ceil((activeTab === 'published' ? publishedArticles.length : activeTab === 'toBeReviewed' ? toBeReviewedArticles.length : pendingArticles.length) / articlesPerPage);


    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        const element = document.getElementById("selected");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (selectedArticle) {
            const element = document.getElementById("selected");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [selectedArticle]);

    const changeTab = (tab) => {
        setSelectedArticle(null)
        setActiveTab(tab);
        setCurrentPage(1);
    }

    const openReviewModal = (actionType) => {
        setArticleActionType(actionType)
        setReviewModalOpen(true)
    }

    const closeReviewModal = (updated) => {
        if (updated === true) {
            setSelectedArticle(null)
            fetchArticles()
        }
        setArticleActionType(null)
        setReviewModalOpen(false)
    }

    return (
        <>
            <div className='xl:flex pt-10 sm:pt-12 md:pt-14'>
                <div className="xl:w-64">
                    <Sidebar />
                </div>
                <div className="mx-auto py-16 px-12 xl:px-24 xl:flex-1">
                    <h2 className="text-2xl mb-8">Articles</h2>
                    <div className="flex justify-between my-5 items-stretch xl:items-center">
                        <button
                            onClick={() => changeTab('published')}
                            className={`${activeTab === 'published' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-slate-800'
                                } rounded-l transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                        >
                            Published Articles
                        </button>
                        <button
                            onClick={() => changeTab('toBeReviewed')}
                            className={`${activeTab === 'toBeReviewed' ? 'bg-blue-400 text-white' : 'bg-blue-300 text-slate-800'
                                } border-x-2 border-white transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                        >
                            To be reviewed
                        </button>
                        <button
                            onClick={() => changeTab('pending')}
                            className={`${activeTab === 'pending' ? 'bg-blue-400 text-white' : 'bg-blue-300 text-slate-800'
                                } rounded-r transition duration-150 ease-in font-medium text-sm text-center w-full py-3`}
                        >
                            Pending
                        </button>
                    </div>
                    <div className='sm:flex'>
                        <div className='sm:flex-initial sm:pr-10'>
                            <div className='sm:mb-10'>
                                <div className="flex justify-between my-4 items-center gap-2">
                                    <FaArrowLeft
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        className="cursor-pointer"
                                        disabled={currentPage === 1} />
                                    <span>{currentPage} of {totalPages}</span>
                                    <FaArrowRight
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        className="cursor-pointer"
                                        disabled={currentPage === totalPages}
                                    />
                                </div>
                                {currentArticles?.map(article => (
                                    <div key={article?.id} className="border-t py-4 sm:w-40 xl:w-64 cursor-pointer" onClick={() => handleArticleClick(article)}>
                                        <h3 className='py-1 text-sm md:text-md xl:text-base font-bold'>
                                            {article?.title}
                                        </h3>
                                        <p className='text-sm md:text-md xl:text-base'>
                                            {article?.content}
                                        </p>
                                        <p className='text-sm md:text-md xl:text-base'>
                                            {article?.user_id}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='sm:flex-auto h-[75vh] pt-12 sm:p-4'>
                            {selectedArticle ? (
                                <div id='selected' className='pb-24 sm:pb-0'>
                                    <h2 className="text-base md:text-xl xl:text-2xl font-bold mb-4 break-words">{selectedArticle?.title}</h2>
                                    {selectedArticle?.img ?
                                        (
                                            <>
                                                <img loading='lazy' src={selectedArticle?.img} alt={selectedArticle?.title} className="h-64 my-2 object-contain border-solid border border-slate-400" />
                                            </>
                                        ) : (<>
                                            <div className='inline-block p-32 border-solid border border-slate-400 my-2'>
                                                <p>No image provided...</p>
                                            </div>
                                        </>)}
                                    <p className='break-words text-sm md:text-md xl:text-base'>{selectedArticle?.content}</p>
                                    <p className="my-4 break-words text-sm md:text-md xl:text-base">Article ID: {selectedArticle?.id}</p>
                                    <p className="my-4 break-words text-sm md:text-md xl:text-base">References: <Link to={selectedArticle?.references}> {selectedArticle?.references} </Link></p>
                                    <div className='my-4'>
                                        {
                                            activeTab === 'published' ? (
                                                <>
                                                    <button onClick={() => openReviewModal('reject')} className='px-4 py-2 rounded-xl text-sm md:text-md xl:text-base bg-red-500 text-white'>
                                                        Ask for review
                                                    </button>
                                                </>
                                            ) : activeTab === 'toBeReviewed' ? (
                                                <>
                                                    <div className='flex gap-8'>
                                                        <button onClick={() => openReviewModal('reject')} className='px-4 py-2 rounded-xl text-sm md:text-md xl:text-base bg-red-500 text-white'>
                                                            Reject
                                                        </button>
                                                        <button onClick={() => openReviewModal('accept')} className='px-4 py-2 rounded-xl text-sm md:text-md xl:text-base bg-green-500 text-white'>
                                                            Accept
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col justify-center h-full'>
                                    <div>
                                        <p className="text-center text-gray-600">Click on an article to view its content.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ReviewModal isOpen={reviewModalOpen} onClose={closeReviewModal} id={selectedArticle?.id} actionType={articleActionType} />
        </>
    )
}

export default AdminArticles