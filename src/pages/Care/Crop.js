import React ,{useState,useEffect}from 'react';
import axios from 'axios';


function Crop() {

    const [users,setUsers] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러

    const fetchUsers = async () => {
        try {
            setUsers(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get('/api/crop/findall');
            setUsers(response.data.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };



    useEffect( () =>{
        
        fetchUsers();
    },[] )


    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!users) return null;  //users값이 유효하지 않는 경우

    return (
        <>        
            <ul>
                {users.map(user => <li key={user.id}>
                    {user.username} ({user.name})
                </li>)}
            </ul>
        </>

    );
    
}


export default Crop;