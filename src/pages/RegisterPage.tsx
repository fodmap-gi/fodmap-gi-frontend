import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [breakfast, setBreakfast] = useState("08:00");
  const [lunch, setLunch] = useState("12:00");
  const [dinner, setDinner] = useState("18:00");

  const [touchedSave, setTouchedSave] = useState(false);

  const errors = {
    name: !name.trim(),
    breakfast: !breakfast,
    lunch: !lunch,
    dinner: !dinner,
  };

  const saveProfile = () => {
    setTouchedSave(true);

    if (Object.values(errors).some((v) => v)) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        name,
        notification: { breakfast, lunch, dinner },
      })
    );

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="container max-w-md mx-auto py-10">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-primary rounded-3xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">ตั้งค่าผู้ใช้งาน</h1>
          <p className="text-muted-foreground text-sm">
            กรุณากรอกข้อมูลเพื่อเริ่มใช้งาน
          </p>
        </div>

        <Card className="shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-6">

            {/* Name */}
            <div>
              <h3
                className={`font-semibold mb-2 ${
                  touchedSave && errors.name ? "text-red-700" : ""
                }`}
              >
                ชื่อ-นามสกุล
              </h3>

              <Input
                placeholder="ชื่อ และนามสกุลของคุณ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`h-12 ${
                  touchedSave && errors.name
                    ? "border-red-400 bg-red-100"
                    : ""
                }`}
              />

              {touchedSave && errors.name && (
                <p className="text-sm text-red-700 mt-1">
                  กรุณากรอกชื่อ
                </p>
              )}
            </div>

            {/* Times */}
            <Card className="shadow-md border-0">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold mb-2">
                  เวลาแจ้งเตือนการรับประทานอาหาร
                </h3>

                {[
                  { label: "มื้อเช้า", value: breakfast, set: setBreakfast, error: errors.breakfast },
                  { label: "มื้อกลางวัน", value: lunch, set: setLunch, error: errors.lunch },
                  { label: "มื้อเย็น", value: dinner, set: setDinner, error: errors.dinner },
                ].map((item, i) => (
                  <div key={i}>
                    <label
                      className={`text-sm ${
                        touchedSave && item.error
                          ? "text-red-700"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </label>

                    <div className="relative">
                      <Input
                        type="time"
                        value={item.value}
                        onChange={(e) => item.set(e.target.value)}
                        className={`h-12 pl-12 ${
                          touchedSave && item.error
                            ? "border-red-400 bg-red-100"
                            : ""
                        }`}
                      />
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    {touchedSave && item.error && (
                      <p className="text-sm text-red-700 mt-1">
                        กรุณาเลือกเวลา
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-12 text-base" onClick={saveProfile}>
              บันทึกข้อมูลและเริ่มใช้งาน
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
