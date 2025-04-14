import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function HeroPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-bold text-white">SecureAuth</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-center px-4 py-20 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="mb-6 inline-flex items-center rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1">
                  <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                    New
                  </span>
                  <span className="text-sm text-gray-300">Introducing our enhanced security features</span>
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Secure authentication for your modern applications
                </h1>
                <p className="mb-8 max-w-lg text-lg text-gray-400">
                  A complete authentication solution with all the features you need to secure your application. Easy to
                  integrate, customizable, and built with modern best practices.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-75 blur-xl"></div>
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/90 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                    <div className="flex space-x-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">Authentication Preview</div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 text-center">
                      <h3 className="text-xl font-bold text-white">Welcome back</h3>
                      <p className="text-sm text-gray-400">Sign in to your account to continue</p>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                        <label className="mb-1 block text-xs text-gray-400">Email</label>
                        <div className="text-sm text-white">user@example.com</div>
                      </div>
                      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                        <label className="mb-1 block text-xs text-gray-400">Password</label>
                        <div className="text-sm text-white">••••••••</div>
                      </div>
                      <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white">
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-900/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Key Features</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Everything you need to implement secure, modern authentication in your application
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Secure by Default</h3>
                <p className="text-gray-400">
                  Built with security best practices including password hashing, rate limiting, and protection against
                  common vulnerabilities.
                </p>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Fast Integration</h3>
                <p className="text-gray-400">
                  Get up and running quickly with our easy-to-use API and comprehensive documentation. Integrate in
                  minutes, not days.
                </p>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Complete Solution</h3>
                <p className="text-gray-400">
                  Includes everything you need: login, signup, password reset, email verification, and profile
                  management.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-white">Ready to get started?</h2>
                  <p className="mb-6 text-gray-400">
                    Join thousands of developers who trust our authentication solution for their applications.
                  </p>
                  <Link href="/signup">
                    <Button size="lg">Create your account</Button>
                  </Link>
                </div>
                <div className="flex flex-col justify-center space-y-4 md:items-end">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">Free tier available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-300">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-gray-800 bg-gray-900/50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-white" />
                <span className="ml-2 text-lg font-bold text-white">SecureAuth</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Secure, modern authentication for your applications
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} SecureAuth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
