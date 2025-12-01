export interface SubjectMarks {
  subjectName: string;
  mseMarks: number;
  eseMarks: number;
}

export interface CalculatedResult extends SubjectMarks {
  totalMarks: number;
  percentage: number;
  grade: string;
}

export interface StudentResult {
  studentName: string;
  registerNumber: string;
  semester: string;
  subjects: CalculatedResult[];
  overallPercentage: number;
  overallGrade: string;
}

export const calculateGrade = (totalMarks: number): string => {
  if (totalMarks >= 80) return "A";
  if (totalMarks >= 60) return "B";
  if (totalMarks >= 40) return "C";
  return "F";
};

export const calculateSubjectResult = (subject: SubjectMarks): CalculatedResult => {
  const totalMarks = subject.mseMarks + subject.eseMarks;
  const percentage = totalMarks;
  const grade = calculateGrade(totalMarks);

  return {
    ...subject,
    totalMarks,
    percentage,
    grade,
  };
};
