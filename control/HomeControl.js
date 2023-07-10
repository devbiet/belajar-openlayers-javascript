import { Control } from "ol/control";
import { fromLonLat } from "ol/proj";

class HomeControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '⌂';

    const element = document.createElement('div');
    element.className = 'home-control ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleHome.bind(this), false);

    this.center = options.center || fromLonLat([0.0, 0.0]);
    this.zoom = options.zoom || 0;
  }

  handleHome() {
    let view = this.getMap().getView();
    view.setRotation(0);
    view.setCenter(this.center);
    view.setZoom(this.zoom);

    console.log(this.zoom);
  }
}

export default HomeControl;