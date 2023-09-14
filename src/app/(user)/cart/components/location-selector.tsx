"use client";
import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Input } from "@/components/ui/input";

function LocationSelector() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const autocompleteRef = useRef<any>(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.850563550109797,
    lng: 100.57007576117385,
  });
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    setSearchTerm(place.formatted_address);
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  const renderMarkers = (map: any, maps: any) => {
    new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.15,
      map,
      center: markerPosition,
      radius: 1000,
      draggable: false,
    });

    const marker = new maps.Marker({
      position: markerPosition,
      map,
      title: "Hello World!",
      draggable: true,
    });

    marker.addListener("dragend", () => {
      const newPosition = marker.getPosition();
      setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    });
  };

  const handleSave = () => {
    console.log(searchTerm, markerPosition);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  useEffect(() => {
    if (googleApiLoaded && window.google && searchInputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        searchInputRef.current
      );
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    }
  }, [googleApiLoaded]);

  return (
    <div>
      <Input
        ref={searchInputRef}
        className="w-full"
        placeholder="Enter your location"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <div className="w-full px-2 h-96 rounded-sm mt-1">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBBUB0Wrt1xnu8qOK1_7teVZF2J7hY4Smk",
            libraries: ["places"],
          }}
          center={markerPosition}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }: { map: any; maps: any }) => {
            renderMarkers(map, maps);
            setGoogleApiLoaded(true);
          }}
        />
      </div>
    </div>
  );
}

export default LocationSelector;
