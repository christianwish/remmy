export default function () {
    let dom = {
    		px: document.getElementById('px'),
    		unit: document.getElementById('unit'),
    		rem: document.getElementById('rem')
    	},
    	parseToNumber = (string) => {
    		let toNumber = parseInt(string);

    		if (!isNaN(toNumber)) {
    			return toNumber;
    		}

    		return false;
    	},
    	unitNumber = 16,
    	getRem = () => {
    		let pxInput = parseToNumber(dom.px.value),
    			result;

    		if (pxInput) {
    			result = ((pxInput / unitNumber) + "").split(/\./);

    			if (result[1]) {
    				result = result[0] + '.' + result[1].substring(0, 6) + "rem";
    			} else {
    				result = result[0] + "rem";
    			}

    			return result;
    		}

    		return false;
    	},
    	setRem = () => {
    		let rem = getRem();

    		if (rem) {
    			dom.rem.value = rem;
    		}
    	},
    	setPx = () => {
    		let remInput = parseToNumber(dom.rem.value),
    			result;
    		
    		if (remInput) {
    			result = (remInput * unitNumber) + "px";
    			dom.px.value = result;
    			return result;
    		}

    		return false;
    	},
    	changeUnit = () => {
    		let unitInput = parseToNumber(dom.unit.value);

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
