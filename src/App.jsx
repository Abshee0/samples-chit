import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';
import html2pdf from 'html2pdf.js'; // Make sure html2pdf is imported correctly

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
    // Hide the buttons before printing
    const saveButton = document.getElementById('saveButton');
    const printButton = document.getElementById('printButton');
    const backButton = document.getElementById('backButton');
    
    saveButton.style.display = 'none';
    printButton.style.display = 'none';
    backButton.style.display = 'none';
    
    // Open the print dialog
    window.print();
    
    // Restore the buttons after printing
    saveButton.style.display = 'block';
    printButton.style.display = 'block';
    backButton.style.display = 'block';
  };

  const handleSavePDF = () => {
    // Log to check if the function is triggered
    console.log("handleSavePDF triggered");

    const contentToSave = document.getElementById('contentToSave');
    console.log("Content to save: ", contentToSave);  // Check if contentToSave is properly selected

    // Hide the buttons before saving
    const saveButton = document.getElementById('saveButton');
    const printButton = document.getElementById('printButton');
    const backButton = document.getElementById('backButton');
    saveButton.style.display = 'none'; // Hide the Save button
    printButton.style.display = 'none'; // Hide the Print button
    backButton.style.display = 'none'; // Hide the Back button

    // Use html2pdf to generate PDF from the content
    html2pdf()
      .from(contentToSave)  // Select the content to be saved as PDF
      .set({
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { dpi: 600, scale: 5, letterRendering: true } // Set DPI and scale to improve quality
      })
      .save('NDA_Samples_Received.pdf')
      .finally(() => {
        // Restore the buttons after saving
        saveButton.style.display = 'block'; // Restore the Save button
        printButton.style.display = 'block'; // Restore the Print button
        backButton.style.display = 'block'; // Restore the Back button
        console.log("PDF saved, buttons restored.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md print:bg-white">
      {!viewForm ? (
        <>
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">NDA Samples Received</h1>

          {/* Dynamic Rows */}
          <div className="space-y-4">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium w-1/3 text-right text-sm sm:text-base md:text-lg">Custody Form Number:</label>
                <input
                  type="text"
                  value={row.formNumber}
                  onChange={(e) => handleRowChange(index, e.target.value)}
                  className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
                />
              </div>
            ))}
            <button
              onClick={addRow}
              className=" w-full px-4 py-2 bg-blue-500 text-white font-medium text-sm sm:text-base md:text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Custody Form Number
            </button>
          </div>

          {/* Footer Fields */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium w-1/3 text-right text-sm sm:text-base md:text-lg">Receiving Person:</label>
              <select
                value={receivingPerson}
                onChange={(e) => setReceivingPerson(e.target.value)}
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              >
                <option value="">Select Person</option>
                <option value="Person A">Person A</option>
                <option value="Person B">Person B</option>
                <option value="Person C">Person C</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium w-1/3 text-right text-sm sm:text-base md:text-lg">Date & Time:</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              />
            </div>
          </div>

          {/* View Form Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setViewForm(true)}
              className="px-6 py-2 bg-gray-500 text-white font-medium text-sm sm:text-base md:text-lg rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              View Form
            </button>
          </div>
        </>
      ) : (
        <div id="contentToSave" className="print-container max-w-3xl m-auto">
          <header className="mb-6 border-b-2 border-black pb-2 flex justify-center">
            <img src="header.jpg" alt="Letterhead" className="w-full" />
          </header>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-gray-900 mb-8">NDA Samples Received</h1>
          <div className="space-y-3 my-4">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center space-x-4 my-4">
                <label className="text-gray-700 font-medium w-1/3 text-right text-sm sm:text-base md:text-lg">Custody Form Number:</label>
                <p className="w-3/5 px-3 py-2 border-b border-gray-300 text-left text-sm sm:text-base md:text-lg">{row.formNumber || '_________________'}</p>
              </div>
            ))}
          </div>

          <footer className="mt-12 text-center text-gray-900 print:text-black">
            <p className="mb-2 font-semibold text-[0.8rem] sm:text-base md:text-lg">The above mentioned sample(s) have been received by Medlab Diagnostics Pvt Ltd</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className='space-y-2'>
                <p className="font-medium text-xs sm:text-base md:text-lg">Received by:</p>
                <p className='font-semibold text-xs sm:text-base md:text-lg'>{receivingPerson || '_________________'}</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-xs sm:text-base md:text-lg">Date & Time:</p>
                <p className='font-semibold text-xs sm:text-base md:text-lg'>{dateTime || '_________________'}</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-xs sm:text-base md:text-lg">Signature:</p>
                <p className='font-semibold text-xs sm:text-base md:text-lg'>_________________</p>
              </div>
            </div>
          </footer>
          <div className="mt-8 flex justify-center">
            <button
              id="backButton"
              onClick={() => setViewForm(false)}
              className="px-6 py-2 bg-blue-500 text-white font-medium text-sm sm:text-base md:text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Form
            </button>

            <button 
              id="printButton"
              onClick={handlePrint}
              className='px-6 py-2 ml-5 bg-green-500 text-white font-medium text-sm sm:text-base md:text-lg rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Print
            </button>

            <button 
              id="saveButton"
              onClick={handleSavePDF}
              className='px-6 py-2 ml-5 bg-yellow-500 text-white font-medium text-sm sm:text-base md:text-lg rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            >
              Save PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
