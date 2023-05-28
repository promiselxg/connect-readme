<div align="center">
    <a href="https://connect.novu.co" target="_blank"><img src="https://user-images.githubusercontent.com/100117126/235352632-e3e22d9e-2c8b-43d3-a297-dd8fbd90fc56.png" /></a>
</div>

<h1 align="center">The open-source notification infrastructure for developers</h1>

<div>
Novu - The ultimate service for managing multi-channel notifications with a single API.
</div>

### Project Topic

<h3>Building a notification system for charitable organizations that delivers updates on donations and volunteer opportunities.</h3>

#### Description

Novu Donate is an open source platform that can be leveraged by an NGO to use and raise Donations and Volunteering services to people living with disabilities, victims of War, etc.

#### Technologies being used

`ReactJs` / `NodeJs` / `MongoDB` / `Stripe API` / `Novu API` / `Cloudinary API`

```
ReactJs -   Frontend
NodeJs -    Backend
Novu -      Notification infrastructure
Stripe -    Payment
Cloudinary- Image respository
MongoDB -   Database
```

#### App Link

1.  [Novu Donate - Live Link](https://novu-donate.netlify.app)
2.  [Repository](https://github.com/promiselxg/connect-readme/tree/promise)
3.  [Video Illustration](https://www.awesomescreenshot.com/video/17709606?key=1db68089db05d79cfc59578088d33856)

<h3>Screenshoot</h3>
<img width="1128" alt="image" src="https://res.cloudinary.com/promiselxg/image/upload/v1684873369/banking/Novu_Donate_pxtxfv.png">

#### Description

Novu Donate is a web based charity donation and volunteering platform where people can volunteer and provide help for indivduals or communities in need. the application is divided into 3 sections namely;

1.  The Event creation section
2.  The Donation Section
3.  The Volunteer Section.

Each of these 3 sections made use of either Email, SMS or/And In-App notification services of Novu.

#### How it Works

1.  The site owner creates a new event(Must be authenticated to do this)
    - the option to indicate if this new event would require volunteering service or not
2.  The created event is listed on the app home page for all to see
3.  Someone visits the website, goes through all the listed event's that requires donation and/or volunteer
    - The site visitor clicks on a particular event to either make a donation or volunter to help or both.
4.  For donation
    - the user can choose one of the available currency (USD or NGN)
    - you will be redirected to Stripe to complete the transaction.
5.  for volunteer,
    - Fill out the form and submit
    - An Email notification will be sent to the provided email address. 
    - An SMS notification will be sent to the phone number submitted during registration. 

#### Notification flow

1. Create new Event 
     - The User receives In-App and Email notification
2. Makes a donation 
     - The creator of the event receives an SMS, In-App and Email notification
3. Volunteers
   - The creator of the event receives an In-App and Email notification
   - The volunteer also gets an SMS notification

#### Who are you?
<p>Hi, I'm Anuforo Okechukwu Deede, a self taught fullstack developer from Nigeria. I love building software solutions that provides value to the end users.</p>




#### Additional Resources/Info

1. [Stripe](https://www.stripe.com)
2. [Cloudinary](https://cloudinary.com/)
3. [MongoDB](https://cloud.mongodb.com/)

#### Terminology used

```
Event - referes to an area of need
Admin - referes to the person that creates and event
```

#### Test Card

```
Card : 4242 4242 4242 4242
CVC : any 3 digits
Date : Any future Date
```

#### Login Details

```
Username : promiselxg
Password : 123456
```

NB:

- so as to receive the notifications it is advisable you create a new account using your own details.
- the phone number format is (country code)(phone number)
