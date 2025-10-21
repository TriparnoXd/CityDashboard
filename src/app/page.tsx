
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
import { useAuth, useUser } from "@/firebase"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.44 0-6.24-2.82-6.24-6.3s2.8-6.3 6.24-6.3c1.88 0 3.24.75 4.03 1.5l2.43-2.32C17.43 2.92 15.21 2 12.48 2 7.19 2 3.1 5.9 3.1 11s4.09 9 9.38 9c5.17 0 9.1-3.53 9.1-9.25 0-.75-.08-1.25-.18-1.83H12.48z" fill="currentColor"></path>
    </svg>
)

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState<'google' | 'email' | false>(false);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);


  const handleSignIn = async () => {
    if(!auth) return;
    setLoading('email');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the redirect
    } catch (error: any) {
       toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
        });
       setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if(!auth) return;
    setLoading('google');
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        // onAuthStateChanged will handle the redirect
    } catch (error: any) {
        if (error.code !== 'auth/popup-closed-by-user') {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: error.message || "Could not sign in with Google.",
            });
        }
        setLoading(false);
    }
  }

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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
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
              disabled={!!loading}
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
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
              disabled={!!loading}
            />
          </div>
          <Button className="w-full mt-2" onClick={handleSignIn} disabled={!!loading}>
            {loading === 'email' && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
           <div className="relative mt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={!!loading}>
            {loading === 'google' ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4 fill-current" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
