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
    if (subjects.length === 0) return;
    const total = subjects.reduce(
      (sum, sub) => sum + gradeToPoint(sub.grade),
      0
    );
    setGpa(parseFloat((total / subjects.length).toFixed(2)));
  };

  return (
    <div className="input-container">
      <div className="card">
        <h2>เพิ่มรายวิชา</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="ชื่อรายวิชา"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select onChange={(e) => setGrade(e.target.value)}>
            <option selected disabled value="">ระบุเกรด</option>
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
          <button onClick={addSubject}>เพิ่ม</button>
        </div>
      </div>

      <div className="card">
        <h2>ลบรายวิชา</h2>
        <div className="input-group">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">-- เลือกรายวิชา --</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          <button onClick={deleteSubject} disabled={!selectedSubject}>
            ลบ
          </button>
        </div>
      </div>

      <div className="gpa-container">
        <button
          onClick={calculateGpa}
          disabled={subjects.length === 0}
          className="gpa-btn"
        >
          คำนวณ GPA
        </button>
        {gpa !== null && <p className="gpa-result">GPA: {gpa}</p>}
      </div>

      <div className="card">
        <h2>รายวิชา</h2>
        {subjects.length === 0 ? (
          <p className="no-subject">ยังไม่มีรายวิชา</p>
        ) : (
          <ul className="subject-list">
            {subjects.map((sub, idx) => (
              <li
                style={{ color: sub.grade === "F" ? "red" : "black" }}
                key={idx}
              >
                <p className="subject-name">Subject : {sub.name}</p>
                <p className="subject-grade">Grade : {sub.grade}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
