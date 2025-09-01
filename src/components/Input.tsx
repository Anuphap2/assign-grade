import { useState } from "react";
type Subject = {
  name: string;
  grade: string;
};

export default function Input() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (subject.trim() !== "" && grade !== "") {
      setSubjects([...subjects, { name: subject, grade }]);
      setSubject("");
      setGrade("");
    }
  };

  const deleteSubject = () => {
    if (selectedSubject) {
      setSubjects(subjects.filter((sub) => sub.name !== selectedSubject));
      setSelectedSubject("");
    }
  };

  const gradeToPoint = (grade: string) => {
    switch (grade) {
      case "A":
        return 4.0;
      case "B+":
        return 3.5;
      case "B":
        return 3.0;
      case "C+":
        return 2.5;
      case "C":
        return 2.0;
      case "D+":
        return 1.5;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return 0;
    }
  };

  // คำนวณ GPA
  const calculateGpa = () => {
    const gradeSubjects = subjects.filter((sub) => sub.grade !== "W");
    if (gradeSubjects.length === 0) return;
    const total = gradeSubjects.reduce(
      (sum, sub) => sum + gradeToPoint(sub.grade),
      0
    );
    setGpa(parseFloat((total / gradeSubjects.length).toFixed(2)));
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* เพิ่มรายวิชา */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">เพิ่มรายวิชา</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="ชื่อรายวิชา"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                ระบุเกรด
              </option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="W">W</option>
            </select>
            <button
              onClick={addSubject}
              className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600 transition"
            >
              เพิ่ม
            </button>
          </div>
        </div>

        {/* ลบรายวิชา */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">ลบรายวิชา</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-400"
            >
              <option value="">-- เลือกรายวิชา --</option>
              {subjects.map((sub, idx) => (
                <option key={idx} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
            <button
              onClick={deleteSubject}
              disabled={!selectedSubject}
              className={`px-4 py-2 rounded-xl text-white transition ${
                selectedSubject
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              ลบ
            </button>
          </div>
        </div>

        {/* GPA */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={calculateGpa}
            disabled={subjects.length === 0}
            className={`px-6 py-3 rounded-2xl font-bold transition ${
              subjects.length > 0
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            คำนวณ GPA
          </button>
          {gpa !== null && (
            <p className="text-lg font-semibold text-gray-800">GPA: {gpa}</p>
          )}
        </div>

        {/* รายวิชา */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">รายวิชา</h2>
          {subjects.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีรายวิชา</p>
          ) : (
            <ul className="space-y-3">
              {subjects.map((sub, idx) => (
                <li
                  key={idx}
                  className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <p
                    className={`font-medium ${
                      sub.grade === "F" ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    Subject : {sub.name}
                  </p>
                  <p
                    className={`font-semibold ${
                      sub.grade === "F" ? "text-red-500" : "text-gray-800"
                    }`}
                  >
                    Grade : {sub.grade}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
