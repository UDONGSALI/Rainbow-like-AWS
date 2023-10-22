import { useEffect, useState } from "react";

export default function Map({ address, org }) {
    const apiKey = "3df9e42bf62f09b0d0d65618230e2076";
    const restKey = "e9e99464947afd0fb4599307a19b7f6e";

    const [location, setLocation] = useState(null);


    useEffect(() => {
        const mapContainer = document.getElementById("map");

        function stopWheelPropagation(e) {
            e.stopPropagation();
        }

        mapContainer.addEventListener('wheel', stopWheelPropagation);

        return () => {
            mapContainer.removeEventListener('wheel', stopWheelPropagation);
        };
    }, []);


    async function getAddressLatLng(query) {
        const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `KakaoAK ${restKey}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch the coordinates.");
        }

        const data = await response.json();
        if (data.documents.length > 0) {
            const { x, y } = data.documents[0].address;
            return { latitude: y, longitude: x };
        } else {
            return null;
        }
    }

    useEffect(() => {
        async function initMap() {
            const locationData = await getAddressLatLng(address);
            if (!locationData) return;

            setLocation(locationData);
            if (!window.kakao) {
                const script = document.createElement("script");
                script.async = true;
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
                document.head.appendChild(script);
                script.onload = loadMapWithLocation(locationData);
            } else {
                loadMapWithLocation(locationData)();
            }
        }

        function loadMapWithLocation(locationData) {
            return () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(locationData.latitude, locationData.longitude),
                        level: 3
                    };
                    const map = new window.kakao.maps.Map(container, options);

                    const markerPosition = new window.kakao.maps.LatLng(locationData.latitude, locationData.longitude);
                    const marker = new window.kakao.maps.Marker({ position: markerPosition });
                    marker.setMap(map);

                    if (org && org.name && org.addr && org.addrDtl && org.url) {
                        const iwContent = `
          <div style="padding:10px; width: 300px;">
            <strong><p>${org.name}</p></strong>
            <span>${org.addr}</span><br/>
            <p>${org.addrDtl}</p>
            <a href="${org.url}" target="_blank" rel="noopener noreferrer">사이트 바로가기</a>
          </div>`;
                        const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent });
                        window.kakao.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });
                    }
                });
            };
        }

        initMap();
    }, [address, org]);

    return (
        <div id="map" style={{ width: "60%", height: "100%" }}></div>
    );
}