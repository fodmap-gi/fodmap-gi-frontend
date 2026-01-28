import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, AlertCircle, Info, XCircle, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface FoodAnalysis {
  menu: string;
  ingredients: string[];
  symptoms: string[];
  avoid: string[];
}

const CheckingMode = () => {
  const [foodInputs, setFoodInputs] = useState<string[]>([""]);
  const [analyses, setAnalyses] = useState<FoodAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addInput = () => setFoodInputs([...foodInputs, ""]);
  const removeInput = (index: number) => {
    if (foodInputs.length > 1) {
      setFoodInputs(foodInputs.filter((_, i) => i !== index));
    }
  };
  const updateInput = (index: number, value: string) => {
    const newInputs = [...foodInputs];
    newInputs[index] = value;
    setFoodInputs(newInputs);
  };

  const handleAnalyze = async () => {
    const validInputs = foodInputs.filter((input) => input.trim());
    if (!validInputs.length) return;

    setIsAnalyzing(true);

    try {
      let results: FoodAnalysis[] = [];
      const response = await fetch(encodeURI('https://fodmaps.wtfywmtfk.com/dishes'),{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "dishes": foodInputs
        })
      })
      if(response.ok){
        results = await response.json()
      }
      if(results.length === 0){
        alert('dish not found.')
      }
      setAnalyses(results);
    } catch (error) {
      console.error("Error analyzing food:", error);
      alert("เกิดข้อผิดพลาดในการตรวจสอบ");
    } finally {
      setIsAnalyzing(false);
      //setFoodInputs([""]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      if (index === foodInputs.length - 1 && foodInputs[index].trim()) handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Color Test Section */}
      <div className="p-4 space-y-2 mb-6 border rounded-lg">
        <div className="text-sm font-bold mb-2">Back:</div>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="px-6 py-3 bg-gray-500 text-white rounded-lg">
            Back to Main
          </Link>
        </div>

        
      </div>

      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-primary rounded-3xl mb-4 shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">ตรวจสอบอาหาร</h1>
          <p className="text-muted-foreground">ตรวจสอบอาหารและ FODMAP</p>
        </div>

        {/* Input Section */}
        <Card className="mb-6 shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-4">
            {foodInputs.map((input, index) => (
              <div key={index} className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="ระบุชื่อเมนูอาหาร เช่น ข้าวผัด, ต้มยำกุ้ง"
                    value={input}
                    onChange={(e) => updateInput(index, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    className="pr-12 h-12 text-base border-primary-20 focus:border-primary"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                {foodInputs.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeInput(index)}
                    className="h-12 w-12 border-destructive-20 hover:bg-destructive-10 hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addInput}
              className="w-full h-10 text-sm border-primary-20 hover:bg-primary-10 hover:text-primary"
            >
              <Plus className="w-4 h-4 mr-2" /> เพิ่มเมนูอีก
            </Button>

            <Button
              onClick={handleAnalyze}
              disabled={!foodInputs.some((input) => input.trim()) || isAnalyzing}
              className="w-full h-10 text-sm border-primary-20 hover:bg-primary-10 hover:text-primary"
            >
              {isAnalyzing ? "กำลังตรวจสอบ" : "ตรวจสอบเมนู"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {analyses.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <div className="w-1 h-6 bg-linear-to-b from-primary to-accent rounded-full" /> ผลการตรวจสอบ
            </h2>

            {analyses.map((analysis,idx) => (
              <Card key={idx} className="shadow-md border-0 overflow-hidden">
                <div className="h-2 bg-linear-to-r from-primary via-accent to-secondary-blue" />
                <CardContent className="pt-6 space-y-6">
                  {/* Menu */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-primary-10 shrink-0">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">เมนู</h3>
                      <p className="text-lg text-primary font-medium">{analysis.menu}</p>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-accent-10 shrink-0">
                      <Info className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">ส่วนประกอบ</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.ingredients.map((ingredient, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-secondary-blue text-secondary-blue-foreground text-sm rounded-full">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-primary-pink-20 shrink-0">
                      <AlertCircle className="w-5 h-5 text-destructive-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">อาการที่อาจเกิด</h3>
                      <ul className="space-y-2">
                        {analysis.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-pink" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Should Avoid */}
                  <div className="flex items-start gap-3 pt-4 border-t border-border">
                    <div className="p-2 rounded-xl bg-destructive-20 shrink-0">
                      <XCircle className="w-5 h-5 text-destructive-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">ส่วนประกอบที่ควรหลีกเลี่ยง</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.avoid.map((avoid, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-primary-pink text-primary-pink-foreground text-sm rounded-full">
                            {avoid}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckingMode;