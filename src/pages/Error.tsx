import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
// Error page

function Error() {
    const error = useRouteError();

    return (
        <div className="py-10 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                <p className="text-base font-semibold text-red-600">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-webcolor sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <p className="mt-4 text-base leading-7 text-gray-600">
                    {(error as Error)?.message}
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                    <Link to="/" className="inline-flex items-center btn btn-sm btn-secondary text-sm font-semibold bg-webcolor border-none">
                        <ArrowLeft size={16} className="mr-2" /> Go back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Error;
