var theta = 0;
var omega = 0;
var h = 1/100;
var l = 0;
var angle = 0;
var g = 0;
var k = 0;

function omegaDot(gravity, length, theta_in, k_in, omega_in) {
    return -((gravity / length) * Math.sin(theta_in)) - (k_in * omega_in);
}
function thetaDot(omega_in) {
    return omega_in;
}

self.addEventListener('message', function(e) {
    var params = e.data;
    angle = parseFloat(params[0]);
    l = parseFloat(params[1]);
    g = parseFloat(params[2]);
    k  = parseFloat(params[3]);
    theta = angle;
    omega = 0;
  }, false);
  
function calc() {
    var aomega = omegaDot(g, l, theta, k, omega);
    var atheta = thetaDot(omega);
    var bomega = omegaDot(g, l, theta + 0.5 * h * atheta, k, omega);
    var btheta = thetaDot(omega + 0.5 * h * aomega);
    var comega = omegaDot(g, l, theta + 0.5 * h * btheta, k, omega);
    var ctheta = thetaDot(omega + 0.5 * h * bomega);
    var domega = omegaDot(g, l, theta + h * ctheta, k, omega);
    var dtheta = thetaDot(omega + h * comega);

    omega = omega + (h / 6) * (aomega + 2 * bomega + 2 * comega + domega);
    theta = theta + (h / 6) * (atheta + 2 * btheta + 2 * ctheta + dtheta);
    postMessage(theta);
    setTimeout("calc()",7);
}

calc();
