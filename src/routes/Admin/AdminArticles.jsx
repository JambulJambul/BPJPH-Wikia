import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entries/`)
            setArticles(response?.data);
        };

        fetchArticles();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <>
            <div className='flex pt-24'>
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="max-w-[1440px] mx-auto py-16 px-24 flex-1">
                    <h2 className="text-2xl mb-8">Articles</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
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
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminArticles