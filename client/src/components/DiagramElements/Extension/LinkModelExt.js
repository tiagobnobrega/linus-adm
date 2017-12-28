import * as RJD from 'storm-react-diagrams';
import LinkFactoryExt from './LinkFactoryExt';

export default class LinkModelExt extends RJD.LinkModel {
    constructor(linkType = LinkFactoryExt.TYPE) {
        super();
        this.linkType = linkType;
        this.extras = {};
        this.color="#000";
    }

    setColor(color){
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}
