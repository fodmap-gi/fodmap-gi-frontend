// pages/ProfilePage.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");

  if (!profile.name) {
    navigate("/register");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="container max-w-md mx-auto py-10">

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-primary rounded-3xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">ข้อมูลผู้ใช้งาน</h1>
          <p className="text-muted-foreground text-sm">
            ข้อมูลเวลาแจ้งเตือนการรับประทานอาหาร
          </p>
        </div>

        <Card className="shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-6">

            {/* Name */}
            <div className="bg-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">ชื่อผู้ใช้งาน</p>
              <p className="font-semibold text-lg">{profile.name}</p>
            </div>

            {/* Times */}
            <div className="space-y-3">

              {[
                { label: "มื้อเช้า", value: profile.notification.breakfast },
                { label: "มื้อกลางวัน", value: profile.notification.lunch },
                { label: "มื้อเย็น", value: profile.notification.dinner },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between bg-muted rounded-xl p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.label}</p>
                    <p className="font-semibold text-lg">{t.value}</p>
                  </div>
                  <Clock className="text-muted-foreground" />
                </div>
              ))}
            </div>

            <Link to="/collection">
              <Button className="w-full h-12 text-base">
                ไปหน้า "บันทึกการกิน"
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full h-12 text-base text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem("userProfile");
                navigate("/register");
              }}
            >
              เปลี่ยนเวลาแจ้งเตือน
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
