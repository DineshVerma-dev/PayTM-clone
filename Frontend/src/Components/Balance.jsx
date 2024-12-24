export const Balance = ({ value }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="font-bold text-lg sm:text-xl md:text-2xl">
                Your balance
            </div>
            <div className="font-semibold ml-0 sm:ml-4 text-lg sm:text-xl md:text-2xl mt-2 sm:mt-0">
                Rs {value}
            </div>
        </div>
    );
};