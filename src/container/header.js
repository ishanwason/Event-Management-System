import React from 'react';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './style.css'
import { useDispatch } from 'react-redux';
import { setData } from '../action';
import { LOGOUT } from '../action/types';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e) => {
        localStorage.clear();
        dispatch(setData(LOGOUT))
        history.push('/login')
    }
    return (
        <div className='d-flex justify-content-between align-items-center w-100 bg-dark' style={{ position: 'fixed', zIndex: '2' }}>
            <h5 className='d-flex align-items-center ml-3 text-white font-weight-bold'>
                <span className="material-icons mr-2">calendar_today</span>
                Event Management System
            </h5>
            <div>
                <UncontrolledButtonDropdown className='dropdown mr-3 border-none'>
                    <DropdownToggle caret className='d-flex align-items-center bg-dark dropdown text-light' color='btn' >
                        <span className="material-icons text-light">person</span>
                    </DropdownToggle>
                    <DropdownMenu className='mr-4' >
                        <DropdownItem onClick={handleClick} className='d-flex font-weight-bold'>
                            <span className="material-icons">error_outline</span>
                            Logout
                            </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </div>
        </div>
    )
}

export default Header;