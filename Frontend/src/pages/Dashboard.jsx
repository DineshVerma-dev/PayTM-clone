// import { AppBar } from "../Components/AppBar";
// import { Balance } from "../Components/Balance";
// import { Users } from "../Components/Users";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const Dashboard = () => {
//     const [balance, setBalance] = useState(0);

//     useEffect(() => {
//         const fetchBalance = async () => {
//             try {
//                 const response = await axios.get("https://paytm-backend-pearl.vercel.app/api/v1/account/check", {
//                     headers: {
//                         Authorization: "Bearer " + localStorage.getItem("token")
//                     }
//                 });
//                 setBalance(response.data.balance);
//             } catch (error) {
//                 console.error("Error fetching balance:", error);
//             }
//         };

//         fetchBalance();
//     }, []);

//     return (
//         <div>
//             <AppBar />
//             <div className="m-8">
//                 <Balance value={balance} />
//                 <Users />
//             </div>
//         </div>
//     );
// }


import { AppBar } from "../Components/AppBar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(
                    "https://paytm-backend-pearl.vercel.app/api/v1/account/check",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
          
            <AppBar />

           
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <Balance value={balance} />
                </div>

              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Users />
                </div>
            </div>
        </div>
    );
};
