import React, { useState, useEffect } from 'react';
import NavbarB from '../components/navbarb.js'
import { Card, Button, Spinner, Modal } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/database';

function Profile() {

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [bloodtype, setBloodtype] = useState();
    const [location, setLocation] = useState();
    const [spinnerDisplay, setSpinnerDisplay] = useState('block');
    const [cardDisplay, setCardDisplay] = useState('none');

    useEffect(() => {
        document.getElementById('tab_title').innerHTML = 'My Profile | BloodHelper'
        const username = localStorage.getItem('user');
        const pass = localStorage.getItem('pass');
        if (username == null || username == undefined || username == '' || pass == null || pass == undefined || pass == '') {
            window.location.href = '/login';
        } else {
            firebase.database().ref('USR-' + username).once('value', (snapshot) => {
                let dlocation = snapshot.val().location;
                const dusername = snapshot.val().username;
                const dpass = snapshot.val().password;
                const dage = snapshot.val().age;
                const dbloodtype = snapshot.val().bloodtype;
                const dphonenumber = snapshot.val().phonenumber;
                if (username == dusername && pass == dpass) {
                    if (dlocation == 'none') { dlocation = 'Location not shared' }
                    setUser(dusername);
                    setPassword(dpass);
                    setAge(dage);
                    setPhonenumber(dphonenumber);
                    setBloodtype(dbloodtype);
                    setLocation(dlocation);
                    setSpinnerDisplay('none');
                    setCardDisplay('block');
                } else {
                    localStorage.setItem('user', '');
                    localStorage.setItem('pass', '');
                    window.location.href = '/login';
                }
            })
        }
    }, [])

    return (
        <>
            <NavbarB />
            <br /><br />
            <Card className="text-center">
                <Card.Header style={{ fontSize: 28, fontWeight: '600' }}>Your Profile</Card.Header>
                <div style={{ display: spinnerDisplay, justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                    <br />
                    <Spinner animation="border" variant="primary" />
                    <p>Loading your user data...</p>
                </div>
                <Card.Body style={{ display: cardDisplay }}>
                    <Card.Title>Username: {user}</Card.Title>
                    <Card.Title>Bloodtype: {bloodtype}</Card.Title>
                    <Card.Title>Age: {age}</Card.Title>
                    <Card.Title>Location(City): {location}</Card.Title>
                    <Card.Title>Phonenumber: {phonenumber}</Card.Title>
                    <br />
                    <Button variant="primary" style={{ marginRight: 1 }} onClick={() => { localStorage.setItem('user', ''); localStorage.setItem('pass', ''); window.location.href = '/login'; }}>Signout</Button>
                    <Button variant="danger" onClick={()=>{window.location.href = '/deleteaccount'}}>Delete Account</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default Profile;
