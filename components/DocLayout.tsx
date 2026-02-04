export default function DocLayout({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <article className="max-w-2xl mx-auto py-16 px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
                {title}
            </h1>
            <div className="prose dark:prose-invert prose-blue max-w-none">
                {children}
            </div>
        </article>
    );
}