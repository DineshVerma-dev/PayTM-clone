export const AppBar = () => {
    return (
        <div className="shadow h-14 flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                    <span className="text-blue-500">Pay</span>
                    <span className="text-black">TM App</span>
                </span>
            </div>
            <div className="flex items-center">
                <span className="hidden sm:block mr-4 text-sm sm:text-base lg:text-lg">Hello</span>
                <div className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-slate-200 flex items-center justify-center">
                    <span className="text-base sm:text-xl">U</span>
                </div>
            </div>
        </div>
    );
};
