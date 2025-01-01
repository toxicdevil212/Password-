document.getElementById("generateBtn").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim(); // Use name as entered by user
    const number = parseInt(document.getElementById("number").value);
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const amount = parseInt(document.getElementById("amount").value);

    if (name === "" || isNaN(number) || number <= 0 || isNaN(amount) || amount <= 0) {
        alert("Please enter valid inputs.");
        return;
    }

    let passwords = [];
    const symbols = includeSymbols ? ['@', '#', '$', '&'] : [''];
    const numberRangeStart = number < 100 ? 1 : 100; // 2-digit starts at 1, 3-digit starts at 100
    const numberRangeEnd = number < 100 ? 99 : 999; // End ranges based on 2 or 3 digits

    for (let i = 0; i < amount; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomNumber = Math.floor(Math.random() * (numberRangeEnd - numberRangeStart + 1)) + numberRangeStart;
        passwords.push(`${name}${randomSymbol}${randomNumber}`);
    }

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = passwords.join('\n');

    // Show download and copy buttons
    const downloadBtn = document.getElementById("downloadBtn");
    const copyBtn = document.getElementById("copyBtn");
    downloadBtn.style.display = "block";
    copyBtn.style.display = "block";

    // Download functionality
    downloadBtn.onclick = function () {
        const blob = new Blob([passwords.join('\n')], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'passwords.txt';
        link.click();
    };

    // Copy to clipboard functionality
    copyBtn.onclick = function () {
        navigator.clipboard.writeText(passwords.join('\n')).then(() => {
            alert("Passwords copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy passwords.");
        });
    };
});
