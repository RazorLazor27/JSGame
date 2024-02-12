import * as THREE from 'three';

const DEACCELERATION = 0.001;

export function detectMovement(arrowPressed, moving, velocityX, velocityZ) {
    let result = { moving: moving, velocityX: velocityX, velocityZ: velocityZ };

    // Moverse hacia la derecha
    if (!arrowPressed && result.velocityX > 0 && result.moving) {
        result.velocityX -= 0.001;
        if (Math.abs(result.velocityX) < 0.005) {
            result.velocityX = 0;
            if (Math.abs(result.velocityZ) == 0) {
                result.moving = false;
            }
        }
    }

    // Moverse hacia abajo
    if (!arrowPressed && result.velocityZ > 0 && result.moving) {
        result.velocityZ -= 0.001;
        if (Math.abs(result.velocityZ) < 0.005) {
            result.velocityZ = 0;
            if (Math.abs(result.velocityX) == 0) {
                result.moving = false;
            }
        }
    }

    // Moviendose hacia la izquierda
    if (!arrowPressed && result.velocityX < 0 && result.moving) {
        result.velocityX += 0.001;
        if (Math.abs(result.velocityX) < 0.005) {
            result.velocityX = 0;
            if (Math.abs(result.velocityZ) == 0) {
                result.moving = false;
            }
        }
    }

    // Moviendose hacia adelante
    if (!arrowPressed && result.velocityZ < 0 && result.moving) {
        result.velocityZ += 0.001;
        if (Math.abs(result.velocityZ) < 0.005) {
            result.velocityZ = 0;
            if (Math.abs(result.velocityX) == 0) {
                result.moving = false;
            }
        }
    }

    return result;
}