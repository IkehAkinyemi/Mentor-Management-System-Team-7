# Mentor-Management-System

Mentors Management system is a people management app that enables proper
coordination of mentors needed to execute projects, ranging from recruitment to off-boarding. Ensue to go through the contributor's wiki below to read more and follow all the instructions.

[hosted link](https://mentor-management-system-team-7-fj6dqhmgi-codehouze.vercel.app/)

[Contributor's wiki](https://github.com/ALCOpenSource/Mentor-Management-System-Team-7/wiki)

## Getting Started

Install dependencies and run the development server:

```bash
npm install

npm run dev
```

Open with your browser to see the result.

## Daily Development

> Please remember to **always** pull the latest changes.

### _Commiting_

Commits must be formated follows:

```console
eg: git commit -m "feat: add new feature"

# For any feature, use feat
# For any documentation, use docs
# For any fix, use fix
# For any refactoring, use refactor
# Make sure to provide short description
```

## Tech

# [Next.js](https://nextjs.org/)

# [TypeScript](https://www.typescriptlang.org/)

# [Tailwind CSS](https://tailwindcss.com/)

# [DaisyUI](https://daisyui.com/)

# [SWR](https://swr.vercel.app/)

## Generate OpenAPi Client

Install OpenApiGenerator cli

```
npm install @openapitools/openapi-generator-cli -g

```

To generate openApi library, run the following command

```
openapi-generator-cli generate -g typescript-axios --additional-properties=prependFormOrBodyParameters=true -o lib/httpGen -i swagger.yaml --skip-validate-spec

```
# Mentor-Management-System-Team-7

Mentors Management system is a people management app that enables proper.
coordination of mentors needed to execute projects, ranging from recruitment to off-boarding. Ensue to go through the app doc below to read more and follow all the instructions.

[Contributor's wiki](https://github.com/ALCOpenSource/Mentor-Management-System-Team-7/wiki)

## Techonologies

*   Frontend
*   Backend
*   Database
*   Deployment env

## How to contributing to this project:

To get it up and running on your local machine, follow the steps below:

*   Fork this repo following this [guideline](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
*   Clone the repo with the command `git clone`
*   Indicate your interest to work on any issue. "eg. I want to work on this issue or I am interested in this issue"
*   Open a feature branch from the 'develop' branch. eg feat/
*   Make sure the name is descriptive for your branch but not too long. Lead with what the the branch is doing eg new feature or bug but follow this pattern `type/branch-description` eg `feature/add-login-functionality`.
*   Ensure your branch is up to date with latest changes before pushing
*   Create a pull request against develop branch
*   Reference the issue you worked on in your PR
*   Open a pull request against the develop branch and request a review from your

##### Frontend

*   Navigate to the project directory with the command `cd conversational-app-team-7`
*   Navigate to the frontend directory with the command `cd frontend`
*   Install all the dependencies with the command `npm install`
*   Start the app with the command `npm run dev`
*   Navigate to the app on your browser with the url `http://localhost:****` where \*\*\*\* is the port number displayed on your terminal.

##### Backend

*   Beckend -

## Design

*   The design can be find [here](https://www.figma.com/file/JNZKj3lachPypSOMBOhC1e/MMS-ALC-0pen-Source-Project?node-id=30-29\&t=EYLkM82VYd8npM7x-0)
*   Find the Prototype [here](https://www.figma.com/proto/JNZKj3lachPypSOMBOhC1e/MMS-ALC-0pen-Source-Project?page-id=6782%3A4428\&node-id=6784-6712\&viewport=565%2C382%2C0.02\&scaling=min-zoom\&starting-point-node-id=6784%3A6712)
*   Work on your Team assigned task eg. Team 1, Team 2 etc.
*   NOTE: Stickly adhere to the style guide on the design, buttons, texts etc.

# Creating issue

*   Raise any identified issue with your mentor.

#### Other commands available

*   `npm run build` - Builds the app for production to the `dist` folder.
*   `npm run lint` - Lints the codebase.
*   `npm run lint:fix` - Lints the codebase and fixes auto-fixable error.

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/098d739ea9504dadabbcc4898eaff86e)](https://app.codacy.com/gh/ALCOpenSource/Mentor-Management-System-Team-1/dashboard?utm_source=gh\&utm_medium=referral\&utm_content=\&utm_campaign=Badge_grade)
