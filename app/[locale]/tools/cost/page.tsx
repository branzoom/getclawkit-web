import CostEstimator from '@/components/CostEstimator';

export default function CostPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-4">Token Cost Estimator</h1>
                <p className="text-lg text-zinc-400 max-w-2xl">
                    Simulate the monthly cost of running your AI Agent.
                    See how much you can save by switching models (e.g., DeepSeek-V3).
                </p>
            </div>

            <CostEstimator />
        </div>
    );
}