import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-white/10 p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Access your account and manage orders</p>
        </div>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/40">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" className="bg-black/20 border-white/10" />
              </div>
              <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90 mt-4">
                Sign In
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
             <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input className="bg-black/20 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pass">Password</Label>
                <Input id="reg-pass" type="password" className="bg-black/20 border-white/10" />
              </div>
              <Button type="submit" className="w-full h-10 bg-primary hover:bg-primary/90 mt-4">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </Card>
    </div>
  );
}
