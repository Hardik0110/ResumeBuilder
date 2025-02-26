export interface ResumeHeader {
  name: string;
  email: string;
  phone: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  header: ResumeHeader;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface ResumeField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface ResumeFields {
  header: ResumeField[];
  summary: ResumeField;
  experience: ResumeField[];
  education: ResumeField[];
  skills: ResumeField[];
}