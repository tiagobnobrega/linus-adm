import * as RJD from 'react-js-diagrams';
import LinkFactoryExt from './LinkFactoryExt';

export default class LinkModelExt extends RJD.LinkModel {
    constructor(linkType = LinkFactoryExt.TYPE) {
        super();
        this.linkType = linkType;
        this.points = this.getDefaultPoints();
        this.extras = {};
        this.sourcePort = null;
        this.targetPort = null;
        this.color="#000";
    }

    setColor(color){
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}
