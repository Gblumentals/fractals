function main() {
    var cJulia = document.getElementById('canvasJulia');

    cJulia.nbTerms = 150;
    cJulia.W = 4;
    cJulia.zc = new complex(0, 0); // complex numbe the center of the canvas

    cJulia.H = cJulia.height / cJulia.width * cJulia.W;
console.log('1');
    cJulia.draw = function(c) {
        var context = cJulia.getContext('2d');
        var imageData = context.createImageData(cJulia.width, cJulia.height);
        var cpt = 0; // all the pixels of our canvas
        var C = 1 / 2 * (1 + Math.sqrt(1 + 4 * c.abs()));
console.log('2');

            for (var i = 0; i < cJulia.height; i++) {
                for (var j = 0; j < cJulia.width; j++) {


                    var z0 = this.canvasToComplex(i, j);
                    var isInJuliaSet = true;
                    //for coloring pixels
                    for (var k = 0; k < this.nbTerms; k++) {
                        if (z0.abs() > C) {
                            isInJuliaSet = false;
                            break;
                        }

                        z0 = z0.times(z0).add(c);

                    };

                    if (isInJuliaSet) {
                        imageData.data[cpt] = 255;
                        imageData.data[cpt + 1] = 255;
                        imageData.data[cpt + 2] = 255;
                        imageData.data[cpt + 3] = 255;

                    } else {
                        imageData.data[cpt] = 0;
                        imageData.data[cpt + 1] = 0;
                        imageData.data[cpt + 2] = 0;
                        imageData.data[cpt + 3] = 255;
                    }
                    cpt = cpt + 4;
                };
            };

            context.putImageData(imageData, 0, 0); // args 2 and 2 are offset

        }


        cJulia.canvasToComplex = function(li, col) { //li line of pixel, collum of pixel
            return new complex(this.W / this.width * col + this.zc.real - this.W / 2, -this.H / this.height * li + this.zc.imag + this.H / 2);
        }

        cJulia.draw(new complex(-1.28, -1));
    }