import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../../components';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const articlesPerPage = 6;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/entries/`)
                setArticles(response?.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchArticles();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    return (
        <>
            <div className='flex pt-16'>
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="mx-auto py-16 px-24 flex-1 ">
                    <h2 className="text-2xl mb-8">Articles</h2>
                    <div className='flex'>
                        <div className='flex-initial pr-10'>
                            <div>
                                {currentArticles?.map(article => (
                                    <div key={article?.id} className="border-t py-4 w-64 cursor-pointer" onClick={() => handleArticleClick(article)}>
                                        <h3 className='py-1 font-bold'>
                                            {article?.title}
                                        </h3>
                                        <p>
                                            {article?.content}
                                        </p>
                                        <p>
                                            {article?.user_id}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex justify-between mt-4 items-center gap-2">
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
                            </div>
                        </div>
                        <div className='flex-auto h-[75vh] p-4'>
                            {selectedArticle ? (
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedArticle?.title}</h2>
                                    {selectedArticle?.img ?
                                        (
                                            <>
                                                <img src={selectedArticle?.img} alt={selectedArticle?.title} className="h-64" />

                                            </>
                                        ) : (<>
                                            <div className='inline-block p-32 border-solid border border-slate-400'>
                                                <p>No image provided...</p>
                                            </div>
                                        </>)}
                                    <p>{selectedArticle?.content}</p>
                                    <p className="mt-4">Article ID: {selectedArticle?.id}</p>
                                    <p className="mt-4">References: {selectedArticle?.references}</p>
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
        </>
    )
}

export default AdminArticles

{/* <div className="bg-white p-6 rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">Creator ID</th>
                                    <th className="py-2 px-4">Title</th>
                                    <th className="py-2 px-4">Content</th>
                                    <th className="py-2 px-4">References</th>
                                    <th className="py-2 px-4">Image URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentArticles.map(article => (
                                    <tr key={article.id} className="border-t">
                                        <td className="text-center py-2 px-4">{article.id}</td>
                                        <td className="text-center py-2 px-4">{article.user_id}</td>
                                        <td className="text-center py-2 px-4">{article.title}</td>
                                        <td className="text-center py-2 px-4">{article.content}</td>
                                        <td className="text-center py-2 px-4">{article.references}</td>
                                        <td className="text-center py-2 px-4">{article.img}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div> */}