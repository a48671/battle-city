;(function() {
    'use strict'
    class Renderer {
        constructor(args = {}) {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            this.canvas.width = args.width || 50;
            this.canvas.height = args.height || 50;
            this.update = args.update || (() => {});
            this.background = args.background || 'black';
            this.stage = new GameEngine.Container();
            requestAnimationFrame((timestamp) => this.tick(timestamp));
        }

        tick(timestamp) {
            this.update(timestamp);
            this.clear();
            this.render();
            requestAnimationFrame((timestamp) => this.tick(timestamp));
        }

        render() {
            this.stage.draw(this.canvas, this.context);
        }

        clear() {
            const { canvas, context } = this;
            context.fillStyle = this.background;
            context.beginPath();
            context.rect(0, 0, canvas.width, canvas.height);
            context.fill();
        }
    }
    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Renderer = Renderer;
})();