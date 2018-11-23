import {attach} from './giana-pen.js';
import {XtalDeco} from 'xtal-decorator/xtal-deco.js';
import {PU} from 'p-d.p-u/p-u.js';
const template = document.createElement('template');
template.innerHTML = `
<div class="html" disabled>
<p-u on="currentNum-changed" to="./viewer" prop="innerHTML" skip-init></p-u>
<p-u on="answerNum-changed"  to="./viewer" prop="innerHTML" skip-init></p-u>
<div class="body">
    <h1>JavaScript Calculator</h1>
    <p class="warning">Don't divide by zero</p>

    <div id="calculator" class="calculator">

        <button id="clear" class="clear">C</button>
        <div id="viewer" class="viewer">0</div>

        <button class="num" data-num="7">7</button>
        <button class="num" data-num="8">8</button>
        <button class="num" data-num="9">9</button>
        <button data-ops="plus" class="ops">+</button>

        <button class="num" data-num="4">4</button>
        <button class="num" data-num="5">5</button>
        <button class="num" data-num="6">6</button>
        <button data-ops="minus" class="ops">-</button>

        <button class="num" data-num="1">1</button>
        <button class="num" data-num="2">2</button>
        <button class="num" data-num="3">3</button>
        <button data-ops="times" class="ops">*</button>

        <button class="num" data-num="0">0</button>
        <button class="num" data-num=".">.</button>
        
        <button id="equals" class="equals" data-result="">=</button>
        <button data-ops="divided by" class="ops">/</button>
    </div>

    <button id="reset" class="reset">Reset Universe?</button>
</div>
</div>
<style>
:host {
    display: block;
}

div.html {
    background: #100a1c;
    background-image: radial-gradient(50% 30% ellipse at center top, #201e40 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(60% 50% ellipse at center bottom, #261226 0%, #100a1c 100%);
    background-attachment: fixed;
    color: #6cacc5;
}
div.html[disabled]{
    pointer-events: none;
    opacity: 0.5;
}

div.body {
    color: #6cacc5;
    font: 300 18px/1.6 "Source Sans Pro", sans-serif;
    margin: 0;
    padding: 5em 0 2em;
    text-align: center;
}

h1 {
    font-weight: 300;
    margin: 0;
}

/* Gradient text only on Webkit */
.warning {
    background: -webkit-linear-gradient(45deg, #c97874 10%, #463042 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #8c5059;
    font-weight: 400;
    margin: 0 auto 6em;
    max-width: 9em;
}

.calculator {
    font-size: 28px;
    margin: 0 auto;
    width: 10em;
}

.calculator::before,
.calculator::after {
    content: " ";
    display: table;
}

.calculator::after {
    clear: both;
}

/* Calculator after dividing by zero */
.broken {
    -webkit-animation: broken 2s;
    animation: broken 2s;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0);
    opacity: 0;
}

.viewer {
    color: #c97874;
    float: left;
    line-height: 3em;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 7.5em;
    height: 3em;
}

button {
    border: 0;
    background: rgba(42, 50, 113, 0.28);
    color: #6cacc5;
    cursor: pointer;
    float: left;
    font: inherit;
    margin: 0.25em;
    width: 2em;
    height: 2em;
    transition: all 0.5s;
}

button:hover {
    background: #201e40;
}

button:focus {
    outline: 0;
    /* The value fade-ins that appear */
}

button:focus::after {
    -webkit-animation: zoom 1s;
    animation: zoom 1s;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    content: attr(data-num);
    cursor: default;
    font-size: 100px;
    position: absolute;
    top: 1.5em;
    left: 50%;
    text-align: center;
    margin-left: -24px;
    opacity: 0;
    width: 48px;
}

/* Same as above, modified for operators */
.ops:focus::after {
    content: attr(data-ops);
    margin-left: -210px;
    width: 420px;
}

/* Same as above, modified for result */
.equals:focus::after {
    content: attr(data-result);
    margin-left: -300px;
    width: 600px;
}

/* Reset button */
.reset {
    background: rgba(201, 120, 116, 0.28);
    color: #c97874;
    font-weight: 400;
    margin-left: -77px;
    padding: 0.5em 1em;
    position: absolute;
    top: -20em;
    left: 50%;
    width: auto;
    height: auto;
    /* When button is revealed */
}

.reset:hover {
    background: #c97874;
    color: #100a1c;
}

.reset.show {
    top: 20em;
    -webkit-animation: fadein 4s;
    animation: fadein 4s;
}

/* Animations */
/* Values that appear onclick */
@-webkit-keyframes zoom {
    0% {
        -webkit-transform: scale(0.2);
        transform: scale(0.2);
        opacity: 1;
    }

    70% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    100% {
        opacity: 0;
    }
}

@keyframes zoom {
    0% {
        -webkit-transform: scale(0.2);
        transform: scale(0.2);
        opacity: 1;
    }

    70% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    100% {
        opacity: 0;
    }
}

/* Division by zero animation */
@-webkit-keyframes broken {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    5% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }

    15% {
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg);
    }

    20% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }

    25% {
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg);
    }

    50% {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    70% {
        -webkit-transform: translate3d(0, 2000px, 0);
        transform: translate3d(0, 2000px, 0);
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        -webkit-transform: translate3d(0, -2000px, 0);
        transform: translate3d(0, -2000px, 0);
    }
}

@keyframes broken {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    5% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }

    15% {
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg);
    }

    20% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }

    25% {
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg);
    }

    50% {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    70% {
        -webkit-transform: translate3d(0, 2000px, 0);
        transform: translate3d(0, 2000px, 0);
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    100% {
        -webkit-transform: translate3d(0, -2000px, 0);
        transform: translate3d(0, -2000px, 0);
    }
}

/* Reset button fadein */
@-webkit-keyframes fadein {
    0% {
        top: 20em;
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadein {
    0% {
        top: 20em;
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@media (min-width: 420px) {
    .calculator {
        width: 12em;
    }

    .viewer {
        width: 8.5em;
    }

    button {
        margin: 0.5em;
    }
}
</style>
`;
export class XtalMathGianaPen extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        attach(this.shadowRoot.querySelector('.html'), window);
    }
}
customElements.define('xtal-math-giana-pen-js', XtalMathGianaPen);