
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Setup = () => {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [section, setSection] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!year || !department || !section || (department === "Computer Science" && !specialization)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // TODO: Implement timetable generation
    toast({
      title: "Generating Timetable",
      description: "Please wait while we generate your timetable...",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <Card className="w-full max-w-2xl p-8 space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Timetable Setup</h1>
          <p className="text-gray-600">Configure your class details</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Academic Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">First Year</SelectItem>
                <SelectItem value="second">Second Year</SelectItem>
                <SelectItem value="third">Third Year</SelectItem>
                <SelectItem value="fourth">Fourth Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EEE">EEE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {department === "Computer Science" && (
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Select value={specialization} onValueChange={setSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="aiml">AI/ML</SelectItem>
                  <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
                <SelectItem value="C">Section D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-accent hover:bg-accent/90"
          >
            Generate Timetable
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Setup;
