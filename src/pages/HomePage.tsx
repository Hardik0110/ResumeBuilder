import React, { useState } from 'react';
import InputCreator from '../components/InputCreator';
import Preview from '../components/Preview';
import { Link } from 'react-router-dom';
import { ResumeData } from '../types/resume';

const HomePage: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    header: { name: '', email: '', phone: 0 },
    summary: '',
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', year: '' }],
    skills: [''],
  });

  const handleUpdate = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <InputCreator onUpdate={handleUpdate} />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Preview resumeData={resumeData} />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/resume"
            state={{ resumeData }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-lg 
                       hover:from-red-600 hover:to-red-700 transition-all duration-300 
                       shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            View Final Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;