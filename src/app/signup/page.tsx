
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from "lucide-react"
import { useAuth, useUser, initiateEmailSignUp } from "@/firebase"


export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignUp = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      await initiateEmailSignUp(auth, email, password);
      // The onAuthStateChanged listener will handle the redirect
      // after a successful sign-up.
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign-up Failed",
        description: error.message || "Could not create an account.",
      });
      setLoading(false);
    }
  };


  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
              disabled={loading}
            />
          </div>
          <Button className="w-full mt-2" onClick={handleSignUp} disabled={loading}>
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

