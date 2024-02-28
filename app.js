const cardContainer = document.getElementById('card-container');

const loadAiTools = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const cards = data.data.tools;
    displayAiTools(cards);
}

const displayAiTools = (cards) => {
    console.log(cards);
    cards.forEach(card => {
        console.log(card);
    });
    const aiCard = document.createElement('div');
    aiCard.classList = `card bg-base-100 shadow-xl`;
    aiCard.innerHTML = `
        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Ai Tool" /></figure>
        <div class="card-body">
            <h2 class="card-title">Ai Tools</h2>
            <div class="opacity-70">
                hi
            </div>
            <div class="divider"></div>
            <div class="card-actions justify-between items-center">
            <div>
                <h3 class="text-xl font-semibold mb-2">hi</h3>
                <p class="opacity-70">hi</p>
                </div>
                <button class="btn btn-circle bg-rose-300 text-white text-xl">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    cardContainer.appendChild(aiCard);
}

loadAiTools();

// const ol = document.createElement('ol');
//     let i = 1;
//     for(const fest of features) {
//         const li = document.createElement('li');
//         li.innerText = `${i}. ${fest}`;
//         ol.appendChild(li);
//         i++;
//     }
//     cardContainer.appendChild(ol);