import React, { useState, useEffect } from 'react';
import '../styles/Result.css';

export default function Result({ data }) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (data) {
            const formattedData = formatData(data);
            setText(formattedData);
        }
    }, [data]);

    const formatData = (data) => {
        const orderedKeys = [
            "Số", "Quyển số", "Họ và tên", "Giới tính", "Ngày, tháng, năm sinh",
            "Ghi bằng chữ", "Nơi sinh", "Dân tộc", "Quốc tịch", "Họ và tên cha",
            "Dân tộc cha", "Quốc tịch cha", "Năm sinh cha", "Nơi thường trú/tạm trú cha",
            "Họ và tên mẹ", "Dân tộc mẹ", "Quốc tịch mẹ", "Năm sinh mẹ",
            "Nơi thường trú/tạm trú mẹ", "Nơi đăng ký", "Ngày, tháng, năm đăng ký",
            "Ghi chú", "Họ và tên người đi khai sinh", "Quan hệ với người được khai sinh",
            "Người thực hiện", "Người ký"
        ];

        const orderedData = orderedKeys.reduce((acc, key) => {
            if (data[key] !== undefined) {
                acc[key] = data[key];
            }
            return acc;
        }, {});

        return JSON.stringify(orderedData, null, 2); // Format as JSON with indentation
    };

    const handleSave = async () => {
        try {
            let jsonData;
            try {
                jsonData = JSON.parse(text);
            } catch (e) {
                throw new Error("Invalid JSON format");
            }
    
            jsonData = Object.fromEntries(
                Object.entries(jsonData).filter(([_, value]) => value !== null && value.trim() !== "")
            );
    
            console.log('Data being sent to API:', jsonData);
    
            const token = localStorage.getItem('authToken');
            console.log('Token retrieved:', token); // Add this log
    
            if (!token) {
                throw new Error("No authentication token found");
            }
    
            const response = await fetch('https://digitiser.up.railway.app/db_birth_cert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jsonData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to save data: ${response.status} ${response.statusText}. ${errorText}`);
            }
    
            const result = await response.json();
            console.log('Save response:', result);
            alert('Data saved successfully');
        } catch (error) {
            console.error('Error:', error);
            alert(`There was an error saving the data: ${error.message}`);
        }
    };
    

    return (
        <div>
            <div className='result-output'>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={20}
                    cols={50}
                    style={{ width: '100%', padding: '10px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
                />
            </div>
            <div>
                <button className='result-save' onClick={handleSave}>
                    <p>Save</p>
                </button>
            </div>
        </div>
    );
}

