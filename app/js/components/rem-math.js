export default function () {
    let clearValueArray = (value) => {
            let valueArray = value.split(/\s/);
                valueArray = valueArray.map((i) => {
                    let result = i.replace(/[a-z|A-Z]/g, '');

                    return parseFloat(result);
                });
            return valueArray;
        },
        maxLengthString = (number) => {
            let stringArray = (number + '').split(/\./),
                string = stringArray[0];

            if (stringArray[1]) {
                string += '.' + stringArray[1].substr(0, 5);
            }

            return string;
        };

    this.getRemValueFromPx = function (value, basic) {
        let clearValues = clearValueArray(value, 'int'),
            result = clearValues.map((i) => {
                if (typeof i === 'number') {
                    if (i === 0) {
                        return '0';
                    }

                    if (isNaN(i)) {
                        return '';
                    }

                    return maxLengthString(i / basic) + 'rem';
                }

                return '';
            });

        return result.join(' ').replace(/\s\s/, '').trim();
    };

    this.getPxValueFromRem = function (value, basic) {
        let clearValues = clearValueArray(value, 'float'),
            result = clearValues.map((i) => {
                let px;
                if (typeof i === 'number') {
                    if (i === 0) {
                        return '0';
                    }

                    if (isNaN(i)) {
                        return '';
                    }

                    px = Math.round(i * basic);

                    if (px === 0) {
                        return px;
                    }

                    return px + 'px';
                }

                return '';
            });

        return result.join(' ').replace(/\s\s/, '').trim();
    };
}
