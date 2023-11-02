async function fetchem() {
    try {
        const response = await fetch('js/arts.txt');
        const text = await response.text();
        const arr = text.split('====').map(art => art.trim());
        return arr;
    } catch (error) {
        return [];
    }
}

async function setem() {
    const arr = await fetchem();
    const i = Math.floor(Math.random() * arr.length);
    const preska = document.getElementById("art");
    preska.textContent = arr[i];
}

setem();