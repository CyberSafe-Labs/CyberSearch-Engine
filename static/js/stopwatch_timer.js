function stopwatchload() {

    class Stopwatch {
        constructor(display, results) {
            this.running = false;
            this.display = display;
            this.results = results;
            this.laps = [];
            this.reset();
            this.print(this.times);
        }

        reset() {
            this.times = [0, 0, 0];
            this.results.html("");
        }

        start() {
            if (!this.time) this.time = performance.now();
            if (!this.running) {
                this.running = true;
                requestAnimationFrame(this.step.bind(this));
            }
        }

        lap() {
            let times = this.times;
            this.results.append("<div class='list-item'><li>" + this.format(times) + "</li></div>");
        }

        stop() {
            this.running = false;
            this.time = null;
        }

        restart() {
            if (!this.time) this.time = performance.now();
            if (!this.running) {
                this.running = true;
                requestAnimationFrame(this.step.bind(this));
            }
            this.reset();
        }

        clear() {
            clearChildren(this.results);
        }

        step(timestamp) {
            if (!this.running) return;
            this.calculate(timestamp);
            this.time = timestamp;
            this.print();
            requestAnimationFrame(this.step.bind(this));
        }

        calculate(timestamp) {
            var diff = timestamp - this.time;
            // Hundredths of a second are 100 ms
            this.times[2] += diff / 10;
            // Seconds are 100 hundredths of a second
            if (this.times[2] >= 100) {
                this.times[1] += 1;
                this.times[2] -= 100;
            }
            // Minutes are 60 seconds
            if (this.times[1] >= 60) {
                this.times[0] += 1;
                this.times[1] -= 60;
            }
        }

        print() {
            this.display.innerText = this.format(this.times);
        }

        format(times) {
            return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
        }
    }

    function pad0(value, count) {
        var result = value.toString();
        for (; result.length < count; --count) result = '0' + result;
        return result;
    }

    function clearChildren(node) {
        while (node.lastChild) node.removeChild(node.lastChild);
    }

    let stopwatch = new Stopwatch(document.querySelector('.cl-stopwatch-digital'), $("#id-lap-list"));

    $("#id-start").click(function () {
        stopwatch.start();
    });
    $("#id-stop").click(function () {
        stopwatch.stop();
    });
    $("#id-reset").click(function () {
        stopwatch.reset();
        stopwatch.stop();
        stopwatch.print();
    });
    $("#id-lap").click(function () {
        stopwatch.lap();
    });
    //------------------------------------------------------------------------------------------------------------------
    //circle start
    let progressBar = document.querySelector('.cl-progress');
    let pointer = document.getElementById('id-pointer');

    progressBar.style.strokeDasharray = Math.PI * 2 * 100;

    function update(value, timePercent) {
        var offset = -progressBar.style.strokeDasharray - progressBar.style.strokeDasharray * value / (timePercent);
        progressBar.style.strokeDashoffset = offset;
        pointer.style.transform = `rotate(${360 * (value / 100) / (timePercent / 100)}deg)`;
    };

    //circle ends
    const displayOutput = document.querySelector('.cl-display-remain-time');
    const pauseBtn = document.getElementById('id-pause');
    const setterBtns = document.querySelectorAll('button[data-setter]');

    let intervalTimer;
    let timeLeft;
    let wholeTime = 0.5 * 6000; // manage this to set the whole time
    let isPaused = false;
    let isStarted = false;


    update(wholeTime, wholeTime); //refreshes progress bar
    displayTimeLeft(wholeTime);

    function changeWholeTime(seconds) {
        if ((wholeTime + seconds) > 0) {
            wholeTime += seconds;
            update(wholeTime, wholeTime);
        }
    }

    for (var i = 0; i < setterBtns.length; i++) {
        setterBtns[i].addEventListener("click", function (event) {
            var param = this.dataset.setter;
            switch (param) {
                case 'minutes-plus':
                    changeWholeTime(1 * 6000);
                    break;
                case 'minutes-minus':
                    changeWholeTime(-1 * 6000);
                    break;
                case 'seconds-plus':
                    changeWholeTime(100);
                    break;
                case 'seconds-minus':
                    changeWholeTime(-100);
                    break;
            }
            displayTimeLeft(wholeTime);
        });
    }

    function timer(seconds) { //counts time, takes seconds
        let remainTime = Date.now() + (seconds * 10);
        displayTimeLeft(seconds);

        intervalTimer = setInterval(function () {
            timeLeft = Math.round((remainTime - Date.now()) / 10);
            if (timeLeft < 0) {
                clearInterval(intervalTimer);
                isStarted = false;
                setterBtns.forEach(function (btn) {
                    btn.disabled = false;
                    btn.style.opacity = 1;
                });
                displayTimeLeft(wholeTime);
                pauseBtn.classList.remove('cl-pause');
                pauseBtn.classList.add('cl-play');
                return;
            }
            displayTimeLeft(timeLeft);
        }, 10);
    }

    function pauseTimer(event) {
        if (isStarted === false) {
            timer(wholeTime);
            isStarted = true;
            this.classList.remove('cl-play');
            this.classList.add('cl-pause');

            setterBtns.forEach(function (btn) {
                btn.disabled = true;
                btn.style.opacity = 0.5;
            });

        } else if (isPaused) {
            this.classList.remove('cl-play');
            this.classList.add('cl-pause');
            timer(timeLeft);
            isPaused = isPaused ? false : true
        } else {
            this.classList.remove('cl-pause');
            this.classList.add('cl-play');
            clearInterval(intervalTimer);
            isPaused = isPaused ? false : true;
        }
    }

    function displayTimeLeft(timeLeft) { //displays time on the input
        let minutes = Math.floor((timeLeft / 100) / 60);
        let seconds = Math.floor((timeLeft / 100)) % 60;
        let milliseconds = timeLeft % 100;
        let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
        displayOutput.textContent = displayString;
        if (milliseconds === 0) {
            update(timeLeft, wholeTime);
        }
    }

    pauseBtn.addEventListener('click', pauseTimer);

}
