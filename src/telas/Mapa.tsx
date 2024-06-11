import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles/styleMap'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Geo() {
    const navigation = useNavigation();

    const [sensorProximo, setSensorProximo] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [distance1, setDistance1] = useState(null);
    const [distance2, setDistance2] = useState(null);
    const [temp, setTemp] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [sensores, setSensores] = useState([]);
    const [fixedPoints, setFixedPoints] = useState([]);

    const initialRegion = {
        latitude: -22.9140639,
        longitude: -47.068686,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    const fetchSensors = async () => {
        try {
            const response1 = await axios.get('http://10.0.2.2:8000/api/sensores/1');
            const response2 = await axios.get('http://10.0.2.2:8000/api/sensores/4');
            const sensors = [response1.data, response2.data];
            setSensores(sensors);
            setFixedPoints(sensors);
        } catch (error) {
            console.error(error);
        }
    };

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        const locationSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (newLocation) => {
                setLocation(newLocation.coords);
            }
        );

        return () => {
            locationSubscription.remove();
        };
    };

    useEffect(() => {
        fetchSensors();
    }, []);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (fixedPoints.length > 0 && location) {
            const [point1, point2] = fixedPoints;

            const distanceToFixedPoint1 = haversine(location.latitude, location.longitude, point1.latitude, point1.longitude);
            const distanceToFixedPoint2 = haversine(location.latitude, location.longitude, point2.latitude, point2.longitude);

            setDistance1(distanceToFixedPoint1);
            setDistance2(distanceToFixedPoint2);

            setSensorProximo(distanceToFixedPoint1 <= distanceToFixedPoint2 ? point1 : point2);
        }
    }, [fixedPoints, location]);

    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371000;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;
    };

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker coordinate={{ latitude: -22.915, longitude: -47.0678 }} />
                {fixedPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        pinColor="blue"
                    />
                ))}
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="red"
                    />
                )}
            </MapView>

            <View style={styles.cxs}>
                <View style={styles.cx}><Text style={styles.cxTxt}>Latitude: </Text><Text style={styles.cxTxt}>{location && location.latitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Longitude: </Text><Text style={styles.cxTxt}>{location && location.longitude}</Text></View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 1: </Text>{distance1 !== null && <Text style={styles.cxTxt}>{distance1.toFixed(1)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Distância até o ponto fixo 2: </Text>{distance2 !== null && <Text style={styles.cxTxt}>{distance2.toFixed(2)} metros</Text>}</View>
                <View style={styles.cx}><Text style={styles.cxTxt}>Temperatura:</Text><Text style={styles.cxTxt}>{temp}ºC</Text></View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Details</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.modalContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    {sensorProximo && (
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>ID: {sensorProximo['id']}</Text>
                                <Text style={styles.modalText}>TIPO: {sensorProximo['tipo']}</Text>
                                <Text style={styles.modalText}>LATITUDE: {sensorProximo['latitude']}</Text>
                                <Text style={styles.modalText}>LONGITUDE: {sensorProximo['longitude']}</Text>
                                <Text style={styles.modalText}>LOCALIZAÇÃO: {sensorProximo['localizacao']}</Text>
                                <Text style={styles.modalText}>RESPONSAVEL: {sensorProximo['responsavel']}</Text>
                                <Text style={styles.modalText}>UNIDADE: {sensorProximo['unidade_medida']}</Text>
                                <Text style={styles.modalText}>STATUS: {sensorProximo['status_operacional'] ? 'Habilitado' : 'Desabilitado'}</Text>
                                <Text style={styles.modalText}>OBS: {sensorProximo['observacao']}</Text>
                                <TouchableOpacity
                                    style={styles.openButton}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Modal>
            </View>
        </View>
    );
}
