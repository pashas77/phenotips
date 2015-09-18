/**
 * SVGWrapper is a wrapper around textual representation of an SVG with methods to manipulate the SVG
 *
 * @class SVGWrapper
 * @constructor
 */

var SVGWrapper = Class.create({

    // needs to get bbox as an input as this needs an external compiutation by the browser
    initialize: function(svgText, boundingBox, scale) {
        this._svgText = svgText;
        this._bbox    = boundingBox;
        this._svgBbox = boundingBox;
        this._scale   = scale ? scale : 1.0;
    },

    /**
     * Returns the text string representing the SVG
     *
     * @method getSVGText
     * @return {Object} Raphael Paper element
     */
    getSVGText: function() {
        return this._svgText;
    },

    /**
     * Returns the bounding box of the wrapped SVG
     *
     * @method getBBox
     * @return {Object} {x,y, width, height}
     */
    getBBox: function() {
        return this._bbox;
    },

    getCopy: function() {
        return new SVGWrapper(this._svgText, this._bbox, this._scale);
    },

    setNoAspectRatioPreservation: function() {
        this._svgText = this._svgText.replace(/preserveAspectRatio="xMinYMin"/, "preserveAspectRatio=\"none\"");
        return this;
    },

    scale: function(scaleFactor) {
        this._scale = scaleFactor;

        this._bbox.width  = Math.floor(this._bbox.width  * scaleFactor);
        this._bbox.height = Math.floor(this._bbox.height * scaleFactor);

        this._svgText = this._svgText.replace(/(<svg [^<>]+) width=["-]?\d+"? height=["-]?\d+"?/g, "$1 width=\"" +
                                              (this._bbox.width) + "\" height=\"" + (this._bbox.height) + "\"");
        return this;
    },

    setViewBox: function(xOffset, yOffset, xWidth, yWidth) {
        xWidth = Math.floor(xWidth);
        yWidth = Math.floor(yWidth);
        this._svgText = this._svgText.replace(/(<svg[^<>]+) viewBox="[^<>"]*"/g,
                        "$1 viewBox=\"" + (this._svgBbox.x + xOffset/this._scale)+ " " + (this._svgBbox.y + yOffset/this._scale) + " " + xWidth/this._scale + " " + yWidth/this._scale + "\"");
        this._svgText = this._svgText.replace(/(<svg [^<>]+) width=["-]?\d+"? height=["-]?\d+"?/g, "$1 width=\"" +
                        (xWidth) + "\" height=\"" + (yWidth) + "\"");
        return this;
    },

    addCenteringCSS: function() {
        this._svgText = this._svgText.replace(/(<svg [^<>]+) style="/, "$1 style=\"display:block; margin: auto; ");
        return this;
    }
});
