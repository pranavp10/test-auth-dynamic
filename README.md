# Project README

## Overview

We are able to generate the session token, but the whole window ends up reloading to get the session data. This means that any data that was input by the user is lost and has to be typed in again

### Tech Stack

- **Next.js 14 (App Directory)**
- **NextAuth (Beta v5)**
- **Dynamic SDK (Solana)**
- **Bun**

### Setup Instructions

1. **Clone the Repository**

   First, clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/pranavp10/test-auth-dynamic.git
   cd test-auth-dynamic
   ```

2. **Install Dependencies**

   Ensure you have `bun` installed. If not, you can install it from [Bun's official website](https://bun.sh/).

   ```bash
   bun i
   ```

3. **Environment Variables**

   Create a new file called `.env.local` in the root directory of the project. Copy all the environment variables from `.env.example` to `.env.local`.

   ```bash
   cp .env.example .env.local
   ```

   Make sure to update the values in `.env.local` with your specific configuration.

4. **Run the Development Server**

   Start the development server using Bun:

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000`.

Thank you for helping us! We hope this guide helps you get started quickly. Happy coding!
