import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Trophy, 
  FileText, 
  ChevronRight, 
  GraduationCap, 
  Zap,
  Globe,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database
} from 'lucide-react';

// --- Storage Quiz Data ---
const STORAGE_QUIZ = [
  {
    id: 1,
    question: "Which of the following is a non-volatile storage device?",
    options: ["RAM", "Cache Memory", "Hard Disk Drive", "Registers"],
    answer: "Hard Disk Drive",
    explanation: "Non-volatile storage retains data even when power is lost. HDDs and SSDs are non-volatile, while RAM is volatile."
  },
  {
    id: 2,
    question: "What does SSD stand for in computer storage?",
    options: ["Solid State Drive", "System Storage Device", "Static Silver Disk", "Super Speed Drive"],
    answer: "Solid State Drive",
    explanation: "SSDs use flash memory to store data, making them significantly faster and more durable than mechanical hard drives."
  },
  {
    id: 3,
    question: "Which storage medium has the fastest data access speed?",
    options: ["Optical Disk", "Magnetic Tape", "NVMe SSD", "Floppy Disk"],
    answer: "NVMe SSD",
    explanation: "NVMe SSDs connect directly to the PCIe slot, providing the fastest data transfer rates available today."
  },
  {
    id: 4,
    question: "How much data can a standard single-layer Blu-ray disc hold?",
    options: ["4.7 GB", "700 MB", "25 GB", "100 GB"],
    answer: "25 GB",
    explanation: "A standard single-layer Blu-ray holds 25GB, whereas a DVD holds 4.7GB and a CD holds 700MB."
  },
  {
    id: 5,
    question: "Which technology is used in Magnetic Tapes for storage?",
    options: ["Laser Beams", "Sequential Access", "Random Access", "Flash Memory"],
    answer: "Sequential Access",
    explanation: "Magnetic tapes use sequential access, meaning you must scroll through the tape to find data, unlike the random access used in HDDs."
  }
];

// --- General Subjects ---
const SUBJECTS = [
  { id: 1, name: "Computer Storage", mcqs: 50, icon: <Database className="w-5 h-5" />, quizEnabled: true },
  { id: 2, name: "Accountancy", mcqs: 245, icon: <BookOpen className="w-5 h-5" /> },
  { id: 3, name: "General Knowledge", mcqs: 947, icon: <Trophy className="w-5 h-5" /> },
  { id: 4, name: "History & Culture", mcqs: 425, icon: <Clock className="w-5 h-5" /> },
];

// --- Mock Exam List ---
const EXAMS = [
  { id: 101, name: "JKSSB Graduate Level", year: 2025, mcqs: 120 },
  { id: 102, name: "JKSSB Sub-Inspector", year: 2024, mcqs: 150 },
  { id: 103, name: "JKSSB Finance Assistant", year: 2024, mcqs: 110 },
];

