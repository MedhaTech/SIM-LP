document.addEventListener('DOMContentLoaded', function() {
    var chatBox = document.getElementById('chatMessages');
    var userInput = document.getElementById('userMessage');
   
    var messengerIcon = document.querySelector('.messenger-icon'); 
    var chatboxContainer = document.querySelector('.chatbox-container');
    var closeButton = document.querySelector('.close-button');
    var refreshButton = document.querySelector('.refresh-button');
    var closeSpeechBubbleButton = document.getElementById('closeSpeechBubble');
    closeButton.addEventListener('click', closeChatbox);
    const botImagepath = "./static/assets/bot.png";
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
            
            
            sendGreetingMessage();
        } else {
            chatboxContainer.style.display = 'none';
        }
       
    
    });
    closeSpeechBubbleButton.addEventListener('click', function() {
        document.querySelector('.speech-bubble').style.display = 'none';
    });
    

    function sendGreetingMessage() {
        // Clear chat history
        chatBox.innerHTML = '';
        const imageElement = document.createElement('img');
        imageElement.src = 'assets/images/logoup1.png'; // Update with actual path to your image
        imageElement.classList.add('centered-image');
        imageElement.style.width = '50%'; // Make image width 50% of the chat box
    
        // Array of different greeting messages
        const greetings = [
            "Hello! 🙂, I'm here to help you with any questions you may have.",
            "Hi there!🙂,  Need assistance? I'm here for you.",
            "Welcome!🙂,  How can I assist you today?",
            "Greetings!🙂, Let me know if there's anything you need help with.",
            "Hello 🙂, How can I assist you today?"
        ];
    
        // Select a random greeting from the array
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
        // Create and display the greeting container with the logo image
        const greetingContainer = document.createElement('div');
        greetingContainer.classList.add('greeting-container');
    
       
    
        greetingContainer.appendChild(imageElement);
        chatBox.appendChild(greetingContainer);
    
        // Display the random greeting message after a delay
        setTimeout(function() {
            displayBotMessageWithoutImage(randomGreeting);
    
            setTimeout(function() {
                displayBotMessage("What Information are you looking for?");
                displayOptions();
            }, 1000);
        }, 1000);
    }
    
   
    
   
  
    function displayMessage(message, color, isBotMessage = true ) {
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = color;
        if (isBotMessage) {
            messageElement.classList.add('bot-message'); // Add bot message class
        } else {
            messageElement.classList.add('user-message'); // Add user message class
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayUserMessage(message) {
        // Create a container for the user message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('user-message-container');
    
        // Create the user message element
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
    
        // Create the user image element
        var userImage = document.createElement('img');
        userImage.src = './static/assets/user2.png'; // Replace with the actual path to your user image
        userImage.classList.add('user-image');
    
        // Append the user message and image to the container
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(userImage);
    
        // Display time at the bottom of the user message box
        var timeElement = document.createElement('span');
        timeElement.classList.add('time');
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        timeElement.textContent = currentTime;
    
        messageContainer.appendChild(timeElement);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
    
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    
    function displayBotMessage(message) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
    
        // Create the bot image element
        var botImage = document.createElement('img');
        botImage.src = botImagepath; // Replace 'path_to_your_bot_image.png' with the actual path to your bot image
        botImage.classList.add('bot-image');
    
        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'black';
        
    
        var whiteLinks = messageElement.querySelectorAll('a');
        whiteLinks.forEach(function(link) {
            link.style.color = 'white';
        });
    
    
        // Append the bot image, message, and time container to the message container
        messageContainer.appendChild(botImage);
        messageContainer.appendChild(messageElement);
        
    
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    

    function displayBotMessageWithoutImage(message, color) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
        messageContainer.style.paddingLeft = '30px';

        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'black';
        
        


        var whiteLinks = messageElement.querySelectorAll('a');
        whiteLinks.forEach(function(link) {
            link.style.color = 'blue';
        });

        messageContainer.appendChild(messageElement);
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

   
    
    function displayFeedbackMessageTeacher() {
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
                fetchFeedbackResponseTeacher('like');
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
                fetchFeedbackResponseTeacher('dislike');
            }, 500);
        });
        feedbackContainer.appendChild(dislikeButton);
    
        // Append feedback options container to the chat box
        chatBox.appendChild(feedbackContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayFeedbackMessageStudent() {
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
                fetchFeedbackResponseStudent('like');
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
                fetchFeedbackResponseStudent('dislike');
            }, 500);
        });
        feedbackContainer.appendChild(dislikeButton);
    
        // Append feedback options container to the chat box
        chatBox.appendChild(feedbackContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
   
    
    function displayOptions() {
        const options = ['Teacher', 'Student']; // List of options
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
                optionElement.style.backgroundColor = 'green';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'green';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
    }
    
    function displaySuboptionsTeacher() {
        const subOptions = ['Portal', 'Program queries','Support Videos']; // List of sub-options
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
                    fetchBotResponse_new(optionText);
                }, 500);
            });
    
    
            optionElement.addEventListener('mouseover', function() {
                optionElement.style.backgroundColor = 'green';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'green';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
   
    function displaySuboptions1() {
        const subOptions = ['Portal', 'Program queries','Support Videos']; // List of sub-options
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
                    fetchBotResponse_new(optionText);
                }, 500);
            });
    
    
            optionElement.addEventListener('mouseover', function() {
                optionElement.style.backgroundColor = 'green';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'green';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }

    function displaySuboptions2() {
        const subOptions = ['About SIM', 'Road map', 'Themes', 'Prizes and Recognitions']; // List of sub-options
        const marginLeftValue = '10px'; // Set a consistent left margin
    
        subOptions.forEach(function(optionText) {
            var optionContainer = document.createElement('div');
            optionContainer.classList.add('option-container');
            optionContainer.style.marginBottom = '10px'; // Add bottom margin for spacing
    
            var optionElement = document.createElement('div');
            optionElement.textContent = optionText;
            optionElement.classList.add('option');
            optionElement.style.marginLeft = marginLeftValue; // Apply consistent left margin
            optionElement.style.padding = '5px 10px'; // Add some padding for better appearance
    
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(function() {
                    fetchBotResponse_questions(optionText);
                }, 500);
            });
    
            optionElement.addEventListener('mouseover', function() {
                optionElement.style.backgroundColor = 'green';
                optionElement.style.color = 'white';
            });
    
            optionElement.addEventListener('mouseout', function() {
                optionElement.style.backgroundColor = 'white';
                optionElement.style.color = 'green';
            });
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    

    function displaySuboptions_questions() {
        const subOptions = [
            'What is the School Innovation Marathon?',
            'Who organizes the School Innovation Marathon?',
            'Is ATL Marathon and SIM the same?',
            'How does the program integrate with existing school programs?',
            'Can students from all grades participate?',
            'Are there special certificates for schools with a high number of participating teams?',
            'Is there a limit on the number of teams that can participate from a school?'
        ]; // List of sub-options
    
        subOptions.forEach(function(optionText) {
            const optionContainer = document.createElement('div');
            const optionElement = document.createElement('div');
    
            optionContainer.classList.add('option-container');
            optionElement.classList.add('option');
            optionElement.textContent = optionText;
            
            // Add consistent left margin and padding for better spacing
            optionElement.style.margin = '3px 30px'; // 10px top/bottom margin, 30px left/right margin for all options
            optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance
    
            // Click event to display user message and fetch bot response
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(() => fetchBotResponse_questions(optionText), 500);
            });
    
            // Hover effect events
            optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
            optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    
    // Helper function to set styles on hover
    function setOptionStyles(optionElement, bgColor, textColor) {
        optionElement.style.backgroundColor = bgColor;
        optionElement.style.color = textColor;
    }
    
    
    
    function displaySuboptions_roadmap() {
        const subOptions = [
            'What is the Road Map for SIM ?',
        'What are time lines for the program ?',
        
        ]; // List of sub-options
    
        subOptions.forEach(function(optionText, index) {
            const optionContainer = document.createElement('div');
            const optionElement = document.createElement('div');
    
            optionContainer.classList.add('option-container');
            optionElement.classList.add('option');
            optionElement.textContent = optionText;
            optionElement.style.margin = '3px 30px'; // Apply left margin only to the first option
    
            // Click event to display user message and fetch bot response
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(() => fetchBotResponse_roadmap(optionText), 500);
            });
    
            // Hover effect events
            optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
            optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    
    function displaySuboptions_themes() {
        const subOptions = [
            'What Are themes for Idea Submission in SIM ?',
        'Can students submit ideas beyond these themes?',
        
        ]; // List of sub-options
    
        subOptions.forEach(function(optionText, index) {
            const optionContainer = document.createElement('div');
            const optionElement = document.createElement('div');
    
            optionContainer.classList.add('option-container');
            optionElement.classList.add('option');
            optionElement.textContent = optionText;
            optionElement.style.margin = '3px 30px';// Apply left margin only to the first option
    
            // Click event to display user message and fetch bot response
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(() => fetchBotResponse_themes(optionText), 500);
            });
    
            // Hover effect events
            optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
            optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    function displaySuboptions_prizes() {
        const subOptions = [
            'What are the key benefits of participating in this program?',
        'Are there special certificates for schools with a high number of participating teams?',
        'What are the Prize and recognitions for top teams ? ',
        
        ]; // List of sub-options
    
        subOptions.forEach(function(optionText, index) {
            const optionContainer = document.createElement('div');
            const optionElement = document.createElement('div');
    
            optionContainer.classList.add('option-container');
            optionElement.classList.add('option');
            optionElement.textContent = optionText;
            optionElement.style.margin = '3px 30px'; // Apply left margin only to the first option
    
            // Click event to display user message and fetch bot response
            optionElement.addEventListener('click', function() {
                displayUserMessage(optionText);
                setTimeout(() => fetchBotResponse_prizes(optionText), 500);
            });
    
            // Hover effect events
            optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
            optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));
    
            optionContainer.appendChild(optionElement);
            chatBox.appendChild(optionContainer);
        });
    
        chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
    }
    

    function fetchBotResponse(optionText) {
        // You can customize this function to fetch appropriate responses based on selected option
        var botResponse = '';
        var link = '';
        if (optionText.toLowerCase() === 'student') {
            botResponse = "what is your query regarding?";
            displayBotMessage(botResponse);
            displaySuboptions1();
        }
        else if (optionText.toLowerCase() === 'teacher') {
            botResponse = "what is your query regarding?";
            displayBotMessage(botResponse);
            displaySuboptionsTeacher();
        }
    }
  
        function fetchBotResponse_new(optionText) {
            var botResponse = '';
            
            if (optionText.toLowerCase() === 'portal') {
                if (lastClickedOption === 'Teacher') {
                    botResponse = "Here are the categories for Teacher:";
                    displayBotMessage(botResponse);
                    displayTeacherPortalOptions();
                } else if (lastClickedOption === 'Student') {
                    botResponse = "Here are the categories for Student:";
                    displayBotMessage(botResponse);
                    displayStudentPortalOptions(); 
                }
                else if (lastClickedOption === 'Student') {
                    botResponse = "Here are the categories for Student:";
                    displayBotMessage(botResponse);
                    displayStudentPortalOptions(); 
                }
            }
            else if (optionText.toLowerCase() === 'program queries') {
                botResponse = "Questions";
                displayBotMessage(botResponse);
                displaySuboptions2();
                
            }
            
            else  if (optionText.toLowerCase() === 'support videos') {
                if (lastClickedOption === 'Teacher') {
                    botResponse = "Select the category:"
                    displayBotMessage(botResponse);
                    displayTeacherSupportVideosOptions();
                } else if (lastClickedOption === 'Student') {
                    botResponse = "Select the category:";
                    displayBotMessage(botResponse);
                    displayStudentSupportVideosOptions();
                }
            }
            
        }

var lastClickedOption = '';

function fetchBotResponse(optionText) {
    var botResponse = '';
    if (optionText.toLowerCase() === 'teacher') {
        lastClickedOption = 'Teacher'; // Set Teacher as the last clicked option
        botResponse = " Dear Teacher 🙂, How can we assist you today?";
        displayBotMessage(botResponse);
        displaySuboptionsTeacher(); // Call suboptions for Teacher
    } else if (optionText.toLowerCase() === 'student') {
        lastClickedOption = 'Student'; // Set Student as the last clicked option
        botResponse = " Hi Kiddo !! 🙂, How can I help you today ???";
        displayBotMessage(botResponse);
        displaySuboptions1(); // Call suboptions for Student
    }
}



// Teacher Portal Options
// Teacher Portal Options
function displayTeacherPortalOptions() {
    const subOptions = [
        'Registration', 'Login', 'Forgot Password', 'Change PWD', 'Pre Survey', 'Dashboard',
        'Course', 'Student teams Creation / Management', 'Resources', 'Support', 'Post Survey', 'Certificate'
    ];
    const marginLeftValue = '10px'; // Set a consistent left margin

    subOptions.forEach(function(optionText) {
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
        optionContainer.style.marginBottom = '10px'; // Add bottom margin for spacing

        var optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
        optionElement.style.marginLeft = marginLeftValue; // Apply consistent left margin
        optionElement.style.padding = '5px 10px'; // Add some padding for better appearance

        optionElement.addEventListener('click', function() {
            displayUserMessage(optionText);
            setTimeout(function() {
                fetchTeacherPortalResponse(optionText);
            }, 500);
        });

        optionElement.addEventListener('mouseover', function() {
            optionElement.style.backgroundColor = 'green';
            optionElement.style.color = 'white';
        });

        optionElement.addEventListener('mouseout', function() {
            optionElement.style.backgroundColor = 'white';
            optionElement.style.color = 'green';
        });

        optionContainer.appendChild(optionElement);
        chatBox.appendChild(optionContainer);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
}

// Student Portal Options
        function displayStudentPortalOptions() {
            const subOptions = [
                'Registration / Team Creation', 'Login', 'Pre Survey', 'Dashboard', 'Course', 'Idea submission', 'Certificate'
            ];
            const marginLeftValue = '10px'; // Set a consistent left margin

            subOptions.forEach(function(optionText) {
                var optionContainer = document.createElement('div');
                optionContainer.classList.add('option-container');
                optionContainer.style.marginBottom = '10px'; // Add bottom margin for spacing

                var optionElement = document.createElement('div');
                optionElement.textContent = optionText;
                optionElement.classList.add('option');
                optionElement.style.marginLeft = marginLeftValue; // Apply consistent left margin
                optionElement.style.padding = '5px 10px'; // Add some padding for better appearance

                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(function() {
                        fetchStudentPortalResponse(optionText);
                    }, 500);
                });

                optionElement.addEventListener('mouseover', function() {
                    optionElement.style.backgroundColor = 'green';
                    optionElement.style.color = 'white';
                });

                optionElement.addEventListener('mouseout', function() {
                    optionElement.style.backgroundColor = 'white';
                    optionElement.style.color = 'green';
                });

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        // Handle Teacher-specific portal options
        function fetchTeacherPortalResponse(optionText) {
            var botResponse = '';
            if (optionText === 'Registration') {
                botResponse = "How can I help you with Registration?";
                displayBotMessage(botResponse);
                displayTeacherRegistrationOptions(); // Display sub-options for Teacher Registration
            }
            else if (optionText === 'Login') {
                botResponse = "How can I help you with Login";
                displayBotMessage(botResponse);
                displayTeacherLoginOptions();
            } 
            else if (optionText === 'Forgot Password') {
                botResponse = "How can I help you with password";
                displayBotMessage(botResponse);
                displayTeacherPasswordOptions();
            }  
            else if (optionText === 'Dashboard') {
                botResponse = "How can I help you with dashbaord";
                displayBotMessage(botResponse);
                displayTeacherDashbaordOptions();
            }  
            else if (optionText === 'Pre Survey') {
                botResponse = "How can I help you with pre survey";
                displayBotMessage(botResponse);
                displayTeacherPreSurveyOptions();
            }  
           
            else if (optionText === 'Course') {
                botResponse = "How can I help you with course";
                displayBotMessage(botResponse);
                displayTeacherCourseOptions();
            } 
            else if (optionText === 'Student teams Creation / Management') {
                botResponse = "How can I help you with student teams creation";
                displayBotMessage(botResponse);
                displayTeacherManagementOptions();
            }  
            else if (optionText === 'Resources') {
                botResponse = "How can I help you with resources";
                displayBotMessage(botResponse);
                displayTeacherResourcesOptions();
            }  
            else if (optionText === 'Support') {
                botResponse = "How can I help you with support";
                displayBotMessage(botResponse);
                displayTeacherSupportOptions();
            } 
            else if (optionText === 'Post Survey') {
                botResponse = "How can I help you with post survey";
                displayBotMessage(botResponse);
                displayTeacherPostSurveyOptions();
            }  
            else if (optionText === 'Certificate') {
                botResponse = "How can I help you with certificate";
                displayBotMessage(botResponse);
                displayTeacherCertificateOptions();
            }  
            else if (optionText === 'Change PWD') {
                botResponse = "How can I help you with password";
                displayBotMessage(botResponse);
                displayTeacherChangepwdOptions();
            }  
        }
        function setOptionStyles(optionElement, backgroundColor, textColor) {
            optionElement.style.backgroundColor = backgroundColor;
            optionElement.style.color = textColor;
        }
        function displayTeacherSupportVideosOptions() {
            const subOptions = [
                'Teacher Registration', 'Teacher Login', 'Dashboard', 'Student Team Creation', 'Teacher course', 'Resources',
                'Post survey', 'My profile And Password change', 'Forgot password & Password change', 'Student Login Credentials', 'Support'
            ];
            const marginLeftValue = '10px'; // Set a consistent left margin
        
            subOptions.forEach(function(optionText) {
                var optionContainer = document.createElement('div');
                optionContainer.classList.add('option-container');
                optionContainer.style.marginBottom = '10px'; // Add bottom margin for spacing
        
                var optionElement = document.createElement('div');
                optionElement.textContent = optionText;
                optionElement.classList.add('option');
                optionElement.style.marginLeft = marginLeftValue; // Apply consistent left margin
                optionElement.style.padding = '5px 10px'; // Add some padding for better appearance
        
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(function() {
                        fetchTeacherSupportVideoResponse(optionText);
                    }, 500);
                });
                
        
                optionElement.addEventListener('mouseover', function() {
                    optionElement.style.backgroundColor = 'green';
                    optionElement.style.color = 'white';
                });
        
                optionElement.addEventListener('mouseout', function() {
                    optionElement.style.backgroundColor = 'white';
                    optionElement.style.color = 'green';
                });
        
                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });
        
            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherSupportVideoResponse(optionText) {
            var botResponse = '';
            if (optionText === 'Teacher Registration') {
                botResponse = "Please watch the <a href='https://youtu.be/sVCgsJgfNJY' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               // Display sub-options for Teacher Registration
            }
            else if (optionText === 'Teacher Login') {
                botResponse = "Please watch the <a href='https://youtu.be/MIZcxs9pJuA' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            } 
            else if (optionText === 'Dashboard') {
                botResponse = "Please watch the <a href='https://youtu.be/OIsCwczsT0o' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            else if (optionText === 'Student Team Creation') {
                botResponse = "Please watch the <a href='https://youtu.be/sT3I44RzZAI' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            else if (optionText === 'Teacher course') {
                botResponse = "Please watch the <a href='https://youtu.be/dWpG-TMyMrQ' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            }  
           else if (optionText === 'Resources') {
                botResponse = "Please watch the <a href='https://youtu.be/fse1a6IaeB0?si=eGCchfakf7GbldRV' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            } 
            else if (optionText === 'Post survey') {
                botResponse = "Please watch the <a href='https://youtu.be/siaE-HPVvk0' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            }  
            else if (optionText === 'My profile And Password change') {
                botResponse = "Please watch the <a href='https://youtu.be/Go8alatAXhE' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            }  
            else if (optionText === 'Forgot password & Password change') {
                botResponse = "Please watch the <a href='https://youtu.be/D434mJUmGpk' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            } 
            else if (optionText === 'Student Login Credentials') {
                botResponse = "Please watch the <a href='https://youtu.be/e0S4PRXLo0U' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            else if (optionText === 'Support') {
                botResponse = "Please watch the <a href='https://youtu.be/LYS2A3ozZRU' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            setTimeout(function () {
                displayFeedbackMessageTeacher();
           }, 500);
            
        }

        function displayStudentSupportVideosOptions() {
            const subOptions = [
                'Student Login', 'Student Dashboard', 'Student Course', 'Idea Submission', 'Post Survey', 'Student Resources'
            ];
            const marginLeftValue = '10px'; // Set a consistent left margin
        
            subOptions.forEach(function(optionText) {
                var optionContainer = document.createElement('div');
                optionContainer.classList.add('option-container');
                optionContainer.style.marginBottom = '10px'; // Add bottom margin for spacing
        
                var optionElement = document.createElement('div');
                optionElement.textContent = optionText;
                optionElement.classList.add('option');
                optionElement.style.marginLeft = marginLeftValue; // Apply consistent left margin
                optionElement.style.padding = '5px 10px'; // Add some padding for better appearance
        
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(function() {
                        fetchStudentSupportVideoResponse(optionText);
                    }, 500);
                });
                
        
                optionElement.addEventListener('mouseover', function() {
                    optionElement.style.backgroundColor = 'green';
                    optionElement.style.color = 'white';
                });
        
                optionElement.addEventListener('mouseout', function() {
                    optionElement.style.backgroundColor = 'white';
                    optionElement.style.color = 'green';
                });
        
                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });
        
            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchStudentSupportVideoResponse(optionText) {
            var botResponse = '';
            if (optionText === 'Student Login') {
                botResponse = "Please watch the <a href='https://youtu.be/WxafskPsMog' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               // Display sub-options for Teacher Registration
            }
            else if (optionText === 'Student Dashboard') {
                botResponse = "Please watch the <a href='https://youtu.be/A5vvpfnVvcE' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            } 
            else if (optionText === 'Student Course') {
                botResponse = "Please watch the <a href='https://youtu.be/g5bDS1x5C4g' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            else if (optionText === 'Idea Submission') {
                botResponse = "Please watch the <a href='https://youtu.be/0sG7Ew1fr6A' target='_blank'>video</a>";
                displayBotMessage(botResponse);
                
            }  
            else if (optionText === 'Post Survey') {
                botResponse = "Please watch the <a href='https://youtu.be/mDkYsD1ZxYA' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            }  
           else if (optionText === 'Student Resources') {
                botResponse = "Please watch the <a href='https://youtu.be/NYxbFvjG8vQ' target='_blank'>video</a>";
                displayBotMessage(botResponse);
               
            } 
            
            setTimeout(function () {
                displayFeedbackMessageStudent();
           }, 500);
            
        }

        // Display sub-options for Teacher Registration
        function displayTeacherRegistrationOptions() {
            const subOptions = [
                'How do I (Teacher) register for the program?',
                'Is there any fees associated with participation?',
                'Can multiple Teachers from the same school register for the program?',
                'What information is required during the Teacher registration process?',
                'Is there any eligibility criteria for Teachers to register for SIM?',
                'What should I do if I face issues during the registration process?'
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherRegistrationResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherRegistrationResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'How do I (Teacher) register for the program?': `1. Register on the Portal: Click "Register" on the homepage and select "Teacher" as your category.
                2. Enter Details: Fill in your name, school, contact info, and use your Email ID for login (password is the part before "@").
                3. Verify Registration: Submit the form, enter the OTP from the confirmation Email, and log in to access resources.
            Watch this video for detailed instructions:  <a href="https://www.youtube.com/watch?v=sVCgsJgfNJY" target="_blank"><br>Watch Video</a>`,
                'Is there any fees associated with participation?': `No, there are no fees associated with participating in the School Innovation Marathon for teachers or students.`,
                'Can multiple Teachers from the same school register for the program?': `Yes, multiple Teachers from the same school can register for the program.`,
                'What information is required during the Teacher registration process?': `School UDISE Code
                School Name
                Teacher's Name
                Contact Information (Email and Phone Number)
                School Address
                Teacher's Email ID`,
                'Is there any eligibility criteria for Teachers to register for SIM?': `There is no specific eligibility criteria for Teachers to register for SIM. Any teacher from the school who is willing to assist and guide students through the online portal and provide support as needed can register for the program.`,
                'What should I do if I face issues during the registration process?': `If you encounter issues during the registration process, please follow these steps:
                1. Check Your Information: Ensure all details are correctly entered, including Email and contact information.
                2. Verify Email: Confirm that you have received and clicked on the verification link sent to your Email.
                3. Reset Password: If you have trouble logging in, use the "Forgot Password" option to reset it.
                4. Contact Support: If the issue persists, reach out to the program's support team through the provided contact details or helpdesk on the portal for further assistance.`,

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherChangepwdOptions() {
            const subOptions = [
                'How can I change / update my password ?',
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherChangepwdResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherChangepwdResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'How can I change / update my password ?': `Here's the simplified process to change or update your password:
                        1. Log In: Sign in to your account using your current credentials.
                        2. Go to Profile Settings: Navigate to the "Change Password" option under your profile or account settings.
                        3. Update Password: Enter your current password, then your new password, and save the changes.

                        For detailed instructions, please watch <a href="https://youtu.be/Go8alatAXhE" target="_blank"><br>Watch Video</a>`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherCertificateOptions() {
            const subOptions = [
                ' How do I view or download participation certificates from the portal?',
                'Are there special certificates for schools with a high number of participating teams?',
                'Can a teacher get certified without idea submission',
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherCertificateResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherCertificateResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                ' How do I view or download participation certificates from the portal?': `To view or download participation certificates from the Teacher portal, follow these steps:
                    1. Log In: Access the Teacher portal using your credentials.
                    2. Navigate to Certificates Section: Go to the "Get Certificate" section on the Dashboard or the designated area for certificates.
                    3. Check Eligibility: Ensure that all required activities, such as student idea submissions and the Post Survey, are completed.
                    4. View/Download Certificate: Click on the "Download Certificate" button or link to view or save the participation certificate. 

                    If you encounter any issues, please refer to the support resources available or contact the program's support team.`,
                                   
                'Are there special certificates for schools with a high number of participating teams?': `Yes, special certificates from AIM, NITI Aayog will be given to all schools that have more than 25 teams participating in the School Innovation Marathon`,
                'Can a teacher get certified without idea submission': `No Teacher cant get certified with out idea getting certified.`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherPostSurveyOptions() {
            const subOptions = [
                'What is the purpose of the Post Survey in the School Innovation Marathon?',
                'When is the Post Survey available, and how can I access it?',
                'What information do I need to provide in the Post Survey?',
                'What should I do if I encounter technical issues or errors while filling out the Post Survey?',
                'Is completing the Post Survey mandatory, and what are the consequences if I do not complete it?',

            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherPostSurveyResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherPostSurveyResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'What is the purpose of the Post Survey in the School Innovation Marathon?': `The Post Survey in the School Innovation Marathon assesses the program's impact, ensures Teacher participation is finalized, collects feedback for improvement, and provides eligibility for a participation certificate.`,
                'When is the Post Survey available, and how can I access it?': `The Post Survey is available after at least one student team submits an idea and it’s approved by the teacher. To access it:
                    1. Go to Post Survey in the menu bar or find it in the Roadmap section on the homepage.
                    2. If no ideas are submitted yet, you can view the page but not complete the survey.

                    You can download the certificate from the dashboard only after completing the Post Survey.`,
                'What information do I need to provide in the Post Survey?': `For the Post Survey in the School Innovation Marathon program, you'll need to provide the following information:
                1. Access the Post Survey:
                - Navigate to the "Post Survey" section in the menu bar on the dashboard or find it in the Roadmap section on the homepage.
                2. Survey Availability:
                - The Post Survey becomes accessible only after at least one student team has submitted an idea, which must be approved by the teacher.
                3. Completing the Survey:
                - Complete all required fields in the Post Survey form. Ensure all questions are answered thoroughly.
                4. Certificate Download:
                - You can download the certificate only after completing the Post Survey. Access this option from the dashboard by clicking on the “Certificate” icon.

                Make sure you complete the survey to unlock the certificate and fully engage with the program's requirements.
                For detailed instructions, please watch <a href="https://youtu.be/siaE-HPVvk0?si=71kjDDKlBCrYVAwa" target="_blank">video</a>`,
                'What should I do if I encounter technical issues or errors while filling out the Post Survey?': `If you encounter technical issues or errors while filling out the Post Survey, follow these steps:
                    1. Refresh the Page: Try refreshing your browser to see if the issue resolves.
                    2. Check Internet Connection: Ensure your internet connection is stable.
                    3. Clear Browser Cache: Clear your browser’s cache and cookies.
                    4. Use a Different Browser: Try accessing the survey using a different browser.
                    5. Contact Support: If the issue persists, reach out to the program's technical support team via the Support section on the portal or the dedicated helpline.`,
                'Is completing the Post Survey mandatory, and what are the consequences if I do not complete it?': `Completing the Post Survey is mandatory. If you do not complete it, you will be unable to download your certificate. Additionally, your participation may be considered incomplete, which could impact your eligibility for program benefits and recognition.`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherSupportOptions() {
            const subOptions = [
                ' Who can provide support to the student teams?',
                ' How can we contact mentors or program coordinators?',
                ' What should we do if we encounter problems or need assistance?',
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherSupportResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherSupportResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                ' Who can provide support to the student teams?': ` School Incharge, school Teachers, mentors of change, Alumni, and External mentors from the local school ecosystem may support the student teams`,
                ' How can we contact mentors or program coordinators?': `You can contact Mentors or Program coordinators through the dedicated WhatsApp communication channel provided for the program.`,
                ' What should we do if we encounter problems or need assistance?': `If you encounter problems or need assistance, check the FAQ section, contact support through the portal’s contact options, or submit a support ticket with details of your issue.
                For detailed instructions, please watch <a href="https://youtu.be/LYS2A3ozZRU?si=1J8BIRguPMjAFRNX" target="_blank">video</a>`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherResourcesOptions() {
            const subOptions = [
                'Where can I find the Teacher Guide for the School Innovation Marathon 2024-25?',
                'What information is covered in the Teacher Guide?',
                'Are there any handbooks available to help Teachers with specific tasks during the School Innovation Marathon?',
                'How do I use the handbooks available in the "Resources" section?',
                'What should I do if I encounter difficulties understanding the Teacher Guide or handbooks?',
                'Are the Teacher Guide and handbooks updated regularly?',
                'Can I download the Teacher Guide for offline use?'
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherResourcesResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherResourcesResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'Where can I find the Teacher Guide for the School Innovation Marathon 2024-25?': `The Teacher Guide is available in the "Resources" section on the School Innovation Marathon website. It provides detailed instructions on how to facilitate student participation, manage the registration process, and guide students through the competition phases.`,
                'What information is covered in the Teacher Guide?': `The Teacher Guide includes information on program objectives, step-by-step instructions for registration, guidelines for mentoring students, tips for idea development, and deadlines for each stage of the Marathon.`,
                'Are there any handbooks available to help Teachers with specific tasks during the School Innovation Marathon?': `Yes, there are several handbooks available in the "Resources" section. These include handbooks on student mentoring, idea evaluation, and project submission, designed to assist Teachers at different stages of the competition.`,
                'How do I use the handbooks available in the "Resources" section?': `Each handbook is designed to provide specific guidance on tasks such as mentoring, project evaluation, and managing student submissions. You can download these handbooks from the "Resources" section and follow the instructions provided to help your students succeed.
                For detailed instructions, please watch <a href="https://youtu.be/fse1a6IaeB0?si=TaRDJRrbvt70NWv3" target="_blank">video</a>`,
                'What should I do if I encounter difficulties understanding the Teacher Guide or handbooks?': `If you have trouble understanding any part of the Teacher Guide or handbooks, you can reach out to the support team via the contact details provided on the website or attend the webinars offered as part of the School Innovation Marathon.`,
                'Are the Teacher Guide and handbooks updated regularly?': `Yes, the Teacher Guide and handbooks are updated periodically to reflect any changes in the program or guidelines. Always make sure you are using the latest version available in the "Resources" section.`,
                'Can I download the Teacher Guide for offline use?': `Yes, you can download the Teacher Guide as a PDF from the "Resources" section on the website. This allows you to refer to it whenever needed, even without internet access.`,

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherManagementOptions() {
            const subOptions = [
                'How do I create a new student team for the SIM program?',
                'What is the process for adding students to an existing team?',
                'Can I update the details of a student team after it’s been created?',
                ' How do I remove a student from a team in the SIM program?',
                'What steps should I follow to edit the composition of a student team?',
                'How can I view the list of all student teams registered under my school?',
                'Is it possible to transfer a student from one team to another? If so, how?',
                'How do I assign team roles or responsibilities within the SIM program?',
                'What should I do if I need to change the team name or project title?',
                'How do I ensure that all team members are correctly registered and listed in the SIM portal?'
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherManagementResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherManagementResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'How do I create a new student team for the SIM program?': `To create and manage student teams:
                1. Log In: Access the platform.
                2. Navigate to Teams: Go to the 'Teams' section and click 'Create New Team.'
                3. Manage Teams: Add, edit, or delete teams as needed.

                For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sT3I44RzZAI" target="_blank"><br>Video</a>`,
                'What is the process for adding students to an existing team?': `To add students to an existing team in the School Innovation Marathon (SIM) program:
                    1. Log in to the SIM portal.
                    2. Navigate to "Manage Teams" or "Team Details."
                    3. Select the team you want to add students to.
                    4. Click on "Add Students" or a similar option.
                    5. Enter the new student details and assign roles.
                    6. Submit the changes for approval.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sT3I44RzZAI" target="_blank"><br>Video</a>`,
                'Can I update the details of a student team after it’s been created?': `Yes, you can update the details of a student team after it has been created. Here’s how:
                    1. Log in to the SIM portal.
                    2. Navigate to "Manage Teams" or "Team Details."
                    3. Select the team you want to update.
                    4. Click on "Edit" or a similar option.
                    5. Update the necessary details such as team name, roles, or student information.
                    6. Submit the changes for approval.
                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sT3I44RzZAI" target="_blank"><br>Video</a>`,
                ' How do I remove a student from a team in the SIM program?': `To remove a student from a team in the SIM program:
                    1. Ensure Team Size: The team must have 3 members. If the team has only 2 members, you cannot delete a student; you must delete the entire team instead.
                    2. Navigate to Teams Page: Go to the "Teams" section on the Dashboard.
                    3. View Team Details: Click the view icon next to the team you want to modify.
                    4. Remove Student: Click the "Delete Student" button. This option is only available if the team size is at its maximum (3 members).
                    5. Confirm Deletion: Follow prompts to confirm the removal of the student.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sT3I44RzZAI" target="_blank"><br>Video</a>`,
                'What steps should I follow to edit the composition of a student team?': `1. Go to "Teams" section on the Dashboard.
                    2. Select the team you want to edit.
                    3. Click "Edit Team Composition."
                    4. Update member details and save changes.`,
                'How can I view the list of all student teams registered under my school?': `To view the list of all student teams registered under your school:
                    1. Log in to the program portal.
                    2. Navigate to the "Teams" section on the dashboard.
                    3. Select your school from the dropdown menu or filter options.
                    4. View the list of registered teams for your school.`,
                    'Is it possible to transfer a student from one team to another? If so, how?': `Yes, it is possible to transfer a student from one team to another. To do so, go to the "Edit Team" section in the portal. Select the student you want to transfer and choose the new team from the dropdown menu. Save the changes to update the team composition.`,
                    'How do I assign team roles or responsibilities within the SIM program?': `To assign team roles or responsibilities:
                        1. Log In: Access the SIM portal with your teacher credentials.
                        2. Navigate to Teams: Go to the “Teams” section.
                        3. Select a Team: Choose the team to manage roles.
                        4. Edit Roles: Use the “Assign Roles” or “Edit” option to designate roles or responsibilities.
                        5. Save Changes: Confirm and save the updated roles.

                        Ensure all roles are clearly assigned and updated in the portal.`,
                    'What should I do if I need to change the team name or project title?': `To change the team name or project title:
                1. Log In: Access the SIM portal with your teacher credentials.
                2. Go to Teams: Navigate to the “Teams” section.
                3. Select the Team: Choose the team whose details you want to change.
                4. Edit Details: Click on the “Edit” option for the team name or project title.
                5. Save Changes: Confirm and save the updated information.

                Ensure that changes are properly saved and reflected in the portal.`,
                    'How do I ensure that all team members are correctly registered and listed in the SIM portal?': `Log In: Access the SIM portal with your teacher credentials.
                        Navigate to Teams: Go to the “Teams” section.
                        Select and Review: Choose the team to check member details.
                        Update Information: Edit any incorrect or missing details.
                        Save Changes: Confirm all updates are saved.
                        Verify Accuracy: Double-check the list.
                        Contact Support: Reach out for help if needed.`,

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherCourseOptions() {
            const subOptions = [
                'What is teacher course about ?',
                'Do I need to complete the Teacher Course before guiding students?',
                'How can I access the Teacher Course from the Dashboard?',
               
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherCourseResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherCourseResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'What is teacher course about ?': `The Teacher Course is a comprehensive training module designed to equip Teachers with the necessary knowledge and resources to effectively support and guide students participating in the program. It includes a variety of videos and handbooks that cover the program's objectives, the roles and responsibilities of Teachers, and step-by-step instructions on how to assist students in submitting their innovative ideas. The course ensures that Teachers are well-prepared to mentor students throughout the different phases of the program.`,
                'Do I need to complete the Teacher Course before guiding students?': `Yes, it's highly recommended to complete the Teacher Course before guiding students, as it provides essential information and resources that will help you effectively support your students throughout the program.`,
                'How can I access the Teacher Course from the Dashboard?': `To access the Teacher Course, you can either click on the “Course” tab in the Dashboard, which will take you directly to the course page, or scroll down the Dashboard and click on “Teacher Course” in the Roadmap section. Clicking on the eye icon will also redirect you to the course page.
                For detailed instructions, please watch <a href="https://youtu.be/OIsCwczsT0o?si=Yo9M-kjNK9_7OjIi" target="_blank">video</a>`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherDashbaordOptions() {
            const subOptions = [
                'When will the Post Survey section become available?',
                'How do I join the WhatsApp Communication Channel for my state?',
                'How can I get details of the Team\'s login information?',
                'Where can I track my progress on the Dashboard?',
                'Where can I find the teacher courses on the Dashboard?',
                'How can I create and manage student teams?',
                'How do I access the full panel of the platform after logging in?',
                'What should I do if I see a survey prompt upon logging in for the first time?',
                'Where can I find the teacher courses on the Dashboard?'
               
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherDashbaordResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        function fetchTeacherDashbaordResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'When will the Post Survey section become available?': `The Post Survey section becomes available after at least one student team submits an idea, which the teacher must approve. You can access it either from the Post Survey section in the menu bar on the dashboard or in the Roadmap section on the homepage. Remember, you won’t be able to access the Post Survey until a student idea is submitted. Completing the Post Survey is necessary to download the participation certificate.`,
                'How do I join the WhatsApp Communication Channel for my state?': `To join the WhatsApp Communication Channel for your respective state, click on the WhatsApp Icon provided on the program portal. This will direct you to the specific group for your state.`,
                'How can I get details of the Team\'s login information?': `1. Log in to the Teacher Portal: 
                    - Access the portal using your teacher credentials.
                    2. Navigate to "Teams": 
                    - Select the relevant team from the "Teams" section.
                    3. Find and Share Credentials: 
                    - The team ID is system-generated, and the Password is the team name. Share these with the students.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=e0S4PRXLo0U" target="_blank"><br>Video</a>`,
                'Where can I find the teacher courses on the Dashboard?': `To find teacher courses on the School Innovation Marathon Dashboard:
                    1. Log In: Access the Dashboard.
                    2. Find Courses: Click on "Courses" or scroll to the "Roadmap" section and select "Teacher Course."
                    3. Start Learning: Click the link to begin the course.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=dWpG-TMyMrQ" target="_blank"><br>Video</a>`,
                'How can I create and manage student teams?': `To create and manage student teams:
                    1. Log In: Access the platform.
                    2. Navigate to Teams: Go to the 'Teams' section and click 'Create New Team.'
                    3. Manage Teams: Add, edit, or delete teams as needed.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sT3I44RzZAI" target="_blank"><br>Video</a>`,
                'How do I access the full panel of the platform after logging in?': `After logging in, you need to complete the mandatory survey on the platform. Submit the survey to unlock full access. Check for any notification or pop-up that guides you to the survey if you don't see it immediately. Once submitted, refresh the page if needed. You should then be able to view the full panel.`,
                'What should I do if I see a survey prompt upon logging in for the first time?': `If you see a survey prompt upon logging in for the first time, you have the following options:
                    1. Complete the Survey Now: Click “Start Now” to proceed with the survey immediately. You'll be directed to a Pre-Survey form, which you must complete by answering all questions. After submitting the form, you’ll gain access to all sections and features of the platform.
                    2. Do the Survey Later: Click “Do Later” if you prefer to complete the survey at a later time. Please note that selecting this option will log you out of your account.
                    In either case, completing the survey is essential for accessing the full dashboard and participating in the program.`,
                'Where can I find the teacher courses on the Dashboard?': `To find the teacher courses on the Dashboard, you can follow these steps:
                Click on “Course” in the Dashboard: This will redirect you to the actual course page where you can access the teacher courses.
                Scroll down the main Dashboard page: Look for the “Teacher Course” in the Roadmap section. Clicking on the eye icon here will also take you to the course page.
                These options will help you locate and access the teacher courses efficiently.`,
                 'Where can I track my progress on the Dashboard?': `1. Log In: Access the School Innovation Marathon platform and go to your Dashboard.
                    2. Track Progress: Monitor your course progress and manage teams in the relevant sections.
                    3. Download Reports: Use the Key Icon to download progress reports and view student submissions.

                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=OIsCwczsT0o" target="_blank"><br>Video</a>`,
               
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }
         // Display sub-options for Teacher Registration
         function displayTeacherPasswordOptions() {
            const subOptions = [
                'How can I change / update my password ?',
               
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherPasswordResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

       
        function fetchTeacherPasswordResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'How can I change / update my password ?': `Here's the simplified process to change or update your password:
                    1. Log In: Sign in to your account using your current credentials.
                    2. Go to Profile Settings: Navigate to the "Change Password" option under your profile or account settings.
                    3. Update Password: Enter your current password, then your new password, and save the changes.
                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=Go8alatAXhE" target="_blank">Video</a>`,
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        function displayTeacherPreSurveyOptions() {
            const subOptions = [
                'What should I do if I see a prompt to complete the Pre-Survey upon my first login?',
                'What information is required to complete the Pre-Survey?',
                
                'Can I save my progress on the Pre-Survey and return to complete it later?',
                'What happens after I submit the Pre-Survey?',
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherPreSurveyResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        
        function fetchTeacherPreSurveyResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
            const answers = {
                'What should I do if I see a prompt to complete the Pre-Survey upon my first login?': `You should complete the Pre-Survey by clicking “Start Now” to proceed. If you choose “Do Later,” it will log you out, and you’ll need to complete it before accessing other sections of the platform.`,
                'What information is required to complete the Pre-Survey?': `You must answer all questions on the Pre-Survey form. It’s mandatory to provide this information to access the full panel of the platform.`,
                
                'Can I save my progress on the Pre-Survey and return to complete it later?': `The Pre-Survey must be completed in a single session. If you choose "Do Later," you will be logged out and will need to begin the survey again upon your next login.`,
                'What happens after I submit the Pre-Survey?': `The students can begin with their course once they submit the presurvey`,
                

            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }


        // Display sub-options for Teacher Registration
        function displayTeacherLoginOptions() {
            const subOptions = [
                'How do I login to the School Innovation Marathon portal as a teacher?',
                'What steps should I take if I forget my password?',
                'I am a new teacher; how do I create an account on the portal?',
                'What steps should be taken if I am unable to log in with my credentials',
                'Can multiple Teachers from the same school log in with the same credentials?',
                'How can I update my login details, such as Email or phone number?',
                'What are the system requirements for logging in?',
                'How do I retrieve my username if I’ve forgotten it?'
            ]

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchTeacherLoginResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

        // Function to set hover styles (similar to displaySuboptions_questions)
        function setOptionStyles(optionElement, backgroundColor, textColor) {
            optionElement.style.backgroundColor = backgroundColor;
            optionElement.style.color = textColor;
        }


        // Handle Teacher Registration sub-options
        function fetchTeacherLoginResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific teacher registration question
                        const answers = {
                            'How do I login to the School Innovation Marathon portal as a teacher?': `1. Visit the SIM Portal: Go to the official SIM portal website.
                    2. Enter Credentials: Use your registered Email ID as your username and the characters before '@' as your password.
                    3. Log In: Click on the "Log In" button to access your account.
                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=MIZcxs9pJuA" target="_blank"><br>Video</a>`,
                            'What steps should I take if I forget my password?': `1. Visit the SIM Portal: Go to the login page on the SIM portal and select "Forgot Password."
                    2. Enter Your Email ID: Provide your registered Email address and check your inbox for an OTP.
                    3. Use the OTP: Enter the OTP to log in temporarily, then update your password in your account settings.
                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=D434mJUmGpk" target="_blank"><br>Video</a>`,
                            'I am a new teacher; how do I create an account on the portal?': `1. Visit the SIM Portal: Go to the official School Innovation Marathon (SIM) website and click "Register" or "Sign Up."
                    2. Complete Registration: Choose "Teacher" registration, fill in your details, and create a Username and password.
                    3. Verify and Log In: Check your Email for a verification link, confirm your registration, and log in with your new credentials.
                    For detailed instructions, please watch <a href="https://www.youtube.com/watch?v=sVCgsJgfNJY" target="_blank"><br>Video</a>`,
                            'What steps should be taken if I am unable to log in with my credentials': `Here’s the revised version with an additional point:
                                1. Check Credentials: Ensure you're using the correct username (Email ID) and password (before "@" in your email).
                                2. Reset Password: Click "Forgot Password" to receive an OTP and reset your password.
                                3. Try Again: Clear cache, switch browsers/devices, or contact support via WhatsApp if issues persist.
                                4.  For more information, watch the <a href="https://youtu.be/MIZcxs9pJuA" target="_blank"> video</a>`,
                            'Can multiple Teachers from the same school log in with the same credentials?': `No, multiple Teachers from the same school should not use the same credentials. Each teacher must have their own unique account for proper access and functionality within the program. If additional Teachers from the same school need access, they should register individually with their own credentials on the portal.`,
                            'How can I update my login details, such as Email or phone number?': `Please note that Email and phone number cannot be edited directly through the portal. To update these details, follow these steps:
                                1. Contact Support: Reach out to the program's support team through the designated communication channel (e.g., WhatsApp).
                                2. Provide Details: Share your current login details and the new information you wish to update.
                                3. Verification: Follow any verification steps provided by the support team to confirm your request.
                                4. Confirmation: Wait for confirmation from the support team that your details have been updated.`,
                    'What are the system requirements for logging in?': `To log in to the School Innovation Marathon portal, ensure your system meets the following requirements:
                            1. Internet Connection: A stable internet connection is necessary for accessing the portal.
                            2. Web Browser: Use a modern web browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari. Ensure your browser is updated to the latest version.
                            3. Operating System: The portal is compatible with Windows, macOS, and popular Linux distributions. Ensure your operating system is up-to-date.
                            `,
                    'How do I retrieve my username if I’ve forgotten it?': `If you’ve forgotten your username, note that it is the part of your Email address before the "@" symbol. For example, if your Email is john.doe@example.com, your username is john.doe.`,
                    'What do I do if I am unable to log in with my credentials?': `Here’s the revised version with an additional point:
                            1. Check Credentials: Ensure you're using the correct username (Email ID) and password (before "@" in your email).
                            2. Reset Password: Click "Forgot Password" to receive an OTP and reset your password.
                            3. Try Again: Clear cache, switch browsers/devices, or contact support via WhatsApp if issues persist.
                            4.  For more information, watch the video video_2`,

                    };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageTeacher();
            }, 500);
        }

        // Handle Student-specific portal options
        function fetchStudentPortalResponse(optionText) {
            var botResponse = '';
            if (optionText === 'Registration / Team Creation') {
                botResponse = "How can I help you with Registration or Team Creation?";
                displayBotMessage(botResponse);
                displayStudentRegistrationOptions(); // Display sub-options for Student Registration
            }
            else if (optionText === 'Login') {
                botResponse = "How can I help you with Login";
                displayBotMessage(botResponse);
                displayStudentLoginOptions();
            }
            else if (optionText === 'Pre Survey') {
                botResponse = "How can I help you with pre survey";
                displayBotMessage(botResponse);
                displayTeacherPreSurveyOptions();
            }  
            else if (optionText === 'Course') {
                botResponse = "How can I help you with course";
                displayBotMessage(botResponse);
                displayStudentCourseOptions();
            }
            else if (optionText === 'Idea submission') {
                botResponse = "How can I help you with idea submission";
                displayBotMessage(botResponse);
                displayStudentIdeaSubmissionOptions();
            } 
            else if (optionText === 'Certificate') {
                botResponse = "How can I help you with certificate";
                displayBotMessage(botResponse);
                displayStudentCertificateOptions();
            } 
            else if (optionText === 'Dashboard') {
                botResponse = "How can I help you with certificate";
                displayBotMessage(botResponse);
                displayStudentDashboardOptions();
            } 
        }
        function setOptionStyles(optionElement, backgroundColor, textColor) {
            optionElement.style.backgroundColor = backgroundColor;
            optionElement.style.color = textColor;
        }
        function displayStudentDashboardOptions() {
            const subOptions = [
                'How do I log in to the Student Dashboard?',
                'What information can I view on my Student Dashboard?',
                'How can I track my progress in the School Innovation Marathon?',
                'How can I switch the language of the portal on the Dashboard?'
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchStudentDashboardResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

       
        function fetchStudentDashboardResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'How do I log in to the Student Dashboard?': `1. Visit [schoolinnovationmarathon.org/login]
                2. Click on Student Team Login, enter your team ID, and password (team name in lowercase).
                3. Click Sign In to access your dashboard.`,
                'What information can I view on my Student Dashboard?': `1. View team member details, including their class and progress.
                        2. Track your course progress, quizzes passed, and action items.
                        3. Check the status of each stage like pre-survey, idea submission, and post-survey.
                        4.Please watch this video for detail steps <a href="https://youtu.be/A5vvpfnVvcE" target="_blank">video</a>`,
                'How can I track my progress in the School Innovation Marathon?': `1. Use the SIM Roadmap to see stages like pre-survey, course, and idea submission.
                    2. Status updates: "Not Started," "In Progress," and "Completed."
                    3. Check action items and completed tasks in the dashboard.`,
                'How can I switch the language of the portal on the Dashboard?': `1. Go to the top-right corner of the dashboard.
                    2. Click the dropdown menu to select a language.
                    3. Choose from English, Telugu, Hindi, or Tamil to translate the interface.
                    4.Please watch this video for detail steps <a href="https://youtu.be/A5vvpfnVvcE" target="_blank">video</a>`,
                
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }
        // Display sub-options for Student Registration
        function displayStudentCourseOptions() {
            const subOptions = [
                'What is student course about ?',
                'Is student course mandatory for all the students in a team ?',
                'How to access student Course on portal ?',
                'How many quizzes do I need to pass to complete the course?',
                'What is the passing score for each quiz in the course?',
                'What happens if I fail a quiz? Can I retake it?',
                'How can I download the workbook for the student course?'
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchStudentCourseResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

       
        function fetchStudentCourseResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'What is student course about ?': `The student course is designed to equip students with essential skills in problem-solving, innovation, and project development. It provides a structured curriculum that guides students through the process of identifying challenges, brainstorming solutions, and developing prototypes. The course includes interactive modules, case studies, and practical assignments to enhance their understanding and application of these concepts.`,
                'Is student course mandatory for all the students in a team ?': `Yes, the student course is mandatory for all students in a team. Each team member is required to complete the course to ensure that everyone has the necessary knowledge and skills to contribute effectively to the project. `,
                'How to access student Course on portal ?': `1. Log in to the Portal: Use your team ID and password to log in to your Student Dashboard.
                    2. Navigate to Course: On the SIM Roadmap, click on the course section or use the left-hand menu to select "Student Course."
                    3. Start the Course: Follow the prompts to watch videos, complete quizzes, and download the workbook.
                    4.Please watch this video for detail steps <a href="https://youtu.be/g5bDS1x5C4g" target="_blank">video</a>`,
                'How many quizzes do I need to pass to complete the course?': `1. The number of quizzes depends on the course modules.
                    2. Each module includes one quiz.
                    3. You must pass all quizzes to complete the course.`,
                'What is the passing score for each quiz in the course?': `1. The passing score for each quiz is 60%.
                    2. You must answer at least 6 out of 10 questions correctly.
                    3. The quiz result will be displayed immediately after completion.`,
                    'What happens if I fail a quiz? Can I retake it?': `1. If you fail, the quiz will show the incorrect answers.
                        2. You can retake the quiz by clicking the "Retake" option.
                        3. You can attempt the quiz multiple times until you pass.`,
                    'How can I download the workbook for the student course?': `1. Go to the Student Team Workbook section in your dashboard.
                    2. Click on Download Workbook to get the workbook.
                    3. You can also download themes by clicking Download Themes.`,
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }

        function displayStudentCertificateOptions() {
            const subOptions = [
                'How many certificates does students have?',
                'How to download student certificates on portal ?',
                
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchStudentCertificateResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

       
        function fetchStudentCertificateResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'How many certificates does students have?': `Students participating in the School Innovation Marathon typically receive two types of certificates:
            1. Course Completion Certificate: Awarded to students after successfully completing the required course and quizzes on the portal.
            2. Idea Submission Certificate: Provided after students submit their idea and the idea is approved by the teacher.`,
                'How to download student certificates on portal ?': `Here’s a clearer version:
                    1. Log in to the Portal:  
                    Use your team ID and password to access your team dashboard.
                    2. Navigate to the Certificates Section:  
                    In the dashboard, go to the Certificates section. If you’ve completed the course 100%, you can download your course completion certificate. After successfully submitting your idea, the idea submission certificate will also become available for download.
                    3. Download Your Certificates:  
                    Click on the available download link to get your certificate(s). `,
                
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }
        function displayStudentIdeaSubmissionOptions() {
            const subOptions = [
                'How do we submit our idea on portal ?',
                'What is the deadline for submitting entries?',
                'What documents are required for online application submission?',
                'Is there any deadline extension?',
                ' How can we make changes to our project after submission?',
                ' What happens if we miss a deadline?',
                ' Can we submit multiple entries or projects?',
                ' How are projects evaluated and selected for awards?',
                ' Can we submit the idea without watching the student video?',
                'What should I do if my idea is rejected by the teacher?'
            ];

            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');

                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;

                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchStudentIdeaSubmissionResponse(optionText), 500);
                });

                // Hover effect events
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });

            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }

       
        function fetchStudentIdeaSubmissionResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'How do we submit our idea on portal ?': `To submit your idea on the School Innovation Marathon portal, follow these steps:
                1. Complete the Course: Ensure all team members have completed the required course. Idea submission will only be enabled once every member finishes the course.
                2. Access Idea Submission: 
                - Go to the "Idea Submission" section from the left-hand menu or via the SIM Roadmap.
                - Review the guidelines provided on the instructions page.
                3. Submit Your Idea:
                - Select a theme for your idea and provide answers to key questions (Problem Statement, Idea Title, Theme, Focus Area).
                - Upload images of your prototype and a video or YouTube link.
                - Save your idea as a draft or submit it for teacher review.
                4. Teacher Review: After submission, your teacher will review the idea. If approved, the status changes to "Approved," otherwise, you can edit and resubmit if rejected.`,
                'What is the deadline for submitting entries?': `The last date to submit entries is November 30th, 2024 `,
                'What documents are required for online application submission?': `The online application form submission will include a research document (description of the innovation/solution) and a video submission (capturing a 360degree view of the working prototype/solution)`,
                'Is there any deadline extension?': `As of now, the deadline for the UNICEF UPSHIFT Course completion and idea/prototyping submission is November 30th, 2024. If there's been an extension or change to the deadline, it would typically be communicated through official channels like Emails, the program portal, or announcements. 
                    For the most current information, it's best to check the latest updates on the School Innovation Marathon portal or contact the program's support team directly.`,
                ' How can we make changes to our project after submission?': `1. You can only edit the project if the teacher rejects it.
                    2. After rejection, the idea moves to a "drafted" state for edits.
                    3. Once resubmitted, it will be reviewed again by the teacher.`,
                    ' What happens if we miss a deadline?': `If a deadline is missed, the project or submission may not be considered for evaluation It is important to adhere to the deadlines outlined in the program For any extenuating circumstances or to seek an extension, contact the support team through the Support section on the portal as soon as possible`,
                    ' Can we submit multiple entries or projects?': `1. No, only one project submission is allowed per team.
                    2. Focus on refining and improving your current submission.
                    3. Ensure all team members collaborate to create a strong project.`,
                    ' How are projects evaluated and selected for awards?': `Projects are evaluated and selected for awards based on the following criteria:
                        1. Novelty - The originality and innovation of the idea.
                        2. Usefulness - The practical value and relevance of the solution.
                        3. Scalability - The potential for the idea to be expanded and implemented on a larger scale.
                        4. Feasibility - The practicality and feasibility of executing the project within the given resources and constraints.`,
                    ' Can we submit the idea without watching the student video?': `No, you cannot submit your idea without watching the video. The video contains essential information and guidelines that are crucial for preparing and submitting your idea effectively.`,
                    'What should I do if my idea is rejected by the teacher?': `1. Review the teacher’s feedback and reason for rejection.
                        2. Edit the idea in the "drafted" state to address the feedback.
                        3. Resubmit the revised idea for the teacher's approval. `,
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }
        
        function displayStudentRegistrationOptions() {
            const subOptions = [
                'How do I Register as a student in SIM',
                'Is there a limit on the number of teams that can participate from a school?',
                'What is the ideal Composition of a team?',
                'Is individual member entry allowed?',
                'Can students from all grades participate?'
            ];
        
            subOptions.forEach(function(optionText) {
                const optionContainer = document.createElement('div');
                const optionElement = document.createElement('div');
        
                optionContainer.classList.add('option-container');
                optionElement.classList.add('option');
                optionElement.textContent = optionText;
        
                // Add consistent left margin and padding for better spacing
                optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance
        
                // Click event to display user message and fetch bot response
                optionElement.addEventListener('click', function() {
                    displayUserMessage(optionText);
                    setTimeout(() => fetchStudentRegistrationResponse(optionText), 500);
                });
        
                // Hover effect events with updated color
                optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));
        
                optionContainer.appendChild(optionElement);
                chatBox.appendChild(optionContainer);
            });
        
            chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
        }
        

       
        function fetchStudentRegistrationResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'How do I Register as a student in SIM': `1. Register as a Teacher: Visit the SIM portal, complete the registration form, and verify your account via the confirmation Email.
                        2. Enroll Students: Log in to the teacher portal, go to the student enrollment section, and register students by entering their details.
                        3. Provide Student Details: Enter each student’s name, class, gender, and age. Ensure each team has 2-3 members.
                         Watch this video for detailed instructions:<a href="https://youtu.be/sT3I44RzZAI" target="_blank">Video</a>`,
                'Is there a limit on the number of teams that can participate from a school?': `No, there is no specific limit on the number of teams that can participate from a single school. All students are encouraged to register and form teams.`,
                ' What is the ideal Composition of a team?': `A team should include 2 to 3 students, ensuring effective collaboration and easy management.`,
                ' Is individual member entry allowed?': `No, individual member entry is not allowed Teams must consist of a minimum of 2 members`,
                'Can students from all grades participate?': `The School Innovation Marathon (SIM) is specifically designed for students from Grades 6 to 12`,
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }

        

            
                // Display sub-options for Student Registration
                function displayStudentLoginOptions() {
                    const subOptions = [
                        'Where to Find Student User Id and Password',
                        'What should I do if I haven’t received the login credentials from my guide teacher?',
                        'What are the steps to log in after receiving the credentials from my guide teacher?',
                        'Can i change my team username / password ',
                        'How to Login into student portal?'
                    ];

                    subOptions.forEach(function(optionText) {
                        const optionContainer = document.createElement('div');
                        const optionElement = document.createElement('div');

                        optionContainer.classList.add('option-container');
                        optionElement.classList.add('option');
                        optionElement.textContent = optionText;

                        // Add consistent left margin and padding for better spacing
                        optionElement.style.margin = '3px 30px'; // 3px top/bottom margin, 30px left/right margin for all options
                        optionElement.style.padding = '5px 10px'; // Padding inside the option element for better appearance

                        // Click event to display user message and fetch bot response
                        optionElement.addEventListener('click', function() {
                            displayUserMessage(optionText);
                            setTimeout(() => fetchStudentLoginResponse(optionText), 500);
                        });

                        // Hover effect events
                        optionElement.addEventListener('mouseover', () => setOptionStyles(optionElement, 'green', 'white'));
                        optionElement.addEventListener('mouseout', () => setOptionStyles(optionElement, 'white', 'green'));

                        optionContainer.appendChild(optionElement);
                        chatBox.appendChild(optionContainer);
                    });

                    chatBox.scrollTop = chatBox.scrollHeight; // Ensure the chat box scrolls to display the latest added elements
                }




        // Handle Student Registration sub-options
        function fetchStudentLoginResponse(optionText) {
            let botResponse = '';

            // Define answers for each specific student registration question
            const answers = {
                'Where to Find Student User Id and Password': `1. Log in to the Teacher Portal: 
                    - Access the portal using your teacher credentials.
                    2. Navigate to "Teams": 
                    - Select the relevant team from the "Teams" section.
                    3. Find and Share Credentials: 
                    - The Student User ID is system-generated, and the Password is the team name. Share these with the students.

                    For detailed instructions, please watch <a href="https://youtu.be/e0S4PRXLo0U" target="_blank"><br>Video</a>`,
                'What should I do if I haven’t received the login credentials from my guide teacher?': `If you have not received your login credentials from your guide teacher, please follow these steps: 
                Contact Your Guide Teacher: Reach out to your guide teacher directly. You can find their contact details in the teacher dashboard.`,
                'What are the steps to log in after receiving the credentials from my guide teacher?': `1. Receive Credentials: Obtain your login credentials from your guide teacher. The username will be the system-generated team ID, and the password will be the team name.
                2. Log In:
                    - Go to the SIM portal login page.
                    - Enter your team ID as the username and the team name as the password.
                    - Click “Log In” to access your account.
                3. Complete Pre-Survey:
                    - Upon your first login, you will be prompted to complete a Pre-Survey.
                    - Fill out all required fields and click “Submit” to proceed.
                4. Start Student Course:
                    - Navigate to the “Courses” section and select the student course.
                    - Click “Start Course” to begin.
                5. Attempt Quiz:
                    - After starting the course, attempt any quizzes associated with it.
                6. Complete Course and Submit Ideas:
                    - Finish the student course by completing all modules.
                    - Initiate the idea submission process as instructed in the course..`,
                'Can i change my team username / password ': `No , you cannot edit Team Username / password`,
                'How to Login into student portal?': `1. Visit the Login Page: Go to [schoolinnovationmarathon.org/login](https://schoolinnovationmarathon.org/login).
                        2. Select Student Team Login: Click on "Student Team Login" and enter your team ID and password (your team name in lowercase).
                        3. Access Dashboard: Click "Sign In" to access your Team Dashboard and view your progress.
                        4.Please watch this video for detail steps <a href="https://youtu.be/WxafskPsMog" target="_blank"><br>Video</a>`
            };

            // Check if the clicked option is in the predefined questions list
            if (answers[optionText]) {
                botResponse = answers[optionText]; // Get the answer corresponding to the question
                displayBotMessage(botResponse); // Display the answer
            } else {
                botResponse = "I don't have information on that question.";
                displayBotMessage(botResponse);
            }

            // Display feedback message after a brief delay
            setTimeout(function () {
                 displayFeedbackMessageStudent();
            }, 500);
        }

    function fetchBotResponse_questions(optionText) {
        var botResponse = '';
    
        // Define answers for each specific question
        var answers = {
            'What is the School Innovation Marathon?': "The School Innovation Marathon is a nationwide initiative aimed at unleashing the creative potential of students across India It encourages student innovation and agency to tackle critical local and global challenges.",
            'Who organizes the School Innovation Marathon?': "The Marathon is spearheaded by Ministry of Education, Atal Innovation Mission-NITI Aayog, AICTE, UNICEF, YUWAAH, Seventh Sense and Inqui-Lab Foundation.",
            'Is ATL Marathon and SIM the same?': "Yes, both of them are the same. SIM was earlier called as ATL Marathon.",
            'How does the program integrate with existing school programs?': "The School Innovation Marathon (SIM) integrates with existing school programs by providing a structured framework that complements and enhances current educational initiatives. Here’s how it integrates: 1. Curriculum Integration: SIM themes and activities can be aligned with the school's curriculum to provide practical, real-world applications of classroom learning. Teachers can incorporate innovation challenges into their lessons to enrich student engagement. 2. Project-Based Learning: The program supports project-based learning by encouraging students to develop and submit ideas based on specific themes. This approach allows students to apply their knowledge and skills to real-world problems, fostering critical thinking and creativity. 3. Teacher Support: Teachers can use the SIM platform to track student progress, access resources, and manage team activities. This support helps them integrate the program smoothly into their existing responsibilities. 4. Student Development: SIM provides students with opportunities to work collaboratively, develop problem-solving skills, and engage in hands-on projects. These experiences complement their academic development and help build skills relevant to future careers. 5. Enhanced Engagement: By participating in SIM, schools can enhance student motivation and engagement through innovative and relevant activities that go beyond traditional classroom experiences. Overall, SIM is designed to be flexible and adaptable, allowing schools to integrate it into their existing programs while enhancing the educational experience for both teachers and students.",
            'Can students from all grades participate?': "The School Innovation Marathon (SIM) is specifically designed for students from Grades 6 to 12.",
            'Are there special certificates for schools with a high number of participating teams?': "Yes, special certificates from AIM, NITI Aayog will be given to all schools that have more than 25 teams participating in the School Innovation Marathon.",
            'Is there a limit on the number of teams that can participate from a school?': "No, there is no limit. The maximum number of teams from every school is encouraged."
        };
       
    
    
        // Check if the clicked option is in the predefined questions list
        if (answers[optionText]) {
            botResponse = answers[optionText]; // Get the answer corresponding to the question
            displayBotMessage(botResponse); 
            
            setTimeout(function() {
                if (lastClickedOption === 'Student') {
                    displayFeedbackMessageStudent(); // Call feedback for students
                } else if (lastClickedOption === 'Teacher') {
                    displayFeedbackMessageTeacher(); // Call feedback for teachers
                }
            }, 500);
        } else if (optionText.toLowerCase() === 'about sim') {
            botResponse = "Questions";
            displayBotMessage(botResponse);
            displaySuboptions_questions();
            
            
        } else if (optionText.toLowerCase() === 'road map') {
            botResponse = "Questions";
            displayBotMessage(botResponse);
            displaySuboptions_roadmap(); 
        }
        else if (optionText.toLowerCase() === 'themes') {
            botResponse = "Questions";
            displayBotMessage(botResponse);
            displaySuboptions_themes(); 
        }
        else if (optionText.toLowerCase() === 'prizes and recognitions') {
            botResponse = "Questions";
            displayBotMessage(botResponse);
            displaySuboptions_prizes(); 
            
        }
        
        
    }
    
    function fetchBotResponse_roadmap(optionText) {
        var botResponse = '';
    
        // Define answers for each specific roadmap question
        var answers = {
             'What is the Road Map for SIM ?': "1. Phase 1 - School Innovation Marathon Launch \n 2. Phase 2 - Registration of Teachers and Students \n 3. Phase 3 - Student Learning Journey & Idea Submission \n 4. Phase4 - Winners Announcement and Student Internship Program (SIP)\n5. Phase 5 - SEP (Student Entrepreneurship Program)",
            'What are time lines for the program ?': "The timelines for the School Innovation Marathon 2024-25 are as follows: \n July 29, 2024 – Launch of the School Innovation Marathon 2024-2025\n The program officially starts on this date with a nationwide rollout.\n July - November 2024 – Innovation & Prototyping Phase\n During this period, students work on identifying problems, conducting research, ideating, innovating, and developing prototypes.\n November 30, 2024 – Last Day to Submit Projects \n This is the deadline for students to submit their innovative projects for review. \n January 2025 – Announcement of Top 1000 Teams \n The best 1000 student teams will be selected and announced based on their submitted projects. \n March 2025 – Funding Support for Top Teams \n The top teams will receive financial support to further develop their projects and take them to the next level. \n May 2025 – Internships for Top Teams \n The most promising teams will be offered internships, providing them real-world exposure and experience to further refine their innovations."
            
        };
    
        // Check if the clicked option is in the predefined questions list
        if (answers[optionText]) {
            botResponse = answers[optionText]; // Get the answer corresponding to the question
            displayBotMessage(botResponse); // Display the answer
        } else {
            botResponse = "I don't have information on that question.";
            displayBotMessage(botResponse);
            displaySuboptions_themes();
        }
        setTimeout(function() {
            if (lastClickedOption === 'Student') {
                displayFeedbackMessageStudent(); // Call feedback for students
            } else if (lastClickedOption === 'Teacher') {
                displayFeedbackMessageTeacher(); // Call feedback for teachers
            }
        }, 500);
        
    }
    

    function fetchBotResponse_themes(optionText) {
        var botResponse = '';
    
        // Define answers for each specific roadmap question
        var answers = {
            'What Are themes for Idea Submission in SIM ?': "The themes for Idea Submission in the School Innovation Marathon (SIM) are:\n 1. Digital Transformation \n 2. Quality Education \n 3. Economic Empowerment \n 4. Health and Well-Being \n 5. Cultural Heritage and Creativity \n 6. Smart and Resilient Communities\n 7. Sustainable Development\n 8. Others",
            'Can students submit ideas beyond these themes?': "Students must submit ideas within the specified themes. If their idea doesn't align with any of the seven suggested themes, they should use the \"Others\" category for submission."
           
        };
    
        // Check if the clicked option is in the predefined questions list
        if (answers[optionText]) {
            botResponse = answers[optionText]; // Get the answer corresponding to the question
            displayBotMessage(botResponse); // Display the answer
        } else {
            botResponse = "I don't have information on that question.";
            displayBotMessage(botResponse);
            displaySuboptions_themes();
        }
        
        setTimeout(function() {
            if (lastClickedOption === 'Student') {
                displayFeedbackMessageStudent(); // Call feedback for students
            } else if (lastClickedOption === 'Teacher') {
                displayFeedbackMessageTeacher(); // Call feedback for teachers
            }
        }, 500);
    }

    function fetchBotResponse_prizes(optionText) {
        var botResponse = '';
    
        // Define answers for each specific roadmap question
        var answers = {
            'What are the key benefits of participating in this program?': "Participating in the School Innovation Marathon (SIM) offers several key benefits: \n 1. Enhanced Learning Opportunities: Students gain practical experience in problem-solving and innovation through real-world challenges.\n 2. Skill Development: Participants develop critical skills such as teamwork, creative thinking, and project management. \n 3. Recognition and Certification: Successful participation and idea submissions can lead to certificates and recognition, highlighting achievements in innovation.\n 4. Exposure to New Ideas: The program encourages exploration of various themes, fostering creativity and broadening students' perspectives. \n 5. Networking Opportunities: Participants can connect with peers, educators, and professionals, expanding their network and potential opportunities for future collaborations. \n 6. Contribution to Society: Students have the chance to develop solutions that address real-world issues, contributing positively to their communities. \n 7. Support and Resources: Access to resources, mentorship, and support throughout the program helps guide and enhance the learning experience.",
            'Are there special certificates for schools with a high number of participating teams?': "Yes, special certificates from AIM, NITI Aayog will be given to all schools that have more than 25 teams participating in the School Innovation Marathon.",
            'What are the Prize and recognitions for top teams ? ' : "The prizes and recognitions for the top teams in the School Innovation Marathon 2024-25 include:\n Top 200 Teams – SEP: These teams will join the Student Entrepreneurship Program (SEP), receiving mentorship, resources, and industry connections to scale their ideas.\n Patenting Support: Selected teams will get patenting guidance from Innovation Centers and MIC, helping secure intellectual property rights.\n Special Recognition: Teams from rural government schools, aspirational districts, and children with special needs will receive additional recognition to encourage diverse participation.\n Special Certificates: The top 200 teams will be awarded certificates for their innovation achievements, providing a prestigious credential for future opportunities."
           
        };
    
        // Check if the clicked option is in the predefined questions list
        if (answers[optionText]) {
            botResponse = answers[optionText]; // Get the answer corresponding to the question
            displayBotMessage(botResponse); // Display the answer
        } else {
            botResponse = "I don't have information on that question.";
            displayBotMessage(botResponse);
            displaySuboptions_themes();
        }
        
        setTimeout(function() {
            if (lastClickedOption === 'Student') {
                displayFeedbackMessageStudent(); // Call feedback for students
            } else if (lastClickedOption === 'Teacher') {
                displayFeedbackMessageTeacher(); // Call feedback for teachers
            }
        }, 500);
    }
   
    
    function fetchFeedbackResponseTeacher(feedback) {
        if (feedback === 'like') {
            displayBotMessage('Thanks for your feedback. Is there anything else that I can help you with?', false);
            displayOptionsAfterFeedback();
        } else if (feedback === 'dislike') {
            displayBotMessage('If your question is different or you can’t find the answer you need, please raise a support ticket in the teacher support system. We’ll make sure to assist you as quickly as possible! Is there anything else that I can help you with?', false);
            setTimeout(function() {
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
    }

    function fetchFeedbackResponseStudent(feedback) {
        if (feedback === 'like') {
            displayBotMessage('Thanks for your feedback. Is there anything else that I can help you with?', false);
            displayOptionsAfterFeedback();
        } else if (feedback === 'dislike') {
            displayBotMessage('If your question is different or you can’t find the answer you’re looking for, please reach out to your SIM teacher. Alternatively, you can ask your teacher to raise a support ticket in the teacher support system for further assistance. Is there anything else that I can help you with?', false);
            setTimeout(function() {
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
    }
    function displayOptionsAfterFeedback() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            displayOptions();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'green';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'green';
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
            noOptionElement.style.backgroundColor = 'green';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'green';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function displayOptionsAfterExaminationOptions() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            // Call the function to send the greeting message and display options
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'green';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'green';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            // Display farewell message
            displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
        });
        
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'green';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'green';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

 
});