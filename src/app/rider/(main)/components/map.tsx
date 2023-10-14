"use client";

import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { useTheme } from "next-themes";

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.850563550109797,
    lng: 100.57007576117385,
  });

  const { theme } = useTheme();

  const mapDarkmode = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  const renderMarkers = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: markerPosition,
      map,
      title: "Hello World!",
      draggable: true,
    });

    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer({
      map,
      // suppressMarkers: true,
      markerOptions: {
        // icon: new maps.MarkerImage(
        //   "https://maps.google.com/mapfiles/kml/shapes/man.png",
        //   new google.maps.Size(44, 32),
        //   new google.maps.Point(0, 0),
        //   new google.maps.Point(22, 32)
        // ),
      },
      polylineOptions: {
        strokeColor: "green",
        strokeOpacity: 1,
      },
    });

    const fos = new maps.LatLng(13.846050207417349, 100.57119800562128);
    const barMai = new maps.LatLng(13.848771272310326, 100.5669733600924);

    // const icons = {
    //   start: new maps.MarkerImage(
    //     // URL
    //     "https://maps.google.com/mapfiles/kml/shapes/man.png",
    //     new google.maps.Size(44, 32)
    //     // new google.maps.Point(0, 0),
    //     // new google.maps.Point(22, 32)
    //   ),
    //   end: new maps.MarkerImage(
    //     // URL
    //     "https://maps.google.com/mapfiles/kml/shapes/police.png",
    //     new google.maps.Size(44, 32)
    //     // new google.maps.Point(0, 0),
    //     // new google.maps.Point(22, 32)
    //   ),
    // };

    // new maps.Marker({
    //   position: fos,
    //   map,
    //   title: "Origin",
    //   // icons: icons.start,
    // });

    // new maps.Marker({
    //   position: barMai,
    //   map,
    //   title: "Destination",
    //   // icons: icons.end,
    // });

    const request = {
      origin: fos, // Rider current position
      destination: barMai, // Target restaurant
      travelMode: "WALKING",
    };

    directionsService.route(request, function (result: any, status: any) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });

    marker.addListener("dragend", () => {
      const newPosition = marker.getPosition();
      setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    });
  };

  return (
    <div className="w-full px-2 h-[600px] overflow-hidden rounded-lg mt-1">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBBUB0Wrt1xnu8qOK1_7teVZF2J7hY4Smk",
          libraries: ["places"],
        }}
        center={markerPosition}
        defaultZoom={18}
        options={{
          styles: theme === "dark" ? mapDarkmode : undefined,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) => {
          renderMarkers(map, maps);
          // setGoogleApiLoaded(true);
        }}
      />
    </div>
  );
};

export default Map;
