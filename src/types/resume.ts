export interface ResumeHeader {
    name: string;
    email: string;
    phone: number;
  }
  
  export interface Experience {
    title: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description?: string;
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