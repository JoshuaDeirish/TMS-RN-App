import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Driver from '../Classes/Driver'; 

const Home = () => {

    const driver = new Driver(
        1, 'Avi', 'Josh', 'Driver', 'avi.josh@cpan.com', '1234567890',
        'D123', 'AB123456', 'on route'
    );


    const [routeStatus, setRouteStatus] = useState(driver.routeStatus);

    const changeStatus = () => {
        console.log(driver.routeStatus);
        driver.routeStatus = 'delivered';
        setRouteStatus(driver.routeStatus);
        console.log(driver.routeStatus);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            driver.routeStatus = 'delivered';
            setRouteStatus(driver.routeStatus);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View>
            <Text>Driver: {driver.first_name} {driver.last_name}</Text>
            <Text>{driver.phoneNumber}</Text>
            <Text>Route Status: {routeStatus}</Text>
            <Button title="Change Route Status" onPress={changeStatus} />
            
        </View>
    );
};

export default Home;
