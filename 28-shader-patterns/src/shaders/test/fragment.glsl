varying vec2 vUv;

void main()
{
    // Pattern 3 - Gradient x
    // float stregth = vUv.x;
    // Pattern 4 - Gradient y
    // float stregth = vUv.y;
    // Pattern 5 - Gradient negative y
    // float stregth = 1.0 - vUv.y;
    // Pattern 6 - Gradient faster
    // float stregth = vUv.y * 10.0;
    // Pattern 7 - jalusi 
    // float stregth = mod(vUv.y * 10.0, 1.0);
    // Pattern 8 - jalusi sharp
    // float stregth = mod(vUv.y * 10.0, 1.0);
    // stregth = step(0.5, stregth); // if stregth is bigger than 0.5, stregth becomes 1.0, otherwise it becomes 0.0
    // Pattern 11 - cells
    // float stregth = step(0.8, mod(vUv.x * 10.0, 1.0));
    // stregth += step(0.8, mod(vUv.y * 10.0, 1.0));
    // Pattern 12 - cells inverted
    // float stregth = step(0.8, mod(vUv.x * 10.0, 1.0));
    // stregth *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // Pattern 13 - dashes
    // float stregth = step(0.1, mod(vUv.x * 10.0, 1.0));
    // stregth *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // Pattern 14 - dashes
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float stregth = barX + barY;
    // Pattern 15 - pluses
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float stregth = barX + barY;
    // Pattern 16 - Gradient from center
    // float stregth = abs(vUv.x - 0.5);
    // Pattern 17 - Gradient cross
    // float stregth = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // Pattern 18 - Gradient cross inverted
    // float stregth = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // Pattern 19 - Square inside square
    // float stregth = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // Pattern 20 - Frame
    // float stregth = step(0.4, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // // Pattern 21 - Gradient chunks
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // // Pattern 22
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    // // Pattern 23
    // float strength = random(vUv);

    // // Pattern 24
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);

    // // Pattern 25
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
    // float strength = random(gridUv);

    // // Pattern 26
    // float strength = length(vUv);

    // // Pattern 27
    // float strength = distance(vUv, vec2(0.5));

    // // Pattern 28
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // // Pattern 29
    // float strength = 0.015 / (distance(vUv, vec2(0.5)));

    // // Pattern 30
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 31
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 32
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 33
    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);

    // // Pattern 34
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    // // Pattern 35
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // // Pattern 36
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // // Pattern 37
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 38
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 39
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 40
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // // Pattern 41
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;

    // // Pattern 42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = angle;

    // // Pattern 43
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = mod(angle * 20.0, 1.0);

    // // Pattern 44
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = sin(angle * 100.0);

    // // Pattern 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float radius = 0.25 + sin(angle * 100.0) * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // // Pattern 46
    // float strength = cnoise(vUv * 10.0);

    // // Pattern 47
    // float strength = step(0.0, cnoise(vUv * 10.0));

    // // Pattern 48
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));

    // // Pattern 49
    // float strength = sin(cnoise(vUv * 10.0) * 20.0);

    // Pattern 50
    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    // Final color
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(mixedColor, 1.0);
    

    gl_FragColor = vec4(stregth, stregth, stregth, 1.0);
}