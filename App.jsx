import React, { useState, useMemo } from "react";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Trophy,
  ChevronRight,
  GraduationCap,
  Zap,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database,
} from "lucide-react";

/* -------------------- QUIZ DATA -------------------- */
const STORAGE_QUIZ = [
  {
    id: 1,
    question: "Which of the following is a non-volatile storage device?",
    options: ["RAM", "Cache Memory", "Hard Disk Drive", "Registers"],
    answer: "Hard Disk Drive",
    explanation:
      "Non-volatile storage retains data even when power is lost. HDDs and SSDs are non-volatile.",
  },
  {
    id: 2,
    question: "What does SSD stand for?",
    options: [
      "Solid State Drive",
      "System Storage Device",
      "Static Silver Disk",
      "Super Speed Drive",
    ],
    answer: "Solid State Drive",
    explanation:
      "SSDs use flash memory and are much faster than traditional hard disks.",
  },
  {
    id: 3,
    question: "Which storage device is the fastest?",
    options: ["Optical Disk", "Magnetic Tape", "NVMe SSD", "Floppy Disk"],
    answer: "NVMe SSD",
    explanation:
      "NVMe SSDs connect via PCIe, offering extremely high data transfer speeds.",
  },
  {
    id: 4,
    question: "Single-layer Blu-ray disc capacity is?",
    options: ["4.7 GB", "700 MB", "25 GB", "100 GB"],
    answer: "25 GB",
    explanation:
      "A single-layer Blu-ray disc stores up to 25GB of data.",
  },
  {
    id: 5,
    question: "Magnetic tapes use which access method?",
    options: ["Laser Beams", "Sequential Access", "Random Access", "Flash Memory"],
    answer: "Sequential Access",
    explanation:
      "Magnetic tapes must be read sequentially, unlike hard disks.",
  },
];

/* -------------------- SUBJECTS -------------------- */
const SUBJECTS = [
  { id: 1, name: "Computer Storage", mcqs: 50, icon: Database, quiz: true },
  { id: 2, name: "Accountancy", mcqs: 245, icon: BookOpen },
  { id: 3, name: "General Knowledge", mcqs: 947, icon: Trophy },
  { id: 4, name: "History & Culture", mcqs: 425, icon: Clock },
];

/* -------------------- EXAMS -------------------- */
const EXAMS = [
  { id: 1, name: "JKSSB Graduate Level", year: 2025, mcqs: 120 },
  { id: 2, name: "JKSSB Sub Inspector", year: 2024, mcqs: 150 },
  { id: 3, name: "JKSSB Finance Assistant", year: 2024, mcqs: 110 },
];

