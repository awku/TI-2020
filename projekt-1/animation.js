function periods(angle, l, g) {
    var f2 = 1.0 / 16.0;
    var f4 = 11.0 / 3072.0;
    var f6 = 173.0 / 737280.0;
    var f8 = 22931.0 / 1321205760.0;
    var f10 = 1319183.0 / 951268147200.0;
    var f12 = 233526463.0 / 2009078326886400.0;
    var a2 = angle * angle;
    var a4 = a2 * a2;
    var a6 = a4 * a2;
    var a8 = a4 * a4;
    var a10 = a6 * a4;
    var a12 = a6 * a6;
    var Tf = 1.0 + f2 * a2 + f4 * a4 + f6 * a6;
    Tf += f8 * a8 + f10 * a10 + f12 * a12;
    var T0 = 2.0 * Math.PI * Math.sqrt(l / g);
    var T1 = T0 * Tf;
    
    document.getElementById("result_m").innerHTML = "T = "+T1
    document.getElementById("result_a").innerHTML = "T = "+T0;
}

var w;

function stopWorker() {
    w.terminate();
    w = undefined;
}

function startWorker() {
    if (typeof(w) !== "undefined")
        stopWorker();

    var angle = document.getElementById("in_angle").value * (Math.PI / 180);
    var l = document.getElementById("in_l").value;
    var g = document.getElementById("in_g").value;
    var k = document.getElementById("in_k").value;
    var m = document.getElementById("in_m").value;
    var circle = document.getElementById("circle"); 
    var line = document.getElementById("line");
    if (k == 0) {
        document.getElementById("calculated-periods").style.display = "block";
    }
    else {
        document.getElementById("calculated-periods").style.display = "none";
    }

    circle.setAttribute("r", m/20*10);

    periods(angle, l, g);

    if (typeof(Worker) !== "undefined") {
        if (typeof(w) == "undefined") {
            w = new Worker("calculations.js");
            w.postMessage([angle, l, g, k]);
        }

        w.onmessage = function(e) {
            var theta=e.data;
            if (!isNaN(theta)) {
                var xx = 15*l*Math.cos(theta);
                var yx = 15*l*Math.sin(theta);
                var px = 250 + (xx*0-yx*1);
                var py = 155 + (yx*0+xx*1);
                circle.setAttribute("cx", px);
                circle.setAttribute("cy", py);
                line.setAttribute("x2", px);
                line.setAttribute("y2", py);
            }
        };
    }
    else
        document.getElementById("anim-page").innerHTML = "Sorry! No Web Worker support.";
}

function changedValues() {
    if (typeof(w) !== "undefined")
        startWorker();
}
