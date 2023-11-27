import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/logo.svg';
import {GetToken, RemoveToken} from "../utility/TokenHelper.js";
import {Link} from "react-router-dom";

const AppNavBar = () => {
    const [login, setLogin] = useState(false);

    useEffect(()=>{
        if(GetToken()){
            setLogin(true)
        }else{
            setLogin(false)
        }
    }, [])
    return (
        <>
            <Navbar expand="lg" className="sticky-top">
                <Container fluid>
                    <Navbar.Brand>
                        <img src={logo} className='nav-logo'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Products</Nav.Link>
                            {login?(<Nav.Link href='/cart'>Cart</Nav.Link>):(<></>)}
                        </Nav>

                        {login?(<button onClick={RemoveToken} className='btn btn-danger'>Logout</button>):(<Link to='/login' className='btn btn-success'>Login</Link>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavBar;