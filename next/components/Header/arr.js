import React, { useState, useEffect } from 'react';

export default function Arrtotop() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 800) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    const totop = () => {
        window.scrollTo(0, 0);
    };

  return (
    <>
      <div className={`arrtotop ${isVisible ? 'active' : ''}`} onClick={totop}>
        <div className="arris"></div>
      </div>
    </>
  );
}
