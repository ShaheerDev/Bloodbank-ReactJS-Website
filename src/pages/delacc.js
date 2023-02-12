import React, { useEffect } from 'react';
import {Alert, Button} from 'react-bootstrap';
import NavbarB from '../components/navbarb.js';
import firebase from 'firebase/app';
import 'firebase/database';

function DelAcc() {
    const username = localStorage.getItem('user');
    const password = localStorage.getItem('pass');

    useEffect(()=>{
        document.getElementById('tab_title').innerHTML = `Delete Account | BloodHelper`
    }, [])

    const removeAcc = async() => {
        firebase.database().ref('USR-' + username).once('value', async(snapshot) => {
            var snap = snapshot.val();
            const dusername = snap.username;
            const dpassword = snap.password;
            if (dusername == username && dpassword == password) {
                document.getElementById('Alertbr').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('Alertbr').style.display = 'none';
                }, 2000)  
                await localStorage.setItem('user', '');
                await localStorage.setItem('pass', '');
                await firebase.database().ref('USR-' + username).remove();
                document.getElementById('Alertcr').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('Alertcr').style.display = 'none';
                }, 2000)  
                window.location.href = '/login';
            } else {
                document.getElementById('Alertar').style.display = 'block';
                localStorage.setItem('user', '');
                localStorage.setItem('pass', '');
                setTimeout(() => {
                    document.getElementById('Alertar').style.display = 'none';
                    window.location.href = '/login';
                }, 2000)
            }
        })
    }

    return (
        <>
            <NavbarB />
            <Alert variant='danger' style={{ textAlign: 'center', display: 'none' }} id='Alertar'>
                Please login again due to an error.
            </Alert>
            <div style={{textAlign: 'center'}}>
            <h1>Are you sure that you want to Delete your account?</h1>
            <p style={{fontWeight: 'bold'}}>This action is irreversible, <br /> After this you can't restore this account. You will have to create a new account.</p>
            <Button variant='primary' onClick={()=>{window.location.href='/home';}} style={{marginRight: 2}}>Go Back</Button>
            <Button variant='danger' onClick={removeAcc}>Delete Account Permanently</Button>
            </div>
        </>
    );
}

export default DelAcc;