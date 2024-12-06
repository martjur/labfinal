// Light/Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
document.getElementById("submitBtn").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const features = document.getElementById("features").value.trim();

    let errors = [];

    // Validacija
    if (!/^[a-zA-Z]+$/.test(name)) {
        errors.push("Vardas turi būti sudarytas tik iš raidžių.");
    }
    if (!/^[a-zA-Z]+$/.test(surname)) {
        errors.push("Pavardė turi būti sudaryta tik iš raidžių.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Netinkamas el. pašto adresas.");
    }
    if (!/^\+?\d{7,15}$/.test(phone)) {
        errors.push("Netinkamas telefono numeris.");
    }
    if (address.length < 5) {
        errors.push("Adresas per trumpas.");
    }

    let featuresArray = features.split(',').map(Number);
    if (featuresArray.length !== 5 || featuresArray.some(isNaN)) {
        errors.push("Požymiai turi būti 5 skaičiai, atskirti kableliais.");
    }

    // Klaidos rodymas
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // Požymių vidurkio apskaičiavimas
    const featuresAverage = featuresArray.reduce((a, b) => a + b, 0) / featuresArray.length;

    // Vidurkio spalvos nustatymas
    let averageColor = "green";
    if (featuresAverage < 5) averageColor = "red";
    else if (featuresAverage < 7) averageColor = "orange";

    // Objekto kūrimas
    const contactData = {
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        address: address,
        features: featuresArray,
        average: featuresAverage
    };

    // Rezultatų atvaizdavimas
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <p>Vardas: ${contactData.name}</p>
        <p>Pavardė: ${contactData.surname}</p>
        <p>El. paštas: ${contactData.email}</p>
        <p>Telefono numeris: ${contactData.phone}</p>
        <p>Adresas: ${contactData.address}</p>
        <p>Požymiai: ${contactData.features.join(", ")}</p>
        <p class="average" style="color: ${averageColor};">Vidurkis: ${contactData.average.toFixed(2)}</p>
        <p>${contactData.name} ${contactData.surname} (${contactData.email}): ${contactData.average.toFixed(2)}</p>
    `;

    console.log(contactData);
});