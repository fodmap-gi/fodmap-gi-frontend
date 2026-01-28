import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* TIME CONSTANTS */
const HOURS_12 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const MINUTES = ["00","15","30","45"];
const MERIDIEM = ["AM","PM"];

const to24 = (h12:string,m:string,ap:string)=>{
  let h = parseInt(h12) % 12;
  if(ap === "PM") h += 12;
  return `${String(h).padStart(2,"0")}:${m}`;
};

const from24 = (time:string)=>{
  const [h,m] = time.split(":");
  let hour = parseInt(h);
  const ap = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return { h: String(hour).padStart(2,"0"), m, ap };
};

export default function EditProfilePage(){
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");

  const [name,setName] = useState("");
  const [breakfast,setBreakfast] = useState({h:"08",m:"00",ap:"AM"});
  const [lunch,setLunch] = useState({h:"12",m:"00",ap:"PM"});
  const [dinner,setDinner] = useState({h:"06",m:"00",ap:"PM"});

  /* preload existing data */
  useEffect(()=>{
    if(!profile.name){
      navigate("/register");
      return;
    }

    setName(profile.name);
    setBreakfast(from24(profile.notification.breakfast));
    setLunch(from24(profile.notification.lunch));
    setDinner(from24(profile.notification.dinner));
  },[]);

  const saveEdit = ()=>{
    localStorage.setItem("userProfile", JSON.stringify({
      name,
      notification:{
        breakfast: to24(breakfast.h,breakfast.m,breakfast.ap),
        lunch: to24(lunch.h,lunch.m,lunch.ap),
        dinner: to24(dinner.h,dinner.m,dinner.ap),
      }
    }));

    navigate("/profile");
  };

  return(
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="container max-w-md mx-auto py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary rounded-3xl mb-4">
            <User className="w-8 h-8 text-white"/>
          </div>
          <h1 className="text-3xl font-bold mb-2">แก้ไขข้อมูลผู้ใช้งาน</h1>
          <p className="text-muted-foreground text-sm">
            ปรับชื่อและเวลาแจ้งเตือน
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">

            <div>
              <label className="text-sm text-muted-foreground">ชื่อ-นามสกุล</label>
              <Input className="h-12 mt-1" value={name} onChange={e=>setName(e.target.value)} />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                เวลาแจ้งเตือน
              </h3>

              {[
                {label:"มื้อเช้า",v:breakfast,s:setBreakfast},
                {label:"มื้อกลางวัน",v:lunch,s:setLunch},
                {label:"มื้อเย็น",v:dinner,s:setDinner}
              ].map((item,i)=>(
                <div key={i}>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <select className="h-12 border rounded-md px-2"
                      value={item.v.ap}
                      onChange={e=>item.s({...item.v,ap:e.target.value})}>
                      {MERIDIEM.map(x=><option key={x}>{x}</option>)}
                    </select>

                    <select className="h-12 border rounded-md px-2"
                      value={item.v.h}
                      onChange={e=>item.s({...item.v,h:e.target.value})}>
                      {HOURS_12.map(x=><option key={x}>{x}</option>)}
                    </select>

                    <select className="h-12 border rounded-md px-2"
                      value={item.v.m}
                      onChange={e=>item.s({...item.v,m:e.target.value})}>
                      {MINUTES.map(x=><option key={x}>{x}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full h-12" onClick={saveEdit}>
              บันทึกการเปลี่ยนแปลง
            </Button>

            <Button variant="outline" className="w-full h-12" onClick={()=>navigate("/profile")}>
              ยกเลิก
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
