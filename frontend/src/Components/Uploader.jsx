import React, { useState } from 'react';
import '../styles/Uploader.css';
import { MdCloudUpload } from 'react-icons/md';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Uploader({ setApiData, clearApiData }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No selected file');
    const [fileType, setFileType] = useState('');

    const handleFileChange = ({ target: { files } }) => {
        if (files[0]) {
            setFileName(files[0].name);
            setFileType(files[0].type);
            setFile(files[0]);
        }
    };

    const handleExtract = async () => {
        if (!file) {
            alert('Please upload a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://digitiser.up.railway.app/birth_cert', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to extract file');
            }

            const data = await response.json();
            setApiData(data); // Pass API response to parent
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error uploading the file');
        }
    };

    return (
        <div>
            <form className='dashboard-form' onClick={() => document.querySelector('.input-field').click()}>
                <input
                    type='file'
                    accept='image/*, application/pdf'
                    className='input-field'
                    hidden
                    onChange={handleFileChange}
                />

                {file ? (
                    fileType.startsWith('image/') ? (
                        <img 
                            src={URL.createObjectURL(file)} 
                            alt={fileName} 
                            style={{ 
                                width: '420px', 
                                height: '600px', 
                                objectFit: 'contain',
                                display: 'block', 
                                margin: 'auto',
                                border: '1px solid #ccc', 
                                overflow: 'hidden'
                            }}
                        />
                    ) : fileType === 'application/pdf' ? (
                        <div 
                            style={{ 
                                width: '450px', 
                                height: '600px', 
                                overflow: 'hidden', 
                                display: 'block', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                objectFit: 'contain',
                                margin: 'auto',
                            }}
                        >
                            <Worker>
                                <Viewer fileUrl={URL.createObjectURL(file)} />
                            </Worker>
                        </div>
                    ) : null
                ) : (
                    <div 
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        <MdCloudUpload color='rgb(26, 155, 214)' size={60} />
                        <p style={{ marginTop: '8px' }}>Browse file to upload</p> 
                    </div>
                )}
            </form>
            <div className='uploader-control'>
                <button 
                    className='uploader-delete'
                    onClick={() => {
                        setFileName('No selected file');
                        setFile(null);
                        setApiData(''); // Clear the API response
                        clearApiData(); // Notify parent to clear Result output
                    }}
                >
                    <p>Delete</p>
                </button>

                <button className='uploader-run' onClick={handleExtract}>
                    <p>Extract</p>
                </button>
            </div>
        </div>
    );
}
