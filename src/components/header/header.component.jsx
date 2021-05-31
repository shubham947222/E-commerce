import React from 'react';

import {Link} from 'react-router-dom'
import './header.styles.scss';
import {auth, Auth} from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg'
const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                Contact
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGH OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            
        </div>
    </div>

)

export default Header;
