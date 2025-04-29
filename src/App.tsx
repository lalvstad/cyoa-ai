import { Key, useState } from 'react';
import './Game.css';

type Choice = {
    text: string;
    nextScene: string;
    addChoice?: string;
    aiEffect?: number;
    reset?: boolean;
    setCEO?: boolean;
    resetWithCEO?: boolean;
    resetWithEmployee?: boolean;
};

type Scene = {
    text: string;
    choices: Choice[];
}

type Scenes = {
    [key: string]: Scene;
};

export default function AdventureGame() {

    const [currentScene, setCurrentScene] = useState('start');
    const [aiScore, setAIScore] = useState(0); // 0 - Negative feeling, 50 - neutral feeling, - 100 Positive feeling
    const [isCEO, setIsCEO] = useState(false);
    const [storyChoices, setStoryChoices] = useState<string[]>([]);

    // convert over into a binary tree data structure, with each of the scenes as the left and right child of the
    // root scene.

    /* EMPLOYEE SCENES */

    const employeeScenes: Scenes = {
        start: {
            text: "You are a senior developer at TechVai Solutions. Today, you receive an email: 'Important Company Announcement: AI Integration Initiative'. The CEO is implementing AI tools across all departments. As you read, you feel a mix of curiosity and concern about how this might affect your role.",
            choices: [
                {
                    text: "I'm a developer... I should embrace this change and position myself as an AI expert",
                    nextScene: "desk",
                    addChoice: "You decided to embrace AI and position yourself as an expert. You spent some hours outside of work to research AI and how you can use it effectively at work.",
                    aiEffect: 10
                },
                {
                    text: "This sounds concerning... I should focus on developing skills AI can't easily replace",
                    nextScene: "desk",
                    addChoice: "You were concerned about AI and decided to focus on uniquely human skills. You have improved your coding abilities and communication skills in order to obtain an edge over AI technology.",
                    aiEffect: -10
                }
            ],
        },
        desk: {
            text: "Two weeks later, your team leader announces that an AI tool will help write routine code. Some colleagues seem worried, others excited. Your team asks for volunteers to test the new system.",
            choices: [
                {
                    text: "Volunteer to be among the first to work with the AI tool",
                    nextScene: "office",
                    addChoice: "You volunteered to be an early tester for the AI coding tool. Throughout the program you learned to utilize these tools to make your work more efficient. Your managers took notice to your willingness to learn and adapt, and your team manager has starting talking their boss about your distinctive performance.",
                    aiEffect: 15
                },
                {
                    text: "Hold back and observe how others adapt to the tool first",
                    nextScene: "office",
                    addChoice: "You decided to wait and see how others adapted to the AI coding tool. Taking a hands off approach demonstrated complacency in productivity, though you think nothing off it at the time.",
                    aiEffect: -5
                }
            ],
        },
        office: {
            text: "Three months into the AI integration. The coding AI has automated many routine tasks. Management has scheduled performance reviews, and rumors suggest team restructuring. Your colleague mentions forming a discussion group about AI's impact on job security.",
            choices: [
                {
                    text: "Join the discussion group to express concerns about AI's rapid implementation",
                    nextScene: "breakroom",
                    addChoice: "You joined a group discussing concerns about AI implementation. Discussions about forming committees, unions, and other groups within the company arise, and you progressively feel uneasy about your future at the company.",
                    aiEffect: -10
                },
                {
                    text: "Focus on showcasing how you've used AI to improve your productivity",
                    nextScene: "breakroom",
                    addChoice: "You demonstrated how you used AI to improve your productivity. Your boss and their supervisors took notice to your stellar performance, and have decided to arrange a meeting to discuss your future at the company.",
                    aiEffect: 25
                }
            ],
        },
        breakroom: {
            text: "You are called into a meeting with your manager.",
            choices: [
                {
                    text: "See your final outcome based on your choices and AI attitude",
                    nextScene: "employee_ending",
                    addChoice: "You met with your manager to discuss how AI will affect your position.",
                },
                {
                    text: "Start over with different choices",
                    nextScene: "restart",
                    reset: true
                }
            ],
        },
        employee_ending: {
            text: "Based on your choices and attitude toward AI...",
            choices: [
                {
                    text: "Return to the start",
                    nextScene: "restart",
                    reset: true
                },
                {
                    text: "Try the CEO perspective",
                    nextScene: "character_select",
                    resetWithCEO: true
                }
            ],
        },
        restart: {
            text: "Do you want to play as an employee or as the CEO?",
            choices: [
                {
                    text: "Play as an employee",
                    nextScene: "start",
                    setCEO: false
                },
                {
                    text: "Play as the CEO",
                    nextScene: "start",
                    setCEO: true
                }
            ],
        },
        character_select: {
            text: "Do you want to play as an employee or as the CEO?",
            choices: [
                {
                    text: "Play as an employee",
                    nextScene: "start",
                    setCEO: false
                },
                {
                    text: "Play as the CEO",
                    nextScene: "start",
                    setCEO: true
                }
            ],
        }
    };

    /* CEO SCENES */

    const ceoScenes: Scenes = {
        start: {
            text: "As the CEO of TechVai Solutions, you're facing increasing pressure from the board to modernize operations and cut costs. Your CTO has presented a comprehensive AI implementation plan that could revolutionize productivity but will likely lead to workforce changes.",
            choices: [
                {
                    text: "Implement AI gradually with a focus on augmenting employees",
                    nextScene: "desk",
                    addChoice: "You chose to implement AI gradually, focusing on augmenting your employees' capabilities. Although this initiated a slower transition, your employees felt less stressed about adapting to AI.",
                    aiEffect: 5
                },
                {
                    text: "Move quickly with aggressive AI implementation to stay ahead of competitors",
                    nextScene: "desk",
                    addChoice: "You chose rapid AI implementation to maintain a competitive advantage. The company's board greatly approved of this decision, but your employees felt incredibly stressed about adapting to AI.",
                    aiEffect: 15
                }
            ]
        },
        desk: {
            text: "Three months into implementation. Early AI systems have shown impressive efficiency gains, but the Human Resources director reports growing anxiety among staff. Meanwhile, the board is pressuring you for a faster return on investment from the AI implementation",
            choices: [
                {
                    text: "Prioritize addressing employee concerns with transparency and retraining programs",
                    nextScene: "office",
                    addChoice: "You prioritized employee concerns with transparency and retraining programs. You instilled confidence in your employees, who now trust that you have their best interest in mind.",
                    aiEffect: 5
                },
                {
                    text: "Focus on demonstrating quick wins to the board and shareholders",
                    nextScene: "office",
                    addChoice: "You focused on demonstrating quick wins to the board and shareholders. While this benefited the stock of your company, many employees now feel uneasy under your leadership. This led to some slowdowns in productivity among your employees because of the instability.",
                    aiEffect: 15
                }
            ]
        },
        office: {
            text: "Six months in. The AI systems are increasingly capable. Your Chief Operating Officer presents two restructuring plans.",
            choices: [
                {
                    text: "Reduce employee headcount by 25%, fully replace their roles with AI.",
                    nextScene: "breakroom",
                    addChoice: "You approved of a restructuring plan that laid off 25% of your employees. While this was seen as a temporary win, productivity saw a rapid decline in the following months. A lot of work created by AI was implemented incorrectly, leading to many mistakes in your products. ",
                    aiEffect: 15
                },
                {
                    text: "Focus on employee retraining programs, restructuring about 25% of the employees.",
                    nextScene: "breakroom",
                    addChoice: "When asked to restructure, you focused on employee retraining programs to help transition those most vulnerable in your company to more secure options. Not only did this make you popular among your employees, it also dramatically increased productivity once AI was fully implemented into the workflows of the company. Those who were retrained help implement the AI effectively into your products, significantly boosting profit.",
                    aiEffect: 15
                }
            ]
        },
        breakroom: {
            text: "One year into the AI transformation. The board has been watching your actions and have called you in to review your decisions and how it's affect the company.",
            choices: [
                {
                    text: "See your final outcome based on your choices and AI attitude",
                    nextScene: "ceo_ending",
                },
                {
                    text: "Start over with different choices",
                    nextScene: "restart",
                    reset: true
                }
            ]
        },
        ceo_ending: {
            text: "Based on your choices and approach to AI implementation...",
            choices: [
                {
                    text: "Return to the start",
                    nextScene: "restart",
                    reset: true
                },
                {
                    text: "Try the employee perspective",
                    nextScene: "character_select",
                    resetWithEmployee: true
                }
            ]
        },
        restart: {
            text: "Do you want to play as an employee or as the CEO?",
            choices: [
                {
                    text: "Play as an employee",
                    nextScene: "start",
                    setCEO: false
                },
                {
                    text: "Play as the CEO",
                    nextScene: "start",
                    setCEO: true
                }
            ]
        },
        character_select: {
            text: "Do you want to play as an employee or as the CEO?",
            choices: [
                {
                    text: "Play as an employee",
                    nextScene: "start",
                    setCEO: false
                },
                {
                    text: "Play as the CEO",
                    nextScene: "start",
                    setCEO: true
                }
            ],
        },
    }

    const generateEndingText = () => {
        let endingText;

        if (isCEO) {
            endingText = "YOUR JOURNEY AS CEO:\n\n";
            endingText += storyChoices.join("\n\n");
            endingText += "\n\n";

            if (aiScore >= 45) {
                endingText += "OUTCOME: You led a full scale AI transformation at the company, though possibly at the expense of your employees. The culture at your company has been significantly affected by the smaller but more specialized workforce. Your former employees have been negatively impacted by your decisions, many of whom struggle to find new employment."
            } else if (aiScore >= 30) {
                endingText += "OUTCOME: Your balanced approach to AI implementation yielded strong results while managing disruption. TechVai has successfully modernized operations with moderate workforce changes. The company has gained a reputation for thoughtful innovation. Most stakeholders are satisfied, though some board members wonder if more aggressive action would have yielded better financial results.";
            } else if (aiScore >= 25) {
                endingText += "OUTCOME: Your cautious approach to AI implementation balanced technical innovation with human concerns. TechVai has made moderate efficiency gains while maintaining much of its original workforce. The company is seen as socially responsible but is lagging behind more aggressive competitors. Employee satisfaction is high, but the board is growing restless about return on AI investments."
            } else {
                endingText += "OUTCOME: Your resistant approach to AI implementation prioritized job preservation and employee input. While TechVai maintained its workforce and culture, competitors have raced ahead with more efficient operations. Your company is now struggling to compete on price and speed. The board is considering leadership changes, though you've become hero among labor advocates.";
            }
        } else {
            endingText = "YOUR JOURNEY AS AN EMPLOYEE:\n\n";
            endingText += storyChoices.join("\n\n");
            endingText += "\n\n";

            if (aiScore >= 45) {
                endingText += "OUTCOME: Your enthusiastic embrace of AI tools has transformed your career. In your meeting, your manager announces your promotion to lead a new AI integration team. You've positioned yourself as an invaluable bridge between technology and human talent. While some of your colleagues lost their positions, you've secured a higher-paying role with more influence in the company's future direction.";
            } else if (aiScore >= 30) {
                endingText += "OUTCOME: Your adaptive approach to AI has paid off. In your meeting, your manager confirms your position is secure and even offers you specialized training in AI supervision. You've demonstrated value in working alongside AI tools, balancing technical skills with critical thinking that machines cannot replicate. While the company continues to evolve, you've established yourself as an asset in the changing landscape of AI."
            } else if (aiScore >= 25) {
                endingText += "OUTCOME: Your balanced approach to AI has left you in an uncertain position. Your manager explains that while this round of restructuring won't affect your role, you need to better demonstrate how you add value beyond what AI can provide. You've neither embraced nor rejected the new tools, leaving your future prospects unclear as the company continues its transition to AI."
            } else {
                endingText += "OUTCOME: Your resistance to AI integration has put your position at risk. In the meeting, your manager presents you with two options: accept a limited role with reduced responsibilities and compensation, or accept a severance package. Your focus on traditional skills hasn't aligned with the company's new direction. While you stand by your principles, you now face difficult career decisions."
            }
        }

        return endingText;
    };

    const handleChoice = (choice: Choice) => {
        if (choice.addChoice) {
            setStoryChoices([...storyChoices, choice.addChoice]);
        }

        if (choice.aiEffect) {
            const newScore = Math.max(0, Math.min(100, aiScore + choice.aiEffect));
            setAIScore(newScore);
        }

        if (choice.nextScene === "restart") {
            setStoryChoices([]);
            setAIScore(0);
            setCurrentScene("character_select");
        } else if (choice.nextScene === "employee_ending" || choice.nextScene === "ceo_ending") {
            setCurrentScene(choice.nextScene);
        } else if (choice.resetWithCEO) {
            setStoryChoices([]);
            setAIScore(0);
            setIsCEO(true);
            setCurrentScene("start");
        } else if (choice.resetWithEmployee) {
            setStoryChoices([]);
            setAIScore(0);
            setIsCEO(false);
            setCurrentScene("start");
        } else if (choice.setCEO !== undefined) {
            setIsCEO(choice.setCEO);
            setCurrentScene("start");
        } else {
            setCurrentScene(choice.nextScene);
        }
    };

    let scene: Scene;

    if (currentScene === "character_select") {
        scene = {
            text: "Welcome! In this adventure, you'll explore the impacts of AI in the workplace. Choose your perspective:",
            choices: [
                { text: "Play as an employee navigating AI changes", nextScene: "start", setCEO: false },
                { text: "Play as the CEO implementing AI strategy", nextScene: "start", setCEO: true }
            ]
        };
    } else if (currentScene === "employee_ending" || currentScene === "ceo_ending") {
        const baseScene = isCEO ? ceoScenes[currentScene] : employeeScenes[currentScene];
        scene = {
            ...baseScene,
            text: generateEndingText()
        };
    } else {
        scene = isCEO ? ceoScenes[currentScene] : employeeScenes[currentScene];
    }

    if (!scene && currentScene === "start") {
        setCurrentScene("character_select");
        scene = {
            text: "Welcome! In this adventure, you'll explore the impacts of AI in the workplace. Choose your perspective:",
            choices: [
                { text: "Play as an employee navigating AI changes", nextScene: "start", setCEO: false },
                { text: "Play as the CEO implementing AI strategy", nextScene: "start", setCEO: true }
            ]
        };
    }

    const getAIMeterClass = () => {
        if (aiScore >= 30) return "meter-positive";
        if (aiScore >= 25) return "meter-neutral";
        return "meter-negative";
    };

    return (
        <div className="adventure-game">
            <div className="game-container">
                <h1 className="game-title">Choose Your Own Adventure: AI</h1>

                <div className="status-bar">
                    <div className="ai-meter">
                        <span className="meter-label">AI Attitude:</span>
                        <div className="meter-track">
                            <div
                                className={`meter-fill ${ getAIMeterClass() }`}
                                style={{ width: `${ aiScore * 2 }%` }}
                            ></div>
                        </div>
                        <span className="meter-value">{ aiScore }/50</span>
                    </div>
                    <div className="role-indicator">
                        <span className="role-label">Role:</span> { isCEO ? "CEO" : "Employee" }
                    </div>
                </div>

                <div className="scene-text">
                    <p>{ scene.text }</p>
                </div>

                <div className="choices">
                    {(currentScene !== "employee_ending" && currentScene !== "ceo_ending") && (
                        <h2 className="choices-title">What will you do?</h2>
                    )}

                    {scene.choices.map((choice: Choice, index: Key | null | undefined) => (
                        <button
                            key={ index }
                            onClick={ () => handleChoice(choice) }
                            className="choice-button"
                        >
                            { choice.text }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}