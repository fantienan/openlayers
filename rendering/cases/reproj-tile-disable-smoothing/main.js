import Map from '../../../src/ol/Map.js';
import View from '../../../src/ol/View.js';
import XYZ from '../../../src/ol/source/XYZ.js';
import TileLayer from '../../../src/ol/layer/Tile.js';
import {toLonLat} from '../../../src/ol/proj.js';
import {createXYZ} from '../../../src/ol/tilegrid.js';

const tileGrid = createXYZ();
const extent = tileGrid.getTileCoordExtent([5, 5, 12]);
const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];

const source = new XYZ({
  transition: 0,
  minZoom: 5,
  maxZoom: 5,
  imageSmoothing: false,
  url: '/data/tiles/osm/{z}/{x}/{y}.png'
});

const layer = new TileLayer({
  source: source
});

layer.on('prerender', function(evt) {
  evt.context.imageSmoothingEnabled = false;
});

new Map({
  pixelRatio: 1,
  target: 'map',
  layers: [layer],
  view: new View({
    projection: 'EPSG:4326',
    center: toLonLat(center),
    zoom: 10
  })
});

render();
