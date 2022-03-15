# Leetcode-Note-App

This is a course project for ECE209 AS Human-Computer Interaction at UCLA

# Abstract
This is a website helping people practing leecode problems while taking notes.

<img width="1495" alt="Screen Shot 2022-03-14 at 4 54 25 PM" src="https://user-images.githubusercontent.com/54812971/158279757-b4674d3c-7345-478e-a1f2-fed6d15eefee.png">

# Scenario
1. User can take notes via keyboard or voice.
2. Extract the keyword in note, ex: Tree, String, Dynamic Programming
3. Send the request to AWS - Personalize to get leetcode problem recommendation based on user's interaction history, keywords, and problem similarity.
4. Output the result to frontend for user to practice.

# Tech Stack
Web: 
* HTML
* Javascript
* CSS

Web Services: 
  Amazon Web Services:
* AWS - Personalize
* AWS - S3

# Contributor
* Ting-Chun Chou
* Te-An Liu 
* Michael Pan

# Reference
https://github.com/aws-samples/amazon-personalize-samples
https://github.com/dcode-youtube/notes-app-javascript-localstorage/tree/main
https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
