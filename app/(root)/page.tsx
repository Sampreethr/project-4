import { auth } from "@/auth";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Search, Users } from "lucide-react";

const Home = async () => {
  const session = await auth();
  const user = session?.user as User | undefined;

  return (
    <div className="container mx-auto px-4 pt-[120px] pb-20 flex flex-col items-center lg:pl-0">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6 sm:text-5xl">
          Welcome to <span className="text-primary">DevFlow</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          A community-driven platform for developers to ask questions, share
          knowledge, and grow together.
        </p>

        {user ? (
          <div className="mt-10 flex flex-col items-center">
            {/* User information card */}
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-6 mb-10">
              <div className="flex items-center gap-4">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User profile"}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-primary"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="text-left flex-1">
                  <p className="text-lg font-medium text-foreground">
                    Welcome back,{" "}
                    <span className="text-primary">{user.name || "User"}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Ask Questions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get help from the community with your coding problems
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Find Solutions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Search through a vast library of questions and answers
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Build your network with like-minded developers
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              >
                Ask a Question
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted rounded-lg"
              >
                Browse Questions
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            {/* Features for non-logged in users */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Expert Help
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get solutions from experienced developers around the world
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Vibrant Community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of developers sharing knowledge daily
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  Growth Opportunities
                </h3>
                <p className="text-sm text-muted-foreground">
                  Build your reputation and advance your developer career
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
