# blood-bank-api

Development: Active

## Description

This is a backend API for a blood bank. This api only actually queries the database on GET requests. For POST requests, the API sends a message to an SQS queue. This queue's listener will do the subsequent database insertions. This design was chosen as the POST request is computationally demanding, so to provide the best ux and free the user up, the computations are delegated.

## Getting Started

## Contributing

## Authors
- matttm : Matt Maloney : matttmaloney@gmail.com
## Issues
If you encounter an issue or a discrepency in the documentation, please message me or open an issue.
## License
This project is licensed under the MIT License - see the LICENSE.md file for details

