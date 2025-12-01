import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubjectMarks } from "@/types/result";
import { GraduationCap } from "lucide-react";

interface ResultFormProps {
  onSubmit: (studentName: string, registerNumber: string, semester: string, subjects: SubjectMarks[]) => void;
}

const DEFAULT_SUBJECTS = [
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks"
];

export const ResultForm = ({ onSubmit }: ResultFormProps) => {
  const [studentName, setStudentName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState<SubjectMarks[]>(
    DEFAULT_SUBJECTS.map(name => ({
      subjectName: name,
      mseMarks: 0,
      eseMarks: 0,
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studentName, registerNumber, semester, subjects);
  };

  const updateSubject = (index: number, field: "mseMarks" | "eseMarks", value: string) => {
    const newSubjects = [...subjects];
    const numValue = parseFloat(value) || 0;
    newSubjects[index] = { ...newSubjects[index], [field]: numValue };
    setSubjects(newSubjects);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <div>
            <CardTitle className="text-2xl">VIT Student Result Entry</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Enter marks for MSE (30%) and ESE (70%)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registerNumber">Register Number</Label>
              <Input
                id="registerNumber"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                placeholder="e.g., 21BCE1234"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g., Fall 2024"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Subject Marks</h3>
            {subjects.map((subject, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">{subject.subjectName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`mse-${index}`}>MSE Marks (Max: 30)</Label>
                      <Input
                        id={`mse-${index}`}
                        type="number"
                        min="0"
                        max="30"
                        step="0.5"
                        value={subject.mseMarks}
                        onChange={(e) => updateSubject(index, "mseMarks", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ese-${index}`}>ESE Marks (Max: 70)</Label>
                      <Input
                        id={`ese-${index}`}
                        type="number"
                        min="0"
                        max="70"
                        step="0.5"
                        value={subject.eseMarks}
                        onChange={(e) => updateSubject(index, "eseMarks", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Calculate Results
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
