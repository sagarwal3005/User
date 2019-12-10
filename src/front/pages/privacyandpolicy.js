import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import Cookies from '../components/Utility/Cookies'
const PrivacyAndPolicy = () => {
  return (
    <div className="pt-5 pb-5">
      <div className="inner pt-5">
        <h3 className="pt-5 pb-5 bold">Privacy Policy</h3>
        <h4 className="pb-4 regular">Information we collect</h4>
        <p className="regular small pb-5">
          
          This website does not use any cookies. The only data we store is
          the details you provide us via the guestlist contact forms, email and
          over the phone. 
        </p>
        <h4 className="pb-4 regular">Accessing Your Personal Information</h4>
        <p className="regular small pb-5">
          We aim to provide you with access to your personal information
          when you use our services. To obtain a copy of your personal
          information you can contact us via the address below. You have the
          right to request that your data be updated or deleted.
        </p>
        <h4 className="pb-4 regular">Contact Details</h4>
        <p className="pb-1 regular">Name: Daniel Browne</p>
        <p className="pb-5 regular">Email: hello@feedyourimage.co.uk</p>
      </div>
      <Cookies />
    </div>
  );
};

export default () => <MainLayout Content={PrivacyAndPolicy} />;
