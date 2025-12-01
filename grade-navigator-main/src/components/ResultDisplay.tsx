import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentResult } from "@/types/result";
import { Award, User, Hash, Calendar } from "lucide-react";

interface ResultDisplayProps {
  result: StudentResult;
}

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A": return "bg-success text-success-foreground";
    case "B": return "bg-primary text-primary-foreground";
    case "C": return "bg-warning text-warning-foreground";
    case "F": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary">
        <CardHeader className="bg-primary text-primary-foreground">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">VIT Semester Results</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-primary-foreground/90">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{result.studentName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>{result.registerNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{result.semester}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8" />
              <div className="text-right">
                <div className="text-sm opacity-90">Overall Grade</div>
                <Badge className={`${getGradeColor(result.overallGrade)} text-xl px-4 py-1`}>
                  {result.overallGrade}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {result.subjects.map((subject, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-muted pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
                <Badge className={getGradeColor(subject.grade)}>
                  Grade: {subject.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">MSE Marks</p>
                  <p className="text-2xl font-bold text-foreground">{subject.mseMarks}</p>
                  <p className="text-xs text-muted-foreground">/ 30</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ESE Marks</p>
                  <p className="text-2xl font-bold text-foreground">{subject.eseMarks}</p>
                  <p className="text-xs text-muted-foreground">/ 70</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-primary">{subject.totalMarks.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">/ 100</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="text-2xl font-bold text-accent">{subject.percentage.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-accent">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Overall Performance</h3>
              <p className="text-muted-foreground">Aggregate across all subjects</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Average Percentage</p>
                <p className="text-3xl font-bold text-primary">{result.overallPercentage.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Final Grade</p>
                <Badge className={`${getGradeColor(result.overallGrade)} text-2xl px-6 py-2`}>
                  {result.overallGrade}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
