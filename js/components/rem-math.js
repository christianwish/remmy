export default function () {
    let clearValueArray = (value) => {
            let valueArray = value.split(/\s/);
                valueArray = valueArray.map((i) => {
                    let result = i.replace(/[a-z|A-Z]/g, '');

                    return parseFloat(result);
                });
            return valueArray;
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

                    return (i / basic) + 'rem';
                }

                return '';
            });

        return result.join(' ').replace(/\s\s/, '').trim();
    };

    this.getPxValueFromRem = function (value, basic) {
        let clearValues = clearValueArray(value, 'float'),
            result = clearValues.map((i) => {
                var px;
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
