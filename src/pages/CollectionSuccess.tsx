import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate} from "react-router-dom";

const CollectionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 pt-10">
      <div className="container max-w-md mx-auto py-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-green-500 rounded-3xl mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-green-700">
            บันทึกข้อมูลสำเร็จ
          </h1>
          <p className="text-muted-foreground text-sm">
            ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว
          </p>
        </div>

        <Card className="shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-4">
            <Button className="w-full h-12" onClick={() => navigate("/collection")}>
              บันทึกการกินเพิ่มเติม
            </Button>

        
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionSuccess;
