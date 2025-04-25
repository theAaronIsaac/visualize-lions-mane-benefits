// Main JavaScript for Lion's Mane Interactive Webpage

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initAccordion();
    initTabs();
    initStudyCards();
    setupReferences();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});

// Accordion functionality for FAQ section
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Tab functionality for compounds explorer
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.compound-info');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const compound = button.getAttribute('data-compound');
            document.getElementById(`${compound}-info`).classList.add('active');
        });
    });
}

// Study cards functionality
function initStudyCards() {
    // Sample study data - in a real application, this would come from a database or API
    const studies = [
        {
            id: 1,
            title: "Effects of Lion's Mane on Cognitive Function",
            authors: "Docherty et al.",
            year: 2023,
            journal: "Nutrients",
            summary: "This randomized, double-blind, placebo-controlled study found that following a single dose of Hericium erinaceus, participants performed quicker on the Stroop task.",
            category: "cognitive"
        },
        {
            id: 2,
            title: "Lion's Mane Mushrooms May Double Neuron Growth",
            authors: "Meunier et al.",
            year: 2023,
            journal: "Journal of Neurochemistry",
            summary: "Neurons exposed to lion's mane mushroom extracts were up to twice as long as those not exposed. The extract increases the size of growth cones, which are important for brain cells to establish new connections.",
            category: "neurological"
        },
        {
            id: 3,
            title: "Neurotrophic Properties of Lion's Mane Medicinal Mushroom",
            authors: "Lai et al.",
            year: 2013,
            journal: "Int J Med Mushrooms",
            summary: "The combination of 10 ng/mL NGF with 1 μg/mL mushroom extract yielded the highest percentage increase of 60.6% neurite outgrowth. The extract contained neuroactive compounds that induced NGF synthesis.",
            category: "neurological"
        },
        {
            id: 4,
            title: "Effects of Lion's Mane on Mild Cognitive Impairment",
            authors: "Mori et al.",
            year: 2009,
            journal: "Phytotherapy Research",
            summary: "Improvements in scores of mild cognitive impairment were observed in 50-80 year old adults following 16 weeks of 3g/day supplementation.",
            category: "clinical"
        }
    ];
    
    const cardsContainer = document.querySelector('.cards-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Create study cards
    function createStudyCards(studyArray) {
        cardsContainer.innerHTML = '';
        
        studyArray.forEach(study => {
            const card = document.createElement('div');
            card.className = 'study-card';
            card.setAttribute('data-category', study.category);
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <h3>${study.title}</h3>
                        <p>${study.authors}, ${study.year}</p>
                        <p>${study.journal}</p>
                        <span class="flip-prompt">Click to see details</span>
                    </div>
                    <div class="card-back">
                        <h3>Summary</h3>
                        <p>${study.summary}</p>
                        <span class="flip-prompt">Click to flip back</span>
                    </div>
                </div>
            `;
            
            cardsContainer.appendChild(card);
            
            // Add flip functionality
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }
    
    // Initialize with all studies
    createStudyCards(studies);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            if (filter === 'all') {
                createStudyCards(studies);
            } else {
                const filteredStudies = studies.filter(study => study.category === filter);
                createStudyCards(filteredStudies);
            }
        });
    });
}

// Setup references in the footer
function setupReferences() {
    const references = [
        "Docherty, S., Doughty, F. L., & Smith, E. F. (2023). The Acute and Chronic Effects of Lion's Mane Mushroom Supplementation on Cognitive Function, Stress and Mood in Young Adults: A Double-Blind, Parallel Groups, Pilot Study. Nutrients, 15(22), 4842.",
        "Meunier, F., et al. (2023). Mushrooms magnify memory by boosting nerve growth. Journal of Neurochemistry.",
        "Lai, P. L., Naidu, M., Sabaratnam, V., Wong, K. H., David, R. P., Kuppusamy, U. R., Abdullah, N., & Malek, S. N. (2013). Neurotrophic properties of the Lion's mane medicinal mushroom, Hericium erinaceus (Higher Basidiomycetes) from Malaysia. International Journal of Medicinal Mushrooms, 15(6), 539-554.",
        "Szućko-Kociuba, I., Trzeciak-Ryczek, A., Kupnicka, P., & Chlubek, D. (2023). Neurotrophic and Neuroprotective Effects of Hericium erinaceus. International Journal of Molecular Sciences, 24(21), 15960."
    ];
    
    const referenceList = document.getElementById('reference-list');
    
    references.forEach(reference => {
        const li = document.createElement('li');
        li.textContent = reference;
        referenceList.appendChild(li);
    });
}
