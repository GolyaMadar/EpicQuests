<<<<<<< Updated upstream
import { GoogleLogin } from '@react-oauth/google';
import UseAuth from '../hooks/UseAuth';

function GoogleAuth(){
    const { login } = UseAuth();
    
    return (
        <>
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    const apiUrl = `${import.meta.env.VITE_REACT_USER_API_URL}/api/accounts/google-auth`;
                    try {
                        const response = await fetch(apiUrl, {
                            method: "POST",
                            headers: {
                                accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                credential: credentialResponse.credential
                            }),
                        });
                        const responseData = await response.json();
                        console.log(responseData);
                        const access_token = responseData.token;
                        
                        if (response.ok && response.status === 200) {
                            login(access_token);
                            window.location.href = "/";
                        } 
                    } catch (error) {
                        console.log(error);
                    }
                }}
            />
        </>
    );
}

export default GoogleAuth;
=======
import { GoogleLogin } from "@react-oauth/google";
import UseAuth from "../hooks/UseAuth";

function GoogleAuth() {
  const { login } = UseAuth();

  return (
    <>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const apiUrl = `${
            import.meta.env.VITE_REACT_USER_API_URL
          }/api/accounts/google-auth`;
          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                credential: credentialResponse.credential,
              }),
            });
            const responseData = await response.json();
            console.log(responseData);
            const access_token = responseData.token;

            if (response.ok && response.status === 200) {
              login(access_token);
              window.location.href = "/";
            }
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </>
  );
}

export default GoogleAuth;
>>>>>>> Stashed changes
