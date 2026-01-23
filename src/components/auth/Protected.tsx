import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}
interface RootState {
  auth: {
    status: boolean;
  };
}
export default function Protected({children,authentication=true}:ProtectedProps) {
   const[loader,setLoader]=useState<boolean>(true);
    const authStatus=useSelector((state:RootState)=>state.auth.status);
    const navigate=useNavigate()

        useEffect(() => {
          // If route requires authentication but user is not logged in
          if (authentication && !authStatus) {
            navigate("/login");
          } 
          
    // If route requires NO authentication but user IS logged in
    
     else if (!authentication && authStatus) {
            navigate("/");
          }

          setLoader(false);
        }, [navigate, authStatus, authentication]);
if(loader){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
return(
  <>
  {children}
  </>
)
}



