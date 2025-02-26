import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer'; 
import ResumePDF from '../components/ResumePDF';
import { ResumeData } from '../types/resume';

interface LocationState {
  resumeData: ResumeData;
}

const GeneratedResume: React.FC = () => {
  const location = useLocation();
  const { resumeData } = (location.state as LocationState) || { resumeData: null };

  if (!resumeData) {
    return <div className="text-center p-8">No resume data found. Please go back and create a resume.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900">{resumeData.header.name}</h1>
      <p className="text-gray-600 mt-1">
        {resumeData.header.email} | {resumeData.header.phone}
      </p>

      {resumeData.summary && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-6">Summary</h3>
          <p className="text-gray-700 mt-2">{resumeData.summary}</p>
        </>
      )}

      {resumeData.experience.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-6">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800">
                {exp.title} - {exp.company}
              </h4>
              <p className="text-gray-600">
                {(exp.startDate && exp.endDate) ? `${exp.startDate} - ${exp.endDate}` : 'Start Date - End Date'}
              </p>
              <p className="text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </>
      )}

      {resumeData.education.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-6">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800">
                {edu.degree} - {edu.institution}
              </h4>
              <p className="text-gray-600">{edu.year}</p>
            </div>
          ))}
        </>
      )}

      {resumeData.skills.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-6">Skills</h3>
          <ul className="list-none mt-2">
            {resumeData.skills.map((skill, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md mb-2 text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex justify-center mt-8">
        <PDFDownloadLink
          document={<ResumePDF resumeData={resumeData} />}
          fileName="resume.pdf"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-lg 
                     hover:from-blue-600 hover:to-blue-700 transition-all duration-300 
                     shadow-lg hover:shadow-xl font-semibold text-lg"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default GeneratedResume;