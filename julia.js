function main() {
    var cJulia = document.getElementById('canvasJulia');
    cJulia.nbTerms = 150;
    cJulia.W = 4;
    cJulia.zc = new complex(0, 0); // complex numbe the center of the canvas
    cJulia.tabColor = [];

    for (var i = 0; i < cJulia.nbTerms; i++) {
    	cJulia.tabColor.push([i*255/(cJulia.nbTerms -1),i*255/(cJulia.nbTerms -1),i*215/(cJulia.nbTerms -1) + 40, 255]);
    };

    cJulia.H = cJulia.height / cJulia.width * cJulia.W;
    console.log('1');
    cJulia.draw = function(c) {
        var context = cJulia.getContext('2d');
        var imageData = context.createImageData(cJulia.width, cJulia.height);
        var cpt = 0; // all the pixels of our canvas
        var C = 1 / 2 * (1 + Math.sqrt(1 + 4 * c.abs()));
        console.log('2');
        var level = 0;

        for (var i = 0; i < cJulia.height; i++) {
            for (var j = 0; j < cJulia.width; j++) {


                var z0 = this.canvasToComplex(i, j);

                //for coloring pixels
                for (var k = 0; k < this.nbTerms; k++) {
                    level = k;
                    if (z0.abs() > C) {
                        isInJuliaSet = false;
                        break;
                    }

                    z0 = z0.times(z0).add(c);

                };

                 
                    imageData.data[cpt] = this.tabColor[level][0];
                    imageData.data[cpt + 1] = this.tabColor[level][1];
                    imageData.data[cpt + 2] = this.tabColor[level][2];
                    imageData.data[cpt + 3] = this.tabColor[level][3];

                cpt = cpt + 4;
            };
        };

        context.putImageData(imageData, 0, 0); // args 2 and 2 are offset

    }


    cJulia.canvasToComplex = function(li, col) { //li line of pixel, collum of pixel
        return new complex(this.W / this.width * col + this.zc.real - this.W / 2, -this.H / this.height * li + this.zc.imag + this.H / 2);
    }

    cJulia.draw(new complex(0.3, 0.5));
}
