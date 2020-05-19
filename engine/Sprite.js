;(function() {
    'use strict'
    class Sprite {
        constructor(texture, args = {}) {
            const { x, y, width, height, frame = {}, anchorX, anchorY, scale } = args;
            this.texture = texture;
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || this.texture.width,
                height: frame.height || this.texture.height
            };
            this.anchorX = anchorX || 0;
            this.anchorY = anchorY || 0;
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || this.frame.width;
            this.height = height || this.frame.height;
            if(scale !== undefined) {
                this.setScale(scale);
            }
        }
        setScale(value) {
            this.scaleX = value;
            this.scaleY = value;
        }
        get absoluteX() {
            return this.x - this.anchorX * this.width;
        }
        set absoluteX(value) {
            this.x = value + this.anchorX * this.width;
            return value;
        }
        get absoluteY() {
            return this.y - this.anchorY * this.height;
        }
        set absoluteY(value) {
            this.y = value + this.anchorY * this.height;
            return value;
        }
        get scaleX() {
            return this.width / this.frame.width;
        }
        set scaleX(value) {
            this.width = this.frame.width * value;
            return value;
        }
        get scaleY() {
            return this.height / this.frame.height;
        }
        set scaleY(value) {
            this.height = this.frame.height * value;
            return value;
        }
        draw(canvas, context) {
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                this.absoluteX,
                this.absoluteY,
                this.width,
                this.height
            );
        }
    }
    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
})();