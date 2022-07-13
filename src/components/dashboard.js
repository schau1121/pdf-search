import { React, useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import FilePage from './FilePage'
import '../styles/dashboard.css'
import { async } from '@firebase/util'
import { db } from '../config/firebase-config'

const filesRef = collection(db, "files");

export default function Dashboard() {
    const [files, setFiles] = useState([]);
    const [relevantFiles, setRelevantFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const findFiles = (searchQuery) => {
        let result = files.filter((file) => {
            if(searchQuery === "") {
                return file;
            }
            else if (file.pdfText.toLowerCase().includes(searchQuery.toLowerCase())) {
                return file;
            }
        });
        setRelevantFiles(result);
    }

    const loadAllFiles = async () => {
        const data = await getDocs(filesRef);
        setFiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setRelevantFiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    //when searchQuery changes, update files
    useEffect(() => {
        findFiles(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        loadAllFiles();
    }, []);

    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <h2>PDF Searcher</h2>
                <input 
                    type="text"
                    className='search'
                    placeholder='Search for keywords...'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className='dashboard-content'>
                <FilePage files={relevantFiles}/>
            </div>
        </div>
    )
}
