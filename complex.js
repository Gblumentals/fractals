// Object that is a complex number, with one part real and the other part imaginary (z = a + bI) 
var complex = function(x, y) {
        this.real = x;
        this.imag = y;
    }
    // function for adding complex numbers, precisely "this" is the complex number we are adding another (z) to 
complex.prototype.add = function(z) {
    return new complex(this.real + z.real, this.imag + z.imag);
}

// function for multiplying complex numbers, precisely "this" is the complex number we are multiplying another (z) to 
complex.prototype.times = function(z) {
    return new complex(this.real * z.real - this.imag * z.imag, this.imag * z.real + this.real * z.imag);
}

complex.prototype.abs = function() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
}

complex.prototype.toStr = function() {
    if (this.imag < 0) {
        return this.real.toFixed(3) + " - i" + Math.abs(this.imag.toFixed(3));
    }
    return this.real.toFixed(3) + " + i" + this.imag.toFixed(3);
}
