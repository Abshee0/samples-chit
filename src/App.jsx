// Import dependencies
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';

const App = () => {
  const [rows, setRows] = useState([{ formNumber: '' }]);
  const [receivingPerson, setReceivingPerson] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [viewForm, setViewForm] = useState(false);

  const addRow = () => {
    setRows([...rows, { formNumber: '' }]);
  };

  const handleRowChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].formNumber = value;
    setRows(updatedRows);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();

    // Add letterhead
    doc.setFontSize(12);
    doc.text('Medlab Diagnostics Pvt Ltd', 105, 10, { align: 'center' });

    // Add title
    doc.setFontSize(16);
    doc.text('NDA Samples Received', 105, 30, { align: 'center' });

    // Add rows
    const startY = 50;
    rows.forEach((row, index) => {
      doc.text(`${index + 1}. Custody Form Number: ${row.formNumber}`, 20, startY + index * 10);
    });

    // Add footer
    const footerY = startY + rows.length * 10 + 20;
    doc.setFontSize(12);
    doc.text(
      'The above mentioned sample(s) have been received by Medlab Diagnostics Pvt Ltd',
      105,
      footerY,
      { align: 'center' }
    );
    doc.text(`Received by: ${receivingPerson}`, 20, footerY + 10);
    doc.text(`Date & Time: ${dateTime}`, 20, footerY + 20);
    doc.text('Signature:', 20, footerY + 30);

    // Save PDF
    doc.save('NDA_Samples_Received.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md print:bg-white">
      {!viewForm ? (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">NDA Samples Received</h1>

          {/* Dynamic Rows */}
          <div className="space-y-4">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium w-1/3 text-right">Custody Form Number:</label>
                <input
                  type="text"
                  value={row.formNumber}
                  onChange={(e) => handleRowChange(index, e.target.value)}
                  className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={addRow}
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add New Row
            </button>
          </div>

          {/* Footer Fields */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium w-1/3 text-right">Receiving Person:</label>
              <select
                value={receivingPerson}
                onChange={(e) => setReceivingPerson(e.target.value)}
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Person</option>
                <option value="Person A">Person A</option>
                <option value="Person B">Person B</option>
                <option value="Person C">Person C</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium w-1/3 text-right">Date & Time:</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* View Form Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setViewForm(true)}
              className="px-6 py-2 bg-gray-500 text-white font-medium text-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              View Form
            </button>
          </div>
        </>
      ) : (
        <div className="print-container">
          <header className="mb-6 border-b pb-4 flex justify-center">
            <img src="letterhead.png" alt="Letterhead" className="w-full" />
          </header>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">NDA Samples Received</h1>
          <div className="space-y-4">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium w-1/3 text-right">Custody Form Number:</label>
                <p className="w-2/3 px-3 py-2 border-b border-gray-300 text-left">{row.formNumber || '_________________'}</p>
              </div>
            ))}
          </div>
          <footer className="mt-12 text-center text-gray-900 print:text-black">
            <p className="mb-2 font-semibold">The above mentioned sample(s) have been received by Medlab Diagnostics Pvt Ltd</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="font-medium">Received by:</p>
                <p>{receivingPerson || '_________________'}</p>
              </div>
              <div>
                <p className="font-medium">Date & Time:</p>
                <p>{dateTime || '_________________'}</p>
              </div>
              <div>
                <p className="font-medium">Signature:</p>
                <p>_________________</p>
              </div>
            </div>
          </footer>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setViewForm(false)}
              className="px-6 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Form
            </button>
            <button 
            onClick={handlePrint}
            className='px-6 py-2 ml-5 bg-green-500 text-white font-medium text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Print
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
