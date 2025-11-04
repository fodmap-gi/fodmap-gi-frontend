import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingOverlay } from "@/components/ui/LoadingOverLay";
import { Toast } from "@/components/ui/Toast";

interface AnalysisResult {
  menu: string;
  ingredients: string[];
  symptoms: string[];
  avoid: string[];
}

const Index = () => {
  const [foodMenu, setFoodMenu] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleAnalyze = () => {
    if (!foodMenu.trim()) {
      setToast({ show: true, message: "กรุณาใส่ชื่อเมนูอาหารก่อนตรวจสอบ", type: "error" });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setResult({
        menu: foodMenu,
        ingredients: ["นม","ไข่", "แป้งสาลี"],
        symptoms: ["ท้องอืด", "ปวดท้อง"],
        avoid: ["นม", "แป้งสาลี"],
      });

      setIsLoading(false);
      setToast({ show: true, message: "ตรวจสอบเสร็จสิ้น!", type: "success" });
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-slate-50 p-6 relative transition-all duration-300
      ${!result ? "sm:-translate-y-8" : ""}`}
    >
      <motion.div
        className="w-full max-w-2xl space-y-6"
        animate={{ y: result ? -120 : -200 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">ตรวจสอบอาหาร</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ใส่ชื่อเมนูอาหาร</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="food-input"
              placeholder="เช่น ข้าวผัดกุ้ง"
              value={foodMenu}
              onChange={(e) => setFoodMenu(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
              {isLoading ? "กำลังตรวจสอบ..." : "ตรวจสอบ"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
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
                  <strong>ส่วนประกอบที่ควรหลีกเลี่ยง:</strong>{" "}
                  {result.avoid.map((item, index) => (
                    <span key={index} className="text-red-600 font-semibold">
                      {item}
                      {index < result.avoid.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Overlay & Toast */}
      <LoadingOverlay show={isLoading} />
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default Index;
