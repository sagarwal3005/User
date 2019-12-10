import React from 'react'
import {
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa'
import Link from "next/link";
const Socials = props => {
    return (
        <ul className={`d-flex footer_social ${props.className}`}>
            <li>
                <Link href="https://www.instagram.com/fyi_magazine/">
                    <a className="m-color"  target="_blank">
                        <FaInstagram />
                    </a>
                </Link>
            </li>
            <li>
                <Link href="https://www.facebook.com/feed.yourimage.3">
                    <a className="m-color" target="_blank">
                        <FaFacebookF />
                    </a>
                </Link>
            </li>
            <li>
                <Link href="https://twitter.com/feedyourimage1">
                    <a className="m-color" target="_blank">
                        <FaTwitter />
                    </a>
                </Link>
            </li>
            <li>
                <Link href="https://www.youtube.com/channel/UC8WIvFjrdND2hYkXohmXWBA?view_as=subscriber">
                    <a className="m-color" target="_blank">
                        <FaYoutube />
                    </a>
                </Link>
            </li>
          
        </ul>
    )
}
export default Socials