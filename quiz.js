document.addEventListener('DOMContentLoaded', (event) => {
    // Wrap main content in a <main> tag
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const mainContent = document.createElement('main');
    
    let currentElement = header.nextElementSibling;
    while (currentElement && currentElement !== footer) {
        const nextElement = currentElement.nextElementSibling;
        mainContent.appendChild(currentElement);
        currentElement = nextElement;
    }
    
    header.parentNode.insertBefore(mainContent, footer);

    // Planet interactivity
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            planets.forEach(p => p.classList.remove('active'));
            planet.classList.add('active');
            showPlanetDetails(planet);
        });
    });

    // Create a modal for planet details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modal-title"></h2>
            <p id="modal-description"></p>
            <div id="planet-quiz"></div>
            <div id="fun-fact"></div>
        </div>`;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Function to show planet details in modal
    function showPlanetDetails(planet) {
        const title = planet.querySelector('h3').textContent;
        const description = planet.querySelector('p').textContent;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;
        
        // Add a quiz question
        const quizContainer = document.getElementById('planet-quiz');
        quizContainer.innerHTML = generateQuizQuestion(title);
        
        // Add a fun fact
        const funFactContainer = document.getElementById('fun-fact');
        funFactContainer.innerHTML = `<h3>Did You Know?</h3><p>${getFunFact(title)}</p>`;
        
        modal.style.display = 'block';
    }

    // Function to generate a quiz question
    function generateQuizQuestion(planetName) {
        const questions = {
            'Mercury': {
                question: 'What is the average surface temperature of Mercury?',
                options: ['167°C', '467°C', '-173°C', '100°C'],
                answer: 1
            },
            'Venus': {
                question: 'Which of these is NOT true about Venus?',
                options: ['It rotates clockwise', 'It has the longest day of any planet', 'It has a thick atmosphere', 'It has many moons'],
                answer: 3
            },
            'Earth': {
                question: 'What percentage of Earths surface is covered by water?',
                options: ['50%', '61%', '71%', '81%'],
                answer: 2
            },
            'Mars': {
                question: 'What gives Mars its reddish appearance?',
                options: ['Volcanic activity', 'Iron oxide (rust)', 'Reflected sunlight', 'Atmospheric gases'],
                answer: 1
            },
            'Jupiter': {
                question: 'How many Great Red Spot storms could fit across Earths diameter?',
                options: ['1', '2', '3', '4'],
                answer: 2
            },
            'Saturn': {
                question: 'What are Saturns rings primarily composed of?',
                options: ['Dust', 'Ice', 'Rock', 'Gas'],
                answer: 1
            },
            'Uranus': {
                question: 'What makes Uranus unique among the planets?',
                options: ['It has the most moons', 'It rotates on its side, It s the coldest planet, It has a solid surface'],
                answer: 1
            },
            'Neptune': {
                question: 'What is the Great Dark Spot on Neptune?',
                options: ['A crater', 'A storm system', 'An ocean', 'A shadow from its moon'],
                answer: 1
            }
        };

        const planetQuestion = questions[planetName];
        if (!planetQuestion) return '';

        let quizHTML = `<h3>Quick Quiz:</h3><p>${planetQuestion.question}</p>`;
        planetQuestion.options.forEach((option, index) => {
            quizHTML += `<button class="quiz-option" data-index="${index}">${option}</button>`;
        });

        return quizHTML;
    }

    // Event delegation for quiz answers
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('quiz-option')) {
            const selectedIndex = parseInt(event.target.getAttribute('data-index'));
            const planetName = document.getElementById('modal-title').textContent;
            const correctAnswer = questions[planetName].answer;

            if (selectedIndex === correctAnswer) {
                event.target.classList.add('correct');
                event.target.textContent += ' ✓ Correct!';
            } else {
                event.target.classList.add('incorrect');
                event.target.textContent += ' ✗ Try again!';
            }
        }
    });

    // Function to get a fun fact about a planet
    function getFunFact(planetName) {
        const facts = {
            'Mercury': 'Mercurys surface temperature can reach 800°F (430°C) during the day and drop to -290°F (-180°C) at night.',
            'Venus': 'Venus rotates on its axis backwards compared to most planets, with the sun rising in the west and setting in the east.',
            'Earth': 'Earth is the only planet not named after a god. The name Earth comes from the Old English word "ertha" meaning ground or land.',
            'Mars': 'Mars is home to the tallest mountain in our solar system, Olympus Mons, which is three times the height of Mount Everest.',
            'Jupiter': 'Jupiters Great Red Spot is a giant storm that has been raging for over 400 years and is big enough to fit two or three Earths inside it.',
            'Saturn': 'Saturn is the least dense planet in the Solar System - it could float in water if there was a bathtub large enough!',
            'Uranus': 'Uranus was originally going to be named "Georges Star" after King George III before astronomers settled on its current name.',
            'Neptune': 'Neptune was the first planet to be discovered through mathematical predictions rather than through observation.'
        };

        return facts[planetName] || 'No fun fact available for this planet.';
    }

    // Add a scale comparison feature
    const scaleComparisonBtn = document.createElement('button');
    scaleComparisonBtn.textContent = 'Compare Planet Sizes';
    scaleComparisonBtn.id = 'scale-comparison-btn';
    document.querySelector('.solar-system-overview').appendChild(scaleComparisonBtn);

    scaleComparisonBtn.addEventListener('click', () => {
        const comparisonContainer = document.createElement('div');
        comparisonContainer.id = 'scale-comparison';
        comparisonContainer.innerHTML = `
            <h3>Planet Size Comparison</h3>
            <div class="planet-scales">
                <div class="planet-scale mercury" style="width: 4.9px; height: 4.9px;"></div>
                <div class="planet-scale venus" style="width: 12.1px; height: 12.1px;"></div>
                <div class="planet-scale earth" style="width: 12.7px; height: 12.7px;"></div>
                <div class="planet-scale mars" style="width: 6.8px; height: 6.8px;"></div>
                <div class="planet-scale jupiter" style="width: 142.9px; height: 142.9px;"></div>
                <div class="planet-scale saturn" style="width: 120.5px; height: 120.5px;"></div>
                <div class="planet-scale uranus" style="width: 51.1px; height: 51.1px;"></div>
                <div class="planet-scale neptune" style="width: 49.5px; height: 49.5px;"></div>
            </div>
            <p>Sizes are to scale. Jupiter (the largest) is shown at 142.9px wide.</p>
        `;
        modal.querySelector('.modal-content').appendChild(comparisonContainer);
        modal.style.display = 'block';
    });

    // Add a search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search planets...';
    searchInput.className = 'search-input';
    header.appendChild(searchInput);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        planets.forEach(planet => {
            const planetName = planet.querySelector('h3').textContent.toLowerCase();
            if (planetName.includes(searchTerm)) {
                planet.style.display = 'block';
            } else {
                planet.style.display = 'none';
            }
        });
    });

    // Add a "Did You Know?" feature
    const funFacts = [
        "A year on Mercury is just 88 Earth days long.",
        "Venus spins backwards compared to most planets.",
        "Earth is the only planet not named after a god.",
        "Mars has the largest volcano in the solar system.",
        "Jupiter has more than twice the mass of all other planets combined.",
        "Saturn's rings are made mostly of ice and rock.",
        "Uranus rotates on its side, like a rolling ball.",
        "Neptune was predicted to exist through mathematical calculations before it was discovered."
    ];

    const factBox = document.createElement('div');
    factBox.className = 'fact-box';
    factBox.innerHTML = '<h3>Did You Know?</h3><p id="fun-fact"></p><button id="new-fact">New Fact</button>';
    mainContent.insertBefore(factBox, mainContent.firstChild);

    const funFactText = document.getElementById('fun-fact');
    const newFactButton = document.getElementById('new-fact');

    function displayRandomFact() {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        funFactText.textContent = funFacts[randomIndex];
    }

    newFactButton.addEventListener('click', displayRandomFact);
    displayRandomFact(); // Display a fact when the page loads
});