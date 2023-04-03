const tutorial = document.getElementById("tutorial");
const begin = document.getElementById("begin");
const kokot = document.getElementById("kokot");
const enemy = document.getElementById("krysa");
const enemy2 = document.getElementById("krysa2");
const enemy3 = document.getElementById("krysa3");
const enemy4 = document.getElementById("krysa4");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

begin.onclick = () => {
  kokot.style.display = "block"
  tutorial.style.display = "none";
  canvas.style.display = "block";
};

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    const image = new Image();
    image.src = "./res/img/rizzard.png";
    image.onload = () => {
      this.image = image;
      this.width = image.width;
      this.height = image.height;
      this.position = {
        x: canvas.width - this.width - 1750,
        y: canvas.height / 2 - this.width / 2,
      };
    };
  }
  draw() {
    ctx.save();

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player();
const projectiles = [];
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  projectiles.forEach((projectile) => {
    projectile.update();
  });


  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
  } else {
    player.velocity.x = 0;
  }
  if (keys.w.pressed && player.position.y >= 0) {
    player.velocity.y = -5;
  } else if (
    keys.s.pressed &&
    player.position.y + player.height <= canvas.height
  ) {
    player.velocity.y = 5;
  } else {
    player.velocity.y = 0;
  }
}
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      player.velocity.x = -5;
      keys.a.pressed = true;
      break;
    case "d":
      console.log("right");
      player.velocity.x = +5;
      keys.d.pressed = true;
      break;
    case "w":
      console.log("up");
      player.velocity.y = -5;
      keys.w.pressed = true;
      break;
    case "s":
      console.log("down");
      player.velocity.y = +5;
      keys.s.pressed = true;
      break;
    case " ":
      console.log("space");
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + 100,
            y: player.position.y + 75,
          },
          velocity: {
            x: 10,
            y: 0,
          },
        })
      );
      break;
  }
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      player.velocity.x = -5;
      keys.a.pressed = false;
      break;
    case "d":
      console.log("right");
      player.velocity.x = +5;
      keys.d.pressed = false;
      break;
    case "w":
      console.log("up");
      player.velocity.y = -5;
      keys.w.pressed = false;
      break;
    case "s":
      console.log("down");
      player.velocity.y = +5;
      keys.s.pressed = false;
      break;
  }
});
