(function () {
    const defaultNumber = '0000000000000000';
    const form = document.forms[0];
    const numberPlace = document.getElementById('number');
    const numberInput = document.getElementById('number-input');
    const hash = location.hash.replace('#', '');

    if (hash) {
        numberInput.value = hash;
    }

    window.addEventListener('hashchange', setNumber);
    form.addEventListener('submit', setNumber);
    numberInput.addEventListener('keyup', setNumber);

    setNumber();

    function setNumber(e) {
        if (e) {
            e.preventDefault();

            if (e.type === 'hashchange') {
                numberInput.value = location.hash.replace('#', '');
            }
        }

        const value = numberInput.value || defaultNumber;
        const normalized = value.replace(/\s/g, '').trim();
        const matches = normalized.match(/\d{4}/g);

        if (matches && matches.length === 4 && valid_credit_card(normalized)) {
            numberPlace.innerHTML = matches.join(' ');
        } else {
            numberPlace.innerHTML = 'invalid number'.toUpperCase();
        }
    }

    function valid_credit_card(value) {
        if (/[^0-9-\s]+/.test(value)) return false;

        let nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (let n = value.length - 1; n >= 0; n--) {
            const cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    }
})();
