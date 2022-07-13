import React from 'react'
import Card from './Card'

export default function FilePage( { files }) {
    return (
        <div className="file-page">
            {files.map((file) => {
                return (
                    <Card key={file.id} file={file} />
                );
            })}
        </div>
    )
}
