import React, { useState, useEffect } from 'react';
import NavbarB from '../components/navbarb.js'
import NavbarA from '../components/navbara.js'
import { Card, Button, Spinner } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/database';

function UserProfile() {

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [bloodtype, setBloodtype] = useState();
    const [location, setLocation] = useState();
    const [spinnerDisplay, setSpinnerDisplay] = useState('block');
    const [cardDisplay, setCardDisplay] = useState('none');

    useEffect(() => {
            const username = decodeURI(window.location.hash.substring(1));
            firebase.database().ref('USR-' + username).once('value', (snapshot) => {
                let dlocation = snapshot.val().location;
                const dusername = snapshot.val().username;
                const dpass = snapshot.val().password;
                const dage = snapshot.val().age;
                const dbloodtype = snapshot.val().bloodtype;
                const dphonenumber = snapshot.val().phonenumber;
                if(dlocation == 'none'){dlocation = 'Location not shared'}
                    setUser(dusername);
                    setPassword(dpass);
                    setAge(dage);
                    setPhonenumber(dphonenumber);
                    setBloodtype(dbloodtype);
                    setLocation(dlocation);
                    setSpinnerDisplay('none');
                    setCardDisplay('block');
                    document.getElementById('tab_title').innerHTML = `${dusername}'s Profile | BloodHelper`
            })
    }, [])

   if(localStorage.getItem('user') == '' || localStorage.getItem('user') == undefined || localStorage.getItem('user') == null){
        return (
            <>
                <NavbarA />
                <br /><br />
                <Card className="text-center">
                <Card.Header style={{fontSize: 28, fontWeight: '600'}}>User Profile</Card.Header>
                <div style={{ display: spinnerDisplay, justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                    <br />
                    <Spinner animation="border" variant="primary" />
                    <p>Loading user data...</p>
                </div>
                    <Card.Body style={{display: cardDisplay}}>
                        <Card.Title>Username: {user}</Card.Title>
                        <Card.Title>Bloodtype: {bloodtype}</Card.Title>
                        <Card.Title>Age: {age}</Card.Title>
                        <Card.Title>Location(City): {location}</Card.Title>
                        <Card.Title>Phonenumber: {phonenumber}</Card.Title>
                        <br />
                        <Button variant="success" onClick={()=>{window.open('tel:'+phonenumber)}}>Call Person</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }else{
        return (
            <>
                <NavbarB />
                <br /><br />
                <Card className="text-center">
                <Card.Header style={{fontSize: 28, fontWeight: '600'}}>User Profile</Card.Header>
                <div style={{ display: spinnerDisplay, justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                    <br />
                    <Spinner animation="border" variant="primary" />
                    <p>Loading user data...</p>
                </div>
                    <Card.Body style={{display: cardDisplay}}>
                        <Card.Title>Username: {user}</Card.Title>
                        <Card.Title>Bloodtype: {bloodtype}</Card.Title>
                        <Card.Title>Age: {age}</Card.Title>
                        <Card.Title>Location(City): {location}</Card.Title>
                        <Card.Title>Phonenumber: {phonenumber}</Card.Title>
                        <br />
                        <Button variant="success" onClick={()=>{window.open('tel:'+phonenumber)}}>Call Person</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default UserProfile;
