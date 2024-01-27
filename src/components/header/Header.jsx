import React from 'react';
import LWSLogo from '../../assets/icons/lws-logo-en.svg';

const HeaderComponent = () => {
    return (
        <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-50">
            <div className="container mx-auto flex items-center justify-between gap-x-6">
                {/* Logo  */}
                <a href="/">
                    <img className="h-[45px]" src={LWSLogo} alt="Lws" />
                </a>
                {/* Logo Ends  */}
            </div>
        </nav>
    );
}

export default HeaderComponent;
