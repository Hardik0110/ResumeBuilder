import React from 'react';
import { useForm } from 'react-hook-form';

const InputCreator = ({ onUpdate }) => {
  const { register, setValue, getValues, watch } = useForm({
    defaultValues: {
      header: { name: '', email: '', phone: '' },
      summary: '',
      experience: [{ title: '', company: '', duration: '', description: '' }],
      education: [{ degree: '', institution: '', year: '' }],
      skills: [''], 
    },
  });

  watch((data) => onUpdate(data));

  const addExperience = () => {
    const currentExperience = getValues('experience');
    setValue('experience', [...currentExperience, { title: '', company: '', duration: '', description: '' }]);
  };

  const addEducation = () => {
    const currentEducation = getValues('education');
    setValue('education', [...currentEducation, { degree: '', institution: '', year: '' }]);
  };

  const addSkill = () => {
    const currentSkills = getValues('skills');
    setValue('skills', [...currentSkills, '']);
  };

  return (
    <div className="w-full md:w-[100%]">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Build Your Resume</h2>

      <h3 className="text-lg font-semibold text-blue-600 mt-4">Header</h3>
      <input
        {...register('header.name')}
        placeholder="Full Name"
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        {...register('header.email')}
        type="email"
        placeholder="Email"
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        {...register('header.phone')}
        type="tel"
        placeholder="Phone"
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <h3 className="text-lg font-semibold text-blue-600 mt-4">Summary</h3>
      <textarea
        {...register('summary')}
        placeholder="Write a brief summary..."
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
      />

      <h3 className="text-lg font-semibold text-blue-600 mt-4">Experience</h3>
      {getValues('experience').map((exp, index) => (
        <div key={index} className="mt-2">
          <input
            {...register(`experience.${index}.title`)}
            placeholder="Job Title"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            {...register(`experience.${index}.company`)}
            placeholder="Company"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            {...register(`experience.${index}.duration`)}
            placeholder="Duration (e.g., 2020-2022)"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            {...register(`experience.${index}.description`)}
            placeholder="Description"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
          />
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
        <div key={index} className="mt-2">
          <input
            {...register(`education.${index}.degree`)}
            placeholder="Degree"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            {...register(`education.${index}.institution`)}
            placeholder="Institution"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            {...register(`education.${index}.year`)}
            placeholder="Year"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
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
        <input
          key={index}
          {...register(`skills.${index}`)}
          placeholder="Skill"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
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