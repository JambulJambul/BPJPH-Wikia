import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlePerPage = 10;

    return (
        <>
            <div className='flex pt-24'>
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="max-w-[1440px] mx-auto py-16 px-24 flex-1">
                    <h2 className="text-2xl mb-8">Articles</h2>
                </div>
            </div>
        </>
    )
}

export default AdminArticles