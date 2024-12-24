
import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(""); // Reset error on new request
            try {
                const response = await axios.get("https://paytm-backend-pearl.vercel.app/api/v1/users/bulk?filter=" + filter, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setUsers(response.data.user);
            } catch (err) {
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <div className="container mx-auto p-4">
            <div className="font-bold mt-6 text-lg text-center">
                Users
            </div>
            <div className="my-4">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border rounded border-slate-300"
                />
            </div>

            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="grid grid-cols-1   gap-4">
                {users.length === 0 ? (
                    <div className="text-center col-span-full">No users found.</div>
                ) : (
                    users.map(user => <User key={user._id} user={user} />)
                )}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                            <div className="flex flex-col justify-center h-full text-xl">
                                {user.firstname[0]}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <div>
                                {user.firstname} {user.lastname}
                            </div>
                        </div>
                    </div>
        
                    <div className="flex flex-col justify-center h-full">
                        <Button
                            onClick={() => {
                                navigate("/send?id=" + user._id + "&name=" + user.firstname);
                            }}
                            label={"Send Money"}
                        />
                    </div>
                </div>
            );
}


// import { useEffect, useState } from "react";
// import { Button } from "./Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [filter, setFilter] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         setLoading(true);
//         setError("");
//         axios.get("https://paytm-backend-pearl.vercel.app/api/v1/users/bulk?filter=" + filter, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         })
//         .then(response => {
//             setUsers(response.data.user);
//             setLoading(false);
//         })
//         .catch(err => {
//             setError("Failed to load users.");
//             setLoading(false);
//         });
//     }, [filter]);

//     return (
//         <>
//             <div className="font-bold mt-6 text-lg">Users</div>
//             <div className="my-2">
//                 <input
//                     onChange={(e) => setFilter(e.target.value)}
//                     type="text"
//                     placeholder="Search users..."
//                     className="w-full px-2 py-1 border rounded border-slate-200"
//                 />
//             </div>
//             {loading && <div>Loading...</div>}
//             {error && <div className="text-red-500">{error}</div>}
//             <div>
//                 {users.map(user => (
//                     <User key={user._id} user={user} />
//                 ))}
//             </div>
//         </>
//     );
// };

// function User({ user }) {
//     const navigate = useNavigate();

//     return (
//         <div className="flex justify-between">
//             <div className="flex">
//                 <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                     <div className="flex flex-col justify-center h-full text-xl">
//                         {user.firstName[0]}
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-center h-full">
//                     <div>
//                         {user.firstName} {user.lastName}
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col justify-center h-full">
//                 <Button
//                     onClick={() => {
//                         navigate("/send?id=" + user._id + "&name=" + user.firstName);
//                     }}
//                     label={"Send Money"}
//                 />
//             </div>
//         </div>
//     );
// }
