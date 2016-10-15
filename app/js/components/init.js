import RemMath from './rem-math';

export default function () {
    let dom = {
            px: document.getElementById('px'),
            unit: document.getElementById('unit'),
            unitUp: document.getElementById('unit-up'),
            unitDown: document.getElementById('unit-down'),
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
        },
        clickUnitUpDown = (plus) => {
            let result = parseFloat(dom.unit.value) + plus;
            if (isNaN(result)) {
                result = unitNumber;
            }
            dom.unit.value = result;
            changeUnit();
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

    dom.px.addEventListener('keyup', setRem);
    dom.rem.addEventListener('keyup', setPx);
    dom.unit.addEventListener('keyup', function (event) {
        if (event.which === 38) {
            clickUnitUpDown(1);
        }

        if (event.which === 40) {
            clickUnitUpDown(-1);
        }

        changeUnit();
    });
    dom.unit.addEventListener('change', changeUnit);

    dom.unitUp.addEventListener('click', function () {
        clickUnitUpDown(1);
        changeUnit();
    });

    dom.unitDown.addEventListener('click', function () {
        clickUnitUpDown(-1);
        changeUnit();
    });
}
