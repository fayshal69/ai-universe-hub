const cardContainer = document.getElementById('card-container');
const seeAllCardBtn = document.getElementById('seeAllCardBtn');
const modalBox = document.getElementById('modal-box');

const loadAiTools = async (seeAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const cards = data.data.tools;
    displayAiTools(cards, seeAll);
}

const displayAiTools = (cards, seeAll) => {

    // slice 6 cards and iterate through 6 cards
    if (!seeAll) {
        cards = cards.slice(0, 6);
    }

    // clear the card container before card insertion
    cardContainer.innerHTML = '';

    // loop through all the card
    cards.forEach(card => {


        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-base-100 shadow-xl`;
        aiCard.innerHTML = `
            <figure><img src="${card.image}" alt="Ai Tool" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <div class="opacity-70" id="ol-container">
                    <p>1. ${card.features[0]}</p>
                    <p>2. ${card.features[1]}</p>
                    <p>3. ${card.features[2]}</p>
                </div>
                <div class="divider"></div>
                <div class="card-actions justify-between items-center">
                <div>
                    <h3 class="text-xl font-semibold mb-2">${card.name}</h3>
                    <p class="opacity-70">${card.published_in}</p>
                    </div>
                    <button class="btn btn-circle bg-rose-300 text-white text-xl" onclick="openModal('${card.id}')">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        cardContainer.appendChild(aiCard);
    });

}

loadAiTools();

const openModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const details = data.data;
    showDetailsModal(details);
}

const showDetailsModal = (modal) => {
    console.log(modal);
    modalBox.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
            <div class="card card-compact bg-red-100 shadow-xl p-5 space-y-6 w-full lg:w-1/2">
                <h4 class="text-2xl font-semibold">${modal?.description || 'Not defines'}</h4>
                <div class="flex flex-wrap justify-evenly items-center gap-4">
                    <div class="bg-white rounded-lg p-6">
                        <p class="font-bold text-green-500">${modal?.pricing[0]?.price || 'Not defines'}</p>
                    </div>
                    <div class="bg-white rounded-lg p-6">
                        <p class="font-bold text-amber-500">${modal?.pricing[1]?.price || 'Not defines'}</p>
                    </div>
                    <div class="bg-white rounded-lg p-6">
                        <p class="font-bold text-red-500">${modal?.pricing[2]?.price || 'Not defines'}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h3 class="text-2xl font-semibold mb-3">Features</h3>
                        <div class="space-y-2 opacity-70">
                            <p>${modal?.features['1'].feature_name || 'Not defines'}</p>
                            <p>${modal?.features['2'].feature_name || 'Not defines'}</p>
                            <p>${modal?.features['3'].feature_name || 'Not defines'}</p>            
                        </div>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold mb-3">Integrations</h3>
                        <div class="space-y-2 opacity-70">
                            <p>${modal?.integrations[0] || 'Not defined'}</p>
                            <p>${modal?.integrations[1] || 'Not defined'}</p>
                            <p>${modal?.integrations[2] || 'Not defined'}</p>
                        </div>
                    </div>
                </div>
                </div>
                        <div class="card card-compact w-full lg:w-1/2 bg-base-100 shadow-xl">
                            <figure class="relative"><img src="${modal.image_link[0] || modal.image_link[1]}" alt="Shoes" /></figure>
                            <div class="bg-red-400 text-white text-sm font-semibold max-w-max p-2 absolute top-3 right-3 rounded">
                                ${modal.accuracy.score * 100} % accuracy
                            </div>
                            <div class="card-body">
                              <h2 class="card-title text-2xl font-semibold">${modal.input_output_examples[0].input}</h2>
                              <p>${modal.input_output_examples[0].output}</p>
                        </div>
            </div>
        </div>
        <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-circle bg-red-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </form>
                    </div>
    `;
    my_modal_5.showModal();
}

const seeAllCard = () => {
    seeAllCardBtn.classList.add('hidden');
    loadAiTools(true);
}