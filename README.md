# Svelte-Invoices

This is a port of an app I have been moving to different languages/frameworks. The app is [Kent C. Dodds Frontend Masters Remix Workshop app](https://frontendmasters.com/courses/advanced-remix/).

Up to this point I have only been porting it around to different React implementations. So I thoroughly enjoyed porting this to svelte and sveltekit. The conversion of react components to svelte components alone was alone worth it.

But on top of this SvelteKit provides some really nice out of the box handling for forms and streaming. There are great benefits to using a compiler and I love it.

Things learned and used while building the app:

- Nested Routes in SvelteKit
- Loading data and making route info reactive
- Progressively enhanced forms (could take this further by passing a function to the `use:enhance` form attribute/directive)
- Pretty sure optimistic ui is an out of the box feature if you just add `use:enhance` to the form. All I know is it worked without all the crazy react hooks and that is a beautiful.
- Declaring form actions
- Streaming

To run the app locally:

1. Fork and clone
2. run `npm install`
3. Setup the following environment variables:
   - GITHUB_ID - Create a github oauth app and get the id
   - GITHUB_SECRET - Generate a secret in the oauth app
   - AUTH_SECRET - run `openssl rand -hex 32` in the terminal and use that value for this env variable
4. run `npx prisma db push`. You may have to run `npx prisma init` first to generate the sqlite db file
5. run `npx prisma generate`
6. Lastly, run `npx prisma db seed` to add seed data to the db
7. Now you can run `npm run dev`.
