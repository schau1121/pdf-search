import { React, useState, useEffect } from 'react'
import '../styles/fileUploadPage.css'
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config'
import pdfToText from '../pdfText';
import pdfToPng from '../pdfPng';
import { v4 as uuid } from 'uuid';

const storage = getStorage();
const filesCollectionRef = collection(db, "files");

export default function FileUploadPage() {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();

    const fileType = ["application/pdf"];

    let fileURL = "";
    let fileImgURL = "";

    const addFile = async (fileURL, fileText, fileName) => {
        const newFile = { name: fileName, pdfURL: fileURL, pdfText: fileText };
        await addDoc(filesCollectionRef, newFile);
        console.log("File added successfully");
    }

    const handleFileInput = (e) => {
        let currFile = e.target.files[0]
        if(currFile && fileType.includes(currFile.type)) {
            setFile(currFile);
            setFileError("");
            setFileName(currFile.name);
        }
        else {
            setFile(null);
            setFileError("Please select a valid pdf file");
            setFileName("");
        }
    }

    const handleUploadPDF = async () => {
        if(fileError !== "") {
            alert(fileError);
            return;
        }

        //get text & png from pdf
        const fileText = await pdfToText(file);
        //const filePng = await pdfToPng(file);
        

        const storageRef = ref(storage, `/pdfs/${uuid()}`);
        //const imgRef = ref(storage, `/imgs/${uuid()}`);
        //upload pdf and img 
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log("Uploaded file!");
        })

        /*
        await uploadBytes(imgRef, filePng).then((snapshot) => {
            console.log("Uploaded img!");
        })
        */
        
        //get download url
        await getDownloadURL(storageRef).then((url) => {
            //console.log(url);
            fileURL = url.toString();
        });

        /*
        await getDownloadURL(imgRef).then((url) => {
            //console.log(url);
            fileImgURL = url.toString();
        });
        */
        //push data into db
        addFile(fileURL, fileText, fileName);
        //at the end, return to home page
        navigate("/");
    }

    useEffect(() => {
        if(fileError !== "" && file != null) {
            alert(fileError);
        }
    }, [fileError])

    return (
        <div className="file-upload-page">
            <div className="sidebar">
                <h2>File Upload</h2>
                <button
                    onClick={() => navigate("/")}
                ><h2>Return home</h2></button>
            </div>
            <div className="file-upload-content">
                <h2>Upload a PDF below</h2>
                <input 
                    type="file" 
                    name="pdf-upload" 
                    onChange={(e) => handleFileInput(e)}
                />
                <button
                    className="upload-button"
                    onClick={handleUploadPDF}
                >Upload</button>
            </div>
        </div>
    );
}
