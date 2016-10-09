import RemMath from './rem-math';

export default function () {
    let dom = {
            px: document.getElementById('px'),
            unit: document.getElementById('unit'),
            rem: document.getElementById('rem')
        },
        unitNumber = 16,
        helper = new RemMath(),
        getRem = () => {
            return helper.getRemValueFromPx(dom.px.value, unitNumber);
        },
        setRem = () => {
            dom.rem.value = helper.getRemValueFromPx(dom.px.value, unitNumber);
        },
        setPx = () => {
            dom.px.value = helper.getPxValueFromRem(dom.rem.value, unitNumber);
        },
        changeUnit = () => {
            let unitInput = parseFloat(dom.unit.value);

            if (unitInput) {
                unitNumber = unitInput;
                setRem();
            }
        };

    window.getRem = getRem;

    dom.px.addEventListener('focus', function () {
        dom.px.select();
    });

    dom.rem.addEventListener('focus', function () {
        dom.rem.select();
    });

    window.addEventListener('focus', function () {
        dom.px.focus();
        dom.px.select();
    });

    dom.px.focus();

    dom.px.addEventListener("keyup", setRem);
    dom.rem.addEventListener("keyup", setPx);
    dom.unit.addEventListener("keyup", changeUnit);
}
