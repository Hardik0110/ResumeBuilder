import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import resumeFields from '../data/resumeFields.json';
import { ResumeData, Experience, Education, ResumeFields, ResumeHeader, ResumeField } from '../types/resume';

interface InputCreatorProps {
  onUpdate: (data: ResumeData) => void;
}

const InputCreator: React.FC<InputCreatorProps> = ({ onUpdate }) => {
  const generateInitialState = (): ResumeData => ({
    header: {
      name: '',
      email: '',
      phone: '',
      ...Object.fromEntries(resumeFields.header.map((field) => [field.name, '']))
    } as ResumeHeader,
    summary: '',
    experience: [Object.fromEntries(resumeFields.experience.map((field) => [field.name, ''])) as unknown as Experience],
    education: [Object.fromEntries(resumeFields.education.map((field) => [field.name, '']))] as unknown as Education[],
    skills: [''],
  });

  const { control, setValue, getValues, watch } = useForm<ResumeData>({
    defaultValues: generateInitialState(),
  });

  // Fix: Properly handle form updates
  React.useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as ResumeData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const addEntry = (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills'>) => {
    const current = getValues(section);
    const newEntry =
      section === 'skills'
        ? ''
        : Object.fromEntries((resumeFields[section] as ResumeField[]).map((field) => [field.name, '']));
    setValue(section, [...current, newEntry] as any);
  };

  const renderField = (
    field: ResumeField, 
    section: keyof ResumeFields, 
    index: number | null = null
  ) => {
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
        name={fieldName as any}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="mt-2">
            {field.label && <label className="text-gray-700 font-medium">{field.label}</label>}
            {field.type === 'textarea' ? (
              <textarea
                value={value || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                className={`${commonClasses} ${field.name === 'summary' ? 'min-h-[100px]' : 'min-h-[80px]'}`}
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

      {(Object.entries(resumeFields) as [keyof ResumeFields, any][]).map(([section, fields]) => (
        <div key={section}>
          <h3 className="text-lg font-semibold text-blue-600 mt-4 capitalize">{section}</h3>
          {Array.isArray(fields) ? (
            section === 'header' ? (
              fields.map((field) => renderField(field, section))
            ) : (
              getValues(section as keyof ResumeData).map((_, index: any) => (
                <div key={index} className={section !== 'skills' ? 'mt-4 border p-4 rounded-md' : 'mt-2'}>
                  {fields.map((field) => renderField(field, section, index))}
                </div>
              ))
            )
          ) : (
            renderField(fields, section)
          )}
          {(['experience', 'education', 'skills'] as const).includes(section as any) && (
            <button
              type="button"
              onClick={() => addEntry(section as keyof Pick<ResumeData, 'experience' | 'education' | 'skills'>)}
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