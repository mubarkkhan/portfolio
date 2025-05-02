export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white py-6 text-center">
            <p className="text-sm">&copy; 2025 Mubark Khan. All rights reserved.</p>
            <div className="flex justify-center mt-3 space-x-4">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" aria-label="GitHub">
                    <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" aria-label="LinkedIn">
                    <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" aria-label="Twitter">
                    <i className="fab fa-twitter text-xl"></i>
                </a>
            </div>
        </footer>
    );
}