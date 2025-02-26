import React from 'react';
import { useForm, Controller, Path } from 'react-hook-form';
import { ResumeData } from '../types/resume';

interface InputCreatorProps {
  onUpdate: (data: ResumeData) => void;
}

const InputCreator: React.FC<InputCreatorProps> = ({ onUpdate }) => {
  const initialState: ResumeData = {
    header: { name: '', email: '', phone: 0 },
    summary: '',
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ year: '', degree: '', institution: '' }],
    skills: [''],
  };

  const { control, setValue, getValues, watch } = useForm<ResumeData>({
    defaultValues: initialState,
  });

  React.useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as ResumeData)})
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const addEntry = (section: 'experience' | 'education' | 'skills') => {
    const current = getValues(section);
    let newEntry: any;
    if (section === 'skills') {
      newEntry = '';
    } else if (section === 'experience') {
      newEntry = { title: '', company: '' };
    } else {
      newEntry = { year: '', degree: '', institution: '' };
    }
    setValue(section, [...current, newEntry]);
  };

  const renderField = (name: Path<ResumeData>, label: string, type: 'text' | 'textarea' | 'date' | 'number', placeholder?: string) => {
    return (
      <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mt-2">
        <label className="text-gray-700 font-medium">{label}</label>
        {type === 'textarea' ? (
          <textarea
          value={String(field.value) || ''}
          onChange={field.onChange}
          placeholder={placeholder}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md min-h-[100px]"
          />
        ) : (
          <input
          type={type}
          value={String(field.value) || ''}
          onChange={field.onChange}
          placeholder={placeholder}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
        )}
        </div>
      )}
      />
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Build Your Resume</h2>

      {/* Header Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Header</h3>
        {renderField('header.name', 'Name', 'text', 'Enter your name')}
        {renderField('header.email', 'Email', 'text', 'Enter your email')}
        {renderField('header.phone', 'Phone', 'number', 'Enter your phone')}
      </div>

      {/* Summary Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Summary</h3>
        {renderField('summary', 'Summary', 'textarea', 'Write a brief summary')}
      </div>

      {/* Experience Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Experience</h3>
        {getValues('experience').map((_, index) => (
          <div key={index} className="mt-4 border p-4 rounded-md">
            {renderField(`experience.${index}.title`, 'Job Title', 'text', 'Enter job title')}
            {renderField(`experience.${index}.company`, 'Company', 'text', 'Enter company name')}
            {renderField(`experience.${index}.startDate`, 'Startt Date', 'date', 'Start Date')}
            {renderField(`experience.${index}.endDate`, 'End Date ', 'date', 'End Date')}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('experience')}
          className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Experience
        </button>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Education</h3>
        {getValues('education').map((_, index) => (
          <div key={index} className="mt-4 border p-4 rounded-md">
            {renderField(`education.${index}.institution`, 'School', 'text', 'Enter school name')}
            {renderField(`education.${index}.degree`, 'Degree', 'text', 'Enter degree')}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('education')}
          className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mt-4">Skills</h3>
        {getValues('skills').map((_, index) => (
          <div key={index} className="mt-2">
            {renderField(`skills.${index}`, `Skill ${index + 1}`, 'text', 'Enter a skill')}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('skills')}
          className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default InputCreator;