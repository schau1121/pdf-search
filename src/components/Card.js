import React from 'react'
import '../styles/card.css'

export default function Card({ file }) {
    console.log(file);
    return (
        <div className='card'>
            <a href={file.pdfURL} target='_blank'>
                <div className='card-img'>
                    Image goes here...
                </div>
                <h4>{file.name}</h4>
            </a>
        </div>
    )
}
