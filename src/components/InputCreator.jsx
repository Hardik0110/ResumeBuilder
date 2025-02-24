import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import resumeFields from '../data/resumeFields.json';

const InputCreator = ({ onUpdate }) => {
  const { control, setValue, getValues, watch } = useForm({
    defaultValues: {
      header: { name: '', email: '', phone: '' },
      summary: '',
      experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ degree: '', institution: '', year: '' }],
      skills: [''],
    },
  });

  watch((data) => {
    onUpdate(data);
  });

  const addExperience = () => {
    const currentExperience = getValues('experience');
    setValue('experience', [
      ...currentExperience,
      { title: '', company: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const addEducation = () => {
    const currentEducation = getValues('education');
    setValue('education', [...currentEducation, { degree: '', institution: '', year: '' }]);
  };

  const addSkill = () => {
    const currentSkills = getValues('skills');
    setValue('skills', [...currentSkills, '']);
  };

  const renderField = (field, section, index = null) => {
    const fieldName =
      section === 'skills'
        ? `skills.${index}`
        : index !== null
        ? `${section}.${index}.${field.name}`
        : section === 'summary'
        ? 'summary'
        : `${section}.${field.name}`;
    const commonClasses = 'w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none';

    return (
      <div key={field.name} className="mt-2">
        {field.label && <label className="text-gray-700 font-medium">{field.label}</label>}
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange, value } }) =>
            field.type === 'textarea' ? (
              <textarea
                value={value || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                className={`${commonClasses} min-h-[${field.name === 'summary' ? '100px' : '80px'}]`}
              />
            ) : (
              <input
                type={field.type}
                value={value || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                className={commonClasses}
              />
            )
          }
        />
      </div>
    );
  };

  console.log('resumeFields:', resumeFields);

  return (
    <div className="w-full md:w-[100%]">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Build Your Resume</h2>

      {/* Header */}
      <h3 className="text-lg font-semibold text-blue-600 mt-4">Header</h3>
      {resumeFields.header.map((field) => renderField(field, 'header'))}

      {/* Summary */}
      <h3 className="text-lg font-semibold text-blue-600 mt-4">Summary</h3>
      {renderField(resumeFields.summary, 'summary')}

      {/* Experience */}
      <h3 className="text-lg font-semibold text-blue-600 mt-4">Experience</h3>
      {getValues('experience').map((exp, index) => (
        <div key={index} className="mt-4 border p-4 rounded-md">
          {resumeFields.experience.map((field) => renderField(field, 'experience', index))}
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Experience
      </button>

      {/* Education */}
      <h3 className="text-lg font-semibold text-blue-600 mt-4">Education</h3>
      {getValues('education').map((edu, index) => (
        <div key={index} className="mt-4 border p-4 rounded-md">
          {resumeFields.education.map((field) => renderField(field, 'education', index))}
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Education
      </button>

      {/* Skills */}
      <h3 className="text-lg font-semibold text-blue-600 mt-4">Skills</h3>
      {getValues('skills').map((skill, index) => (
        <div key={index} className="mt-2">
          {resumeFields.skills.map((field) => renderField(field, 'skills', index))}
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Skill
      </button>
    </div>
  );
};

export default InputCreator;