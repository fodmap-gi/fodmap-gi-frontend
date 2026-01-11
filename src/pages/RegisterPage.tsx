import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* TIME CONSTANTS */
const HOURS_12 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const MINUTES = ["00","15","30","45"];
const MERIDIEM = ["AM","PM"];

const to24 = (h12:string,m:string,ap:string)=>{
  let h = parseInt(h12)%12;
  if(ap==="PM") h+=12;
  return `${String(h).padStart(2,"0")}:${m}`;
};

export default function RegisterPage(){
  const navigate = useNavigate();
  const [name,setName]=useState("");

  const [breakfast,setBreakfast]=useState({h:"08",m:"00",ap:"AM"});
  const [lunch,setLunch]=useState({h:"12",m:"00",ap:"PM"});
  const [dinner,setDinner]=useState({h:"06",m:"00",ap:"PM"});

  const [touchedSave,setTouchedSave]=useState(false);

  const errors={
    name:!name.trim(),
    breakfast:false,lunch:false,dinner:false
  };

  const saveProfile=()=>{
    setTouchedSave(true);
    if(errors.name){ alert("กรุณากรอกข้อมูลให้ครบ"); return; }

    const payload = {
    name: name.trim(),
    notification: {
      breakfast: to24(breakfast.h, breakfast.m, breakfast.ap),
      lunch: to24(lunch.h, lunch.m, lunch.ap),
      dinner: to24(dinner.h, dinner.m, dinner.ap)
    }
  };
    localStorage.setItem("userProfile",JSON.stringify({
      name,
      notification:{
        breakfast:to24(breakfast.h,breakfast.m,breakfast.ap),
        lunch:to24(lunch.h,lunch.m,lunch.ap),
        dinner:to24(dinner.h,dinner.m,dinner.ap)
      }
    }));
    navigate("/profile");
  };

  return(
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
   <div className="container max-w-md mx-auto py-10">

    <div className="text-center mb-8">
      <div className="inline-block p-4 bg-primary rounded-3xl mb-4">
        <User className="w-8 h-8 text-white"/>
      </div>
      <h1 className="text-3xl font-bold mb-2">ตั้งค่าผู้ใช้งาน</h1>
      <p className="text-muted-foreground text-sm">กรุณากรอกข้อมูลเพื่อเริ่มใช้งาน</p>
    </div>

    <Card>
     <CardContent className="pt-6 space-y-6">

      <div>
        <h3 className={`font-semibold mb-2 ${touchedSave&&errors.name?"text-red-700":""}`}>ชื่อ-นามสกุล</h3>
        <Input value={name} onChange={e=>setName(e.target.value)}
        placeholder="ชื่อ และนามสกุลของคุณ"
        className={`h-12 ${touchedSave&&errors.name?"border-red-400 bg-red-100":""}`} />
      </div>

      <Card>
       <CardContent className="pt-6 space-y-4">
        <h3 className="font-semibold mb-2">เวลาการรับประทานอาหาร</h3>

{[
 {label:"มื้อเช้า",v:breakfast,s:setBreakfast},
 {label:"มื้อกลางวัน",v:lunch,s:setLunch},
 {label:"มื้อเย็น",v:dinner,s:setDinner}
].map((item,i)=>(
<div key={i}>
 <label className="text-sm text-muted-foreground">{item.label}</label>
 <div className="grid grid-cols-3 gap-2 mt-1">

  <select value={item.v.ap} onChange={e=>item.s({...item.v,ap:e.target.value})} className="h-12 border rounded-md px-2">
   {MERIDIEM.map(x=><option key={x}>{x}</option>)}
  </select>

  <select value={item.v.h} onChange={e=>item.s({...item.v,h:e.target.value})} className="h-12 border rounded-md px-2">
   {HOURS_12.map(x=><option key={x}>{x}</option>)}
  </select>

  <select value={item.v.m} onChange={e=>item.s({...item.v,m:e.target.value})} className="h-12 border rounded-md px-2">
   {MINUTES.map(x=><option key={x}>{x}</option>)}
  </select>

 </div>
</div>
))}
       </CardContent>
      </Card>

      <Button className="w-full h-12" onClick={saveProfile}>บันทึกข้อมูลและเริ่มใช้งาน</Button>

     </CardContent>
    </Card>
   </div>
  </div>
  );
}
