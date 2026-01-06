# Hangman Software Development 2
This project is a multiplayer Hangman game developed during Year 2 of the Computer Science degree at the University of Hertfordshire as part of a Software Development assignment. It showcases the use of programming fundamentals, game logic, and multiplayer interaction within a structured development process.

## Table of Contents:
1. [Project Overview](#1-project-overview)
2. [Breakdown](#2-breakdown)
3. [Target Audience](#3-target-audience)
4. [User Profiles](#4-user-profiles)
5. [User Requirements](#5-user-requirements)
6. [System Requirements](#6-system-requirements)
7. [Game Rules & Mechanics](#7-game-rules--mechanics)
8. [Development Strategy](#8-development-strategy)
9. [Design & Storyboard Mock-ups](#9-design--storyboard-mock-ups)
10. [Testing](#10-testing)
   
## 1. Project Overview
This project is a mobile-focused, multiplayer Hangman game developed as part of the Software Development 01 module. The aim of the project was to design and implement a simple but complete game application using appropriate software development tools, techniques, and methodologies.

The game allows two players to participate in the same Hangman session. One player hosts the game and shares a join code, while the second player joins remotely. Both players see the same game state and take turns guessing letters until the game is either won or lost.

The project was developed following an Agile, iterative approach, with regular testing and refinement throughout development.

## 2. Breakdown
Everything in this project has been done by myself alone, eventhough it is a group project I wanted to challenge myself and work alone to see how much I could push myself and achieve and learn.
Everything from planning, implementation, ReadMe file, and evalutation has been done by myself.

## 3. Target Audience
### Primary Target Audience:

Casual mobile gamers aged 13 and above who enjoy, a simple, straight forward word game.

The game is designed to be:
* Easy to understand for all age demographics
* Quick to play
* Accessible on mobile devices
* Playable for anyone regardless of gaming skills

## 4. User Profiles
### User Profile 1
<img width="1536" height="1024" alt="User Profile 1 Rayyan" src="https://github.com/user-attachments/assets/97703c58-52ae-4316-a47f-924703dd5c0f" />

### User Profile 2
<img width="1536" height="1024" alt="User Profile 2 Michael Rosen" src="https://github.com/user-attachments/assets/f00ad5f6-04ab-4eed-aef8-ce4f8bd263e4" />

## 5. User Requirements
Users MUST be able to:
* Start or join a multiplayer game
* Guess letters using an on-screen interface
* Clearly display guessed letters and remaining attempts
* Indicate when the player has won or lost the game
* Work on mobile devices and fit the screen properly

## 6. System Requirements
### Functional Requiremnts
The system must:
* Support two players in one game session.
* Randomly select a word for each game.
* Track correct and incorrect guesses.
* Manage game states (start, play, win, lose).
* Synchronise game state between players.

### Non-Functional Requirements
* The interface must be clear and easy to use.
* The game must respond quickly to user input.
* The design must be mobile-friendly.
* The system should be reliable and stable during gameplay.

## 7. Game Rules & Mechanics
* Players take turns guessing one letter at a time.
* Correct guesses reveal letters in the word.
* Incorrect guesses reduce the number of remaining attempts.
* Repeated guesses do not affect the game state.
* The game ends when:
  * All letters are guessed (win), or
  * The maximum number of wrong guesses is reached (lose).

## 8. Development Strategy
An Agile Development Strategy was used for this project.

### Advantages
* Allowed constant testing and spotting bugs
* Allowed for iterative improvements of various features
* Allows for flexibility to simulatneously work on other tasks for the project.

### Disadvantages
* A lot of the features had to be simplified due to time constraints and difficulty as I am alone
* Effective when working with a team, however I have developed this whole project myself

However, Agile was suitable for this small-scale project and helped ensure a working product was created and submitted on time.

## 9. Design & Storyboard Mock-ups
<img width="742" height="524" alt="ui-mockup" src="https://github.com/user-attachments/assets/b68bbfa6-bc79-461c-80e8-ee601e968c83" />
<img width="752" height="405" alt="uml" src="https://github.com/user-attachments/assets/7357c2a6-4e34-4dc0-952f-cb330ac5f507" />
<img width="788" height="523" alt="storyboar##" src="https://github.com/user-attachments/assets/00382d01-d360-4c99-9039-955b26b05dcf" />

## 10. Testing
Testing was carried out throughout development to confirm that the game logic, user interface, and API endpoints behaved correctly. Testing focused on core gameplay, input validation, turn switching, and end-game states. Any issues discovered were fixed and re-tested.

### Test Plan
* Game initialisation (new game state loads correctly)
* Letter input validation (only single A–Z characters allowed)
* Correct vs incorrect guesses (masked word updates / attempts decrease)
* Duplicate guesses (no penalty and no state change)
* Turn switching (switches on incorrect guess)
* Win condition (all letters revealed)
* Lose condition (attempts reach 0)
* Reset (new game starts cleanly)
* UI updates (hangman drawing stage updates per mistake)

### Test Log
| Test ID | Test Description                       | Steps                             | Expected Result                                     | Actual Result |
| ------: | -------------------------------------- | --------------------------------- | --------------------------------------------------- | ------------- |
|     T1 | Start game loads correctly             | Open `/` in browser               | Game displays masked word, attempts = 6, player = 1 | Pass          |
|     T2 | Valid letter input accepted            | Enter `A` and press Guess         | Request accepted, state updates                     | Pass          |
|     T3 | Invalid input blocked (number)         | Enter `3` and Guess               | Error message shown, no state change                | Pass          |
|     T4 | Invalid input blocked (blank)          | Guess with empty input            | Error shown, no state change                        | Pass          |
|     T5 | Invalid input blocked (multiple chars) | Enter `AB` and Guess              | Error shown, no state change                        | Pass          |
|     T6 | Correct guess reveals letters          | Guess a letter in the word        | Masked word updates to show letter                  | Pass          |
|     T7 | Incorrect guess reduces attempts       | Guess a letter not in word        | Attempts decrease by 1                              | Pass          |
|     T8 | Turn switches after wrong guess        | Make an incorrect guess           | Current player changes (1 ↔ 2)                      | Pass          |
|     T9 | Duplicate guess is handled             | Guess same letter twice           | Message shown (“already guessed”), no attempt loss  | Pass          |
|     T10 | Hangman drawing updates correctly      | Make wrong guesses repeatedly     | Hangman stage changes each time                     | Pass          |
|     T11 | Win state triggers                     | Keep guessing until word complete | Status = WIN, win message shown, word revealed      | Pass          |
|     T12 | Lose state triggers                    | Make 6 wrong guesses              | Status = LOSE, game over shown, word revealed       | Pass          |
|     T13 | New Game resets everything             | Press “New Game” button           | New word, attempts reset, guessed cleared           | Pass          |
|     T14 | Guess blocked after game over          | Try guessing after WIN/LOSE       | Error shown OR no change until new game             | Pass          |

### Bugs
Here are some bugs that were fixed

| Bug ID | Issue                         | Cause                                                                            | Fix Applied                                                                 | Retest |
| -----: | ----------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------ |
|    B1 | Guessing reset the whole game | Duplicate `/api/guess` route and one route called `new_game_state()` every guess | Removed duplicate route and corrected guess logic                           | Pass   |
|    B2 | UI did not update correctly   | JS was calling wrong endpoints (`/state`, `/guess`) and wrong element IDs        | Updated JS to use `/api/game_state`, `/api/guess`, `/api/new` + correct IDs | Pass   |
|    B3 | Hangman drawing not showing   | Missing `hangmanStage` element / wrong placement                                 | Added `<div id="hangmanStage">` and CSS styling                             | Pass   |

### Conclusion 
Overall, the system passed all functional tests. The game logic and UI are stable and the application correctly handles valid/invalid input, multiplayer turn-switching, win/lose states, and reset behaviour.

<img width="1653" height="782" alt="Screenshot 2026-01-06 003648" src="https://github.com/user-attachments/assets/5f2668c4-cb80-4327-b51f-eda305af58de" />
<img width="1479" height="674" alt="Screenshot 2026-01-06 003626" src="https://github.com/user-attachments/assets/813d7682-831a-409a-992c-d5d393544463" />
<img width="1586" height="751" alt="Screenshot 2026-01-06 003615" src="https://github.com/user-attachments/assets/14aef5be-497e-4a07-8419-306db3f45d0e" />
<img width="1818" height="752" alt="Screenshot 2026-01-06 003546" src="https://github.com/user-attachments/assets/23832cbb-8dd1-4781-915c-c275643108cf" />
<img width="1740" height="934" alt="Screenshot 2026-01-06 003513" src="https://github.com/user-attachments/assets/c6f7e8a9-3c55-495c-8113-3db4a7be5621" />
<img width="1718" height="792" alt="Screenshot 2026-01-06 003454" src="https://github.com/user-attachments/assets/61c933ba-58b4-45f2-9b74-82866f5fbff5" />





