import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon, popup } from 'leaflet';
import fishIconImage from '../assets/fish2.png'


function MapPage() {

    const markers = [
        {
            geocode: [37.4526, -118.7372],
            popUp: "Catch"
        },
        {
            geocode: [37.2072, -118.6187],
            popUp: "Catch"
        },
        {
            geocode: [37.6173, -118.7397],
            popUp: "Catch"
        }
    ];

    const centroid = (markers) => {
        console.log(markers);
        let latCentroid = 0;
        let lonCentroid = 0;
        let totalPoints = markers.length
        for (const marker of markers) {
            console.log(marker)
            latCentroid += Number(marker.geocode[0]);
            lonCentroid += Number(marker.geocode[1]);
        }
        latCentroid /= totalPoints
        lonCentroid /= totalPoints

        return [latCentroid, lonCentroid]
    }

    
    const fishIcon = new Icon ({
        iconUrl: fishIconImage,
        iconSize: [38, 38]
    })



    return (
        <>
            <MapContainer center={centroid(markers)} zoom={10}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                />

                {markers.map(marker => (
                    <Marker position={marker.geocode} icon={fishIcon}>

                    </Marker>
                ))
                }

            </MapContainer>
        </>
    )

}

export default MapPage;