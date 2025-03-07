let spirals = [];
let numSpirals = 3; 
let rotationSpeed = 0.01;
let morphSpeed = 0.009;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 75);

    for (let i = 0; i < numSpirals; i++) {
        spirals.push(new Spiral(
            random(width), random(height), 
            random(0.002, 0.02), 
            random(0.002, 0.01) 
        ));
    }
}

function draw() {
    background(0, 20);

    for (let spiral of spirals) {
        spiral.update();
        spiral.display();
    }
}

class Spiral {
    constructor(x, y, rotSpeed, morphSpeed) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.sizeFactor = 1;
        this.morphAmount = 0;
        this.rotationSpeed = rotSpeed;
        this.morphSpeed = morphSpeed;
    }

    update() {
        this.angle += this.rotationSpeed;
        this.morphAmount += this.morphSpeed;
    }

    display() {
        push();
        translate(this.x, this.y);
        let hueValue = (frameCount % 360);
        for (let i = 0; i < 200; i++) {
            let spiralAngle = this.angle + i * 0.2;
            let x = cos(spiralAngle) * i * 4;
            let y = sin(spiralAngle) * i * 4;

            push();
            translate(x, y);
            rotate(spiralAngle * 2);

            stroke(hueValue, 100, 100);
            let shapeSize = this.sizeFactor * (10 + sin(frameCount * 0.02 + i) * 5);

            let morphValue = sin(this.morphAmount + i * 0.1);
            drawMorphingShape(0, 0, shapeSize, morphValue);
            pop();
        }
        pop();
    }
}

function drawMorphingShape(x, y, size, morph) {
    beginShape();
    let sides = 3 + morph * 2; // Interpolates between 3 (triangle) to 5 (pentagon)
    for (let i = 0; i < sides; i++) {
        let angle = TWO_PI / sides * i - HALF_PI;
        let vx = x + cos(angle) * size;
        let vy = y + sin(angle) * size;
        vertex(vx, vy);
    }
    endShape(CLOSE);
}

function mouseMoved() {
    for (let spiral of spirals) {
        spiral.rotationSpeed = map(mouseX, 0, width, 0.002, 0.03);
    }
}

function mousePressed() {
    for (let spiral of spirals) {
        spiral.sizeFactor = random(0.5, 2);
        spiral.morphSpeed = random(0.002, 0.01);
        spiral.rotationSpeed = random(0.002, 0.03);
    }
}
