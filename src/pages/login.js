import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import NavbarA from '../components/navbara.js'
import firebase from 'firebase/app';
import 'firebase/database';

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    useEffect(()=>{
        document.getElementById('tab_title').innerHTML = 'Login | BloodHelper'
        document.getElementById('loginADReact').src = '//p432482.clksite.com/adServe/banners?tid=432482_857880_1&type=footer&size=22'
    }, [])

    const login = () => {
        firebase.database().ref('USR-' + username).once('value',(snapshot) => {
            if (snapshot.val() == null) {
                document.getElementById('Alertal').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('Alertal').style.display = 'none';
                }, 2000)
            } else {
                const dusername = snapshot.val().username;
                const dpassword = snapshot.val().password;
                if (username == dusername && password == dpassword) {
                    localStorage.setItem('user', dusername);
                    localStorage.setItem('pass', dpassword);
                    window.location.href = '/home'
                } else {
                    document.getElementById('Alertal').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('Alertal').style.display = 'none';
                    }, 2000)
                }
            }
        })
    }

    return (
        <>
            <NavbarA />
            <Alert variant='danger' style={{ textAlign: 'center', display: 'none' }} id='Alertal'>
                Username or password is invalid.
            </Alert>
            <div style={{ textAlign: 'center', marginRight: '24%', marginLeft: '24%', marginTop: '5%' }}>
                <h1>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} style={{ textAlign: 'center'}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'center'}}/>
                </Form.Group>
                <Button variant="primary" style={{ padding: '5px 20px 5px 20px' }} onClick={login}>
                    Login
                </Button>
            </div>
        </>
    );
}