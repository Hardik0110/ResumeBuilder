import React from 'react';

const Preview = ({ resumeData }) => {
  return (
    <div className="w-full md:w-[100%] ">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Live Preview</h2>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">{resumeData.header.name || 'Your Name'}</h1>
      <p className="text-gray-600 mt-1">
        {resumeData.header.email || 'email@example.com'} | {resumeData.header.phone || '(123) 456-7890'}
      </p>

      {/* Summary */}
      {resumeData.summary && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Summary</h3>
          <p className="text-gray-700 mt-2">{resumeData.summary}</p>
        </>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800">
                {exp.title || 'Job Title'} - {exp.company || 'Company'}
              </h4>
              <p className="text-gray-600">{exp.duration || 'Duration'}</p>
              <p className="text-gray-700 mt-1">{exp.description || 'Description'}</p>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-md font-medium text-gray-800">
                {edu.degree || 'Degree'} - {edu.institution || 'Institution'}
              </h4>
              <p className="text-gray-600">{edu.year || 'Year'}</p>
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-blue-600 mt-4">Skills</h3>
          <ul className="list-none mt-2">
            {resumeData.skills.map((skill, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md mb-2 text-gray-700">
                {skill || 'Skill'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Preview;