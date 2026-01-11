import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";

interface PreviewState {
  foodInputs: string[];
  meal: string;
  bloat: "yes" | "no" | "";
  bloatLvl: number;
  pain: "yes" | "no" | "";
  painLvl: number;
  time: string;
}

const CollectionPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PreviewState | null;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 space-y-4 text-center">
            <p className="text-red-600">ไม่พบข้อมูลสำหรับแสดงผล</p>
            <Button onClick={() => navigate("/collection")}>กลับไปหน้าบันทึก</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { foodInputs, meal, bloat, bloatLvl, pain, painLvl, time } = state;

  return (
    <div className="min-h-screen bg-background">

      <div className="container max-w-md mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-primary rounded-3xl mb-4 shadow-lg">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ตรวจสอบข้อมูลก่อนบันทึก
          </h1>
        </div>

        <Card className="shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-6">

            {/* Menus */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-2">
                <h3 className="font-semibold">เมนูที่รับประทาน</h3>
                <ul className="list-disc list-inside text-sm">
                  {foodInputs.filter(f => f.trim()).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Meal */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-2">
                <h3 className="font-semibold">มื้ออาหาร</h3>
                <p className="text-sm">{meal}</p>
              </CardContent>
            </Card>

            {/* Bloat */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-2">
                <h3 className="font-semibold">อาการแน่นท้อง</h3>
                <p className="text-sm">
                  {bloat === "yes" ? `มีอาการ (ระดับ ${bloatLvl})` : "ไม่มีอาการ"}
                </p>
              </CardContent>
            </Card>

            {/* Pain */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-2">
                <h3 className="font-semibold">อาการปวดท้อง</h3>
                <p className="text-sm">
                  {pain === "yes" ? `มีอาการ (ระดับ ${painLvl})` : "ไม่มีอาการ"}
                </p>
              </CardContent>
            </Card>

            {/* Time */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> เวลาที่บันทึก
                </h3>
                <p className="text-sm">{new Date(time).toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() =>
                    navigate("/collection", {
                    state: {
                        restore: true,
                        foodInputs,
                        meal,
                        bloat,
                        bloatLvl,
                        pain,
                        painLvl,
                        time,
                    },
                    })
                }
                >
                แก้ไขข้อมูล
                </Button>

                <Button
                className="w-full h-12"
                onClick={() =>
                    navigate("/collection/success", {
                    state: {
                        foodInputs,
                        meal,
                        bloat,
                        bloatLvl,
                        pain,
                        painLvl,
                        time,
                    },
                    })
                }
                >
                ยืนยันบันทึกข้อมูล
                </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionPreview;
