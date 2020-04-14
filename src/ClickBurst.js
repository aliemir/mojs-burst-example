import React, { useState, useEffect, useCallback } from "react";
import mojs from "mo-js";

const ClickBurst = ({ children }) => {
  const [burstValues, setBurstValues] = useState({
    numBurstsToGenerate: 5,
    bursts: []
  });

  const rand = ({ min = 0, max = 1, int = true }) => {
    if (int) {
      return Math.floor(Math.random() * (max - min) + min);
    } else {
      return Math.random() * (max - min) + min;
    }
  };

  const generateBursts = useCallback(() => {
    const bursts = [];
    while (bursts.length < burstValues.numBurstsToGenerate) {
      bursts.push(
        new mojs.Burst({
          left: 0,
          top: 0,
          radius: { 4: 19 },
          angle: rand({ min: 0, max: 359 }),
          children: {
            shape: `line`,
            radius: rand({ min: 2, max: 12 }),
            scale: rand({ min: 0.5, max: 1.1, int: false }),
            stroke: `rgb(
                ${rand({ min: 175, max: 255 })},
                ${rand({ min: 175, max: 255 })},
                ${rand({ min: 175, max: 255 })}
              )`,
            strokeDasharray: `100%`,
            strokeDashoffset: { "-100%": `100%` },
            duration: rand({ min: 400, max: 600 }),
            easing: `quad.out`
          },
          onStart() {
            this.el.style.zIndex = `9999`;
          },
          onComplete() {
            this.el.style.zIndex = `-666`; // curse ye to hell foul demon!
          }
        })
      );
    }

    setBurstValues(prevValues => ({
      ...prevValues,
      bursts: bursts
    }));
  }, [burstValues.numBurstsToGenerate]);

  useEffect(() => {
    generateBursts();
  }, [generateBursts]);

  const kaboom = (e, child) => {
    e.stopPropagation();

    if (burstValues.bursts.length !== burstValues.numBurstsToGenerate) {
      generateBursts();
    }

    burstValues.bursts[rand({ max: burstValues.bursts.length })]
      .tune({ x: e.pageX, y: e.pageY })
      .replay();

    if (child.props.onClick) {
      child.props.onClick();
    }
  };

  return React.Children.map(children, child => {
    return React.cloneElement(child, {
      onClick: e => kaboom(e, child),
      style: {
        cursor: `pointer`,
        userSelect: `none`
      }
    });
  });
};

export default ClickBurst;