export default function App() {
  const [view, setView] = useState('home'); // 'home' or 'quiz'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Quiz Logic States
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState(false);

  const filteredSubjects = useMemo(() => 
    SUBJECTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())), 
  [searchQuery]);

  const handleAnswer = (option) => {
    if (answered) return;
    setSelectedOpt(option);
    setAnswered(true);
    if (option === STORAGE_QUIZ[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < STORAGE_QUIZ.length) {
      setCurrentQ(currentQ + 1);
      setAnswered(false);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setIsFinished(false);
    setAnswered(false);
    setSelectedOpt(null);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('home')}
          >
            <div className="bg-emerald-600 p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-emerald-600 tracking-tight">Jkssbmark</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => setView('home')} className="hover:text-emerald-600">Home</button>
            <button className="hover:text-emerald-600">Subjects</button>
            <button className="hover:text-emerald-600">Tests</button>
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700">Login</button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <button onClick={() => {setView('home'); setIsMenuOpen(false)}} className="text-left py-2 font-medium">Home</button>
            <button className="text-left py-2 font-medium">Test Series</button>
            <button className="text-left py-2 font-medium">Study Materials</button>
            <button className="bg-emerald-600 text-white py-3 rounded-xl font-bold">Login</button>
          </div>
        )}
      </nav>

      {view === 'home' ? (
        <>
          {/* Hero */}
          <header className="bg-emerald-600 py-12 px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Master JKSSB with Jkssbmark</h1>
              <p className="text-emerald-100 text-lg mb-8">Access the most comprehensive Computer Quiz and MCQ bank in J&K.</p>
              
              <div className="max-w-xl mx-auto relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search storage, hardware, or GK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-emerald-400/20"
                />
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-12">
            {/* Subjects Grid */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Zap className="text-emerald-500 fill-current" size={24} /> Featured Subjects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSubjects.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => s.quizEnabled && setView('quiz')}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {s.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                    <p className="text-slate-500 text-sm">{s.mcqs} Solved Questions</p>
                    {s.quizEnabled && <span className="mt-3 inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest">Start Quiz →</span>}
                  </div>
                ))}
              </div>
            </section>

            {/* Exams Table */}
            <section>
              <h2 className="text-2xl font-bold mb-8">Previous Exam Papers</h2>
              <div className="space-y-4">
                {EXAMS.map(ex => (
                  <div key={ex.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between hover:bg-emerald-50 transition-colors">
                    <div>
                      <h4 className="font-bold">{ex.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Session {ex.year} • {ex.mcqs} MCQs</p>
                    </div>
                    <button className="text-emerald-600 font-bold text-sm">Attempt</button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </>
      ) : (
        /* Quiz Interface */
        <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-500">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          {!isFinished ? (
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="h-2 bg-slate-100">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentQ + 1) / STORAGE_QUIZ.length) * 100}%` }}
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-black uppercase text-emerald-600 tracking-tighter">Question {currentQ + 1} of {STORAGE_QUIZ.length}</span>
                  <Database size={20} className="text-slate-300" />
                </div>
                
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-10 leading-snug">
                  {STORAGE_QUIZ[currentQ].question}
                </h2>

                <div className="grid gap-4 mb-10">
                  {STORAGE_QUIZ[currentQ].options.map((opt, i) => {
                    const isCorrect = opt === STORAGE_QUIZ[currentQ].answer;
                    const isSelected = selectedOpt === opt;
                    let style = "w-full text-left p-5 rounded-2xl border-2 font-bold transition-all flex justify-between items-center ";
                    
                    if (!answered) {
                      style += "border-slate-100 hover:border-emerald-500 hover:bg-emerald-50";
                    } else {
                      if (isCorrect) style += "border-emerald-500 bg-emerald-50 text-emerald-700";
                      else if (isSelected) style += "border-red-500 bg-red-50 text-red-700";
                      else style += "border-slate-50 opacity-40";
                    }

                    return (
                      <button key={i} onClick={() => handleAnswer(opt)} disabled={answered} className={style}>
                        {opt}
                        {answered && isCorrect && <CheckCircle2 size={20} />}
                        {answered && isSelected && !isCorrect && <AlertCircle size={20} />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-500 animate-in slide-in-from-bottom-4">
                    <p className="text-sm text-slate-600 mb-6">
                      <span className="font-bold text-emerald-600">Note: </span>
                      {STORAGE_QUIZ[currentQ].explanation}
                    </p>
                    <button 
                      onClick={nextQuestion}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                      {currentQ + 1 === STORAGE_QUIZ.length ? "View My Results" : "Next Question"} <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl animate-in zoom-in duration-300">
              <Trophy className="mx-auto text-emerald-500 mb-6" size={80} />
              <h2 className="text-4xl font-black mb-2">Well Done!</h2>
              <p className="text-slate-500 mb-10">You've completed the Computer Storage module.</p>
              
              <div className="inline-flex items-center gap-4 bg-emerald-50 px-8 py-4 rounded-3xl mb-12">
                <span className="text-5xl font-black text-emerald-600">{score}</span>
                <span className="text-2xl font-bold text-emerald-200">/</span>
                <span className="text-4xl font-bold text-slate-800">{STORAGE_QUIZ.length}</span>
              </div>

              <div className="grid gap-4">
                <button onClick={resetQuiz} className="bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors">Return to Homepage</button>
                <button 
                  onClick={() => {setCurrentQ(0); setScore(0); setIsFinished(false); setAnswered(false); setSelectedOpt(null)}}
                  className="bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold"
                >
                  Retry Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Jkssbmark</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              J&K's premier platform for digital exam preparation. Sharpen your skills with real exam scenarios.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support & Contact</h4>
            <div className="space-y-4 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Mail size={16} className="text-emerald-500" /> ajjumir2020@gmail.com</p>
              <p className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> Srinagar, Jammu & Kashmir</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">About Developer</h4>
            <p className="text-slate-500 text-sm mb-4">Developed and Maintained by Azhar Jahangir Mir.</p>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-300">© 2025 Azhar Jahangir Mir</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Live v3.2</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

    
