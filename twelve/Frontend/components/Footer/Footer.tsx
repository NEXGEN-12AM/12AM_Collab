// components/Footer.tsx
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

// Define interfaces for our data structures
interface SocialLink {
  icon: React.ReactNode;
  url: string;
  ariaLabel: string;
}

interface ServiceLink {
  icon: React.ReactNode;
  text: string;
  url: string;
}

interface PaymentMethod {
  type: string;
  content: React.ReactNode;
}

// Custom icons components
const TikTokIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const TelegramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.18-.04-.26-.02-.11.02-1.93 1.23-5.44 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.38-.89.03-.25.26-.5.71-.76 2.78-1.21 4.63-2 5.57-2.39 2.65-1.11 3.21-1.3 3.56-1.31.08 0 .26.02.38.12.1.08.12.2.13.29 0 .05.01.13.01.23z"/>
  </svg>
);

const QuestionIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

const Footer: React.FC = () => {
  // Social media links data with TypeScript interface
  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={24} />, url: "https://www.facebook.com/yav.yav.7359447", ariaLabel: "Facebook" },
    { icon: <TikTokIcon />, url: "https://www.facebook.com/na.theng.549", ariaLabel: "TikTok" },
    { icon: <TelegramIcon />, url: "https://www.facebook.com/Norakdareach", ariaLabel: "Telegram" },
    { icon: <Instagram size={24} />, url: "https://www.facebook.com/taing.chongyean/", ariaLabel: "Instagram" },
  ];
  
  // Customer service links data with TypeScript interface
  const serviceLinks: ServiceLink[] = [
    { 
      icon: <QuestionIcon />, 
      text: "Online exchange policy", 
      url: "#" 
    },
    { 
      icon: <ShieldIcon />, 
      text: "Privacy Policy", 
      url: "#" 
    },
  ];
  
  // Payment methods data with TypeScript interface
  const paymentMethods: PaymentMethod[] = [
    { 
      type: "aba", 
      content: <span className="text-blue-500 font-bold text-xs">ABA PAY</span> 
    },
    { 
      type: "visa", 
      content: <span className="text-blue-700 font-bold text-sm">VISA</span> 
    },
    { 
      type: "mastercard", 
      content: (
        <div className="flex">
          <div className="w-6 h-6 rounded-full bg-red-600"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-500 -ml-2"></div>
        </div>
      ) 
    },
  ];

  return (
    <footer className="bg-black text-white py-8 px-6 z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Social Media Section */}
          <div className="flex-1 min-w-fit">
            <h3 className="font-bold text-lg mb-6 tracking-wide">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  aria-label={social.ariaLabel}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full transition-transform hover:translate-y-[-3px] hover:bg-gray-700"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Customer Services Section */}
          <div className="flex-1 min-w-fit">
            <h3 className="font-bold text-lg mb-6 tracking-wide">CUSTOMER SERVICES</h3>
            <div className="space-y-4">
              {serviceLinks.map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-white">{service.icon}</span>
                  <a 
                    href={service.url}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {service.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Methods Section */}
          <div className="flex-1 min-w-fit">
            <h3 className="font-bold text-lg mb-6 tracking-wide">WE ACCEPT</h3>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((payment, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-md p-2 h-10 flex items-center justify-center"
                >
                  {payment.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;