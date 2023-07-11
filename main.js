import Map from "ol/Map";
import Overlay from "ol/Overlay";
import View from "ol/View";
import { defaults as defaultControls } from 'ol/control';
import FullScreenControl from 'ol/control/FullScreen';
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import ScaleLine from "ol/control/ScaleLine";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, toLonLat } from 'ol/proj';
import OSM from "ol/source/OSM";

import HomeControl from "./control/HomeControl";

import "ol/ol.css";
import "./style.css";

const defaultLocation = fromLonLat([121.316534, -2.44565]);
const defaultZoom = 5;

const view = new View({
  center: defaultLocation,
  zoom: defaultZoom
});

const map = new Map({
  controls: defaultControls(),
  target: 'map',
  view: view,
});

const osmTile = new TileLayer({
  source: new OSM(),
  visible: true,
});

map.addLayer(osmTile);

const mousePosition = new MousePosition({
  className: 'mouse-position',
  coordinateFormat: function (coordinate) {
    return format(coordinate, '{y}, {x}', 6);
  },
  projection: 'EPSG:4326',
});

map.addControl(mousePosition);

const scaleControl = new ScaleLine({
  bar: true,
  text: true,
});

map.addControl(scaleControl);

const homeControl = new HomeControl({
  center: defaultLocation,
  zoom: defaultZoom,
});

map.addControl(homeControl);

const fullScreenControl = new FullScreenControl();

map.addControl(fullScreenControl);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const popup = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

map.addOverlay(popup);

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toLonLat(coordinate);

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  popup.setPosition(coordinate);
});
