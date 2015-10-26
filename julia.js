function main() {
    var cJulia = document.getElementById('canvasJulia');
    cJulia.nbTerms = 150;
    cJulia.W0 = 4;
    cJulia.W = cJulia.W0;
    cJulia.H0 =  cJulia.height / cJulia.width * cJulia.W;
    cJulia.coeffZoom = 0.5;
    cJulia.zc = new complex(0, 0); // complex numbe the center of the canvas
    cJulia.tabColor = [];
    var c = new complex(0.3, 0.5);
    for (var i = 0; i < cJulia.nbTerms; i++) {
        cJulia.tabColor.push([i * 255 / (cJulia.nbTerms - 1), i * 255 / (cJulia.nbTerms - 1), i * 215 / (cJulia.nbTerms - 1) + 40, 255]);
    };

    cJulia.H = cJulia.H0;


    cJulia.draw = function(c) {
        var context = cJulia.getContext('2d');
        var imageData = context.createImageData(this.width, this.height);
        var cpt = 0; // all the pixels of our canvas
        var C = 1 / 2 * (1 + Math.sqrt(1 + 4 * c.abs()));
        var level = 0;

        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {


                var z0 = this.canvasToComplex(i, j);

                //for coloring pixels
                for (var k = 0; k < this.nbTerms; k++) {
                    level = k;
                    if (z0.abs() > C) {
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

    //zoom
    cJulia.onclick = function(ev) {
        var rect = this.getBoundingClientRect();;
        var li = ev.clientY - rect.top;
        var col = ev.clientX - rect.left;

        this.zc = this.canvasToComplex(li, col);
        this.W = this.W * this.coeffZoom;
        this.H = this.H * this.coeffZoom;

        this.draw(c);
    }

    cJulia.ondblclick = function(ev) {
        this.zc = new complex(0,0);
        this.W = this.W0;
        this.H = this.H0;
        this.draw(c);
    }

    cJulia.canvasToComplex = function(li, col) { //li line of pixel, collum of pixel
        return new complex(this.W / this.width * col + this.zc.real - this.W / 2, -this.H / this.height * li + this.zc.imag + this.H / 2);
    }

    cJulia.draw(c);
}
