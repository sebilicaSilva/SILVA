document.addEventListener('DOMContentLoaded', function () {
    const initialForm = document.getElementById('initialForm');
    const inventariereSection = document.getElementById('inventariereSection');
    const uaTitle = document.getElementById('uaTitle');
    const dateTitle = document.getElementById('dateTitle');
    const diametruGrid = document.getElementById('diametruGrid');
    const arboriList = document.getElementById('arboriList');
    const speciaSelect = document.getElementById('specia');
    const ultimeleDiametre = document.getElementById('ultimeleDiametre');
    const exportButton = document.getElementById('exportButton');

    let arboriData = [];
    let diametreAdaugate = [];

    initialForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const ua = document.getElementById('ua').value;
        const date = document.getElementById('date').value;

        uaTitle.textContent = `U.A.: ${ua}`;
        dateTitle.textContent = `Data: ${date}`;

        initialForm.style.display = 'none';
        inventariereSection.style.display = 'block';
    });

    for (let i = 8; i <= 120; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = 'diameter-btn';
        button.addEventListener('click', function () {
            const selectedSpecia = speciaSelect.value;
            if (!selectedSpecia) {
                alert('Selectați specia înainte de a adăuga un diametru.');
                return;
            }

            const listItem = document.createElement('li');
            listItem.textContent = `Specia: ${selectedSpecia} | Diametru: ${i} cm`;
            arboriList.appendChild(listItem);

            arboriData.push({ specia: selectedSpecia, diametru: i });

            diametreAdaugate.push(i);
            if (diametreAdaugate.length > 5) {
                diametreAdaugate.shift();
            }

            ultimeleDiametre.innerHTML = diametreAdaugate
                .map(diam => `<li>Diametru: ${diam} cm</li>`)
                .join('');
        });
        diametruGrid.appendChild(button);
    }

    exportButton.addEventListener('click', function () {
        if (arboriData.length === 0) {
            alert('Nu există date de exportat.');
            return;
        }

        let csvContent = 'data:text/csv;charset=utf-8,Specia,Diametru\n';
        arboriData.forEach(row => {
            csvContent += `${row.specia},${row.diametru}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'inventariere_arbori.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
