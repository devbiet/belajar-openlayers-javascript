import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";

import "ol/ol.css";
import "./style.css";

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      visible: true,
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([121.316534, -2.44565]),
    zoom: 5
  }),
});
