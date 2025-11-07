import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";

interface AnalysisResult {
  menu: string;
  ingredients: string[];
  symptoms: string[];
  avoid: string[];
}

const Index = () => {
  const [foodMenu, setFoodMenu] = useState(""); // Input state
  const [result, setResult] = useState<AnalysisResult | null>(null); // Result state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to simulate API call
  const handleAnalyze = async() => {
    if (!foodMenu.trim()) return; // Ignore empty input

    setIsLoading(true); // Show loading

    try {
      const response = await fetch(encodeURI('https://fodmaps.wtfywmtfk.com/dish/' + foodMenu))
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResult(data);
      }
    } catch {
      throw new Error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">ตรวจสอบอาหาร</h1>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>ใส่ชื่อเมนูอาหาร</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                id="food-input"
                placeholder="เช่น ข้าวผัดกุ้ง"
                value={foodMenu}
                onChange={(e) => setFoodMenu(e.target.value)}
              />
            </div>
            <Button onClick={handleAnalyze} disabled={!foodMenu.trim() || isLoading} className="w-full">
              {isLoading ? "กำลังตรวจสอบ" : "ตรวจสอบ"}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>ผลการตรวจสอบ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>เมนู:</strong> {result.menu}
              </div>
              <div>
                <strong>ส่วนประกอบ:</strong> {result.ingredients.join(", ")}
              </div>
              <div>
                <strong>อาการที่อาจเกิด:</strong> {result.symptoms.join(", ")}
              </div>
              <div>
                <strong>ส่วนประกอบที่ควรหลีกเลี่ยง:</strong> {result.avoid.join(", ")}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
