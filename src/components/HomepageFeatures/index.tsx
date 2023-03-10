import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imgSrc: string;
  description: JSX.Element;
  Attrib: () => JSX.Element
};


const attribStyle: React.CSSProperties = {
  fontSize: "0.7em",
  color: "var(--icon-link-color)"
} 

const FeatureList: FeatureItem[] = [
  {
    title: 'Type Safe',
    imgSrc: 'img/shield.png',
    description: (
      <>
        <code>plu-ts</code> runs in Javascript but implements its own type system;
        this way you can be sure about that what you are using is what you are expecting.
      </>
    ),
    Attrib:() => (<a style={attribStyle} href="https://www.flaticon.com/free-icons/insurance" title="Type Safe">Icon created by iconmas - Flaticon</a>)
  },
  {
    title: 'Designed for efficiency',
    imgSrc: 'img/speedometer.svg',
    description: (
      <>
        <code>plu-ts</code> gives you full controll so that you can minimize both size and script execution costs.

      </>
    ),
    Attrib:() => (<a style={attribStyle} href="https://www.flaticon.com/free-icons/performance" title="Efficient">Icon created by Freepik - Flaticon</a>)
  },
  {
    title: 'All in Typescript',
    imgSrc: 'img/coding.svg',
    description: (
      <>
        All the support of the Typescript ecosystem;<br></br> minimal setup;<br></br> ready to be used.
      </>
    ),
    Attrib:() => (<a style={attribStyle} href="https://www.flaticon.com/free-icons/code" title="in Typescript">Icon created by Roundicons Premium - Flaticon</a>)
  },
];

function Feature({title, imgSrc, description, Attrib}: FeatureItem) {
  return (
    <div className={clsx('col col--4') + " text--cente"}>
      <div className="text--center">
        <img src={imgSrc} className={styles.featureSvg}/>
      </div>
      <div className="text--center padding-horiz--md">
        <Attrib />
        <h3>{title}</h3>
        <p style={{ fontSize: "0.95em" }} >{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