export default function App() {
  const [view, setView] = useState("home");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");

  /* Quiz states */
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const subjects = useMemo(
    () =>
      SUBJECTS.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === STORAGE_QUIZ[current].answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 < STORAGE_QUIZ.length) {
      setCurrent(current + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
    setView("home");
  };

  const retryQuiz = () => {
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
    setView("quiz");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* -------------------- NAVBAR -------------------- */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-16 px-4 flex justify-between items-center">
          <div
            onClick={() => setView("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-emerald-600 p-2 rounded-lg">
              <GraduationCap className="text-white" />
            </div>
            <span className="font-bold text-xl text-emerald-600">
              Jkssbmark
            </span>
          </div>

          <div className="hidden md:flex gap-6 font-semibold">
            <button onClick={() => setView("home")}>Home</button>
            <button>Subjects</button>
            <button>Tests</button>
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full">
              Login
            </button>
          </div>

          <button onClick={() => setMenu(!menu)} className="md:hidden">
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        {menu && (
          <div className="md:hidden px-4 py-6 space-y-4">
            <button onClick={() => setView("home")}>Home</button>
            <button>Subjects</button>
            <button>Tests</button>
          </div>
        )}
      </nav>

      {/* -------------------- HOME -------------------- */}
      {view === "home" && (
        <>
          <header className="bg-emerald-600 text-white py-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4">
              Master JKSSB with Jkssbmark
            </h1>
            <p className="text-emerald-100 mb-6">
              The most trusted JKSSB MCQ platform
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-4 text-slate-400" />
              <input
                className="w-full pl-12 py-4 rounded-2xl text-black"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6 flex gap-2">
              <Zap className="text-emerald-500" /> Featured Subjects
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {subjects.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    onClick={() => s.quiz && setView("quiz")}
                    className="bg-white p-6 rounded-2xl border hover:border-emerald-500 cursor-pointer"
                  >
                    <Icon className="text-emerald-600 mb-4" />
                    <h3 className="font-bold">{s.name}</h3>
                    <p className="text-sm text-slate-500">
                      {s.mcqs} MCQs
                    </p>
                  </div>
                );
              })}
            </div>

            <h2 className="text-2xl font-bold mb-6">Previous Exams</h2>
            {EXAMS.map((e) => (
              <div
                key={e.id}
                className="bg-white p-5 rounded-xl border mb-3 flex justify-between"
              >
                <div>
                  <h4 className="font-bold">{e.name}</h4>
                  <p className="text-xs text-slate-500">
                    {e.year} • {e.mcqs} MCQs
                  </p>
                </div>
                <button className="text-emerald-600 font-bold">
                  Attempt
                </button>
              </div>
            ))}
          </main>
        </>
      )}

      {/* -------------------- QUIZ -------------------- */}
      {view === "quiz" && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <button
            onClick={() => setView("home")}
            className="flex gap-2 mb-6 text-slate-500"
          >
            <ArrowLeft /> Back
          </button>

          {!finished ? (
            <div className="bg-white rounded-3xl p-8 shadow">
              <div className="h-2 bg-slate-100 mb-6">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${((current + 1) / STORAGE_QUIZ.length) * 100}%`,
                  }}
                />
              </div>

              <h2 className="font-bold text-xl mb-6">
                {STORAGE_QUIZ[current].question}
              </h2>

              <div className="space-y-4">
                {STORAGE_QUIZ[current].options.map((opt) => {
                  const correct = opt === STORAGE_QUIZ[current].answer;
                  const selectedOpt = opt === selected;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={answered}
                      className={`w-full p-4 rounded-xl border text-left font-bold ${
                        !answered
                          ? "hover:border-emerald-500"
                          : correct
                          ? "bg-emerald-50 border-emerald-500"
                          : selectedOpt
                          ? "bg-red-50 border-red-500"
                          : "opacity-40"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-6 bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm mb-4">
                    {STORAGE_QUIZ[current].explanation}
                  </p>
                  <button
                    onClick={next}
                    className="bg-slate-900 text-white w-full py-3 rounded-xl"
                  >
                    {current + 1 === STORAGE_QUIZ.length
                      ? "View Result"
                      : "Next Question"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl text-center shadow">
              <Trophy className="mx-auto text-emerald-500 mb-4" size={64} />
              <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
              <p className="mb-6">
                Score:{" "}
                <span className="font-black text-emerald-600">
                  {score}/{STORAGE_QUIZ.length}
                </span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={retryQuiz}
                  className="bg-emerald-600 text-white w-full py-3 rounded-xl"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-slate-100 w-full py-3 rounded-xl"
                >
                  Home
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------- FOOTER -------------------- */}
      <footer className="bg-white border-t mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">Jkssbmark</h3>
            <p className="text-sm text-slate-500">
              JKSSB exam preparation platform
            </p>
          </div>
          <div>
            <p className="flex gap-2 text-sm">
              <Mail className="text-emerald-500" /> ajjumir2020@gmail.com
            </p>
            <p className="flex gap-2 text-sm">
              <MapPin className="text-emerald-500" /> Srinagar, J&K
            </p>
          </div>
          <div className="text-sm text-slate-500">
            © 2025 Azhar Jahangir Mir
          </div>
        </div>
      </footer>
    </div>
  );
      }
