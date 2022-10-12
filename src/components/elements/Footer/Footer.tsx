import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Counter from '../Counter/Counter';
import './styles.scss';

const Footer = (): JSX.Element => {

  const [propertiesCount, setPropertiesCount] = useState(0);

    useEffect(() => {
      const currentPropertiesCount = JSON.parse(localStorage.getItem('assets') || '[]').length as number;
      console.log(currentPropertiesCount);
      setPropertiesCount(currentPropertiesCount);
  },[]);

    return (
        <footer>

            <NavLink end to="/"  className={({ isActive }) =>
              isActive ? 'sd-active-tab' : undefined
            } > 
                <div >
                   Browse 
                </div>
            </NavLink>
            <NavLink end to="/properties" className={({ isActive }) =>
              isActive ? 'sd-active-tab' : undefined
            } > 
                <div>
                  My Properties
                  {!!propertiesCount && <Counter count={propertiesCount} />}
                </div>
            </NavLink>  
        </footer>
    )
};
  
export default Footer;