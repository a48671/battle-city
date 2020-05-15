;(function () {
    'use strict'
    class Loader {
        constructor() {
            this.loadOrders = {
                images: [],
                jsons: []
            };
            this.resources = {
                images: {},
                jsons: {}
            };
        };

        /**
         *
         * @param {string} name
         * @param {string} src - path by image
         */
        addImage(name, src) {
            this.loadOrders.images.push({name, src});
        };
        /**
         *
         * @param {string} name
         * @param {string} address - path by json file
         */
        addJson(name, address) {
            this.loadOrders.jsons.push({name, address});
        }
        load(callback) {
            const promises = [];
            for (const imageData of this.loadOrders.images) {
                const { src, name } = imageData;
                const promise = Loader.loadImage(src)
                    .then(image => {
                        this.resources.images[name] = image;
                        if (this.loadOrders.images.includes(imageData)) {
                            const index = this.loadOrders.images.indexOf(imageData);
                            this.loadOrders.images.splice(index, 1);
                        }
                    })
                promises.push(promise);
            }
            for (const jsonData of this.loadOrders.jsons) {
                const { name, address } = jsonData;
                const promise = Loader.loadJson(address)
                    .then(json => {
                        this.resources.jsons[name] = json;
                        if (this.loadOrders.jsons.includes(jsonData)) {
                            const index = this.loadOrders.jsons.indexOf(jsonData);
                            this.loadOrders.jsons.splice(index, 1);
                        }
                    });
                promises.push(promise);
            }
            Promise.all(promises).then(callback);
        }
        getImage(name) {
            return this.resources.images[name];
        }
        getJson(name) {
            return this.resources.jsons[name];
        }
        static loadImage(src) {
            return new Promise((res, rej) => {
                try {
                    const image = new Image();
                    image.onload = () => res(image);
                    image.src = src;
                } catch (err) {
                    rej(err);
                }
            });
        }
        static loadJson(address) {
            return new Promise((res, rej) => {
                fetch(address)
                    .then(response => response.json())
                    .then(json => res(json))
                    .catch(err => rej(err))
            });
        }
    };
    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Loader = Loader;
})();