function horizontal_movement(v0: number, t: number) {
    return v0 * t
}

function vertical_motion(v0: number, t: number, sita: number, g: number) {
    return (v0 * Math.sin(sita)) * t + 1/2 * Math.pow(g, 2) 
}

export {vertical_motion, horizontal_movement}