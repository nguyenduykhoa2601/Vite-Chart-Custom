import React from "react";
import gsap from "gsap";
import './Loader.scss'

const Loader = () => {
  const $ = (s: any, o = document) => o.querySelector(s);
  const $$ = (s: any, o = document) => o.querySelectorAll(s);

  $$(".button").forEach((button) => {
    let count = {
        number: 0,
      },
      icon = $(".icon", button),
      iconDiv = $(".icon > div", button),
      arrow = $(".icon .arrow", button),
      countElem = $("span", button),
      svgPath = new Proxy(
        {
          y: null,
          s: null,
          f: null,
          l: null,
        },
        {
          set(target: any, key, value) {
            target[key] = value;
            if (
              target.y !== null &&
              target.s != null &&
              target.f != null &&
              target.l != null
            ) {
              arrow.innerHTML = getPath(
                target.y,
                target.f,
                target.l,
                target.s,
                null
              );
            }
            return true;
          },
          get(target, key) {
            return target[key];
          },
        }
      );

    svgPath.y = 30;
    svgPath.s = 0;
    svgPath.f = 8;
    svgPath.l = 32;

    button.addEventListener("click", (e: any) => {
      if (!button.classList.contains("loading")) {
        if (!button.classList.contains("animation")) {
          button.classList.add("loading", "animation");

          gsap.to(svgPath, {
            f: 2,
            l: 38,
            duration: 0.3,
            delay: 0.15,
          });

          gsap.to(svgPath, {
            s: 0.2,
            y: 16,
            duration: 0.8,
            delay: 0.15,
            ease: Elastic.easeOut.config(1, 0.4),
          });

          gsap.to(count, {
            number: "100",
            duration: 3.8,
            delay: 0.8,
            onUpdate() {
              countElem.innerHTML = Math.round(count.number) + "%";
            },
          });

          setTimeout(() => {
            iconDiv.style.setProperty("overflow", "visible");
            setTimeout(() => {
              button.classList.remove("animation");
            }, 600);
          }, 4820);
        }
      } else {
        if (!button.classList.contains("animation")) {
          button.classList.add("reset");

          gsap.to(svgPath, {
            f: 8,
            l: 32,
            duration: 0.4,
          });

          gsap.to(svgPath, {
            s: 0,
            y: 30,
            duration: 0.4,
          });

          setTimeout(() => {
            button.classList.remove("loading", "reset");
            iconDiv.removeAttribute("style");
          }, 400);
        }
      }
      e.preventDefault();
    });
  });

  function getPoint(point: any, i: any, a: any, smoothing: any) {
    let cp = (current: any, previous: any, next: any, reverse: any) => {
        let p = previous || current,
          n = next || current,
          o = {
            length: Math.sqrt(
              Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)
            ),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
          },
          angle = o.angle + (reverse ? Math.PI : 0),
          length = o.length * smoothing;
        return [
          current[0] + Math.cos(angle) * length,
          current[1] + Math.sin(angle) * length,
        ];
      },
      cps = cp(a[i - 1], a[i - 2], point, false),
      cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  }

  function getPath(
    update: any,
    first: any,
    last: any,
    smoothing: any,
    pointsNew: any
  ) {
    let points = pointsNew
        ? pointsNew
        : [
            [first, 16],
            [20, update],
            [last, 16],
          ],
      d = points.reduce(
        (acc: any, point: any, i: any, a: any) =>
          i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${getPoint(point, i, a, smoothing)}`,
        ""
      );
    return `<path d="${d}" />`;
  }

  return (
    <>
      <button className="button">
        <svg className="circle" viewBox="0 0 76 76">
          <circle className="default" cx="38" cy="38" r="36"></circle>
          <circle className="active" cx="38" cy="38" r="36"></circle>
        </svg>
        <div className="icon">
          <svg className="line" viewBox="0 0 4 37">
            <line x1="2" y1="2" x2="2" y2="35"></line>
          </svg>
          <div>
            <svg className="arrow" viewBox="0 0 40 32"></svg>
            <svg className="progress" viewBox="0 0 444 10">
              <path d="M2,5 L42,5 C60.0089086,6.33131695 73.3422419,6.99798362 82,7 C87.572404,7.00129781 91.0932494,1.72677301 102,1.99944178 C112.906751,2.27211054 112.000464,7.99986045 122,8 C131.999536,8.00013955 132,2 142,2 C152,2 152,8 162,8 C172,8 172,2 182,2 C192,2 192,8 202,8 C212,8 212,2 222,2 C232,2 232,8 242,8 C252,8 252,2 262,2 C272,2 272,8 282,8 C292,8 292,2 302,2 C312,2 312,8 322,8 C332,8 332,2 342,2 C352,2 351.897852,7.49489262 362,8 C372.102148,8.50510738 378.620177,5.22532154 402,5 L442,5"></path>
            </svg>
          </div>
        </div>
        <span>0%</span>
      </button>
      <a
        className="dribbble"
        href="https://dribbble.com/shots/9683055-Download-animation"
        target="_blank"
      >
        <img
          src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png"
          alt=""
        />
      </a>
      <a
        className="twitter"
        target="_top"
        href="https://twitter.com/aaroniker_me"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 72 72"
        >
          <path d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z"></path>
        </svg>
      </a>
    </>
  );
};

export default Loader;
