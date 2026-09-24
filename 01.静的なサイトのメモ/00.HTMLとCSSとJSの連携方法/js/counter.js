export function setupCounter() {
    const button = document.getElementById("countButton");
    const counter = document.getElementById("counter");

    let count = 0;

    button.addEventListener("click", () => {
        count++;
        counter.textContent = count;
    });
}