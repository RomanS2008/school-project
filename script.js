// Replace 'YOUR_API_KEY' with your actual ChatGPT API key
// const apiKey = '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';
// const endpoint = 'https://api.openai.com/v1/chat/completions';

// const submitButton = document.getElementById('submitBtn');
// const userGoalInput = document.getElementById('userGoal');
// const userTextInput = document.getElementById('userText');
// const chatbox = document.getElementById('chatbox');

// submitButton.addEventListener('click', async () => {
//     const userGoal = userGoalInput.value;
//     const userText = userTextInput.value;

//     // Construct the system prompt and user prompt
//     // const systemPrompt = `You are a helpful assistant that generates text to ${userGoal}.`;
//     // const userPrompt = `User: ${userText}\nAssistant:`;
//     const systemPrompt = `Hello! 
//     In the triple quotes you have type of text and in the double quotes you have this text. 
//     Please come up with criteria to evaluate this type of text and evaluate this text by these criteria, it's necessary to have at least 5 criteria, about 7-8 is great. Choose the mark from 1 to 10 and say why this mark. 
    
//     '''${userPrompt.promptUserGoal}'''
    
//     “${userPrompt.promptUserText}”
    
//     Answer me on the Russian language and say what can be improved in this text`;
//     // const userPrompt = `User: ${userText}\nAssistant:`;
//     const userPrompt = {
//         promptUserGoal : userGoal,
//         promptUserText : userText,
//     };

//     // Construct the request payload
//     const data = {
//         model: 'gpt-3.5-turbo',
//         messages: [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: userPrompt }
//         ]
//     };

//     try {
//         // Send request to ChatGPT API
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         // Display assistant's response in the chatbox
//         chatbox.innerHTML += `<p>Assistant: ${result.choices[0].message.content}</p>`;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });

// Replace 'YOUR_API_KEY' with your actual ChatGPT API key
const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/chat/completions';

const submitButton = document.getElementById('submitBtn');
const userGoalInput = document.getElementById('userGoal');
const userTextInput = document.getElementById('userText');

const chatbox = document.getElementById('chatbox');

submitButton.addEventListener('click', async () => {
    const userGoal = userGoalInput.value;
    const userText = userTextInput.value;

    function wait(){
        chatbox.innerHTML += `<p id="pWait">Подождите, это может занять около минуты.</p>`;
    }

    wait()

    // Construct the user prompts
    const userPromptType = `User: ${userGoal}\nAssistant:`;
    const userPromptText = `User: ${userText}\nAssistant:`;

    // Construct the system prompt
    const systemPrompt = `
        Hello!
        It's necessary to write your answer on russian language. 

        Please divide your text by paragraphs    to make easy reading of your answer
        In the triple quotes you have type of text and in the double quotes you have this text.
        Please come up with criteria to evaluate this type of text and evaluate this text by these criteria, it's necessary to have at least 5 criteria, about 7-8 is great. Choose the mark from 1 to 10 and say why this mark.

        '''${userPromptType}'''

        "${userPromptText}"

        Say what can be improved in this text
    `;



    // Construct the request payload
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPromptType },
            { role: 'user', content: userPromptText }
        ],
        temperature: 0.1
    };

    try {
        // Send request to ChatGPT API
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        const resultAnswer = await response.json();

        const p_wait = document.getElementById('pWait');
        p_wait.style.display = 'none'
        // Display assistant's responses in the chatbox
        chatbox.innerHTML += `<p>${resultAnswer.choices[0].message.content}</p>`;
        chatbox.innerHTML += `<p>${resultAnswer.choices[1].message.content}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
});
