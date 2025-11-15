import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Utensils } from "lucide-react";
import { Search, AlertCircle, Info, XCircle, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";


const CollectionMode = () => {
  const [foodInputs, setFoodInputs] = useState<string[]>([""]); 

  const updateInput = (index: number, value: string) => {
    const newInputs = [...foodInputs];
    newInputs[index] = value;
    setFoodInputs(newInputs);
  };

  const addInput = () => {
    setFoodInputs([...foodInputs, ""]);
  };

  const removeInput = (index: number) => {
    const newInputs = foodInputs.filter((_, i) => i !== index);
    setFoodInputs(newInputs);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      addInput();
    }
  };

  const [meal, setMeal] = useState("");
  const [bloat, setBloat] = useState<"yes" | "no" | "">("");
  const [bloatLvl, setBloatLvl] = useState(0);

  const [pain, setPain] = useState<"yes" | "no" | "">("");
  const [painLvl, setPainLvl] = useState(0);

  const getNowDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months 0-11
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getNowDateTimeLocal());

  const [touchedSave, setTouchedSave] = useState(false);

  const [errors, setErrors] = useState({
    menus: false,
    meal: false,
    bloatSelect: false,
    bloatLvl: false,
    painSelect: false, 
  painLvl: false,   
});

  const saveData = () => {
  setTouchedSave(true); // mark that the user tried saving

  const hasEmptyMenu = foodInputs.some((f) => f.trim() === "");

  const newErrors = {
    menus: hasEmptyMenu,
    meal: !meal,
    bloatSelect: !bloat, 
    bloatLvl: bloat === "yes" && bloatLvl === 0,
    painSelect: !pain,                           
    painLvl: pain === "yes" && painLvl === 0,  
  };

  setErrors(newErrors);

  // Show alert if any field has an error
  if (Object.values(newErrors).some((v) => v)) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  const timestamp = new Date(time).getTime();

  console.log({
    menus: foodInputs,
    meal,
    bloat,
    bloatLvl,
    pain,
    painLvl,
    time: timestamp,
  });

  alert("บันทึกสำเร็จ");
};


  return (
    
    <div className="min-h-screen bg-background">
      {/* Back */}
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
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            บันทึกการกิน
          </h1>
        </div>

        <Card className="shadow-lg border-0 animate-slide-up">
          <CardContent className="pt-6 space-y-6">

            {/* Menu Input */}
            <div>
              <Card className="mb-6 shadow-lg border-0 animate-slide-up">
                <CardContent className="pt-6 space-y-4">
                  <h3 className={`font-semibold mb-2 ${touchedSave && errors.meal ? "text-red-700" : "text-foreground"}`}>
                      เมนูที่รับประทาน
                    </h3>
                  {foodInputs.map((input, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          placeholder="ระบุชื่อเมนูอาหาร เช่น ข้าวผัด, ต้มยำกุ้ง"
                          value={input}
                          onChange={(e) => updateInput(index, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          className={`pr-12 h-12 text-base border focus:border-primary 
                            ${touchedSave && errors.menus && input.trim() === "" ? "bg-red-100 border-red-400" : "border-primary-20 bg-white"}`}
                        />

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
                    <Plus className="w-4 h-4 mr-2" /> เพิ่มอีกเมนู
                  </Button>
                  
                </CardContent>
              </Card>

              
            </div>

            {/* Meal Select */}
            <div>
              <Card className="shadow-lg border-0 animate-slide-up">
                <CardContent className="pt-6 space-y-6">

                  <div>
                    {/* Header */}
                    <h3 className={`font-semibold mb-2 ${touchedSave && errors.meal ? "text-red-700" : "text-foreground"}`}>
                      มื้ออาหาร
                    </h3>

                    {/* Meal buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      {["มื้อเช้า", "มื้อกลางวัน", "มื้อเย็น", "มื้ออื่น ๆ"].map((m) => (
                        <Button
                          key={m}
                          onClick={() => {
                            setMeal(m);
                            if (touchedSave && errors.meal) {
                              // Clear error once user selects a meal
                              setErrors((prev) => ({ ...prev, meal: false }));
                            }
                          }}
                          variant={meal === m ? "default" : "outline"}
                          className="py-3 text-sm"
                        >
                          {m}
                        </Button>
                      ))}
                    </div>

                    {/* Red block appears only after pressing บันทึก */}
                    {touchedSave && errors.meal && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                        กรุณาเลือกมื้ออาหาร
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>

            </div>

            {/* Bloating */}
            <Card className="shadow-lg border-0 animate-slide-up">
              <CardContent className="pt-6 space-y-4">

                <h3
                  className={`font-semibold mb-2 ${
                    touchedSave && (errors.bloatSelect || errors.bloatLvl)
                      ? "text-red-700"
                      : "text-foreground"
                  }`}
                >
                  คุณมีอาการอึดอัดแน่นท้องไหม?
                </h3>


                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      setBloat("yes");
                      if (touchedSave) {
                        setErrors((prev) => ({ ...prev, bloatSelect: false }));
                      }
                    }}
                    variant={bloat === "yes" ? "default" : "outline"}
                  >
                    มีอาการ
                  </Button>

                  <Button
                    onClick={() => {
                      setBloat("no");
                      if (touchedSave) {
                        setErrors((prev) => ({ ...prev, bloatSelect: false, bloatLvl: false }));
                      }
                    }}
                    variant={bloat === "no" ? "default" : "outline"}
                  >
                    ไม่มีอาการ
                  </Button>
                </div>

                {/* Red error messages */}
                {touchedSave && errors.bloatSelect && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                    กรุณาเลือกอาการแน่นท้อง
                  </div>
                )}

                {bloat === "yes" && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-muted-foreground">
                      ระดับความรุนแรงของอาการแน่นท้อง: <span className="font-semibold">{bloatLvl}</span>
                    </p>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={bloatLvl}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setBloatLvl(value);
                        if (touchedSave && errors.bloatLvl && value > 0) {
                          setErrors((prev) => ({ ...prev, bloatLvl: false }));
                        }
                      }}
                      className="w-full"
                    />

                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      {[...Array(11)].map((_, i) => (
                        <span key={i}>{i}</span>
                      ))}
                    </div>

                    {/* Slider error */}
                    {touchedSave && errors.bloatLvl && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                        กรุณาปรับระดับความรุนแรงของอาการแน่นท้อง
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pain */}
              <Card className="shadow-lg border-0 animate-slide-up">
                <CardContent className="pt-6 space-y-4">

                  <h3
                  className={`font-semibold mb-2 ${
                    touchedSave && (errors.painSelect || errors.painLvl)
                      ? "text-red-700"
                      : "text-foreground"
                  }`}
                >
                  คุณมีอาการปวดท้องไหม?
                </h3>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => {
                        setPain("yes");
                        if (touchedSave) {
                          setErrors((prev) => ({ ...prev, painSelect: false }));
                        }
                      }}
                      variant={pain === "yes" ? "default" : "outline"}
                    >
                      มีอาการ
                    </Button>

                    <Button
                      onClick={() => {
                        setPain("no");
                        if (touchedSave) {
                          setErrors((prev) => ({ ...prev, painSelect: false, painLvl: false }));
                        }
                      }}
                      variant={pain === "no" ? "default" : "outline"}
                    >
                      ไม่มีอาการ
                    </Button>
                  </div>

                  {/* Red error messages */}
                  {touchedSave && errors.painSelect && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                      กรุณาเลือกอาการปวดท้อง
                    </div>
                  )}

                  {pain === "yes" && (
                    <div className="mt-4">
                      <p className="mb-2 text-sm text-muted-foreground">
                        ระดับความรุนแรงของอาการปวดท้อง: <span className="font-semibold">{painLvl}</span>
                      </p>

                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={painLvl}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setPainLvl(value);

                          // Remove slider error when user moves the slider to a valid value
                          if (touchedSave && errors.painLvl && value > 0) {
                            setErrors((prev) => ({ ...prev, painLvl: false }));
                          }
                        }}
                        className="w-full"
                      />

                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        {[...Array(11)].map((_, i) => (
                          <span key={i}>{i}</span>
                        ))}
                      </div>

                      {/* Slider error */}
                      {touchedSave && errors.painLvl && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mt-2 text-sm">
                          กรุณาปรับระดับความรุนแรงของอาการปวดท้อง
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

            {/* Time */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">เวลาที่บันทึกข้อมูล</h3>

              <div className="relative">
                <Input
                  type="datetime-local"
                  className="h-12 text-base pl-12"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>



            {/* Save */}
            <Button
              className="w-full h-12 text-base mt-2"
              onClick={saveData}
            >
              บันทึกข้อมูล
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionMode;
