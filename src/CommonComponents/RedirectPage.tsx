import { useSearchParams, useParams } from "react-router-dom";
import { getRedirect } from "../services/redirect";
import displayError from "../utils/error-toaster";
import { useEffect, useState } from "react";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the token from either query parameter or path parameter
  const code = searchParams.get("t") || token;

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      return;
    }

    const redirectTo = async () => {
      try {
        const response = await getRedirect(code);
        console.log('response.redirectUrl', response.redirectUrl)
        window.location.href = response.redirectUrl;
      } catch (error) {
        console.error('Redirect error:', error);
        displayError(error);
        setIsLoading(false);
      }
    };
    
    redirectTo();
  }, [code]);

  if (!code) {
    return <div className="p-8 text-center text-lightText">Invalid invite link - missing token</div>;
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-lightText">
        <div>Redirecting...</div>
        <div className="mt-2 text-sm">Processing your invite link...</div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center text-lightText">
      <div>Unable to process invite link</div>
      <div className="mt-2 text-sm">Please check if the link is valid or try again.</div>
    </div>
  );
}

export default RedirectPage