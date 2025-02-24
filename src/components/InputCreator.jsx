import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import resumeFields from '../data/resumeFields.json';

const InputCreator = ({ onUpdate }) => {
  // Generate initial state from resumeFields.json
  const generateInitialState = () => ({
    header: Object.fromEntries(resumeFields.header.map((field) => [field.name, ''])),
    summary: '',
    experience: [Object.fromEntries(resumeFields.experience.map((field) => [field.name, '']))],
    education: [Object.fromEntries(resumeFields.education.map((field) => [field.name, '']))],
    skills: [''],
  });

  const { control, setValue, getValues, watch } = useForm({
    defaultValues: generateInitialState(),
  });

  watch(onUpdate);

  const addEntry = (section) => {
    const current = getValues(section);
    const newEntry =
      section === 'skills'
        ? ''
        : Object.fromEntries(resumeFields[section].map((field) => [field.name, '']));
    setValue(section, [...current, newEntry]);
  };

  const renderField = (field, section, index = null) => {
    const fieldName =
      section === 'skills'
        ? `skills.${index}`
        : index !== null
        ? `${section}.${index}.${field.name}`
        : `${section}${section === 'summary' ? '' : '.' + field.name}`;
    const commonClasses = 'w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none';

    return (
      <Controller
        key={field.name}
        name={fieldName}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="mt-2">
            {field.label && <label className="text-gray-700 font-medium">{field.label}</label>}
            {field.type === 'textarea' ? (
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
            )}
          </div>
        )}
      />
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Build Your Resume</h2>

      {Object.entries(resumeFields).map(([section, fields]) => (
        <div key={section}>
          <h3 className="text-lg font-semibold text-blue-600 mt-4 capitalize">{section}</h3>
          {Array.isArray(fields) ? (
            section === 'header' ? (
              fields.map((field) => renderField(field, section))
            ) : (
              getValues(section).map((_, index) => (
                <div key={index} className={section !== 'skills' ? 'mt-4 border p-4 rounded-md' : 'mt-2'}>
                  {fields.map((field) => renderField(field, section, index))}
                </div>
              ))
            )
          ) : (
            renderField(fields, section)
          )}
          {['experience', 'education', 'skills'].includes(section) && (
            <button
              type="button"
              onClick={() => addEntry(section)}
              className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add {section.slice(0, -1)}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputCreator;