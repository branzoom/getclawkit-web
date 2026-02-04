import LocalDoctor from '@/components/LocalDoctor';
import { ShieldCheck, Terminal } from 'lucide-react';

export default function DoctorPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Local Doctor</h1>
                <p className="text-lg text-zinc-400 max-w-2xl">
                    A safe, read-only script to diagnose your local environment.
                    Checks Node.js versions, directory permissions, and basic connectivity.
                </p>
            </div>

            <div className="mb-16">
                <LocalDoctor />
            </div>

            <div className="border-t border-white/10 pt-12">
                <h2 className="text-2xl font-bold text-white mb-6">How to use</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="bg-zinc-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                            <span>Copy the script</span>
                        </div>
                        <p className="text-sm text-zinc-400 pl-8">Select your OS (Unix or Windows) and click the "Copy" button above.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="bg-zinc-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            <span>Paste into Terminal</span>
                        </div>
                        <p className="text-sm text-zinc-400 pl-8">Open your terminal (PowerShell or Bash), paste the script, and hit Enter. No installation required.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}