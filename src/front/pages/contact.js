import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import Socials from '../components/Utility/SocialIcons/Socials'
import Link from "next/link";
import Cookies from "../components/Utility/Cookies";

const Contact = () => {
  return (
    <div className="pt-5 contact d-flex">
      <div className="m-auto m-color">
        <h3 className="contact_n text-uppercase">Contact</h3>
        <p className="pt-5 regular text-uppercase">Email</p>
        <Link href="mailto:hello@feedyourimage.co.uk?subject=Feed Your Image Production Query">
          <a>
            Contact us
        </a>
        </Link>
        <p className="pt-4 regular text-uppercase">phone</p>
        <Link href="tel:07930181818">
          <a>07930 181818</a>
        </Link>
        <p className="pt-4 regular text-uppercase">Social</p>
        <Socials className="justify-content-center pb-3" />
      </div>
      <Cookies />
    </div>
  )
}

export default () => <MainLayout Content={Contact} />;


