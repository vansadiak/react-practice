import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Props interface (like Angular @Input())
interface User {
    name: string;

    id: number
    showExtraDetails: boolean,
    extraDetails: {
        profession: 'Mechanic' | 'Electrician' | 'Nurse'
        age: number;
    }

}

interface UserProps {
    user: User,
    onUserClick: (user: User) => void; // Callback prop (like Angular @Output())
}

// Functional component (modern React approach)
export const UserCard = ({ user, onUserClick }: UserProps) => {
    return (
        <div className='rounded-sm border-2 p-4 mb-2 w-1/4 m-auto' >
            <div >
                <ul>
                    <li>
                        {user.name}
                    </li>
                    {user.showExtraDetails && (
                        <div>
                            {
                                Object.entries(user.extraDetails).map(([k,v]) => {
                                    return <li>{v}</li>
                                })
                            }
                        </div>

                    )
                    }


                </ul>
            </div>
            <div className='text-right flex justify-end'>
                <button className=' flex items-center gap-2 rounded-sm border-1 p-2' onClick={() => onUserClick(user)}>
                    {
                        user.showExtraDetails ? <FaChevronUp className='text-blue-500' /> : <FaChevronDown className='text-blue-500' />
                    }
                    {
                       <span className='text-blue-500'>{user.showExtraDetails ? 'Collapse' : 'Expand'}</span>
                    }
                </button>

            </div>



        </div>
    )
}
// List component showing .map() usage (like *ngFor)
export function UserList() {
    const [users, setUser] = useState<User[]>([
        {
            id: 1, name: 'Alice', showExtraDetails: false,
            extraDetails: {
                age: 25,
                profession: 'Electrician'
            }
        },
        {
            id: 2, name: 'Bob', showExtraDetails: false,
            extraDetails: {
                age: 30,
                profession: 'Mechanic'
            },
        },
        {
            id: 3, name: 'Charlie', showExtraDetails: false, extraDetails: {
                age: 35,
                profession: 'Nurse'
            }
        }
    ])



    const handleUserClick = (user: User) => {
        setUser(users.map(us => {
            if (us.id === user.id) {
                return { ...us, showExtraDetails: !us.showExtraDetails }
            }
            else return us
        })
        
        
        )
        console.log(`Clicked on ${user},${users}`);
    };



    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-4">User List</h2>


            {
                users.map((user, index) => {
                    return <UserCard key={index} user={user} onUserClick={handleUserClick} ></UserCard>
                })

            }
        </div>
    );
} 