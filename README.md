# HappilyEverPrints

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A scalable, user-focused MERN app.

Happily Ever Prints is a specialized platform dedicated to fulfilling wedding-related print needs. The goal is to empower users by providing them with intuitive tools to design their own wedding cards. With a text drag-and-drop design interface, users can easily customize pre-made templates, ensuring that their stationery reflects their unique style and wedding theme.

The platform offers a cost-effective alternative to hiring a professional designer. By utilizing our tools, users can create personalized and one-of-a-kind designs without the need for extensive design knowledge or experience. This not only saves them money but also allows them to take an active role in the creative process, resulting in a more meaningful and memorable wedding experience.

In addition to the design features, we also offer a convenient print-on-demand service. Users can order their completed designs to be professionally printed and delivered right to their doorstep. 

For future development, 
- More selection of card templates and more design options (like changing colors).

Libraries Used:
- React
- Express
- Mongoose
- Bcrypt
- GraphQL
- Apollo
- JWT, for authentication
- EmailJS
- Stripe, for payment
- Sass

Minimum Viable Product (MVP) 
- Clients should be able to view multiple templates for a variety of wedding stationary (invitations, menus, thank you cards, etc…)
- Client should be able to input text, choose specific information
- Once client is satisfied with their selection they should be able to add it to a cart (with quantity)
- Cart should display the items added, the quantity of each item, and then current total cost
- Once all items are in the cart client should be able to checkout and pay for all their items. (redirects them to stripe payment)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Credits](#credits)

## Installation

The web application does not need to be installed as it is deployed in Heroku, Please see usage for the deployed link.

For running the site locally (testing purposes), please make sure your in the correct directory and type `npm i` in your terminal. This will install the required packages which are included in the package.json (in the client folder). Once you installed the packages you type `npm run seed` for seeds, after you can type `npm run develop`. Visit `http://localhost:3000` in your browser.

## Usage

Deployed Link:  

Instructions: Once in the website you can make a user profile (through sign up) and look through the four templates for designing your own card (in the home page). The user profile showcases order history and user information in which you can change. For customer service, there is a FAQ Help page that provides additional information regarding shipping and country services. It also includes get in touch section where you can write a message directly to HappilyEverPrints support team.

[!screenshot]()

## License

The project is licensed under: MIT License. To see the license permissions for commercial and non-commercial use, check the link https://opensource.org/licenses/MIT

## Contributing

Sinthushan Sooriyakumar - [GitHub](https://github.com/sinthushan)
Sara Seoane Garcia - [GitHub](https://github.com/sarasg89) 
Hanna Zolotavina - [GitHub](https://github.com/hannazo)
Gabriel Tuason - [GitHub](https://github.com/gabetuason)
Hamze Mohammed - [GitHub](https://github.com/mhamze23)

## Tests

None

## Questions

For any questions about the application, please contact any of the members above.

## Credits

For user profile:
NPM pagacke [react-tabs](https://www.npmjs.com/package/react-tabs)
Sample code for [profile tabs](https://codesandbox.io/s/r4m5jp6jjq?file=/src/styles.css:275-925)

