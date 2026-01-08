import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Judix
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Streamline your legal practice with our comprehensive case management system. 
          Organize cases, track client information, and manage your workflow efficiently.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="px-8 py-3 text-lg">
              Login
            </Button>
          </Link>
          
          <Link href="/register">
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Register
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Management</h3>
            <p className="text-gray-600">Organize and track all your cases in one place</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Tracking</h3>
            <p className="text-gray-600">Keep detailed records of client information</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
          </div>
        </div>
      </div>
    </main>
  );
}
