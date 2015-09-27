# Wrist Doctor

Developed at Hack the North 2015 by David Hong and Arham Ahmed.

Carpal Tunnel Syndrome affects roughly 10% of the world's population. Wrist doctor wants to lower that number.
Inspiration
Our goal was to help people that have a health deficiency/problem. Despite the fact CTS is not a major problem today, we anticipated it will be a bigger threat in the days of tomorrow as more of our world becomes engrossed in technology that we control with our bare hands. Thus, it was in light of the better of the future and desire to do social good that we decided to tackle this problem.

#What is it?
Our hack is a web-app that is synced in realtime with the Leap Motion (motion detector) that scans a certain area in the domain of medium ranged hand movement and ultimately detects Carpal Tunnel Syndrome.

#Wait, what is Carpal Tunnel Syndrome?
CTS is a disease in the hand that originates in your wrist; symptoms include: your hand feeling 'useless', a tingling/burning feeling, fingers feeling swollen, decreased grip strength, etc. It is caused by swelling of the median nerve, which is a nerve that runs through the palm of your hand, through your wrist, all the way up to your shoulder. Depending on the severity, you may even need surgery. You can get CTS in many ways, common ones are by making repetitive hand motions (i.e. knitting, texting), bad posture, stretching your wrist in ways it is not meant to bend it, etc.

#How does it work?
We detect and developed certain repetitive patterns that often lead to cases of CTS and send desktop notifications to the user when motions that meet a threshold are marked as harmful. In addition to recognizing several disease inducing motions, we implemented a test to see if you are likely to have CST called the Phalein's test where you put your hands together in a particular manner - pain/tingling in the wrist over the course of a minute indicates a higher chance of having the disease. We synced the Leap Motion's real time response with the Firebase API to save the user's wrist movements and providing data visualizations of their experience.

#What's next for Wrist Doctor
There are many things we can do to improve our application. A few things we can do is add more gestures that can be recognized as harmful, making the regression algorithm more accurate and predictive, and supporting multiple platforms such as mobile so the application can be extended to those in the workforce.

Built With
flask
python
firebase
javascript
leap-motion
json
