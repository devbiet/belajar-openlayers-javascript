import Map from "ol/Map";
import View from "ol/View";
import ScaleLine from "ol/control/ScaleLine";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";

import "ol/ol.css";
import "./style.css";

const view = new View({
  center: fromLonLat([121.316534, -2.44565]),
  zoom: 5
});

const map = new Map({
  target: 'map',
  view: view,
});

const osmTile = new TileLayer({
  source: new OSM(),
  visible: true,
});

map.addLayer(osmTile);

const scaleControl = new ScaleLine({
  bar: true,
  text: true,
});

map.addControl(scaleControl);
