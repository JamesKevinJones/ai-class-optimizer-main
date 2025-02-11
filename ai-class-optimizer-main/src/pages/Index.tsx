import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Logo from "@/components/Logo";
import Captcha from "@/components/Captcha";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast({
        variant: "destructive",
        title: "CAPTCHA verification required",
        description: "Please complete the CAPTCHA verification.",
      });
      return;
    }
    
    // For demo purposes, accept any valid email
    if (email && password) {
      navigate("/setup");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please enter valid email and password.",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Logo Section */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-8 animate-slide-in">
        <Logo />
      </div>

      {/* Login Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8 animate-fade-in">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-3xl font-semibold text-center mb-8">Teacher Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <Captcha onVerify={() => setIsVerified(true)} />

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Index;
