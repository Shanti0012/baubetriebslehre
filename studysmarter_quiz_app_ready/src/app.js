import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

const questions = [
  {
    question: "Was bedeutet BauKG?",
    options: [
      { text: "Baustellenkoordinator", correct: false },
      { text: "Baukompressgesetz", correct: false },
      { text: "Baukonrollgesetz", correct: false },
      { text: "Bauarbeitenkoordinationsgesetz", correct: true }
    ]
  },
  {
    question: "Welche Bodenparameter werden durch Injektionsverfahren verbessert?",
    options: [
      { text: "Adhäsion", correct: true },
      { text: "innerer Reibungswinkel", correct: true },
      { text: "Scherwinkel", correct: true },
      { text: "Kohäsion", correct: true }
    ]
  }
];

export default function StudySmarterStyleQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[current];

  const toggleOption = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const isCorrect = () => {
    const correctAnswers = currentQuestion.options
      .map((opt, i) => (opt.correct ? i : null))
      .filter((v) => v !== null);
    return (
      selected.length === correctAnswers.length &&
      selected.every((i) => correctAnswers.includes(i))
    );
  };

  const next = () => {
    setShowResult(false);
    setSelected([]);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Progress value={((current + 1) / questions.length) * 100} className="mb-4" />
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-blue-700">
            {currentQuestion.question}
          </h2>
          <div className="space-y-2">
            {currentQuestion.options.map((opt, idx) => (
              <Button
                key={idx}
                variant={selected.includes(idx) ? "secondary" : "outline"}
                onClick={() => toggleOption(idx)}
                className="w-full justify-start text-left"
              >
                {opt.text}
              </Button>
            ))}
          </div>
          {showResult ? (
            <div className="flex items-center space-x-2">
              {isCorrect() ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              <p>
                {isCorrect() ? "Richtig beantwortet ✅" : "Leider falsch ❌"}
              </p>
            </div>
          ) : (
            <Button onClick={() => setShowResult(true)} className="w-full">
              Antwort überprüfen
            </Button>
          )}
          {showResult && current < questions.length - 1 && (
            <Button onClick={next} className="w-full mt-2" variant="ghost">
              Nächste Frage
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}