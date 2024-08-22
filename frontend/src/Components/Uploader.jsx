// import React, { useState } from 'react';
// import '../styles/Uploader.css';
// import { MdCloudUpload } from 'react-icons/md';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import { FaTrash } from "react-icons/fa6";
// import { pdfjs } from 'react-pdf';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// export default function Uploader() {
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('No selected file');
//     const [fileType, setFileType] = useState('');

//     const handleFileChange = ({ target: { files } }) => {
//         if (files[0]) {
//             setFileName(files[0].name);
//             setFileType(files[0].type);
//             setFile(URL.createObjectURL(files[0]));
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <form className='dashboard-form' onClick={() => document.querySelector('.input-field').click()}>
//                     <input
//                         type='file'
//                         accept='image/*, application/pdf'
//                         className='input-field'
//                         hidden
//                         onChange={handleFileChange}
//                     />

//                     {file ? (
//                         fileType.startsWith('image/') ? (
//                             <img 
//                                 src={file} 
//                                 alt={fileName} 
//                                 style={{ 
//                                     width: '420px', 
//                                     height: '600x', 
//                                     objectFit: 'contain',
//                                     display: 'block', 
//                                     margin: 'auto',
//                                     border: '1px solid #ccc', 
//                                     overflow: 'hidden'
//                                 }}
//                             />
//                         ) : fileType === 'application/pdf' ? (
//                             <div 
//                                 style={{ 
//                                     width: '450px', 
//                                     height: '600px', 
//                                     // border: '1px solid #ccc', 
//                                     overflow: 'hidden', 
//                                     display: 'block', 
//                                     alignItems: 'center', 
//                                     justifyContent: 'center',
//                                     objectFit: 'contain',
//                                     margin: 'auto',
//                                 }}
//                             >
//                                 <Worker>
//                                     <Viewer fileUrl={file} />
//                                 </Worker>
//                             </div>
//                         ) : null
//                     ) : (
//                         <div 
//                             style={{ 
//                                 display: 'flex', 
//                                 flexDirection: 'column', 
//                                 alignItems: 'center', 
//                                 justifyContent: 'center' 
//                             }}
//                         >
//                             <MdCloudUpload color='rgb(26, 155, 214)' size={60} />
//                             <p style={{ marginTop: '8px' }}>Browse file to upload</p> 
//                         </div>

//                     )}
//                 </form>
//                 <div className='uploader-control'>
                    
//                     <button className='uploader-delete'
//                             onClick={() => {
//                                 setFileName('No selected file');
//                                 setFile(null);
//                             }}
//                     >
//                         <p>Delete</p>
//                     </button>

//                     <button className='uploader-run'>
//                         <p>Extract</p>
//                     </button>
//                 </div>
                
                
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import '../styles/Uploader.css';
import { MdCloudUpload } from 'react-icons/md';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { FaTrash } from "react-icons/fa6";
import { pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Uploader() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No selected file');
    const [fileType, setFileType] = useState('');
    const [data, setData] = useState(''); // State to store data from API
    const [isEditing, setIsEditing] = useState(false); // State to handle editing mode

    const handleFileChange = ({ target: { files } }) => {
        if (files[0]) {
            setFileName(files[0].name);
            setFileType(files[0].type);
            setFile(URL.createObjectURL(files[0]));
        }
    };

    const handleExtractClick = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setData(result.data); // Assuming the API returns a field called 'data'
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('YOUR_API_SAVE_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            const result = await response.json();
            console.log('Save response:', result);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div>
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
                                src={file} 
                                alt={fileName} 
                                style={{ 
                                    width: '420px', 
                                    height: '600x', 
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
                                    <Viewer fileUrl={file} />
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
                    <button className='uploader-delete'
                        onClick={() => {
                            setFileName('No selected file');
                            setFile(null);
                            setData(''); // Clear data when deleting file
                        }}
                    >
                        <p>Delete</p>
                    </button>

                    <button className='uploader-run' onClick={handleExtractClick}>
                        <p>Extract</p>
                    </button>
                </div>

                {data && (
                    <div>
                        <textarea
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            style={{ width: '100%', height: '200px', marginTop: '20px' }}
                        />

                        <button className='uploader-save' onClick={handleSaveClick}>
                            <p>Save</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
