document.addEventListener('DOMContentLoaded', function() {
    var chatBox = document.getElementById('chatMessages');
    var userInput = document.getElementById('userMessage');
    var sendButton = document.getElementById('send-button');
    var messengerIcon = document.querySelector('.messenger-icon'); 
    var chatboxContainer = document.querySelector('.chatbox-container');
    var closeButton = document.querySelector('.close-button');
    var refreshButton = document.querySelector('.refresh-button');
    closeButton.addEventListener('click', closeChatbox);
    function closeChatbox() {
        chatBox.innerHTML = '';
        chatboxContainer.style.display = 'none';
    }
    refreshButton.addEventListener('click', function() {
        chatBox.innerHTML = ''; // Clear chat history
        sendGreetingMessage();
    });
     // Add click event listener to the messengerIcon
     messengerIcon.addEventListener('click', function() {
        
        // Toggle visibility of the chatbox container
        if (chatboxContainer.style.display === 'none' || !chatboxContainer.style.display) {
            chatboxContainer.style.display = 'block';
            // Focus on the user input box
            userInput.focus();
            sendGreetingMessage();
        } else {
            chatboxContainer.style.display = 'none';
        }
        userInput.addEventListener('keydown', function(event) {
            // Check if the Enter key is pressed
            if (event.keyCode === 13) {
                // Prevent the default behavior of the Enter key (e.g., form submission)
                event.preventDefault();
                // Call the sendMessage function to send the message to the chatbot
                sendMessage();
            }
        });
    
    });

    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        var message = userInput.value.trim();
        if (message === '') return;
    
        if (message.toLowerCase().includes('login')) {
            displayUserMessage(message);
            fetchBotResponse('login'); // Directly call fetchBotResponse with 'admission' argument
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }
        if (message.toLowerCase().includes('register')) {
            displayUserMessage(message);
            fetchBotResponse('register'); // Directly call fetchBotResponse with 'admission' argument
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }
        if (message.toLowerCase().includes('faqs')) {
            displayUserMessage(message);
            fetchBotResponse('faqs'); // Directly call fetchBotResponse with 'admission' argument
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }
        if (message.toLowerCase().includes('aboutus')) {
            displayUserMessage(message);
            fetchBotResponse('aboutus'); // Directly call fetchBotResponse with 'admission' argument
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }
         

        displayUserMessage(message);
        var tags = {
            "participation": ['participate', 'ATL', 'Marathon'],
            "submission": ['submit', 'application', 'ATL Marathon'],
            "rewards": ['rewards', 'top', 'teams', 'reward'],
            "deadline": ['deadline', 'submitting', 'entries'],
            "certificate": ['participating', 'certificate', 'receive'],
            "multipleEntries": ['team', 'submit', 'entries', 'problem statement'],
            "teamLimit": ['limit', 'number', 'participate', 'school'],
            "requiredDocuments": ['documents', 'required', 'online', 'application', 'submission'],
            "support": ['support', 'student teams'],
            "teamComposition": ['composition', 'team', 'ideal'],
            "individualEntry": ['individual', 'member', 'entry', 'allowed'],
            "specialCertificates": ['special', 'certificates', 'high number', 'participating', 'teams'],
            "submitIdea": ['submit', 'idea']
            // Add more tags and related words as needed
        };
        var mostSpecificTag = null;
        var mostSpecificWords = [];

        for (var tag in tags) {
            if (tags.hasOwnProperty(tag)) {
                var words = tags[tag];
                // Check if any word from the tag is present in the message
                var matchingWords = words.filter(word => new RegExp("\\b" + word + "\\b", "i").test(message));
                // If there is a match and it's more specific than the current one, update the most specific tag
                if (matchingWords.length > 0 && matchingWords.length > mostSpecificWords.length) {
                    mostSpecificTag = tag;
                    mostSpecificWords = matchingWords;
                }
            }
        }
        if (mostSpecificTag !== null) {
            switch (mostSpecificTag) {
                case "participation":
                    displayBotMessage("All students from classes 6th to 12th in schools across India are eligible to participate.");
                    displayFeedbackMessage();
                    break;
                case "submission":
                    displayBotMessage("You can submit your application in your student profile.");
                    displayFeedbackMessage();
                    break;
                case "rewards":
                    displayBotMessage("The top teams will receive internships through the Student Innovator Program with leading corporates of India, certificates from AIM, NITI Aayog, and many more interesting opportunities at the conclusion of the Marathon.");
                    displayFeedbackMessage();
                    break;
                case "deadline":
                    displayBotMessage("The last date to submit entries is November 30th, 2024, 11:59 PM.");
                    displayFeedbackMessage();
                    break; 
                case "certificate":
                    displayBotMessage("Yes, all participating students will receive a certificate of Participation from AIM, NITI Aayog.");
                    displayFeedbackMessage();
                    break;
                case "multipleEntries":
                    displayBotMessage("Yes, a team may submit entries for more than one problem statement. However, a separate application form must be filled out for each problem statement.");
                    displayFeedbackMessage();
                    break;
                case "teamLimit":
                    displayBotMessage("No, there is no limit. Maximum number of teams from every school is encouraged.");
                    displayFeedbackMessage();
                    break; 
                case "requiredDocuments":
                    displayBotMessage(" The online application form submission will include a research document (description of the innovation/solution) and a video submission (capturing a 360-degree view of the working prototype/solution).");
                    displayFeedbackMessage();
                    break; 
                case "support":
                    displayBotMessage("School in-charge, school teachers, mentors of change, alumni, and external mentors from the local school ecosystem may support the student teams.");
                    break; 
                case "teamComposition":
                    displayBotMessage("Each team should consist of a maximum of 3 students (class 6th to 12th). ATL schools are encouraged to include other school and/or community students in the team composition.");
                    displayFeedbackMessage();
                    break; 
                case "individualEntry":
                    displayBotMessage("No, individual member entry is not allowed. Teams must consist of a minimum of 2 members.");
                    displayFeedbackMessage();
                    break; 
                case "specialCertificates":
                    displayBotMessage("Yes, special certificates from AIM, NITI Aayog will be given to all schools that have more than 25 teams participating in the School Innovation Marathon.");
                    displayFeedbackMessage();
                    break;
                case "submitIdea":
                    displayBotMessage("Before submitting your idea, ensure it's well thought out and clearly articulated. Consider its feasibility, potential impact, and any unique aspects. <a href='https://youtu.be/HufI5CnhkfU' target='_blank'>Click here</a> for detailed info");
                    displayFeedbackMessage();
                    break;                      
                // Add more cases for other tags as needed
                default:
                    break;
            }
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }

    
    
        // Send user input to the server for processing
        fetch('http://localhost:5000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            // Check if response is empty
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data); // Debugging statement
            if (data && data.response) {
                displayBotMessage(data.response);
                // Generate options
                if (data.intent === 'greeting') {
                    setTimeout(function() {
                        displayOptions();
                    }, 500);
                }
            } else {
                console.error('Invalid response from server:', data); // Debugging statement
            }
        });
    
        userInput.value = '';
    }
    
    function sendGreetingMessage() {
        fetch('http://localhost:5000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'greeting' })
        })
        .then(response => {
            // Check if response is empty
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data); // Debugging statement
            if (data && data.response) {
               
                // Display bot's response if it exists
                setTimeout(function() {
                  
                displayBotMessage(data.response);
                 // Generate options
                displayOptions();
            },500);
            } else {
                console.error('Invalid response from server:', data); // Debugging statement
            }
           
        });
        
        
    }
    
   
    function displayOptions() {
        const options = ['Login', 'Register', 'Faqs', 'AboutUs']; // List of options
        var firstOption = true; // Flag to track the first option
    
        options.forEach(function(optionText) {
            var optionContainer = document.createElement('div');
            optionContainer.classList.add('option-container');
    
            var optionElement = document.createElement('div');
            optionElement.textContent = optionText;
            optionElement.classList.add('option');
    
            if (firstOption) {
                optionElement.style.marginLeft = '30px'; // Apply left margin only to the first option
                firstOption = false; // Reset flag after applying margin once
            }
    
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(function() {
                    fetchBotResponse(optionText);
                }, 500);
            });
    
            optionElement.addEventListener('mouseover', function() {
                optionElement.style.backgroundColor = 'crimson';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'crimson';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
    }
    
    
   
    function displaySuboptions() {
        const subOptions = ['Student', 'Teacher']; // List of sub-options
        var firstOption = true; // Flag to check if it's the first sub-option
    
        subOptions.forEach(function(optionText) {
            var optionContainer = document.createElement('div');
            optionContainer.classList.add('option-container');
    
            var optionElement = document.createElement('div');
            optionElement.textContent = optionText;
            optionElement.classList.add('option');
    
            if (firstOption) {
                optionElement.style.marginLeft = '30px'; // Apply left margin only to the first option
                firstOption = false; // Reset flag after applying margin once
            }
    
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(function() {
                    fetchBotResponse(optionText);
                }, 500);
            });
    
    
            optionElement.addEventListener('mouseover', function() {
                optionElement.style.backgroundColor = 'crimson';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'crimson';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    

    function displayUserMessage(message) {
        // Create a container for the user message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('user-message-container');
    
        // Create the user image element
        var userImage = document.createElement('img');
        userImage.src = 'assets/images/userimage2.png'; // Replace 'path_to_your_user_image.jpg' with the actual path to your user image
        userImage.classList.add('user-image');
    
        // Create the user message element
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        messageElement.style.color = 'white';
    
        // Append the user image and message to the container
        
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(userImage);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function displayBotMessage(message, color) {
        // Create a container for the bot message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
    
        // Create the bot image element
        var botImage = document.createElement('img');
        botImage.src = 'assets/images/Mira_black.png'; // Replace 'path_to_your_bot_image.jpg' with the actual path to your bot image
        botImage.classList.add('bot-image');
    
        // Create the bot message element
        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'white';

        var whiteLinks = messageElement.querySelectorAll('a');
        whiteLinks.forEach(function(link) {
            link.style.color = 'white';
        });

    
        // Append the bot image and message to the container
        messageContainer.appendChild(botImage);
        messageContainer.appendChild(messageElement);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
        
    }
    
    function displayFeedbackMessage() {
        // Create feedback options container
        var feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedback-container');
    
        // Create feedback message
        var feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = "Was I able to answer your question?";
        feedbackContainer.appendChild(feedbackMessage);
    
        // Create like button
        var likeButton = document.createElement('button');
        likeButton.textContent = "👍";
        likeButton.classList.add('feedback-button');
        likeButton.addEventListener('click', function() {
            displayUserMessage('👍');
            setTimeout(function() {
                fetchFeedbackResponse('like');
            }, 500);
        });
        feedbackContainer.appendChild(likeButton);
    
        // Create dislike button
        var dislikeButton = document.createElement('button');
        dislikeButton.textContent = "👎";
        dislikeButton.classList.add('feedback-button');
        dislikeButton.addEventListener('click', function() {
            displayUserMessage('👎');
            setTimeout(function() {
                fetchFeedbackResponse('dislike');
            }, 500);
        });
        feedbackContainer.appendChild(dislikeButton);
    
        // Append feedback options container to the chat box
        chatBox.appendChild(feedbackContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
   
    
    function displayOption(optionText) {
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
        optionContainer.style.marginLeft = '30px'
    
        var optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
        optionElement.style.marginBottom = '10px';
        
        
        
        optionElement.addEventListener('click', function() {
            // Display user message
            displayUserMessage(optionText);
            // Fetch bot response
           setTimeout(function() {
            fetchBotResponse(optionText);
           },500);
        });
    
    
        optionElement.addEventListener('mouseover', function() {
            optionElement.style.backgroundColor = 'crimson';
            optionElement.style.color = 'white';
        });
    
        optionElement.addEventListener('mouseout', function() {
            optionElement.style.backgroundColor = 'white';
            optionElement.style.color = 'crimson';
        });
    
        optionContainer.appendChild(optionElement);
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function fetchBotResponse(optionText) {
        // You can customize this function to fetch appropriate responses based on selected option
        var botResponse = '';
        var link = '';
        if (optionText.toLowerCase() === 'login') {
            botResponse = "Are you a?";
            displayBotMessage(botResponse);
            displaySuboptions();
        }
        else if (optionText.toLowerCase() === 'student') {
            botResponse = "Here is the Login Link of Student";
            link = "<a href='https://aim.unisolve.org/login' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'teacher') {
            botResponse = "Here is the Login Link of Student";
            link = "<a href='https://aim.unisolve.org/teacher' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'register') {
            botResponse = "Here is the Register Link of Teacher";
            link = "<a href='https://aim.unisolve.org/registration' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'faqs') {
            botResponse = "Here is the faqs link";
            link = "<a href='https://atlstage.unisolve.org/faq.html' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'aboutus') {
            botResponse = "ATL Marathon 2023-24 Creating Change Makers Of Tomorrow With 21st Century Skills";
            link = "<a href='https://youtu.be/HufI5CnhkfU' target='_blank'>Click Here to know more</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
      
    
    }
    
   
    function fetchFeedbackResponse(feedback) {
        if (feedback === 'like') {
            displayBotMessage('Thanks for your feedback. Is there anything else that I can help you with?', false);
            displayOptionsAfterFeedback();
        } else if (feedback === 'dislike') {
            displayBotMessage('Bot: I\'m sorry to hear that. Try again!.', false);
            setTimeout(function() {
                sendGreetingMessage();
            }, 500);
        }
    }
    function displayOptionsAfterFeedback() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
        optionContainer.style.marginLeft = '30px';
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'crimson';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            setTimeout(function() {
                displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
            }, 500);
        });
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'crimson';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});