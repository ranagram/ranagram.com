"use strict";
import React, { Component } from "react";

export default class AppAbout extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    var myLatlng = new google.maps.LatLng(35.67665, 139.70555);
    var centerLatlng = new google.maps.LatLng(myLatlng.lat() + 0.0004, myLatlng.lng())
    var myOptions = {
      zoom: 16,
      center: centerLatlng,
      mapTypeControlOptions: { mapTypeIds: [] },
      scrollwheel: false,
      backgroundColor: "#f6f5f4",
      panControl: false,
      streetViewControl: false,
      zoomControlOptions:{ style: google.maps.ZoomControlStyle.SMALL }
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // マップスタイル
    var styles = [
      {
        stylers: [
          { saturation: -100 }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "administrative",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "landscape",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    map.setOptions({styles:styles});

    var marker = new google.maps.Marker({
      map: map,
      animation: null,
      position: myLatlng,
      icon: "/imgs/maker.png"
    })
  }
  render () {
    return <div id="map_canvas" />;
  }
}
