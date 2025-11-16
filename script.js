class Machine {
    constructor(info) {
        this.info = info;
        this.state = "stopped";
        this.time = 2000;
        this.timer = null;
        this.interval = null;
        this.remaining = 0;
    }

    Write(msg) {
        // this.info.innerHTML = "";
        this.info.innerHTML += msg + "<br>";
        this.info.scrollTop = this.info.scrollHeight;
    }

    Run() {
        this.state = "started";
        this.Write(`Status = ${this.state}: Starting...`);
        this.Write(`Estimated time - ${this.time / 1000} sec`);

        this.remaining = Math.ceil(this.time / 1000);

        this.interval = setInterval(() => {
            this.Write(`Time left: ${this.remaining} sec`);
            this.remaining--;
        }, 1000);

        this.timer = setTimeout(() => this.OnReady(), this.time);
    }

    OnReady() {
        clearInterval(this.interval);
        this.state = "stopped";
        this.Write(`Done! Status = ${this.state}`);
    }

    Stop() {
        if (this.state == "started") {
            clearInterval(this.interval);
            clearTimeout(this.timer);
            this.state = "stopped";
            this.Write(`Forced stop. Status = ${this.state}`);
        } else {
            this.Write(`Can't stop process. Status = ${this.state}`);
        }
    }
}

class CoffeeMachine extends Machine {
    constructor(info) {
        super(info);
        this.drink = "water";
    }

    // Run(drink) {
    //     this.info.innerHTML = "";
    //     if (drink !== undefined) this.drink = drink;

    //     this.Write(`Preparing: ${this.drink}`);

    //     if (this.drink == "latte") this.time = 5000;
    //     if (this.drink == "espresso") this.time = 3000;
    //     if (this.drink == "black") this.time = 1000;

    //     super.Run();
    // }

    Run(drink) {
        this.info.innerHTML = "";
        if (drink !== undefined) this.drink = drink;

        let time;

        switch (this.drink) {
            case "latte":
                time = 5000;
                break;

            case "espresso":
                time = 3000;
                break;

            case "black":
                time = 1000;
                break;

            default:
                this.Write("No such drink");
                this.Stop();
                return;
        }

        this.time = time;

        this.Write(`Preparing: ${this.drink}`);
        super.Run();
    }
        
    Clear() {
        this.info.innerHTML = "";
    }
}

class Multivariate extends Machine {
    constructor(info) {
        super(info);
        this.dish = "";
    }

    // Run(dish) {
    //     this.info.innerHTML = "";
    //     if (dish !== undefined) this.dish = dish;

    //     this.Write(`Preparing: ${this.dish}`);

    //     if (this.dish == "soup") this.time = 7000;
    //     if (this.dish == "stew") this.time = 10000;
    //     if (this.dish == "bake") this.time = 12000;

    //     super.Run();
    // }

    Run(dish) {
        this.info.innerHTML = "";
        if (dish !== undefined) this.dish = dish;

        let time;

        switch (this.dish) {
            case "soup":
                time = 7000;
                break;

            case "stew":
                time = 10000;
                break;

            case "bake":
                time = 12000;
                break;

            default:
                this.Write("No such dish");
                this.Stop();
                return;
        }

        this.time = time;

        this.Write(`Preparing: ${this.dish}`);
        super.Run();
    }
        
    Clear() {
        this.info.innerHTML = "";
    }
}

let coffeeInfo = document.getElementById("coffeeInfo");
let multiInfo = document.getElementById("multiInfo");

let coffee = new CoffeeMachine(coffeeInfo);
let multi = new Multivariate(multiInfo);

document.getElementById("latte").onclick = () => coffee.Run("latte");
document.getElementById("espresso").onclick = () => coffee.Run("espresso");
document.getElementById("black").onclick = () => coffee.Run("black");
document.getElementById("coffeeStop").onclick = () => coffee.Stop();
document.getElementById("clearCoffee").onclick = () => coffee.Clear();

document.getElementById("soup").onclick = () => multi.Run("soup");
document.getElementById("stew").onclick = () => multi.Run("stew");
document.getElementById("bake").onclick = () => multi.Run("bake");
document.getElementById("multiStop").onclick = () => multi.Stop();
document.getElementById("clearMulti").onclick = () => multi.Clear();