import { useState } from "react";
import { ResultForm } from "@/components/ResultForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { StudentResult, SubjectMarks, calculateSubjectResult, calculateGrade } from "@/types/result";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const Index = () => {
  const [result, setResult] = useState<StudentResult | null>(null);

  const handleResultSubmit = (
    studentName: string,
    registerNumber: string,
    semester: string,
    subjects: SubjectMarks[]
  ) => {
    const calculatedSubjects = subjects.map(calculateSubjectResult);
    const overallPercentage =
      calculatedSubjects.reduce((sum, subject) => sum + subject.percentage, 0) /
      calculatedSubjects.length;
    const overallGrade = calculateGrade(overallPercentage);

    setResult({
      studentName,
      registerNumber,
      semester,
      subjects: calculatedSubjects,
      overallPercentage,
      overallGrade,
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">VIT Result Management System</h1>
              <p className="text-sm text-primary-foreground/80">
                Semester Result Calculation Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!result ? (
          <div className="max-w-4xl mx-auto">
            <ResultForm onSubmit={handleResultSubmit} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Calculate New Result
            </Button>
            <ResultDisplay result={result} />
          </div>
        )}
      </main>

      <footer className="bg-muted mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 VIT Result Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
