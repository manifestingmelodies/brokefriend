// Store friend data
let relationships = [
    { id: 1, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
    { id: 2, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
    { id: 3, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
    { id: 4, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
    { id: 5, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] }
];

// Define wealth impact questions
const wealthQuestions = [
    {
        id: 1,
        text: "How often does this person talk about money problems or financial struggles?",
        options: [
            { value: 1, text: "Rarely or never" },
            { value: 2, text: "Occasionally" },
            { value: 3, text: "Sometimes" },
            { value: 4, text: "Often" },
            { value: 5, text: "Almost every conversation" }
        ],
        impact: "negative", // Higher values are negative
        reaction: {
            good: "👍",
            bad: "👎"
        }
    },
    {
        id: 2,
        text: "After spending time with this person, do you feel:",
        options: [
            { value: 5, text: "Energized and motivated" },
            { value: 4, text: "Somewhat uplifted" },
            { value: 3, text: "Neutral" },
            { value: 2, text: "Slightly drained" },
            { value: 1, text: "Exhausted or negative" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "⚡",
            bad: "😴"
        }
    },
    {
        id: 3,
        text: "How does this person react when you share your financial goals or successes?",
        options: [
            { value: 5, text: "Very supportive and encouraging" },
            { value: 4, text: "Mostly supportive" },
            { value: 3, text: "Neutral or indifferent" },
            { value: 2, text: "Somewhat dismissive" },
            { value: 1, text: "Discouraging or jealous" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "🎯",
            bad: "🚫"
        }
    },
    {
        id: 4,
        text: "Does this person tend to live within their means?",
        options: [
            { value: 5, text: "Yes, very financially responsible" },
            { value: 4, text: "Mostly responsible with money" },
            { value: 3, text: "Sometimes struggles but tries" },
            { value: 2, text: "Often overspends" },
            { value: 1, text: "Regularly in financial crisis" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "💰",
            bad: "💸"
        }
    },
    {
        id: 5,
        text: "How often does this person complain about their job, income, or the economy?",
        options: [
            { value: 1, text: "Rarely or never" },
            { value: 2, text: "Occasionally" },
            { value: 3, text: "Sometimes" },
            { value: 4, text: "Often" },
            { value: 5, text: "Almost every conversation" }
        ],
        impact: "negative", // Higher values are negative
        reaction: {
            good: "🙏",
            bad: "😩"
        }
    },
    {
        id: 6,
        text: "Does this person have ambitious goals and actively work toward them?",
        options: [
            { value: 5, text: "Definitely yes" },
            { value: 4, text: "Mostly yes" },
            { value: 3, text: "Somewhat" },
            { value: 2, text: "Not really" },
            { value: 1, text: "Definitely not" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "🚀",
            bad: "🐌"
        }
    },
    {
        id: 7,
        text: "How often does this person blame others for their financial situation?",
        options: [
            { value: 1, text: "Rarely or never" },
            { value: 2, text: "Occasionally" },
            { value: 3, text: "Sometimes" },
            { value: 4, text: "Often" },
            { value: 5, text: "Almost always" }
        ],
        impact: "negative", // Higher values are negative
        reaction: {
            good: "👌",
            bad: "👉"
        }
    },
    {
        id: 8,
        text: "Does this person expose you to new opportunities or connections?",
        options: [
            { value: 5, text: "Frequently" },
            { value: 4, text: "Sometimes" },
            { value: 3, text: "Occasionally" },
            { value: 2, text: "Rarely" },
            { value: 1, text: "Never" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "🔑",
            bad: "🔒"
        }
    },
    {
        id: 9,
        text: "How do you feel when discussing money with this person?",
        options: [
            { value: 5, text: "Confident and inspired" },
            { value: 4, text: "Mostly positive" },
            { value: 3, text: "Neutral" },
            { value: 2, text: "Slightly anxious or uncomfortable" },
            { value: 1, text: "Very stressed or guilty" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "😀",
            bad: "😰"
        }
    },
    {
        id: 10,
        text: "Does this person's financial habits or attitudes influence yours?",
        options: [
            { value: 5, text: "Yes, in a very positive way" },
            { value: 4, text: "Somewhat positively" },
            { value: 3, text: "Not really" },
            { value: 2, text: "Somewhat negatively" },
            { value: 1, text: "Yes, in a very negative way" }
        ],
        impact: "positive", // Higher values are positive
        reaction: {
            good: "👑",
            bad: "⛓️"
        }
    }
];

// Define common negative phrases for each category
const negativePhrases = {
    money_problems: [
        "We can't afford that",
        "Money doesn't grow on trees",
        "That's way too expensive",
        "We'll never be able to afford that",
        "I'll always be in debt"
    ],
    victim_mentality: [
        "The economy is rigged against us",
        "Rich people just got lucky",
        "You need money to make money",
        "It's not fair how some people have everything",
        "The system is designed to keep us poor"
    ],
    fear_based: [
        "I'm just not good with money",
        "Better be safe than sorry",
        "You should save every penny",
        "That's too risky, you'll lose everything",
        "You better hold onto that job, the economy is terrible"
    ]
};

// Define positive phrases for prosperity allies
const positivePhrases = [
    "Have you considered investing in...",
    "I believe you can achieve that goal",
    "Let me connect you with someone who could help",
    "What's your next financial milestone?",
    "You deserve financial success"
];

// Navigation between steps
function goToStep(stepNumber) {
    // Step 1 validation
    if (stepNumber === 2) {
        // Collect data from step 1
        for (let i = 1; i <= 5; i++) {
            const name = document.getElementById(`name${i}`).value;
            const relationship = document.getElementById(`relationship${i}`).value;
            
            if (name && relationship) {
                relationships[i-1].name = name;
                relationships[i-1].relationship = relationship;
            }
        }
        
        // At least 3 contacts needed
        const validContacts = relationships.filter(r => r.name && r.relationship);
        if (validContacts.length < 3) {
            alert("Please enter at least 3 friends to continue.");
            return;
        }
        
        // Build questions for step 2
        buildQuestionsUI();
    }
    
    // Step 2 validation
    if (stepNumber === 3) {
        // Check if all questions are answered
        let allAnswered = true;
        relationships.forEach((relationship, idx) => {
            if (relationship.name && relationship.relationship) {
                wealthQuestions.forEach(question => {
                    const answerId = `answer-${idx+1}-${question.id}`;
                    const answerElement = document.getElementById(answerId);
                    if (answerElement && answerElement.value) {
                        relationships[idx].answers[question.id] = parseInt(answerElement.value);
                    } else if (answerElement) {
                        allAnswered = false;
                    }
                });
            }
        });
        
        if (!allAnswered) {
            alert("Please answer all questions to continue.");
            return;
        }
        
        // Calculate scores
        calculateScores();
        
        // Simulate scanning process
        setTimeout(() => {
            document.getElementById('scanning-status').textContent = "Identifying wealth vampires...";
            setTimeout(() => {
                document.getElementById('scanning-status').textContent = "Detecting prosperity allies...";
                setTimeout(() => {
                    document.getElementById('scanning-status').textContent = "Calculating financial impact...";
                    setTimeout(() => {
                        document.getElementById('scanning-status').textContent = "Generating personalized action plan...";
                        setTimeout(() => {
                            buildResultsUI();
                            goToStep(4);
                            
                            // Show warning popup for very toxic relationships
                            const toxicRelationships = relationships.filter(r => r.name && r.relationship && r.score < 30);
                            if (toxicRelationships.length > 0) {
                                setTimeout(() => {
                                    showWarning(toxicRelationships[0]);
                                }, 1500);
                            }
                            
                            // Animate prosperity meters
                            setTimeout(() => {
                                document.querySelectorAll('.prosperity-meter-fill').forEach(meter => {
                                    meter.style.width = meter.getAttribute('data-value') + '%';
                                });
                            }, 500);
                            
                            // Animate network visualization
                            animateNetworks();
                            
                            // Animate timeline bars
                            setTimeout(() => {
                                document.querySelectorAll('.timeline-bar').forEach(bar => {
                                    bar.style.width = bar.getAttribute('data-value') + '%';
                                });
                            }, 1000);
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 1500);
    }
    
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show the current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update progress indicators
    updateProgress(stepNumber);
}

// Update progress indicators
function updateProgress(currentStep) {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
        }
    });
    
    lines.forEach((line, index) => {
        line.classList.remove('completed');
        if (index + 1 < currentStep) {
            line.classList.add('completed');
        }
    });
}

// Build the questions UI for step 2
function buildQuestionsUI() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    relationships.forEach((relationship, idx) => {
        if (relationship.name && relationship.relationship) {
            const personDiv = document.createElement('div');
            personDiv.className = 'person-form';
            personDiv.innerHTML = `<h3>${relationship.name} (${relationship.relationship})</h3>`;
            
            wealthQuestions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.style.position = 'relative';
                
                let optionsHTML = `
                    <label>${question.text}</label>
                    <select id="answer-${idx+1}-${question.id}" onchange="showReaction(this, ${idx+1}, ${question.id})">
                        <option value="">Select your answer</option>
                `;
                
                question.options.forEach(option => {
                    optionsHTML += `<option value="${option.value}">${option.text}</option>`;
                });
                
                optionsHTML += '</select>';
                optionsHTML += `<span class="answer-reaction" id="reaction-${idx+1}-${question.id}"></span>`;
                
                questionDiv.innerHTML = optionsHTML;
                personDiv.appendChild(questionDiv);
            });
            
            container.appendChild(personDiv);
        }
    });
}

// Show reaction to answer
function showReaction(selectElement, personId, questionId) {
    const value = parseInt(selectElement.value);
    const question = wealthQuestions.find(q => q.id === questionId);
    
    if (!question) return;
    
    const reactionSpan = document.getElementById(`reaction-${personId}-${questionId}`);
    if (!reactionSpan) return;
    
    let isGood;
    if (question.impact === "positive") {
        isGood = value >= 4;
    } else {
        isGood = value <= 2;
    }
    
    reactionSpan.textContent = isGood ? question.reaction.good : question.reaction.bad;
    reactionSpan.style.opacity = 1;
    reactionSpan.style.left = "10px";
    
    setTimeout(() => {
        reactionSpan.style.opacity = 0;
        reactionSpan.style.left = "-40px";
    }, 2000);
}

// Calculate relationship scores
function calculateScores() {
    relationships.forEach((relationship, idx) => {
        if (relationship.name && relationship.relationship) {
            let score = 0;
            let maxPossibleScore = 0;
            
            Object.entries(relationship.answers).forEach(([questionId, answerValue]) => {
                const question = wealthQuestions.find(q => q.id === parseInt(questionId));
                if (question) {
                    if (question.impact === "positive") {
                        score += answerValue;
                    } else {
                        score += (6 - answerValue); // Invert negative impact questions
                    }
                    maxPossibleScore += 5; // Max possible value
                }
            });
            
            // Calculate percentage score
            const percentageScore = Math.round((score / maxPossibleScore) * 100);
            relationships[idx].score = percentageScore;
            
            // Assign category
            if (percentageScore >= 75) {
                relationships[idx].category = "green";
            } else if (percentageScore >= 50) {
                relationships[idx].category = "yellow";
            } else {
                relationships[idx].category = "red";
            }
            
            // Calculate financial impact
            calculateFinancialImpact(idx);
            
            // Generate phrases
            generatePhrases(idx);
        }
    });
}

// Calculate financial impact
function calculateFinancialImpact(relationshipIndex) {
    const relationship = relationships[relationshipIndex];
    if (!relationship.name || !relationship.relationship) return;
    
    // Base impact values (annual)
    const baseNegativeImpact = -14700; // -$14,700 per year for toxic relationships
    const basePositiveImpact = 18900; // +$18,900 per year for prosperity allies
    
    // Calculate impact based on score (non-linear)
    let impact = 0;
    
    if (relationship.score < 50) {
        // Negative impact (exponentially worse as score decreases)
        const factor = 1 + ((50 - relationship.score) / 50) * 2;
        impact = Math.round(baseNegativeImpact * factor);
    } else {
        // Positive impact (exponentially better as score increases)
        const factor = ((relationship.score - 50) / 50) * 2;
        impact = Math.round(basePositiveImpact * factor);
    }
    
    // Apply relationship type modifiers
    if (relationship.relationship === "Partner") {
        impact = Math.round(impact * 1.8); // Partners have 80% more impact
    } else if (relationship.relationship === "Family") {
        impact = Math.round(impact * 1.4); // Family has 40% more impact
    } else if (relationship.relationship === "Colleague") {
        impact = Math.round(impact * 1.2); // Colleagues have 20% more impact
    }
    
    relationship.financialImpact = impact;
}

// Generate common phrases
function generatePhrases(relationshipIndex) {
    const relationship = relationships[relationshipIndex];
    if (!relationship.name || !relationship.relationship) return;
    
    const phrases = [];
    
    if (relationship.category === "red") {
        // Add 2-3 negative phrases
        const categoryKeys = Object.keys(negativePhrases);
        const selectedCategories = [];
        
        // Determine which negative categories to use based on answers
        if (relationship.answers[1] >= 4 || relationship.answers[5] >= 4) {
            selectedCategories.push("money_problems");
        }
        
        if (relationship.answers[7] >= 4) {
            selectedCategories.push("victim_mentality");
        }
        
        if (relationship.answers[3] <= 2 || relationship.answers[10] <= 2) {
            selectedCategories.push("fear_based");
        }
        
        // If no specific categories, use a random mix
        if (selectedCategories.length === 0) {
            selectedCategories.push(categoryKeys[Math.floor(Math.random() * categoryKeys.length)]);
            selectedCategories.push(categoryKeys[Math.floor(Math.random() * categoryKeys.length)]);
        }
        
        // Add phrases from selected categories
        for (const category of selectedCategories) {
            const categoryPhrases = negativePhrases[category];
            const randomIndex = Math.floor(Math.random() * categoryPhrases.length);
            phrases.push(categoryPhrases[randomIndex]);
            
            // Don't add too many phrases
            if (phrases.length >= 3) break;
        }
    } else if (relationship.category === "green") {
        // Add 2 positive phrases
        const shuffled = [...positivePhrases].sort(() => 0.5 - Math.random());
        phrases.push(shuffled[0]);
        phrases.push(shuffled[1]);
    } else {
        // Mixed - add 1 negative, 1 positive
        const negCategory = Object.keys(negativePhrases)[Math.floor(Math.random() * Object.keys(negativePhrases).length)];
        const negPhrases = negativePhrases[negCategory];
        phrases.push(negPhrases[Math.floor(Math.random() * negPhrases.length)]);
        
        phrases.push(positivePhrases[Math.floor(Math.random() * positivePhrases.length)]);
    }
    
    relationship.phrases = phrases;
}

// Build the results UI
function buildResultsUI() {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    // Sort relationships by score (highest first)
    const validRelationships = relationships
        .filter(r => r.name && r.relationship)
        .sort((a, b) => b.score - a.score);
    
    // Build prosperity leakage summary
    buildProsperityLeakage(validRelationships);
    
    // Build pattern detection
    buildPatternDetection(validRelationships);
    
    // Build network visualization
    buildNetworkVisualization(validRelationships);
    
    validRelationships.forEach(relationship => {
        const resultCard = document.createElement('div');
        resultCard.className = `result-card ${relationship.category}`;
        
        let categoryText = "";
        let actionPlan = "";
        let financialImpactHTML = "";
        let commonPhrasesHTML = "";
        let timelineHTML = "";
        let warningBadge = "";
        let shockingStatHTML = "";
        
        // Create category-specific content
        if (relationship.category === "green") {
            categoryText = "PROSPERITY ALLY";
            actionPlan = `
                <div class="action-plan">
                    <h4>How to Maximize This Friend:</h4>
                    <ul>
                        <li>Schedule regular time with ${relationship.name} to discuss goals and opportunities</li>
                        <li>Consider collaborating on projects or investments</li>
                        <li>Introduce them to your other high-value connections</li>
                    </ul>
                </div>
            `;
            
            // Positive financial impact
            financialImpactHTML = `
                <div class="financial-impact financial-impact-positive">
                    <h4>Positive Financial Impact:</h4>
                    <p>This friendship is potentially adding <span class="money-value positive">+$${Math.abs(relationship.financialImpact).toLocaleString()}</span> in additional income per year through opportunities, mindset, and positive influence.</p>
                    <div class="prosperity-meter">
                        <div class="prosperity-meter-fill" style="background-color: #00c853;" data-value="${relationship.score}"></div>
                    </div>
                </div>
            `;
            
            // Common phrases
            if (relationship.phrases.length > 0) {
                commonPhrasesHTML = `
                    <h4>Prosperity-Building Language:</h4>
                    <div class="common-phrases">
                        "${relationship.phrases.join('" • "')}"
                    </div>
                `;
            }
            
            // Shocking stat for prosperity ally
            shockingStatHTML = `
                <div class="shocking-stat">
                    <p>People who maintain friendships like the one with ${relationship.name} are <span class="stat-highlight">3.4x more likely</span> to achieve their financial goals within 5 years!</p>
                </div>
            `;
            
        } else if (relationship.category === "yellow") {
            categoryText = "MIXED INFLUENCE";
            actionPlan = `
                <div class="action-plan">
                    <h4>Setting Healthy Boundaries:</h4>
                    <ul>
                        <li>Limit financial discussions to positive topics only</li>
                        <li>Change subject when conversation turns to complaints</li>
                        <li>See them in group settings rather than one-on-one</li>
                    </ul>
                </div>
            `;
            
            // Mixed financial impact
            const impactColor = relationship.financialImpact >= 0 ? "positive" : "negative";
            financialImpactHTML = `
                <div class="financial-impact">
                    <h4>Financial Impact:</h4>
                    <p>This friendship is potentially <span class="money-value ${impactColor}">${relationship.financialImpact >= 0 ? '+' : ''}$${Math.abs(relationship.financialImpact).toLocaleString()}</span> in ${relationship.financialImpact >= 0 ? 'additional income' : 'lost opportunity'} per year.</p>
                    <div class="prosperity-meter">
                        <div class="prosperity-meter-fill" style="background-color: #ffab00;" data-value="${relationship.score}"></div>
                    </div>
                </div>
            `;
            
            // Common phrases
            if (relationship.phrases.length > 0) {
                commonPhrasesHTML = `
                    <h4>Mixed Language Patterns:</h4>
                    <div class="common-phrases">
                        "${relationship.phrases.join('" • "')}"
                    </div>
                `;
            }
            
        } else {
            categoryText = "WEALTH VAMPIRE";
            actionPlan = `
                <div class="action-plan">
                    <h4>Protecting Your Prosperity:</h4>
                    <ul>
                        <li>Reduce contact frequency by 50% immediately</li>
                        <li>Never discuss your financial goals or successes</li>
                        <li>Balance each interaction with time spent with a prosperity ally</li>
                    </ul>
                </div>
            `;
            
            // Negative financial impact
            financialImpactHTML = `
                <div class="financial-impact financial-impact-negative">
                    <h4>Negative Financial Impact:</h4>
                    <p>This friendship is potentially costing you <span class="money-value negative">-$${Math.abs(relationship.financialImpact).toLocaleString()}</span> in lost opportunity per year through negative influence and energy drain.</p>
                    <div class="prosperity-meter">
                        <div class="prosperity-meter-fill" style="background-color: #ff3d00;" data-value="${relationship.score}"></div>
                    </div>
                </div>
            `;
            
            // Common phrases
            if (relationship.phrases.length > 0) {
                commonPhrasesHTML = `
                    <h4>Wealth-Destroying Language:</h4>
                    <div class="common-phrases">
                        "${relationship.phrases.join('" • "')}"
                    </div>
                `;
            }
            
            // Warning badge for very toxic relationships
            if (relationship.score < 40) {
                warningBadge = `<div class="warning-badge">URGENT</div>`;
            }
            
            // Shocking stat for energy vampire
            shockingStatHTML = `
                <div class="shocking-stat">
                    <p>People who maintain friendships like the one with ${relationship.name} are <span class="stat-highlight">72% less likely</span> to achieve financial independence!</p>
                </div>
            `;
        }
        
        // Timeline visualization for all relationships
        timelineHTML = `
            <div class="wealth-timeline">
                <h4>5-Year Financial Impact Projection:</h4>
                <div class="timeline-year">
                    <div class="year-label">Year 1</div>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar${relationship.financialImpact < 0 ? ' negative' : ''}" data-value="${Math.min(Math.abs(relationship.financialImpact) / 250, 100)}"></div>
                    </div>
                    <div style="margin-left: 10px;">$${Math.abs(relationship.financialImpact).toLocaleString()}</div>
                </div>
                <div class="timeline-year">
                    <div class="year-label">Year 3</div>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar${relationship.financialImpact < 0 ? ' negative' : ''}" data-value="${Math.min(Math.abs(relationship.financialImpact * 3.2) / 250, 100)}"></div>
                    </div>
                    <div style="margin-left: 10px;">$${Math.abs(Math.round(relationship.financialImpact * 3.2)).toLocaleString()}</div>
                </div>
                <div class="timeline-year">
                    <div class="year-label">Year 5</div>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar${relationship.financialImpact < 0 ? ' negative' : ''}" data-value="${Math.min(Math.abs(relationship.financialImpact * 5.8) / 250, 100)}"></div>
                    </div>
                    <div style="margin-left: 10px;">$${Math.abs(Math.round(relationship.financialImpact * 5.8)).toLocaleString()}</div>
                </div>
            </div>
        `;
        
        resultCard.innerHTML = `
            ${warningBadge}
            <div class="status ${relationship.category}">${categoryText}</div>
            <h3>${relationship.name} (${relationship.relationship})</h3>
            <div class="impact-score">Wealth Impact Score: ${relationship.score}%</div>
            <p>${getCategoryDescription(relationship.category, relationship.name)}</p>
            ${financialImpactHTML}
            ${commonPhrasesHTML}
            ${timelineHTML}
            ${shockingStatHTML}
            ${actionPlan}
        `;
        
        resultsContainer.appendChild(resultCard);
    });
    
    // Build action plan
    buildActionPlan(validRelationships);
}

// Get category description based on relationship category
function getCategoryDescription(category, name) {
    if (category === "green") {
        return `${name} actively contributes to your wealth mindset and financial growth. This friend energizes you and creates opportunities.`;
    } else if (category === "yellow") {
        return `${name} has both positive and negative effects on your prosperity. With boundaries, this friendship can be improved.`;
    } else {
        return `${name} is currently blocking your financial growth through negative energy, limiting beliefs, and scarcity mindset.`;
    }
}

// Build prosperity leakage summary
function buildProsperityLeakage(validRelationships) {
    const container = document.getElementById('prosperity-leakage');
    
    // Calculate total financial impact
    let totalImpact = 0;
    validRelationships.forEach(relationship => {
        totalImpact += relationship.financialImpact;
    });
    
    const impactText = totalImpact >= 0 ? 
        `<span class="money-value positive">+$${Math.abs(totalImpact).toLocaleString()}</span> in additional income` : 
        `<span class="money-value negative">-$${Math.abs(totalImpact).toLocaleString()}</span> in lost opportunity`;
    
    const vampireCount = validRelationships.filter(r => r.category === "red").length;
    const allyCount = validRelationships.filter(r => r.category === "green").length;
    
    const fiveYearProjection = Math.round(totalImpact * 5.8);
    const fiveYearText = fiveYearProjection >= 0 ? 
        `<span class="money-value positive">+$${Math.abs(fiveYearProjection).toLocaleString()}</span> in additional wealth` : 
        `<span class="money-value negative">-$${Math.abs(fiveYearProjection).toLocaleString()}</span> in lost financial opportunity`;
    
    container.innerHTML = `
        <h3>Your Friendship Money Drain Analysis</h3>
        <p>Your current friendship network is creating a net impact of ${impactText} per year.</p>
        <p>Over the next 5 years, this could translate to ${fiveYearText}!</p>
        <p>Your network consists of <strong>${vampireCount} wealth vampire${vampireCount !== 1 ? 's' : ''}</strong> and <strong>${allyCount} prosperity all${allyCount !== 1 ? 'ies' : 'y'}</strong>.</p>
    `;
}

// Build pattern detection
function buildPatternDetection(validRelationships) {
    const container = document.getElementById('pattern-detection');
    
    // Detect patterns based on relationship scores and types
    const redCount = validRelationships.filter(r => r.category === "red").length;
    const yellowCount = validRelationships.filter(r => r.category === "yellow").length;
    const greenCount = validRelationships.filter(r => r.category === "green").length;
    
    let patternType = "";
    let patternDescription = "";
    
    if (redCount > greenCount && redCount >= 2) {
        patternType = "Broke Friend Attraction Pattern";
        patternDescription = "You're drawn to financially struggling friends who reinforce limiting beliefs about money and success. This creates a self-fulfilling cycle where your wealth potential is consistently undermined by those closest to you.";
    } else if (greenCount > redCount && greenCount >= 2) {
        patternType = "Wealth Magnet Pattern";
        patternDescription = "You naturally attract and maintain friendships with individuals who support your financial growth. This positive influence network makes wealth creation significantly easier for you than the average person.";
    } else if (yellowCount >= 3) {
        patternType = "Financial Fence-Sitter Pattern";
        patternDescription = "Your network consists primarily of friends with mixed influence. This creates inconsistent results in your financial life - periods of growth followed by setbacks, making sustained progress difficult.";
    } else {
        patternType = "Wealth Contrast Pattern";
        patternDescription = "Your friendship network contains stark contrasts between extremely positive and extremely negative financial influences. This creates internal conflict about money that can lead to inconsistent decision-making.";
    }
    
    container.innerHTML = `
        <h3>Your Hidden Friendship Pattern: ${patternType}</h3>
        <p>${patternDescription}</p>
    `;
}

// Build network visualization
function buildNetworkVisualization(validRelationships) {
    const currentNetwork = document.getElementById('current-network');
    const optimizedNetwork = document.getElementById('optimized-network');
    
    // Remove any existing contacts
    document.querySelectorAll('.network-contact, .network-line').forEach(el => el.remove());
    
    // Calculate positions for current network
    validRelationships.forEach((relationship, idx) => {
        // Calculate position (in a circle around "YOU")
        const angle = (idx / validRelationships.length) * 2 * Math.PI;
        const radius = 120; // Distance from center
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        // Create contact node
        const contact = document.createElement('div');
        contact.className = `network-contact ${relationship.category}`;
        contact.innerHTML = relationship.name;
        contact.style.transform = `translate(${x}px, ${y}px)`;
        
        // Create connection line
        const line = document.createElement('div');
        line.className = 'network-line';
        
        // Calculate line dimensions
        const length = Math.sqrt(x*x + y*y);
        line.style.width = `${length}px`;
        
        // Calculate rotation angle
        const rotation = Math.atan2(y, x) * (180 / Math.PI);
        line.style.transform = `rotate(${rotation}deg)`;
        
        // Add elements to current network
        currentNetwork.appendChild(line);
        currentNetwork.appendChild(contact);
        
        // Now add to optimized network (with adjustments)
        if (relationship.category === "red") {
            // Move energy vampires further away
            const adjustedRadius = radius * 1.8;
            const optimizedX = adjustedRadius * Math.cos(angle);
            const optimizedY = adjustedRadius * Math.sin(angle);
            
            // Create optimized contact node
            const optimizedContact = document.createElement('div');
            optimizedContact.className = `network-contact ${relationship.category}`;
            optimizedContact.innerHTML = relationship.name;
            optimizedContact.style.transform = `translate(${optimizedX}px, ${optimizedY}px)`;
            
            // Create optimized connection line
            const optimizedLine = document.createElement('div');
            optimizedLine.className = 'network-line';
            
            // Calculate optimized line dimensions
            const optimizedLength = Math.sqrt(optimizedX*optimizedX + optimizedY*optimizedY);
            optimizedLine.style.width = `${optimizedLength}px`;
            
            // Calculate optimized rotation angle
            const optimizedRotation = Math.atan2(optimizedY, optimizedX) * (180 / Math.PI);
            optimizedLine.style.transform = `rotate(${optimizedRotation}deg)`;
            
            // Add elements to optimized network
            optimizedNetwork.appendChild(optimizedLine);
            optimizedNetwork.appendChild(optimizedContact);
            
        } else if (relationship.category === "green") {
            // Move prosperity allies closer
            const adjustedRadius = radius * 0.7;
            const optimizedX = adjustedRadius * Math.cos(angle);
            const optimizedY = adjustedRadius * Math.sin(angle);
            
            // Create optimized contact node
            const optimizedContact = document.createElement('div');
            optimizedContact.className = `network-contact ${relationship.category}`;
            optimizedContact.innerHTML = relationship.name;
            optimizedContact.style.transform = `translate(${optimizedX}px, ${optimizedY}px)`;
            
            // Create optimized connection line
            const optimizedLine = document.createElement('div');
            optimizedLine.className = 'network-line';
            
            // Calculate optimized line dimensions
            const optimizedLength = Math.sqrt(optimizedX*optimizedX + optimizedY*optimizedY);
            optimizedLine.style.width = `${optimizedLength}px`;
            
            // Calculate optimized rotation angle
            const optimizedRotation = Math.atan2(optimizedY, optimizedX) * (180 / Math.PI);
            optimizedLine.style.transform = `rotate(${optimizedRotation}deg)`;
            
            // Add elements to optimized network
            optimizedNetwork.appendChild(optimizedLine);
            optimizedNetwork.appendChild(optimizedContact);
            
        } else {
            // Keep mixed contacts at the same distance
            // Create optimized contact node
            const optimizedContact = document.createElement('div');
            optimizedContact.className = `network-contact ${relationship.category}`;
            optimizedContact.innerHTML = relationship.name;
            optimizedContact.style.transform = `translate(${x}px, ${y}px)`;
            
            // Create optimized connection line
            const optimizedLine = document.createElement('div');
            optimizedLine.className = 'network-line';
            
            // Calculate optimized line dimensions
            optimizedLine.style.width = `${length}px`;
            
            // Calculate optimized rotation angle
            optimizedLine.style.transform = `rotate(${rotation}deg)`;
            
            // Add elements to optimized network
            optimizedNetwork.appendChild(optimizedLine);
            optimizedNetwork.appendChild(optimizedContact);
        }
    });
}

// Animate network visualization
function animateNetworks() {
    // Animate current network
    document.querySelectorAll('#current-network .network-contact').forEach((contact, idx) => {
        contact.style.opacity = 0;
        setTimeout(() => {
            contact.style.opacity = 1;
        }, 300 * idx);
    });
    
    // Animate optimized network
    document.querySelectorAll('#optimized-network .network-contact').forEach((contact, idx) => {
        contact.style.opacity = 0;
        setTimeout(() => {
            contact.style.opacity = 1;
        }, 300 * idx + 1000); // Delay a bit after current network
    });
}

// Build action plan
function buildActionPlan(validRelationships) {
    const container = document.getElementById('action-plan-container');
    container.innerHTML = '';
    
    const actionPlan = document.createElement('div');
    actionPlan.className = 'action-plan';
    
    // Sort by most urgent first
    const sortedRelationships = [...validRelationships].sort((a, b) => {
        // Red first, then yellow, then green
        if (a.category !== b.category) {
            if (a.category === "red") return -1;
            if (b.category === "red") return 1;
            if (a.category === "yellow") return -1;
            if (b.category === "yellow") return 1;
        }
        // Within same category, sort by score (ascending for red, descending for others)
        if (a.category === "red") {
            return a.score - b.score; // Lower score is worse/more urgent for red
        } else {
            return b.score - a.score; // Higher score is better for green/yellow
        }
    });
    
    // Generate plan items
    const planItems = [];
    
    // Handle wealth vampires first
    const vampires = sortedRelationships.filter(r => r.category === "red");
    if (vampires.length > 0) {
        planItems.push(`<li><strong>Immediate Action:</strong> Reduce time spent with ${vampires.map(v => v.name).join(' and ')} by 50% over the next 30 days.</li>`);
        
        if (vampires.length >= 2) {
            planItems.push(`<li><strong>Group Settings:</strong> Start seeing ${vampires[0].name} and ${vampires[1].name} only in group settings with more positive influences present.</li>`);
        }
    }
    
    // Leverage prosperity allies
    const allies = sortedRelationships.filter(r => r.category === "green");
    if (allies.length > 0) {
        planItems.push(`<li><strong>Wealth Immersion:</strong> Schedule monthly wealth-building conversations with ${allies.map(a => a.name).join(' and ')}.</li>`);
        
        if (allies.length >= 1 && vampires.length >= 1) {
            planItems.push(`<li><strong>Balance Rule:</strong> For every hour spent with ${vampires[0].name}, spend two hours with ${allies[0].name} to counteract negative influences.</li>`);
        }
    }
    
    // Handle mixed influences
    const mixed = sortedRelationships.filter(r => r.category === "yellow");
    if (mixed.length > 0) {
        planItems.push(`<li><strong>Conversation Steering:</strong> With ${mixed.map(m => m.name).join(' and ')}, actively redirect financial conversations toward productive topics.</li>`);
    }
    
    // General recommendations
    planItems.push('<li><strong>Language Filter:</strong> Stop using wealth-limiting phrases in your own vocabulary like "I can\'t afford that" or "Money doesn\'t grow on trees."</li>');
    
    if (validRelationships.length > 0) {
        // Calculate overall network health
        const averageScore = validRelationships.reduce((sum, r) => sum + r.score, 0) / validRelationships.length;
        
        if (averageScore < 50) {
            planItems.push('<li><strong>Network Expansion:</strong> Actively seek new prosperity-oriented friends through investment groups, entrepreneurship meetups, or personal development events.</li>');
        }
    }
    
    if (vampires.length > 0 && vampires[0].score < 30) {
        planItems.push(`<li><strong>URGENT:</strong> Consider a temporary 60-day separation from ${vampires[0].name} to break harmful financial thought patterns.</li>`);
    }
    
    // Build the final HTML
    actionPlan.innerHTML = `
        <ol>
            ${planItems.join('')}
        </ol>
        
        <div class="shocking-stat">
            <p><span class="stat-highlight">Implementation Rate:</span> People who follow through with at least 3 action items experience an average 34% increase in net worth within 24 months!</p>
        </div>
    `;
    
    container.appendChild(actionPlan);
}

// Show warning popup
function showWarning(toxicRelationship) {
    if (!toxicRelationship) return;
    
    const warningText = document.getElementById('warning-text');
    warningText.innerHTML = `
        <p>Your relationship with <strong>${toxicRelationship.name}</strong> is showing dangerous wealth-destruction patterns that could be sabotaging your financial future.</p>
        <p>This relationship scored an alarming <strong>${toxicRelationship.score}%</strong> on our assessment, indicating significant negative impacts on your prosperity mindset.</p>
        <p>Our recommendation: <strong>Take immediate action</strong> to protect your financial energy by implementing the action plan.</p>
    `;
    
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('warning-popup').style.display = 'block';
}

// Close warning popup
function closeWarning() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('warning-popup').style.display = 'none';
}

// Record feedback
function recordFeedback(reaction) {
    // In a real app, this would send data to analytics
    console.log(`User reaction: ${reaction}`);
    
    // Show feedback message
    const resultsContainer = document.getElementById('results-container');
    
    const feedbackMessage = document.createElement('div');
    feedbackMessage.className = 'message-bubble';
    
    let message = "";
    
    switch(reaction) {
        case 'shocked':
            message = "Many people are surprised by how much their friendships impact their finances. The good news is that awareness is the first step to change!";
            break;
        case 'sad':
            message = "It can be difficult to recognize patterns in our relationships. Remember that you have the power to reshape your network for better financial outcomes.";
            break;
        case 'happy':
            message = "Great! Understanding these patterns gives you an advantage that most people never discover. You're now equipped to make positive changes!";
            break;
        case 'determined':
            message = "That's the spirit! With your determination and this personalized action plan, you're well on your way to transforming your financial future!";
            break;
    }
    
    feedbackMessage.innerHTML = `<p>${message}</p>`;
    resultsContainer.appendChild(feedbackMessage);
}

// Reset scanner
function resetScanner() {
    // Reset all form fields
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`name${i}`).value = "";
        document.getElementById(`relationship${i}`).value = "";
    }
    
    // Reset stored data
    relationships = [
        { id: 1, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
        { id: 2, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
        { id: 3, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
        { id: 4, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] },
        { id: 5, name: "", relationship: "", answers: {}, score: 0, category: "", financialImpact: 0, phrases: [] }
    ];
    
    // Go back to step 1
    goToStep(1);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    goToStep(1);
});