(function () {
    const defaultNumber = '0000000000000000';
    const hash = location.hash.replace('#', '');

    const form = document.forms[0];
    const numberPlace = document.getElementById('number');
    const numberInput = document.getElementById('number-input');
    const copyButton = document.getElementById('copy-button');

    if (hash) {
        numberInput.value = hash;
    }

    setNumber();

    window.addEventListener('hashchange', setNumber);
    form.addEventListener('submit', setNumber);
    numberInput.addEventListener('keyup', setNumber);
    copyButton.addEventListener('click', copyLocation);

    function setNumber(e) {
        if (e) {
            e.preventDefault();

            if (e.type === 'hashchange') {
                numberInput.value = location.hash.replace('#', '');
            }
        }

        const value = getNormalized();
        const isValid = isNumberValid(value);

        history.pushState(null, null, isValid ? `#${value}` : ' ');
        numberPlace.innerHTML = isValid ? getFormattedNumber(value) : 'invalid number'.toUpperCase();
        copyButton.disabled = !isValid;
    }

    function isNumberValid(normalized) {
        const matches = normalized.match(/\d{4}/g);
        return matches && matches.length === 4 && valid_credit_card(normalized);
    }

    function getNormalized() {
        const value = numberInput.value || defaultNumber;
        return value.replace(/\s/g, '').trim();
    }

    function getFormattedNumber(normalized) {
        return normalized.match(/\d{4}/g).join(' ');
    }

    function copyLocation(e) {
        e.preventDefault();
        navigator.clipboard.writeText(location.href)
            .then(() => {
                copyButton.innerText = 'copied';
                copyButton.disabled = true;

                setTimeout(resetButton, 3000);
            });
    }

    function resetButton() {
        copyButton.innerText = 'Copy link';
        copyButton.disabled = !isNumberValid(getNormalized());
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
