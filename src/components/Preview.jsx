import React from 'react';

const Preview = ({ resumeData }) => {
  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 text-center">Live Preview</h2>

      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center break-words">
          {resumeData.header.name || 'Your Name'}
        </h1>
        <p className="text-gray-600 mt-1 text-center break-words">
          {resumeData.header.email || 'email@example.com'} | {resumeData.header.phone || '8140900320'}
        </p>
      </div>

      {/* Summary */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Summary</h3>
        <p className="text-gray-700 mt-2 whitespace-pre-wrap break-words">
          {resumeData.summary || 'Add a brief professional summary'}
        </p>
      </div>

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800 break-words">
                {exp.title || 'Job Title'} - {exp.company || 'Company'}
              </h4>
              <p className="text-gray-600 break-words">
                {(exp.startDate && exp.endDate) ? `${exp.startDate} - ${exp.endDate}` : 'Start Date - End Date'}
              </p>
              <p className="text-gray-700 mt-1 whitespace-pre-wrap break-words">
                {exp.description || 'Description'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800 break-words">
                {edu.degree || 'Degree'} - {edu.institution || 'Institution'}
              </h4>
              <p className="text-gray-600 break-words">{edu.year || 'Year'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Skills</h3>
        <ul className="list-none mt-2">
          {resumeData.skills.map((skill, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded-md mb-2 text-gray-700 break-words">
              {skill || 'Skill'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Preview;