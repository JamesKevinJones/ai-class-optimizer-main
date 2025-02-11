
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CaptchaProps {
  onVerify: () => void;
}

const Captcha = ({ onVerify }: CaptchaProps) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    setError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput === captchaText) {
      onVerify();
      setError("");
    } else {
      setError("Incorrect CAPTCHA. Please try again.");
      generateCaptcha();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>CAPTCHA Verification</Label>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-3 rounded-md font-mono text-lg tracking-wider">
            {captchaText}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={generateCaptcha}
            className="px-2 py-1"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full"
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      <Button
        type="button"
        onClick={handleVerify}
        className="w-full bg-secondary hover:bg-secondary/90"
      >
        Verify CAPTCHA
      </Button>
    </div>
  );
};

export default Captcha;
